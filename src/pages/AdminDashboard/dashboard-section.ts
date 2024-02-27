import { PropsWithChildren } from "react";

export interface DashboardSection {
    title: string;
    element: (props?: PropsWithChildren<any>) => JSX.Element;
}