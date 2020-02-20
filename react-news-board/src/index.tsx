import React from "react";
import ReactDOM from "react-dom";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Languages } from "./model/NewsApi.model";

import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import AuthStore from "./store/AuthStore";
import AppStore from "./App.store";
import ThemeStore from "./store/ThemeStore";
import App from "./App";

import "./index.scss";

import en from "i18n/languages/en.json";

i18n.use(initReactI18next).init({
  fallbackLng: Languages.en,
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en,
  },
});

ReactDOM.render(
  <BrowserRouter>
    <AppStore>
      <AuthStore>
        <ThemeStore>
          <App />
        </ThemeStore>
      </AuthStore>
    </AppStore>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
