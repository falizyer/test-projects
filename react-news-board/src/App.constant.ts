import { Routes } from "./model/App.model";
import News from "./component/News";
import About from "./component/About";
import SignIn from "./component/SignIn";
import Home from "./component/Home";

export const ROUTES: Routes = {
    home: {
        path: '/home',
        exact: true,
        component: Home
    },
    news: {
        path: '/news',
        exact: true,
        component: News
    },
    about: {
        path: '/about',
        exact: true,
        component: About
    },
    signIn: {
        path: '/sign-in',
        exact: true,
        component: SignIn
    }
};