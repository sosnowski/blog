import { readdir, Dirent, readFile } from 'fs';
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
import typescript from 'highlight.js/lib/languages/typescript';
import hljsMarkdown from 'highlight.js/lib/languages/markdown';
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('javascript', js);
hljs.registerLanguage('go', go);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('markdown', hljsMarkdown);
hljs.registerLanguage('bash', bash);

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
    content: string,
    toc: TOCSimple[]
}

export interface TOCRecord {
    href: string;
    label: string;
    level: number;
    parent?: TOCRecord;
    children: TOCRecord[];
}

export type TOCSimple = Pick<TOCRecord, 'href' | 'label'> & {
    children: TOCSimple[];
};

// const parseMeta = (postId: string, meta: { [key: string]: any }): PostMetadata => {
//     return {
//         title: meta.title,
//         tags: meta.tags,
//         abstract: meta.abstract,
//         created: meta.created,
//         updated: meta.updated,
//         id: postId
//     };
// }

export const getPostMetadata = async (postFile: string): Promise<PostMetadata> => {
    const fileContent = await readFileAsync(join(postsPath, postFile), {
        encoding: 'utf8'
    });

    const result = matter(fileContent);
    const postId = basename(postFile, extname(postFile));

    return {
        title: result.data.title,
        tags: result.data.tags,
        abstract: result.data.abstract,
        created: result.data.created,
        updated: result.data.updated,
        id: postId
    };
};

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
                return getPostMetadata(entry.name);
            })
    );
};

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

    const headersElements = findNodes(nodes, node => {
        return ['h1', 'h2', 'h3', 'h4', 'h5'].includes(node.tagName as string);
    });
    headersElements.forEach((header: NodeElement) => {
        const textNode = findNodes((header.children as Node[] || []), (node) => node.type === 'text')[0];
        const text: string = textNode.value as string || '-empty-';
        const id = text.toLowerCase().replace(/\W/g, '-');
        header.properties.id = id;
    });
};

const getTOC = (nodes: Node[], currentTOC: TOCRecord) => {
    nodes.forEach((node) => {
        const tagName: string = node.tagName as string;
        let tagLevel: number;
        switch (tagName) {
            case 'h1':
                tagLevel = 1;
                break;
            case 'h2':
                tagLevel = 2;
                break;
            case 'h3':
                tagLevel = 3;
                break;
            case 'h4':
                tagLevel = 4;
                break;
        }
        if (tagLevel) {
            const textNode = findNodes(node.children as Node[], (node) => node.type === 'text')[0];
            const newTOC: TOCRecord = {
                href: (node as NodeElement).properties.id as string,
                label: textNode ? textNode.value as string : '-no-label-',
                level: tagLevel,
                children: []
            };

            while (tagLevel <= currentTOC.level && currentTOC.parent) {
                currentTOC = currentTOC.parent;
            }
            newTOC.parent = currentTOC;
            currentTOC.children.push(newTOC);
            currentTOC = newTOC;
        } else if (node.children) {
            getTOC((node.children as NodeElement[]), currentTOC);
        }
    });
}

const getTOCNodes = (results: TOCRecord[]) => () => (tree) => {
    const nodes: Node[] = tree.children || [];
    const topTOC = {
        href: '/',
        label: 'Root',
        level: 0,
        children: []
    };
    getTOC(nodes, topTOC);

    topTOC.children.forEach(toc => results.push(toc));
}

const simplifyTOC = (records: TOCRecord[]): TOCSimple[] => {
    return records.map((record): TOCSimple => {
        return {
            href: record.href,
            label: record.label,
            children: simplifyTOC(record.children)
        };
    });
}

export const getAllPostData = async (postId: string): Promise<PostData> => {
    const fileContent = await readFileAsync(join(postsPath, `${postId}.md`), {
        encoding: 'utf8'
    });
    const postMeta = matter(fileContent);
    const TOCRecords = [];
    const postHtml = await unified()
        .use(markdown)
        .use(remark2rehype)
        .use(htmlParser)
        .use(getTOCNodes(TOCRecords))
        .use(html, { allowDangerousHtml: true })
        .process(postMeta.content);

    return {
        meta: {
            title: postMeta.data.title,
            tags: postMeta.data.tags,
            abstract: postMeta.data.abstract,
            created: postMeta.data.created,
            updated: postMeta.data.updated,
            id: postId
        },
        toc: simplifyTOC(TOCRecords),
        content: postHtml.toString()
    };
}

