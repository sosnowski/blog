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
        </Head>
        <Global styles={css`
            @font-face {
                font-family: 'Alfa Slab One';
                src: local('Alfa Slab One Regular'), url('/assets/fonts/alfa_slab_one/AlfaSlabOne-Regular.ttf');
                font-weight: normal;
                font-style: normal;
                font-display: block;
            }
            @font-face {
                font-family: 'Open Sans';
                src: local('Open Sans Regular'), local('OpenSans-Regular'), url('/assets/fonts/open_sans/OpenSans-Regular.ttf');
                font-weight: normal;
                font-style: normal;
                font-display: block;
            }
            body {
                background-color: #fff;
                color: #000;
                font-family: 'Open Sans', sans-serif;
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