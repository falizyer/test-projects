import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { Routes } from "./model/App.model";

import News from "./component/News";
import About from "./component/About";
import SignIn from "./component/SignIn";
import Home from "./component/Home";
import NotFound from "./common/NotFound";
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
        component: NotFound
    },
    signIn: {
        path: '/sign-in',
        exact: true,
        component: SignIn
    },
    home: {
        path: '/home',
        exact: true,
        component: withAuth(Home)
    },
    news: {
        path: '/news',
        exact: true,
        component: withAuth(News)
    },
    about: {
        path: '/about',
        exact: true,
        component: withAuth(About)
    }
};