import styled from '@emotion/styled';
import 'highlight.js/styles/railscasts.css';
import { TopHeader } from '../components/top-header';

const Layout = styled.div`
    width: 100%;
    margin: auto;
`;

export default ({ Component, pageProps }) => {
    return (
        <Layout>
            <TopHeader/>
            <Component {...pageProps} />
        </Layout>
    );
}