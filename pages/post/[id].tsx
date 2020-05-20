import { Fragment } from "react"
import { GetStaticProps, GetStaticPaths } from "next";
import { getPostsMetdata, PostMetadata, getAllPostData } from "../../lib/posts";


interface PostProps extends PostMetadata {
    content: string;
}

export default (props: PostProps) => {
    return (<Fragment>
        <h1>{props.title}</h1>
        <h2>ID: {props.id}, Created: {props.created}, Updated: {props.updated}</h2>
        <h3>Tags: {props.tags.join(', ')}</h3>
        <small>{props.abstract}</small>
        <div
            dangerouslySetInnerHTML={{ __html: props.content }}></div>
    </Fragment>);
}

export const getStaticProps: GetStaticProps<PostProps> = async (context) => {
    const id = Array.isArray(context.params.id) ? context.params.id[0] : context.params.id;
    const postData = await getAllPostData(id);
    return {
        props: {
            ...postData.meta,
            content: postData.content
        }
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: (await getPostsMetdata()).map(meta => {
            return {
                params: {
                    id: `${meta.id}`,
                }
            };
        }),
        fallback: false
    };
}