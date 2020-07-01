import styled from '@emotion/styled';
import 'highlight.js/styles/railscasts.css';
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