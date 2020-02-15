import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import './App.scss';
import AppStore from './App.store';
import About from 'smart/About';
import News from "./smart/News";

function App() {
    return (
        <BrowserRouter>
            <AppStore>
                <aside />
                <main className="app-main">
                    <header className="app-main__header">
                        <Switch>

                        </Switch>
                    </header>
                    <section className="app-main__content">
                        <Switch>
                            <Route path="/about" component={About}/>
                            <Route path="/news" component={News}/>
                        </Switch>
                    </section>
                </main>
                <div className="app-overlay" />
                <Route render={() => <Redirect to={'/news'}/>} />
            </AppStore>
        </BrowserRouter>
    );
}

export default App;
