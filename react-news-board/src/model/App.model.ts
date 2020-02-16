import { RouteProps } from "react-router-dom";
import React from "react";

interface AppRoutes {
    news: string;
    about: string;
    signIn: string;
    home: string;
}

export type Routes = {
    readonly [P in keyof AppRoutes]: RouteProps & { component: React.FC, path: string };
}
