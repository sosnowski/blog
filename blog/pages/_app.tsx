import styled from '@emotion/styled';
import 'highlight.js/styles/atom-one-dark.css';
import { TopHeader } from '../components/top-header';
import { Fragment } from 'react';
import { Footer } from '../components/footer';

export default ({ Component, pageProps }) => {
    return (
        <Fragment>
            <TopHeader/>
            <Component {...pageProps} />
            <Footer />
        </Fragment>
    );
}