import { FunctionComponent, PropsWithChildren, ReactElement } from 'react';

export type PropsWithClassNameAndChildren<T={}> = T & {
    className?: string
};

export interface StyledFunctionComponent<T = {}> extends FunctionComponent<T> {
    (props: PropsWithClassNameAndChildren<T>, context?: any): ReactElement<any, any> | null;
}