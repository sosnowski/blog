import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { StyledFunctionComponent } from './helpers';

interface HeaderProps {
    size?: string;
    color?: string;
    bar?: boolean;
    barColor?: string;
    margin?: string;
}

const PrimaryHeaderContainer = styled('h1')<HeaderProps>`
    font-size: ${props => props.size || '3rem'};
    color: ${props => props.color || '#000'};
    font-weight: normal;
    font-family: 'Alfa Slab One', sans-serif;
    letter-spacing: 2px;
    display: inline-block;
    margin: ${props => props.margin || '3rem 0'};
    padding: 0;
    position: relative;

    &::after {
        content: " ";
        display: ${props => props.bar ? 'block' : 'none'};
        height: 25px;
        position: absolute;
        bottom: -3px;
        left: 5px;
        background-color: ${props => props.barColor || '#ffc832'};
        z-index: 10;
        width: 100%;
    }

    & > span {
        z-index: 20;
        position: relative;
    }

    & a {
        color: ${props => props.color || '#000'};
        text-decoration: none;
        :hover {
            text-decoration: underline;
        }
    }
`;



export const PrimaryHeader: StyledFunctionComponent<HeaderProps> = (props) => {
    return (
        <PrimaryHeaderContainer bar {...props}><span>{props.children}</span></PrimaryHeaderContainer>
    );
};

export const GreenSectionHeader: StyledFunctionComponent = ({ children, className }) => {
    return (
        <PrimaryHeaderContainer bar barColor="#2e2459" color="#fff" size="2.2rem" margin="1rem 0"><span>{children}</span></PrimaryHeaderContainer>
    )
};

export const DefaultHeader: FunctionComponent<HeaderProps> = (props) => {
    return (
        <PrimaryHeaderContainer {...props}><span>{props.children}</span></PrimaryHeaderContainer>
    );
}
