import styled from '@emotion/styled';
import { StyledFunctionComponent } from './helpers';
import { ContentWrapper } from './content-wrapper';
import { FooterSectionHeader } from './headers';

const FooterContainer = styled.footer`
    background-color: #2a3439;
    margin: 0;
    padding: 2rem;
`;

const Content = styled(ContentWrapper)`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
        "header header"
        "avatar text"
        "social social";
    justify-items: start;
    align-items: start;
`;

const Header = styled(FooterSectionHeader)`
    grid-area: header;
    margin-bottom: 2rem;
`;

const Avatar = styled.img`
    grid-area: avatar;
    width: 150px;
    height: 150px;
    border-radius: 75px;
    margin: 1rem;
`;

const Text = styled.p`
    grid-area: text;
    color: #fff;
    align-self: center;
    margin: 0 2rem;
`;

const Links = styled.p`
    grid-area: social;
    justify-self: stretch;
    color: #fff;
    text-align: right;
    margin: 0 2rem;

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
                <Avatar src="assets/face.jpg" />
                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec libero ut metus facilisis euismod sit amet a elit.
                    Maecenas ullamcorper maximus vehicula. Aenean dictum nisl quis commodo consequat.
                    Nam mattis commodo est, ac ultrices est mattis nec. Aenean id turpis nibh.</Text>
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
