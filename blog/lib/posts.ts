import { readdir, Dirent, access, constants, readFile } from 'fs';
import { basename, extname } from 'path';
import { promisify } from 'util';
import { join } from 'path';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import { Node } from 'unist';
import matter from 'gray-matter';
import unified from 'unified';

import hljs from 'highlight.js/lib/core';
import js from 'highlight.js/lib/languages/javascript';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';

hljs.registerLanguage('javascript', js);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);

const readDirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);
const postsPath = join(process.cwd(), 'posts');

export interface PostMetadata {
    title: string;
    created: string;
    updated: string;
    tags: string[];
    abstract: string;
    id: string;
}

export interface PostData {
    meta: PostMetadata,
    content: string
}

const parseMeta = (postId: string, meta: { [key: string]: any }): PostMetadata => {
    return {
        title: meta.title,
        tags: meta.tags,
        abstract: meta.abstract,
        created: meta.created,
        updated: meta.updated,
        id: postId
    };
}

export const getPostMetadata = async (postFile: string): Promise<PostMetadata> => {
    const fileContent = await readFileAsync(join(postsPath, postFile), {
        encoding: 'utf8'
    });

    const result = matter(fileContent);
    const postId = basename(postFile, extname(postFile));

    return parseMeta(postId, result.data);
}

export const getPostsMetdata = async (): Promise<PostMetadata[]> => {
    const dirContent: Dirent[] = await readDirAsync(postsPath, {
        withFileTypes: true,
        encoding: 'utf8'
    });

    return Promise.all(
        dirContent
            .filter(entry => entry.isFile())
            .map((entry) => {
                console.log(`Found file in posts: ${entry.name}`);
                console.log(entry);
                return getPostMetadata(entry.name);
            })
    );
}

interface NodeElement extends Node {
    properties: {[key: string]: unknown};
}

const findNodes = (nodes: Node[], condition: (node: Node) => boolean ): Node[] => {
    const matchingNodes = nodes.reduce((prev: Node[], current: Node): Node[] => {
        if (condition(current)) {
            return [...prev, current];
        } else if (current.children && (current.children as Node[]).length > 0) {
            return [...prev, ...findNodes(current.children as Node[], condition)];
        }
        return prev;
    }, []);
    return matchingNodes;
}

const htmlParser = () => (tree) => {
    const nodes: Node[] = tree.children || [];
    const images = findNodes(nodes, node => node.tagName === 'img');
    images.forEach((img: NodeElement) => {
        img.properties.loading = 'lazy';
    });

    const preCodeBlocks = findNodes(nodes, node => {
        return node.tagName === 'pre' && (node.children as Node[]).some(child => child.tagName === 'code');
    });

    preCodeBlocks.forEach(pre => {
        const codeEl: NodeElement = (pre.children as any[]).find(child => child.tagName === 'code');
        const codeContent = codeEl.children[0].value || "";
        codeEl.children = [{
            type: 'raw',
            value: hljs.highlightAuto(codeContent).value
        }];
        
        if (!codeEl.properties.className) {
            codeEl.properties.className = [];
        }

        (codeEl.properties.className as string[]).push('hljs');
    });
};

export const getAllPostData = async (postId: string): Promise<PostData> => {
    const fileContent = await readFileAsync(join(postsPath, `${postId}.md`), {
        encoding: 'utf8'
    });
    const postMeta = matter(fileContent);
    const postHtml = await unified()
        .use(markdown)
        .use(remark2rehype)
        .use(htmlParser)
        .use(html, { allowDangerousHtml: true })
        .process(postMeta.content);

    return {
        meta: parseMeta(postId, postMeta.data),
        content: postHtml.toString()
    };
}

