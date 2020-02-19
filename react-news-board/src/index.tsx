import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import AuthStore from "./store/AuthStore";
import AppStore from "./App.store";

ReactDOM.render((
    <BrowserRouter>
        <AppStore>
            <AuthStore>
                <App/>
            </AuthStore>
        </AppStore>
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
