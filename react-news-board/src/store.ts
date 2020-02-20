import React from 'react';
import { Languages } from './model/NewsApi.model';
import { UserToken } from './model/Authorization.model';
import { strict } from "assert";

export interface IAction<T, A = any> {
    type: T;
    payload?: A;
}

export enum AppActions {
    APP_UPDATE_LANGUAGE = "APP_UPDATE_LANGUAGE",
    APP_UPDATE_TITLE = "APP_UPDATE_TITLE"
}

export enum AuthActions {
    AUTH_SIGN_IN = "AUTH_SIGN_IN",
    AUTH_SIGN_OUT = "AUTH_SIGN_OUT",
    AUTH_REFRESH = "AUTH_REFRESH"
}

export interface AppStoreState {
    title: string;
    language: Languages;

    // TODO define type
    dispatch?: any;
}

export interface AuthStoreState {
    token?: UserToken;

    // TODO define type
    dispatch?: any;
}

export interface ThemeStoreState {
    theme: string;

    setTheme?: any;
}

export const defaultAppStoreState = {
    title: 'app.title',
    language: Languages.en
};

export const defaultAuthStoreState = {
    token: void 0
};

export const defaultThemeStoreState = {
    theme: ''
};

export const AppStoreContext = React.createContext<AppStoreState>(defaultAppStoreState);
export const AuthStoreContext = React.createContext<AuthStoreState>(defaultAuthStoreState);
export const ThemeStoreContext = React.createContext<ThemeStoreState>(defaultThemeStoreState);