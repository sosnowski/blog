import 'highlight.js/styles/atom-one-dark.css';
import { TopHeader } from '../components/top-header';
import React, { Fragment } from 'react';
import { Footer } from '../components/footer';
import Head from 'next/head';

export default ({ Component, pageProps }) => {
    return (
        <Fragment>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta property="og:site_name" content="Sosnowski.dev - Personal Blog"></meta>
                <meta name="monetization" content="$ilp.uphold.com/fYBP4y6iaHEy"></meta>
                <link rel="alternate" type="application/rss+xml" href="https://sosnowski.dev/rss.xml" title="Sosnowski.dev - Personal Blog"></link>
            </Head>
            <TopHeader/>
            <Component {...pageProps} />
            <Footer />
        </Fragment>
    );
}