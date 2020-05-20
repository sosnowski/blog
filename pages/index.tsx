import Head from 'next/head'
import { Fragment } from 'react'
import { GetStaticProps } from 'next'
import { readFile } from 'fs';
import { promisify } from 'util';
import { getPostsMetdata, PostMetadata } from '../lib/posts';

interface HomeProps {
    articles: PostMetadata[]
}

export default function Home(props: HomeProps) {
  return (
    <Fragment>
        <h1>This is my blog!</h1>
        {props.articles.map((blog) => {
            return (
                <h2 key={blog.id}><a href={`/post/${blog.id}`}>{blog.title}</a></h2>
            );
        })}
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const data = await getPostsMetdata()
    console.log(data);
    return {
        props: {
            articles: data
        }
    };
}