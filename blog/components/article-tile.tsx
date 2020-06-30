import styled from '@emotion/styled';
import { StyledFunctionComponent } from "./helpers";
import Link from 'next/link';
import { DateTime } from 'luxon';
import { DefaultHeader } from './headers';
import { PostMetadata } from '../lib/posts';

interface StyleProps {
    main?: boolean;
}

const Container = styled('article')<StyleProps>`
    margin: 3rem 0;
`;

const Abstract = styled('p')<StyleProps>`
    font-size: ${props => props.main ? '1.3rem' : '1.rem'};
    color: ${props => props.main ? '#000' : '#fff'};
    & a {
        text-decoration: none;
        color: ${props => props.main ? '#000' : '#fff'};
        :hover {
            text-decoration: underline;
        }
    }
`;

const Tag = styled.span`
    display: inline-block;
    padding: 0.3rem;
    text-transform: lowercase;
    margin-right: 0.4rem;

    & > strong {
        margin-right: 3px;
    }
`;

const Tags = styled('section')<StyleProps>`
    display: block;
    text-align: left;
    color: ${props => props.main ? '#0b7261' : '#2e2459'};
    font-weight: bold;
    font-size: 0.9rem;
`;

const DateInfo = styled('span')<StyleProps>`
    display: block;
    font-size: 0.9rem;
    padding: 0.3rem;
    color: ${props => props.main ? '#000' : '#fff'};
`;

interface Props {
    main?: boolean;
    post: PostMetadata;
}

export const ArticleTile: StyledFunctionComponent<Props> = ({ post, className, main = false, children }) => {
    const created = DateTime.fromISO(post.created);
    return (
        <Container className={className}>
            <DefaultHeader bar={main || false} size={main ? '2.2rem' : '1.8rem'} color={main ? '#000' : '#fff'} margin="1rem 0">
                <Link href="/post/[id]" as={`/post/${post.id}`}><a>{post.title}</a></Link>
            </DefaultHeader>
            <Abstract main={main}><Link href="/post/[id]" as={`/post/${post.id}`}><a>{post.abstract}</a></Link></Abstract>
            <Tags main={main}>
                {
                    post.tags.map(tag => {
                        return (<Tag key={tag}><strong>#</strong>{tag}</Tag>)
                    })
                }
            </Tags>
            <DateInfo main={main}>{created.toLocaleString(DateTime.DATE_FULL)}</DateInfo>
        </Container>
    );
};
