import { readFileSync, writeFileSync } from 'fs';
import { basename, join } from 'path';
import unified from 'unified';
import markdown from 'remark-parse';
import { Node } from 'unist';
import frontmatter from 'remark-frontmatter';
import toMdString from 'remark-stringify';

import { copyImagesToAssets } from './images';

// export enum ChangeType {
//     Added = 'A',
//     Modified = 'M',
//     Deleted = 'D'
// }

// export interface GitFileInfo {
//     file: string;
//     change: ChangeType
// }

// export const getModifiedPosts = (filePath: string): GitFileInfo[] => {
//     console.log(`Reading diff... ${filePath}`);
//     const fileData = readFileSync(filePath, {
//         encoding: 'utf8'
//     });

//     return fileData.split('\n')
//         .filter(line => line.length > 0)
//         .map(line => line.split('\t'))
//         .filter(parts => /__posts.*\.md/.test(parts[1].trim()))
//         .map(parts => {
//             return {
//                 file: decodeURI(parts[1].trim()),
//                 change: ((change: string) => { 
//                     if (change === 'A') {
//                         return ChangeType.Added;
//                     }
//                     if (change === 'M') {
//                         return ChangeType.Modified;
//                     }
//                     if (change === 'D') {
//                         return ChangeType.Deleted;
//                     }
//                     throw new Error(`Unknown change type: "${change}"`);
//                 })(parts[0].trim())
//             };
//         });
// }

const findImages = (tokens: Node[]): Node[] => {

    const imageTokens = tokens.reduce((prev: Node[], current: Node): Node[] => {
        if (current.type === 'image') {
            return [...prev, current];
        } else if (current.children && (current.children as Node[]).length > 0) {
            return [...prev, ...findImages(current.children as Node[])];
        }
        return prev;
    }, []);
    return imageTokens;
}

const parserPlugin = (postPath: string) => async tree => {
    const images = findImages(tree.children as Node[] || []);
    if (images.length === 0) {
        return;
    }
    const s3Urls = await copyImagesToAssets(postPath, images.map(token => decodeURI(token.url as string)));

    images.forEach((token, index) => {
        token.url = `/${s3Urls[index]}`;
    });
};

export const parsePostImages = async (postPath: string) => {
    const postId = basename(postPath);
    const fileData = readFileSync(postPath, {
        encoding: 'utf8'
    });
    const contents = await unified()
        .use(markdown)
        .use(toMdString)
        .use(frontmatter, ['yaml'])
        .use(parserPlugin, postPath)
        .process(fileData);

    const newPath = join(__dirname, '..', '..', 'blog', 'posts', postId);
    console.log('Saving to '+newPath);

    writeFileSync(newPath, contents.toString(), {
        encoding: 'utf8'
    });
}