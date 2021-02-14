import styled from '@emotion/styled';
import { maxContentWidth, contentPadding } from './styles';

export const ContentWrapper = styled.section`
    max-width: ${maxContentWidth};
    margin: 0 auto;
    padding: 0 ${contentPadding};
`;