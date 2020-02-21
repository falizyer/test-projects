import React, { PropsWithChildren, useContext } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";

import { AuthActions, AuthStoreContext } from "@app/store";

const fields: FieldValues = {
  userName: "userName",
  password: "password"
};

export default function(props: PropsWithChildren<{}>) {
  const authState = useContext(AuthStoreContext);
  const { handleSubmit } = useForm(fields);
  return (
    <section>
      <header>Sign in</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit">sign in</button>
      </form>
    </section>
  );

  function onSubmit() {
    authState.dispatch({
      type: AuthActions.AUTH_SIGN_IN,
      payload: {}
    });
  }
}
