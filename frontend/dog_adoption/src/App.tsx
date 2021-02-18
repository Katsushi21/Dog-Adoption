import React from 'react';
import styles from "./App.module.css";
import Core from "./features/core/Core";
import Navigation from "./features/core/Navigation";
import DetailData from "./features/dog_data/DetailData";
import {BrowserRouter, Switch, Route} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <div className={styles.app}>
                    <Navigation/>
                    <Route path="/" exact component={Core}/>
                    <Route path="/:id" component={DetailData}/>
                </div>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
