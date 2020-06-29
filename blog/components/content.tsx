import styled from '@emotion/styled';

import * as styles from './styles';
import { StyledFunctionComponent } from './helpers';

export const Abstract = styled.section`
    font-size: 1.3rem;
    font-weight: bold;
`;



export const Meta = styled.section`
    display: flex;
    flex-direction: row;
    color: #0b7261;
    font-weight: bold;
    font-size: 1.1rem;
    margin: 0 0 2rem 0;
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

export const DateInfo = styled.span`
    flex: 1;
`;

interface Props {
    content: string;
}

const ContentContainer = styled.section`
    max-width: ${styles.maxContentWidth};
    padding: ${styles.contentPadding};
    font-size: 1.3rem;
    margin: 1rem auto;

    & a {
        color: ${styles.activeTextColor};
        text-decoration: underline;
    }

    & h2 {
        font-size: 2.1rem;
        border-bottom: 8px solid ${styles.secondaryBgColor};
        padding: 0.5rem 0;
        width: 90%;
        margin: 2.5rem 0 2rem 0;
    }

    & h3 {
        font-size: 1.8rem;
        padding: 0.5rem 0;
        border-bottom: 5px solid ${styles.mainBgColor};
        max-width: 50%;
    }

    & h4 {
        font-size: 1.5rem;
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