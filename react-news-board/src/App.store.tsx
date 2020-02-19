import React, { PropsWithChildren, useReducer } from 'react';
import { AppStoreState, AppStoreContext, defaultAppStoreState, IAction, AppActions } from "./store";

function reducer(state: Omit<AppStoreState, "dispatch">, action: IAction<AppActions>) {
    switch (action.type) {
        case AppActions.APP_UPDATE_LANGUAGE:
            return {
                ...state,
                language: action.payload
            };
        case AppActions.APP_UPDATE_TITLE:
            return {
                ...state,
                title: action.payload
            };
    }
    return state;
}

export default function (props: PropsWithChildren<{}>) {
    const [ state, dispatch ] = useReducer(reducer, defaultAppStoreState);

    return (
        <AppStoreContext.Provider value={{
            ...state,
            dispatch
        }}>
            {props.children}
        </AppStoreContext.Provider>
    );
};
