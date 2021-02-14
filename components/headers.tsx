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
    font-size: ${props => props.size || '2.6rem'};
    color: ${props => props.color || '#000'};
    font-weight: normal;
    font-family: 'Inconsolata', sans-serif;
    letter-spacing: 1px;
    display: inline-block;
    margin: ${props => props.margin || '3rem 0'};
    padding: 0;
    position: relative;

    &::before {
        content: "#";
        color: ${props => props.barColor || '#ffc832'};
        margin-right: 0.5rem;
        font-size: 110%;
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

export const TOCHeader: StyledFunctionComponent = ({ children, className }) => {
    return (
        <PrimaryHeaderContainer bar color="#000" size="1.8rem" margin="1rem 0" className={className}><span>{children}</span></PrimaryHeaderContainer>
    )
}

export const GreenSectionHeader: StyledFunctionComponent = ({ children, className }) => {
    return (
        <PrimaryHeaderContainer bar barColor="#2e2459" color="#fff" size="2.2rem" margin="1rem 0" className={className}><span>{children}</span></PrimaryHeaderContainer>
    )
};

export const FooterSectionHeader: StyledFunctionComponent = ({ children, className }) => {
    return (
        <PrimaryHeaderContainer bar barColor="#a72145" color="#fff" size="2.2rem" margin="1rem 0" className={className}><span>{children}</span></PrimaryHeaderContainer>
    )
};


export const DefaultHeader: FunctionComponent<HeaderProps> = (props) => {
    return (
        <PrimaryHeaderContainer {...props}><span>{props.children}</span></PrimaryHeaderContainer>
    );
}
