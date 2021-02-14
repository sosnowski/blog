import styled from '@emotion/styled';

import * as styles from './styles';
import { StyledFunctionComponent } from './helpers';

export const Article = styled.article`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    align-content: stretch;
    margin: 0 auto;
    padding: 0 ${styles.contentPadding};
    max-width: ${styles.maxContentWidth};
`;

export const Abstract = styled.section`
    font-size: 1.2rem;
    line-height: 1.4rem;
    font-weight: bold;
    margin: 0;
    padding: ${styles.contentPadding};
`;

export const Meta = styled('section')`
    display: block;
    text-align: left;
    color: #0b7261;
    font-weight: normal;
    font-size: 1rem;
    margin: 0;
`;

export const DateInfo = styled('span')`
    display: block;
    font-size: 0.9rem;
    padding: 0.3rem;
    color: #000;
`;

export const Tag = styled.span`
    display: inline-block;
    padding: 0.3rem;
    text-transform: lowercase;
    margin-right: 0.4rem;

    & > strong {
        margin-right: 3px;
    }
`;

interface Props {
    content: string;
}

const ContentContainer = styled.section`
    padding: ${styles.contentPadding};
    font-size: 1.1rem;
    line-height: 1.5rem;
    font-weight: light;
    margin: 0;

    & a {
        color: ${styles.activeTextColor};
        text-decoration: underline;
    }

    & h2 {
        font-size: 2.1rem;
        color: #000;
        padding: 0.5rem 0;
        width: 90%;
        margin: 3rem 0 2rem 0;
        line-height: 2rem;

        &::before {
            content: "##";
            color: ${styles.secondaryBgColor};
            font-size: 110%;
            margin-right: 0.5rem;
        }
    }

    & h3 {
        font-size: 1.5rem;
        color: #000;
        padding: 0.5rem 0;
        max-width: 50%;
        line-height: 2rem;
        &::before {
            content: "###";
            color: ${styles.secondaryBgColor};
            font-size: 110%;
            margin-right: 0.5rem;
        }
    }

    & h4 {
        font-size: 1.2rem;
        color: #000;
    }

    & blockquote {
        border-left: 4px solid ${styles.mainHeaderBgColor};
        padding: 1rem;
        margin: 1rem;
    }

    & li {
        margin: 0.5rem;
    }

    & > p > code {
        background-color: #FFEECA;
        display: inline-block;
        padding: 3px;
        color: #4E4637;
    }

    & img {
        width: 90%;
        margin: 1rem auto;
        display: block;
    }
`;


export const Content: StyledFunctionComponent<Props> = ({ content, className, children }) => {
    return (
        <ContentContainer className={className} dangerouslySetInnerHTML={{ __html: content }}></ContentContainer>
    );
}
