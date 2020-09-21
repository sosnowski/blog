import React from 'react';
import styled from  '@emotion/styled';
import { StyledFunctionComponent } from './helpers';
import Link from 'next/link';

const HeaderContainer = styled.header`
    background-color: #fff;
    height: 5rem;
    display: flex;
    flex-direction: row;

    & > h1 {
        font-size: 1.5rem;
        letter-spacing: 2px;
        color: #000;
        flex: 1;

        > a {
            color: #000;
            text-decoration: none;
        }
    }

    > * {
        line-height: 5rem;
        margin: 0;
        padding: 0 1em;
    }
`;

const LinksContainer = styled.section`
    text-align: right;

    & a {
        text-decoration: underline;
        color: #000;
        text-transform: capitalize;
        margin-right: 1rem;
        font-size: 1.2rem;

        &:hover {
            color: #649B92;
        }
    }
`;

export const TopHeader: StyledFunctionComponent = ({ className, children }) => {
    return (
        <HeaderContainer>
            <h1><Link href="/"><a>|&gt; Sosnowski.dev</a></Link></h1>
        </HeaderContainer>
    );
};