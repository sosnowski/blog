import { readdir, Dirent, access, constants, readFile } from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import { DateTime } from 'luxon';
import remark from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';

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
        created: DateTime.fromISO(meta.created, { zone: 'utc' }).toISO(),
        updated: DateTime.fromISO(meta.updated, { zone: 'utc' }).toISO(),
        id: postId
    };
}

export const getPostMetadata = async (postId: string): Promise<PostMetadata> => {
    const fileContent = await readFileAsync(join(postsPath, postId, `${postId}.md`), {
        encoding: 'utf8'
    });

    const result = matter(fileContent);

    return parseMeta(postId, result.data);
}

export const getPostsMetdata = async (): Promise<PostMetadata[]> => {
    const dirContent: Dirent[] = await readDirAsync(postsPath, {
        withFileTypes: true,
        encoding: 'utf8'
    });

    return Promise.all(
        dirContent
            .filter(dir => dir.isDirectory())
            .map((dir) => getPostMetadata(dir.name))
    );
}

export const getAllPostData = async (postId: string): Promise<PostData> => {
    const fileContent = await readFileAsync(join(postsPath, postId, `${postId}.md`), {
        encoding: 'utf8'
    });
    const postMeta = matter(fileContent);
    const postHtml = await remark().use(html).process(postMeta.content);
    return {
        meta: parseMeta(postId, postMeta.data),
        content: postHtml.toString()
    };
}