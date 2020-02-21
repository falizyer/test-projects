import React, { PropsWithChildren, useContext, useEffect } from "react";
import { withRouter, RouteProps } from "react-router-dom";

import { AppTheme, ThemeStoreContext } from "@app/store";

export function ThemeSwitcher(props: PropsWithChildren<RouteProps>) {
  const { theme, setTheme } = useContext(ThemeStoreContext);

  useEffect(() => {
    import(`styles/${theme}.theme.scss`);
  }, [theme]);

  return (
    <div>
      <select defaultValue={theme} onChange={e => setTheme(e.target.value)}>
        <option value={AppTheme.DEFAULT} label={AppTheme.DEFAULT} />
        <option value={AppTheme.DARK} label={AppTheme.DARK} />
      </select>
    </div>
  );
}

export default withRouter(ThemeSwitcher);
