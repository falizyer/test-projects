import React from "react";
import { Routes } from "./model/App.model";

export const ROUTES: Routes = {
  notFound: {
    path: "/not-found",
    component: React.lazy(() => import("./common/NotFound"))
  },
  signIn: {
    path: "/sign-in",
    exact: true,
    component: React.lazy(() => import("./component/SignIn"))
  },
  home: {
    path: "/home",
    exact: true,
    component: React.lazy(() => import("./component/Home")),
    useNavigation: true
  },
  news: {
    path: "/news",
    exact: true,
    component: React.lazy(() => import("./component/News")),
    useNavigation: true
  },
  about: {
    path: "/about",
    exact: true,
    component: React.lazy(() => import("./component/About")),
    useNavigation: true
  }
};

export function getRouteNavigation() {
  return Object.values(ROUTES).filter(r => r.useNavigation);
}
