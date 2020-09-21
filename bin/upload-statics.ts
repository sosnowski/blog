import { join, relative } from 'path';
import { readdirSync, readFileSync, Dirent } from 'fs';
import { lookup } from 'mime-types';
import { S3Client } from '@aws-sdk/client-s3-node/S3Client';
import { PutObjectCommand, PutObjectInput } from '@aws-sdk/client-s3-node/commands/PutObjectCommand';
import { ListObjectsCommand, ListObjectsInput } from '@aws-sdk/client-s3-node/commands/ListObjectsCommand';

const bucketName = 'sosnowski-blog-files';
const staticFolder = join(__dirname, '..', 'blog', 'out');

const CACHE_DEFAULT = 60 * 60 * 24;
const CACHE_ASSETS = 60 * 60 * 24 * 7;

const getAllFiles = (path: string): string[] => {
    return readdirSync(path, {
        withFileTypes: true,
        encoding: 'utf8'
    }).reduce((prev: string[], current: Dirent): string[] => {
        if (current.isFile()) {
            return [...prev, join(path, current.name)];
        } else if (current.isDirectory()) {
            return [
                ...prev,
                ...getAllFiles(join(path, current.name))
            ]
        }
    }, []);
}

const getS3Assets = async (): Promise<string[]> => {
    const listInput: ListObjectsInput = {
        Bucket: bucketName,
        Prefix: `assets/`
    };
    const existingAssets = (await s3.send(new ListObjectsCommand(listInput))).Contents.map(object => {
        return object.Key;
    });
    return existingAssets;
}

const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID
    }
});

(async () => {
    console.log('Reading static files in ' + staticFolder);
    const allStaticFiles = getAllFiles(staticFolder);
    console.log('Loading existing assets from S3...');
    const existingAssets = await getS3Assets();

    for(let i = 0; i < allStaticFiles.length; i++) {
        const file = allStaticFiles[i];
        const imageKey = relative(staticFolder, file);
        const isAsset = imageKey.substr(0, 6) === 'assets';
        if (!existingAssets.includes(imageKey)) {
            console.log(`Uploading file ${file} to ${imageKey}...`);
            await s3.send(new PutObjectCommand({
                Bucket: bucketName,
                Key: imageKey,
                Body: readFileSync(file),
                ContentType: lookup(file) || 'plain/text',
                CacheControl: `max-age=${isAsset ? CACHE_ASSETS : CACHE_DEFAULT}`
            }));
            console.log('Done');
        } else {
            console.log(`${imageKey} already uploaded`);
        }
    }
    console.log('All done');
})();
