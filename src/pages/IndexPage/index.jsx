import React, { Component } from 'react';
import store from '../../utils/store'

class index extends Component {

    constructor(props){
        super(props)
        const token = store.get('token')
        console.log(token)
        if(!token){
            this.props.history.replace('/login')
        }
    }

    render() {
        return (
            <div>
                indexPage
            </div>
        );
    }
}

export default index;