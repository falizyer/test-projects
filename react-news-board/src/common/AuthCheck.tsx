import React, { PropsWithChildren, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { AuthStoreContext } from "../store";
import { ROUTES } from "../App.constant";

export default function AuthCheck(props: PropsWithChildren<any>) {
    const authState = useContext(AuthStoreContext);
    return (
        <>
            {
                authState.token
                    ? props.children
                    : <Redirect to={ROUTES.signIn.path}/>
            }
        </>
    );
}

export function withAuthCheck(C: any): any {
    return (<AuthCheck><C/></AuthCheck>)
}
