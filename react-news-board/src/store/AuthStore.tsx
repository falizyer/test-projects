import React, { PropsWithChildren, useReducer } from "react";
import {
  AuthActions,
  AuthStoreState,
  defaultAuthStoreState,
  IAction,
  AuthStoreContext
} from "../store";

function reducer(
  state: Omit<AuthStoreState, "dispatch">,
  action: IAction<AuthActions>
) {
  switch (action.type) {
    case AuthActions.AUTH_REFRESH:
    case AuthActions.AUTH_SIGN_IN:
      return {
        ...state,
        token: action.payload
      };
    case AuthActions.AUTH_SIGN_OUT:
      return {
        ...state,
        token: void 0
      };
  }
  return state;
}

export default function(props: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(reducer, defaultAuthStoreState);
  return (
    <AuthStoreContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {props.children}
    </AuthStoreContext.Provider>
  );
}
