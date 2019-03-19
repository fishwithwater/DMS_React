import React from 'react';
import { HashRouter as Router, Switch} from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import store from './utils/store'
import {createHashHistory} from "history";
const customHistory = createHashHistory();

class BasicRoute extends React.Component {
    constructor(props) {
        super(props)
        const token = store.get('token')
        this.state = {
            token:token
        }
    }

    render() {
        return (
        <Router history={customHistory}>
            <Switch>
                {/* <Route exact path="/" component={IndexPage}/>
            <Route exact path="/login" component={LoginPage}/> */}
                {this.state.token?<IndexPage history={customHistory}/>:<LoginPage history={customHistory}/>}
            </Switch>
        </Router >)
    }
}

export default BasicRoute;