import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import './App.scss';
import { RouteComponentProps } from "react-router";
import { ROUTES } from "./App.constant";

import AppStore, { AppStoreState } from './App.store';
import RestrictedRoute from 'common/RestrictedRoute';

function App() {
    return (
        <BrowserRouter>
            <AppStore>
                {(app: AppStoreState) => (
                    <>
                        <aside/>
                        <main className="app-main">
                            <header className="app-main__header">
                                <Route render={(props: RouteComponentProps<any>) => (<></>)}/>
                            </header>
                            <section className="app-main__content">
                                <Switch>
                                    <Route path={ROUTES.signIn.path} component={ROUTES.signIn.component} exact={true}/>

                                    <RestrictedRoute route={ROUTES.home} token={app.token}/>
                                    <RestrictedRoute route={ROUTES.news} token={app.token}/>
                                    <RestrictedRoute route={ROUTES.about} token={app.token}/>
                                </Switch>
                            </section>
                        </main>
                        <div className="app-overlay"/>
                        <Route render={() => app.token
                            ? <Redirect to={ROUTES.home.path}/>
                            : <Redirect to={ROUTES.signIn.path}/>}/>
                    </>
                )}
            </AppStore>
        </BrowserRouter>
    );
}

export default App;
