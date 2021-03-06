import React, { useContext, useEffect } from "react";
import { PropsWithChildren } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AuthActions, AuthStoreContext } from "../store";
import { useSignIn } from "../repository/NewsApi.repository";

export interface SignInTrayForm {
  username: string;
  password: string;
}

export default function(props: PropsWithChildren<{}>) {
  const authStore = useContext(AuthStoreContext);

  const { t } = useTranslation();
  const { register, handleSubmit, errors } = useForm<SignInTrayForm>({
    defaultValues: {}
  });
  const [state, callSignIn] = useSignIn();

  useEffect(() => {
    if (state.token) {
      authStore.dispatch({
        type: AuthActions.AUTH_SIGN_IN,
        payload: state.token
      });
    }
  }, [state.token]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        name="username"
        ref={register({
          pattern: /\w/
        })}
      />
      <ErrorMessage name="username" errors={errors} />

      <input
        type="password"
        name="password"
        ref={register({
          pattern: /\w/
        })}
      />
      <ErrorMessage name="password" errors={errors} />

      <button type="submit">{t("app.buttons.signIn")}</button>
    </form>
  );

  function onSubmit(value: SignInTrayForm) {
    callSignIn(value);
  }
}
