import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { Routes } from "./model/App.model";

import { AuthStoreContext } from "./store";

const withAuth = (C: React.FunctionComponent) => {
    return (props: RouteProps) => {
        const auth = useContext(AuthStoreContext);
        return auth.token ? <C/> : <Redirect from={props.location?.pathname} to={ROUTES.signIn.path}/>;
    }
};

export const ROUTES: Routes = {
    notFound: {
        path: '/not-found',
        component: React.lazy(() => import('./common/NotFound'))
    },
    signIn: {
        path: '/sign-in',
        exact: true,
        component: React.lazy(() => import('./component/SignIn'))
    },
    home: {
        path: '/home',
        exact: true,
        component: withAuth(React.lazy(() => import('./component/Home'))),
        useNavigation: true
    },
    news: {
        path: '/news',
        exact: true,
        component: withAuth(React.lazy(() => import('./component/News'))),
        useNavigation: true
    },
    about: {
        path: '/about',
        exact: true,
        component: withAuth(React.lazy(() => import('./component/About'))),
        useNavigation: true
    }
};

export function getRouteNavigation() {
    return Object.values(ROUTES)
        .filter(r => r.useNavigation);
}
