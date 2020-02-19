import React, { useContext } from 'react';
import { PropsWithChildren } from "react";
import { AppStoreContext } from "../store";

export default function (props: PropsWithChildren<{}>) {
    const appState = useContext(AppStoreContext);
    return (
        <header>
            <h1>{appState.title}</h1>
            {props.children}
        </header>
    );
}