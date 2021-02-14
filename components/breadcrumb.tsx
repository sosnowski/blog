import { StyledFunctionComponent } from "./helpers";
import { activeTextColor } from './styles';
import styled from "@emotion/styled";
import Link from "next/link";

interface Props {
    steps: {
        label: string;
        href?: string;
        as?: string;
    }[]
}

const BreadcrumbContainer = styled.section`
    margin: 1rem 0;
    font-size: 1.3rem;

    & > * {
        margin-right: 0.5rem;

        ::after {
            content: ">";
            display: inline-block;
            margin-left: 0.5rem;
            color: ${activeTextColor};
            font-weight: bold;
        }

        :last-child {
            ::after {
                display: none;
            }
        }
    }

    & a {
        color: ${activeTextColor};
        text-decoration: underline;
    }
`;

export const Breadcrumb: StyledFunctionComponent<Props> = ({ steps }: Props) => {
    return (
        <BreadcrumbContainer>
            {
                steps.map(step => {
                    return step.href ? (<Link key={step.label} href={step.href} as={step.as}><a>{step.label}</a></Link>) : <span key={step.label}>{step.label}</span>
                })
            }
        </BreadcrumbContainer>
    );
}