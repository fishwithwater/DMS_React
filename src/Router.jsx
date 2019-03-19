import React from 'react';
import { Router } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import store from './utils/store'
import { createHashHistory } from "history";
const customHistory = createHashHistory();

class BasicRoute extends React.Component {
    constructor(props) {
        super(props)
        const token = store.get('token')
        this.state = {
            token: token
        }
    }

    render() {
        return (
            <Router history={customHistory}>
                {this.state.token ? <IndexPage history={customHistory} /> : <LoginPage history={customHistory} />}
            </Router >)
    }
}

export default BasicRoute;