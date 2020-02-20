import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { getRouteNavigation } from "../App.constant";

export default function(props: PropsWithChildren<{}>) {
  const routes = getRouteNavigation();
  return (
    <nav className="rnb-navigation">
      <ul>
        {routes.map(route => (
          <li key={route.path}>
            <Link to={route.path}>{route.path}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
