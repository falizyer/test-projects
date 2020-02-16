import React from 'react';
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { AppActions, AppStoreContext, AppStoreState } from "../App.store";

const fields: FieldValues = {
    userName: 'userName',
    password: 'password'
};

const SignIn: React.FC = (props) => {
    const { register, handleSubmit } = useForm(fields);
    const onSubmit = (app: AppStoreState) => () => {
        app.dispatch({
            type: AppActions.APP_SIGN_IN,
            payload: {}
        });
    };
    return (
        <>
            <header></header>
            <div>
                <AppStoreContext.Consumer>
                    {(app: AppStoreState) => (
                        <form onSubmit={handleSubmit(onSubmit(app))}>
                            <button type="submit">sign in</button>
                        </form>
                    )}
                </AppStoreContext.Consumer>
            </div>
        </>
    );
};

export default SignIn;
