import React, { PropsWithChildren, useContext, useEffect, useMemo } from 'react';
import { AppTheme, ThemeStoreContext } from "../store";
import { withRouter, RouteProps, Redirect } from 'react-router-dom';

export function ThemeSwitcher(props: PropsWithChildren<RouteProps>) {
    const { theme, setTheme } = useContext(ThemeStoreContext);

    useEffect(() => {
        import(`styles/${theme}.theme.scss`);
    }, [ theme ]);

    return (
        <div>
            <select defaultValue={theme} onChange={e => setTheme(e.target.value)}>
                <option value={AppTheme.DEFAULT} label={AppTheme.DEFAULT}/>
                <option value={AppTheme.DARK} label={AppTheme.DARK}/>
            </select>
        </div>
    );
}

export default withRouter(ThemeSwitcher);
