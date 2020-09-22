import { create } from 'xmlbuilder2';
import { parseISO, formatISO } from 'date-fns/fp';
import { readdir, Dirent, readFile, writeFile } from 'fs';
import { basename, extname } from 'path';
import { promisify } from 'util';
import { join } from 'path';
import matter from 'gray-matter';

const readDirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const postsPath = join(__dirname, '..', 'blog', 'posts');
const rssPath = join(__dirname, '..', 'blog', 'public', 'rss.xml');

export interface PostMetadata {
    title: string;
    created: Date;
    abstract: string;
    id: string;
}

export const getPostMetadata = async (postFile: string): Promise<PostMetadata> => {
    const fileContent = await readFileAsync(join(postsPath, postFile), {
        encoding: 'utf8'
    });

    const result = matter(fileContent);
    const postId = basename(postFile, extname(postFile));

    return {
        title: result.data.title,
        abstract: result.data.abstract,
        created: parseISO(result.data.created),
        id: postId
    };
};

export const getPostsMetadata = async (): Promise<PostMetadata[]> => {
    const dirContent: Dirent[] = await readDirAsync(postsPath, {
        withFileTypes: true,
        encoding: 'utf8'
    });

    return Promise.all(
        dirContent
            .filter(entry => entry.isFile())
            .map((entry) => {
                console.log(`Reading meta for ${entry.name}`);
                return getPostMetadata(entry.name);
            })
    );
};

(async () => {
    console.log('Reading posts metadata...');
    const postsData = await getPostsMetadata();
    postsData.sort((a, b) => {
        return a > b ? 1 : -1;
    });
    console.log('Generating xml content...');
    const data = {
        rss: {
            '@version': '2.0',
            channel: {
                title: 'Sosnowski.dev - Personal Blog',
                link: 'https://sosnowski.dev',
                description: `Hi! I'm Damian. I'm an Engineering Manager in OLX, certified AWS Architect Associate and a technology geek. Welcome to my blog!`,
                item: postsData.map(meta => {
                    return {
                        title: meta.title,
                        link: `https://sosnowski.dev/post/${meta.id}`,
                        description: meta.abstract,
                        pubDate: formatISO(meta.created)
                    };
                })
            }
        }
    };

    const doc = create(data);
    const xml = doc.end({ prettyPrint: true });
    console.log('Saving file...');
    await writeFileAsync(rssPath, xml, { encoding: 'utf8' });
})();
