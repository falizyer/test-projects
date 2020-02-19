import React, { useContext } from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { ROUTES } from "./App.constant";
import { AuthStoreContext } from "./store";

import Header from 'common/Header';

import './App.scss';

export default function () {
    const authState = useContext(AuthStoreContext);
    return (
        <>
            <Header>
                <div>Application header content</div>
            </Header>

            <Switch>
                <Route path={ROUTES.signIn.path} component={ROUTES.signIn.component} exact={ROUTES.signIn.exact}/>

                <Route path={ROUTES.home.path} component={ROUTES.home.component} exact={ROUTES.home.exact}/>
                <Route path={ROUTES.news.path} component={ROUTES.news.component} exact={ROUTES.news.exact}/>
                <Route path={ROUTES.about.path} component={ROUTES.about.component} exact={ROUTES.about.exact}/>
            </Switch>

            <Route render={() => (authState.token
                ? <Redirect to={ROUTES.home.path}/>
                : <Redirect to={ROUTES.signIn.path}/>)}/>
        </>
    );
}
