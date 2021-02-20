import React from 'react';
import styled from  '@emotion/styled';
import { StyledFunctionComponent } from './helpers';
import Link from 'next/link';
import { MonetizationParty } from './party';

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
        min-width: 14rem;

        > a {
            color: #000;
            text-decoration: none;
        }
    }

    > * {
        line-height: 5rem;
        margin: 0;
        padding: 0 1rem;
    }
`;

export const TopHeader: StyledFunctionComponent = ({ className, children }) => {
    return (
        <HeaderContainer>
            <h1><Link href="/"><a>|&gt; Sosnowski.dev</a></Link></h1>
            <MonetizationParty />
        </HeaderContainer>
    );
};