import React, { PropsWithChildren, useReducer } from 'react';
import { Languages } from "./model/NewsApi.model";
import { UserToken } from "./model/Authorization.model";

export interface AppStoreState {
    language: Languages;
    token: UserToken | null;

    // TODO define type
    dispatch?: any;
}

const defaultState = {
    language: Languages.en,
    token: null
};

export enum AppActions {
    APP_SET_LANGUAGE = "APP_SET_LANGUAGE",
    APP_SET_TOKEN = "APP_SET_TOKEN"
}

export interface IAppAction<T = any> {
    type: AppActions;
    payload?: T;
}

function reducer(state: Omit<AppStoreState, "dispatch">, action: IAppAction) {
    switch (action.type) {
        case AppActions.APP_SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            };
        case AppActions.APP_SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
    }
    return state;
}

export const AppStoreContext = React.createContext<AppStoreState>(defaultState);

const AppStore: React.FC = (props: PropsWithChildren<{}>) => {
    const [ state, dispatch ] = useReducer(reducer, defaultState);

    return (
        <AppStoreContext.Provider value={{
            ...state,
            dispatch
        }}>
            {props.children}
        </AppStoreContext.Provider>
    );
};

export default AppStore;
