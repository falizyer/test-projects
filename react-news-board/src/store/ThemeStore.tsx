import React, { PropsWithChildren, useState } from "react";
import { defaultThemeStoreState, ThemeStoreContext } from "../store";

export default function (props: PropsWithChildren<{}>) {
    const [ theme, setTheme ] = useState(defaultThemeStoreState.theme);
    return (
        <ThemeStoreContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeStoreContext.Provider>
    );
}
