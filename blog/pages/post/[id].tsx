import { GetStaticProps, GetStaticPaths } from "next";
import { PrimaryHeader } from '../../components/headers';
import { getPostsMetdata, PostMetadata, getAllPostData, TOCSimple } from "../../lib/posts";
import { Content, Abstract, Meta, DateInfo, Tag, Article } from "../../components/content";
import { DateTime } from "luxon";
import Head from "next/head";
import { TOC } from "../../components/toc";
import { Fragment } from "react";

interface Props {
    post: {
        content: string
        toc: TOCSimple[]
    } & PostMetadata;
}

export default ({ post }: Props) => {
    const created = DateTime.fromISO(post.created);
    return (
        <Fragment>
            <Head>
                <title>{post.title} - Sosnowski.dev</title>
                <meta name="description" content={post.abstract} />
                <meta property="og:title" content={`${post.title} - Sosnowski.dev`} />
                <meta property="og:description" content={post.abstract} />
                <meta property="og:url" content={`https://sosnowski.dev/post/${post.id}`} />
            </Head>
            <Article>
                <PrimaryHeader>{post.title}</PrimaryHeader>
                <Meta>
                    {
                        post.tags.map(tag => {
                            return (<Tag key={tag}><strong>#</strong>{tag}</Tag>)
                        })
                    }
                <DateInfo>{created.toFormat('dd LLL yyyy')}</DateInfo>
                </Meta>
                <Abstract>{post.abstract}</Abstract>
                <TOC items={post.toc}/>
                <Content content={post.content}></Content>
            </Article>
        </Fragment>
    );
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const id = Array.isArray(context.params.id) ? context.params.id[0] : context.params.id;
    const postData = await getAllPostData(id);
    return {
        props: {
            post: {
                ...postData.meta,
                content: postData.content,
                toc: postData.toc
            }
        }
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: (await getPostsMetdata()).map(meta => {
            return {
                params: {
                    id: meta.id,
                }
            };
        }),
        fallback: false
    };
}