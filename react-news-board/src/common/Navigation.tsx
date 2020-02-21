import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { getRouteNavigation } from "../App.constant";

import "./Navigation.scss";

export default function(props: PropsWithChildren<{}>) {
  const routes = getRouteNavigation();
  return (
    <nav className="rnb-navigation">
      <ul className="rnb-navigation__menu-list">
        {routes.map(route => (
          <li key={route.path} className="rnb-navigation__menu-list__item">
            <Link to={route.path}>{route.path}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
