import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Global, css } from '@emotion/core';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta property="og:site_name" content="Sosnowski.dev - Personal Blog"></meta>
            <meta name="monetization" content="$ilp.uphold.com/fYBP4y6iaHEy"></meta>
            <link rel="alternate" type="application/rss+xml" href="https://sosnowski.dev/rss.xml" title="Sosnowski.dev - Personal Blog"></link>
        </Head>
        <Global styles={css`
            @font-face {
                font-family: 'Inconsolata';
                src: local('Inconsolata'), url('/assets/fonts/inconsolata.ttf'), local('OpenSans-Regular');
                font-display: swap;
            }
            body {
                background-color: #fff;
                color: #212121;
                font-family: 'Inconsolata', sans-serif;
                padding: 0;
                margin: 0;
            }

            html {
                font-size: 100%;
            }
        `} />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument