import React, { PropsWithChildren } from 'react';
import { Route } from 'react-router';
import { Redirect, RouteProps } from 'react-router-dom';
import { UserToken } from "../model/Authorization.model";
import { ROUTES } from "../App.constant";

export interface RestrictedRouteProps {
    route: RouteProps & { component: React.FC, path: string };

    token?: UserToken;
}

const RestrictedRoute: React.FC<RestrictedRouteProps> = (props: PropsWithChildren<RestrictedRouteProps>) => (
    <Route
        path={props.route.path}
        exact={props.route.exact}
        render={() => props.token ? <props.route.component/> : <Redirect to={ROUTES.signIn.path}/>}
    />
);

export default RestrictedRoute;
