import React, { useContext, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./common/Header";
import Navigation from "./common/Navigation";
import NotFound from "./common/NotFound";
import ThemeSwitcher from "./common/ThemeSwitcher";
import { AuthStoreContext } from "./store";
import SignInTray from "./component/SignInTray";

import { ROUTES } from "./App.constant";
import "./App.scss";

export default function() {
  const authStore = useContext(AuthStoreContext);

  return (
    <>
      <Header>
        <Navigation />
        {authStore.token ? <div>user icon</div> : <SignInTray />}
        <ThemeSwitcher />
      </Header>

      <Suspense fallback={<div>loading</div>}>
        <Switch>
          <Route
            path={ROUTES.signIn.path}
            component={ROUTES.signIn.component}
            exact={ROUTES.signIn.exact}
          />

          <Route
            path={ROUTES.home.path}
            component={ROUTES.home.component}
            exact={ROUTES.home.exact}
          />
          <Route
            path={ROUTES.news.path}
            component={ROUTES.news.component}
            exact={ROUTES.news.exact}
          />
          <Route
            path={ROUTES.about.path}
            component={ROUTES.about.component}
            exact={ROUTES.about.exact}
          />

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>

      <Route render={() => <Redirect to={ROUTES.home.path} />} />
    </>
  );
}
