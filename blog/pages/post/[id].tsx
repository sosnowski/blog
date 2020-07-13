import { GetStaticProps, GetStaticPaths } from "next";
import { PrimaryHeader } from '../../components/headers';
import { getPostsMetdata, PostMetadata, getAllPostData } from "../../lib/posts";
import { Content, Abstract, Meta, DateInfo, Tag } from "../../components/content";
import { Breadcrumb } from "../../components/breadcrumb";
import { ContentWrapper } from "../../components/content-wrapper";
import { DateTime } from "luxon";
import Head from "next/head";


interface Props {
    post: {
        content: string
    } & PostMetadata;
}

export default ({ post }: Props) => {
    const created = DateTime.fromISO(post.created);
    return (
        <ContentWrapper>
            <Head>
                <title>{post.title} - Sosnowski.dev</title>
                <meta name="description" content={post.abstract} />
                <meta property="og:title" content={`${post.title} - Sosnowski.dev`} />
                <meta property="og:description" content={post.abstract} />
                <meta property="og:url" content={`https://sosnowski.dev/post/${post.id}`} />
            </Head>
            <Breadcrumb steps={[
                { label: 'Home' },
                { label: 'Blog', href: '/', as: '/' },
                { label: post.title, href: `/post/[id]`, as: `/post/${post.id}` }
            ]}/>
            <article>
                <PrimaryHeader>{post.title}</PrimaryHeader>
                <Meta>
                    {
                        post.tags.map(tag => {
                            return (<Tag key={tag}><strong>#</strong>{tag}</Tag>)
                        })
                    }
                <DateInfo>{created.toLocaleString(DateTime.DATE_FULL)}</DateInfo>
                </Meta>
                <Abstract>{post.abstract}</Abstract>
                <Content content={post.content}></Content>
            </article>
        </ContentWrapper>
    );
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const id = Array.isArray(context.params.id) ? context.params.id[0] : context.params.id;
    const postData = await getAllPostData(id);
    return {
        props: {
            post: {
                ...postData.meta,
                content: postData.content
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