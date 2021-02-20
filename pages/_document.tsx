import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Global, css } from '@emotion/core';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
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