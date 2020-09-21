import styled from '@emotion/styled';
import { StyledFunctionComponent } from './helpers';
import { ContentWrapper } from './content-wrapper';
import { FooterSectionHeader } from './headers';

const FooterContainer = styled.footer`
    background-color: #2a3439;
    margin: 0;
    padding: 2rem 0;
`;

const Content = styled(ContentWrapper)`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
        "header header"
        "avatar text"
        "social social";
    grid-gap: 1rem;

    @media (max-width: 750px) {
        grid-template-columns: auto;
        grid-template-rows: auto auto auto auto;
        grid-template-areas:
            "header"
            "avatar"
            "text"
            "social";
    }
    justify-items: start;
    align-items: start;
`;

const Header = styled(FooterSectionHeader)`
    grid-area: header;
    margin-bottom: 2rem;
`;

const Avatar = styled.img`
    grid-area: avatar;
    justify-self: center;
    width: 150px;
    height: 150px;
    border-radius: 75px;
    margin: 1rem;
`;

const Text = styled.p`
    grid-area: text;
    color: #fff;
    align-self: center;
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.7rem;
`;

const Links = styled.p`
    grid-area: social;
    justify-self: stretch;
    color: #fff;
    text-align: right;
    margin: 0;

    & img {
        width: 2rem;
        height: 2rem;
    }

    & > a {
        margin-left: 2rem;
        display: inline-block;
    }
`;

export const Footer: StyledFunctionComponent = ({ className, children }) => {
    return (
        <FooterContainer>
            <Content>
                <Header>Hi! I'm Damian</Header>
                <Avatar src="/assets/face.jpg" />
                <Text><strong>Welcome to my blog!</strong><br />I'm an Engineering Manager at OLX, certified AWS Architect Associate and a technology geek.
                    While  mostly working with JavaScript I try to avoid being locked down in a single-technology box as I believe that most interesting things happen at the junction of different words.
                </Text>
                <Links>
                    <a href="http://github.com/sosnowski" target="_blank"><img src="/assets/github.png" alt="My Github"/></a>
                    <a href="https://twitter.com/sosnowsd" target="_blank"><img src="/assets/twitter.svg" alt="My Twitter"/></a>
                    <a href="https://www.linkedin.com/in/damian-sosnowski-6798aa28/" target="_blank"><img src="/assets/linkedin.png" alt="My LinkedIn"/></a>
                    <a href="https://dev.to/sosnowski" target="_blank"><img src="/assets/dev-badge.svg" alt="My Dev.to"/></a>
                </Links>
            </Content>
        </FooterContainer>
    )
}
