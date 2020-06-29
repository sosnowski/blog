import { StyledFunctionComponent } from "./helpers";
import { activeTextColor } from './styles';
import styled from "@emotion/styled";
import Link from "next/link";

interface Props {
    steps: {
        label: string;
        url?: string;
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

export const Breadcrumb: StyledFunctionComponent<Props> = ({ steps, className, children }) => {
    return (
        <BreadcrumbContainer>
            {
                steps.map(step => {
                    return step.url ? (<Link key={step.label} href={step.url}><a>{step.label}</a></Link>) : <span key={step.label}>{step.label}</span>
                })
            }
        </BreadcrumbContainer>
    );
}