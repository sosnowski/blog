import Head from 'next/head'
import { Fragment } from 'react'
import { GetStaticProps } from 'next'
import { DateTime } from 'luxon';
import styled from '@emotion/styled';
import { GreenSectionHeader } from '../components/headers';
import { ArticleTile } from '../components/article-tile';
import { getPostsMetdata, PostMetadata } from '../lib/posts';
import { ContentWrapper } from '../components/content-wrapper';

interface HomeProps {
    articles: PostMetadata[]
}

const Green = styled.section`
    background-color: #0b7261;
    margin: 1rem 0 0 0;
    padding: 2rem 0;
`;

export default ({ articles }: HomeProps) => {
  return (
    <Fragment>
        <Head>
            <title>Blog - Sosnowski.dev</title>
            <meta name="description" content="Hi! I'm Damian. I'm an Engineering Manager in OLX, certified AWS Architect Associate and a technology geek. Welcome to my blog!" />
            <meta property="og:title" content="Blog - Sosnowski.dev" />
            <meta property="og:description" content="Hi! I'm Damian. I'm an Engineering Manager in OLX, certified AWS Architect Associate and a technology geek. Welcome to my blog!" />
            <meta property="og:url" content="https://sosnowski.dev" />
        </Head>
        <ContentWrapper>
            <ArticleTile main post={articles[0]}/>
        </ContentWrapper>

        <Green>
            <ContentWrapper>
                <GreenSectionHeader>More articles</GreenSectionHeader>
                {
                    articles.slice(1).map(post => {
                        return (<ArticleTile post={post} key={post.id} />);
                    })
                }
            </ContentWrapper>
        </Green>
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const data = await getPostsMetdata();
    data.sort((a, b) => {
        return (DateTime.fromISO(a.created).toMillis() > DateTime.fromISO(b.created).toMillis()) ? -1 : 1;
    });
    return {
        props: {
            articles: data
        }
    };
}