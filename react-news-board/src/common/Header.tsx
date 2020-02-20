import React, { useContext } from 'react';
import { PropsWithChildren } from 'react';
import { AppStoreContext } from 'store';
import { useTranslation } from 'react-i18next';

export default function (props: PropsWithChildren<{}>) {
    const { t } = useTranslation();
    const appState = useContext(AppStoreContext);
    return (
        <header className="rnb-app-header">
            <h1 className="rnb-app-header__title">{t(appState.title)}</h1>
            <div className="rnb-app-header__container">
                {props.children}
            </div>
        </header>
    );
}