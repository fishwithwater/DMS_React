import React, { Component } from 'react';
import { Layout } from 'antd'
import store from '../../utils/store'
import StaticMenu from '../../components/common/StaticMenu'
import MaterialTypeContent from '../MaterialTypeContent'
import {Route} from 'react-router-dom'

const { Header, Footer, Content } = Layout


class index extends Component {

    constructor(props) {
        super(props)
        this.getHeaderKeyByUrl()
        const token = store.get('token')
        if (!token) {
            this.props.history.replace('#/')
            this.state = {
                user: { username: '' }
            }
        } else {
            this.state = {
                token: token,
                user: JSON.parse(store.get('user'))
            }
        }
    }

    getHeaderKeyByUrl(){
        const {history} = this.props
        
    }

    render() {
        const logoStyle = {
            width: '250px',
            height: '31px',
            lineHeight: '31px',
            margin: '16px 24px 16px 0',
            float: 'left',
            fontSize: '20px'
        }
        return (
            <div style={{ backgroundColor: '#f0f2f5' }}>
                <Header style={{ width: '100%', position: 'fixed', top: '0' }}>
                    <div style={logoStyle}>
                        <a href="#/" style={{ color: '#ffffff' }}>自来水管网材料申报管理</a>
                    </div>
                    <StaticMenu history={this.props.history} user={this.state.user} currentKey={this.state.headerKey} />
                </Header>
                <Content style={{ padding: '100px 50px 10px 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280, height: '2000px' }}>
                        <Route exact path="/material/material-type" component={MaterialTypeContent}/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2019 Created by Maoyingjie</Footer>
            </div>
        );
    }
}

export default index;