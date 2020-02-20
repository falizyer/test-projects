import React, { PropsWithChildren, useState } from "react";
import { ThemeStoreContext } from "../store";

export default function (props: PropsWithChildren<{}>) {
    const [ theme, setTheme ] = useState('');
    return (
        <ThemeStoreContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeStoreContext.Provider>
    );
}
