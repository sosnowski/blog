import { basename, dirname, join } from 'path';
import axios from 'axios';
import { readFileSync, copyFileSync, mkdirSync, createWriteStream } from 'fs';
import { S3Client } from '@aws-sdk/client-s3-node/S3Client';
import { PutObjectCommand, PutObjectInput } from '@aws-sdk/client-s3-node/commands/PutObjectCommand';
import { ListObjectsCommand, ListObjectsInput, ListObjectsOutput } from '@aws-sdk/client-s3-node/commands/ListObjectsCommand';

const bucketName = 'sosnowski-blog-files';
const publicPath = join(__dirname, '..', '..', 'blog', 'public');

const copyRemoteImage = async (imageUrl: string, postId: string, postPath: string): Promise<string> => {
    const newPath = join('assets', postId);
    mkdirSync(join(publicPath, newPath), {
        recursive: true
    });
    const url = new URL(imageUrl);
    const imageName = basename(url.pathname);
    console.log('Copying remote image ' + imageUrl);
    // GET request for remote image in node.js
    const response = await axios({
        method: 'get',
        url: imageUrl,
        responseType: 'stream'
    });
    response.data.pipe(createWriteStream(join(publicPath, newPath, imageName)));
    console.log(`Copied to ${join(newPath, imageName)}`);
    return join(newPath, imageName);
}

const copyLocalImage = async (imagePath: string, postId: string, postPath: string): Promise<string> => {
    const imageName = basename(imagePath).replace(/\s/g,'-');
    const newPath = join('assets', postId);

    console.log(`Copying image ${join(postPath, imagePath)}`);

    mkdirSync(join(publicPath, newPath), {
        recursive: true
    });
    copyFileSync(join(postPath, imagePath), join(publicPath, newPath, imageName));

    console.log(`Copied to ${join(newPath, imageName)}`);

    return join(newPath, imageName);
}

export const copyImagesToAssets = async (postFilePath: string, imagesPaths: string[]): Promise<string[]> => {
    const postId = basename(postFilePath, '.md').replace(/\s/g,'-');
    const postPath = dirname(postFilePath);
    const isUrl = /^http|https:\/\/.+/;
    console.log(`Copying images for post ${postId}`);

    console.log('Copying images');
    const assetsPaths: string[] = await Promise.all(imagesPaths.map(imagePath => {
        return (isUrl.test(imagePath) ? 
            copyRemoteImage(imagePath, postId, postPath) : copyLocalImage(imagePath, postId, postPath));
    }));

    return assetsPaths;
}

// export const uploadImagesToS3 = async (postInfo: GitFileInfo, imagesPaths: string[]): Promise<string[]> => {
//     let existingImages = [];
//     const postId = basename(postInfo.file, '.md');
//     const postPath = dirname(postInfo.file);
//     console.log(`Uploading images for post ${postId}`);
//     const s3 = new S3Client({
//         region: 'eu-west-1',
//         credentials: {
//             secretAccessKey: '',
//             accessKeyId: ''
//         }
//     });

//     if (postInfo.change === ChangeType.Modified) {
//         console.log('Post is modified, loading existing images');
//         const listInput: ListObjectsInput = {
//             Bucket: bucketName,
//             Prefix: `${postId}/`
//         };
//         existingImages = (await s3.send(new ListObjectsCommand(listInput))).Contents.map(object => {
//             return object.Key;
//         });
//         console.log(existingImages);
//     }

//     console.log('Uploading images');
//     const s3Paths: string[] = await Promise.all(imagesPaths.map(async imagePath => {
//         const imageName = basename(imagePath);
//         const imageKey = `assets/${postId}/${imageName}`.replace(/\s/g,'-');
//         console.log(`Uploading image ${join(postPath, imagePath)}`);
//         if (existingImages.includes(imageName)) {
//             console.log(`Image already exists in S3 as ${imageKey}`);
//         } else {
//             console.log('Uplading...');
//             const result = await s3.send(new PutObjectCommand({
//                 Bucket: bucketName,
//                 Key: imageKey,
//                 Body: readFileSync(join(postPath, imagePath))
//             }));
//             console.log(`Done, uploaded as ${imageKey}`);
//         }
//         return `${cloudfrontDomain}/${imageKey}`;
//     }));

//     return s3Paths;
// }