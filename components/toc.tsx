import styled from '@emotion/styled';
import * as styles from './styles';
import React, { FC, ReactElement } from 'react';
import { TOCHeader } from './headers';
import Link from 'next/link';
import { TOCRecord, TOCSimple } from '../lib/posts';

const Container = styled('div')`
    margin: 0;
    padding: 1rem;

    & a {
        color: ${styles.activeTextColor};
        text-decoration: underline;
    }

    ol li {
        display:block;
        padding-bottom: 0.5rem;
    } /* hide original list counter */

    ol ol {
        padding-top: 0.5rem;
    }

    ol > li:first-of-type {
        counter-reset: item;
    } /* reset counter */

    ol > li {
        counter-increment: item;
        position: relative;
    } /* increment counter */

    ol > li:before {
        content:counters(item, ".") ". ";
        position: absolute;
        margin-right: 100%;
        right: 10px;
    } /* print counter */
`;

const renderItems = (items: TOCSimple[]): ReactElement => {
    return (
        <ol>
            {items.map(item => {
                return (<li key={item.href}><a href={`#${item.href}`}>{item.label}</a>
                    {item.children && item.children.length > 0 ? renderItems(item.children) : null}
                </li>);
            })}
        </ol>
    );
};

interface Props {
    items: TOCSimple[];
}

export const TOC: FC<Props> = ({ items }) => {
    return (
        <Container>
            {renderItems(items)}
        </Container>
    );
}