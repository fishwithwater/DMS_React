import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={IndexPage}/>
            <Route exact path="/login" component={LoginPage}/>
        </Switch>
    </HashRouter>
)

export default BasicRoute;