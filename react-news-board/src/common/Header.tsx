import React, { useContext } from 'react';
import { PropsWithChildren } from "react";
import { AppStoreContext } from "../store";
import { useTranslation } from "react-i18next";

export default function (props: PropsWithChildren<{}>) {
    const { t } = useTranslation();
    const appState = useContext(AppStoreContext);
    return (
        <header>
            <h1>{t(appState.title)}</h1>
            {props.children}
        </header>
    );
}