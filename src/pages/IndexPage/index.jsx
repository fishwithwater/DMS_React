import React, { Component } from 'react';
import { Layout } from 'antd'
import store from '../../utils/store'
import StaticMenu from '../../components/common/StaticMenu'
import MaterialTypeContent from '../MaterialTypeContent'
import MaterialContent from '../MaterialContent'
import TemplateContent from '../TemplateContent'
import MissionContent from '../MissionContent'
import { Route, Switch } from 'react-router-dom'
import { PAGE, getHeaderKeyByUrl } from '../../config/page.config'

const { Header, Footer, Content } = Layout


class index extends Component {

    constructor(props) {
        super(props)
        const token = store.get('token')
        if (!token) {
            this.props.history.replace(PAGE.INDEX)
            this.state = {
                user: { username: '' },
            }
        } else {
            this.state = {
                token: token,
                user: JSON.parse(store.get('user'))
            }
        }
        this.state.currentKey = getHeaderKeyByUrl(this.props.history.location.pathname)
    }

    handleLogoClick(){
        this.props.history.replace(PAGE.INDEX)
        this.setState({
            currentKey:getHeaderKeyByUrl(this.props.history.location.pathname)
        })
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
                <Header style={{ width: '100%', position: 'fixed', top: '0',zIndex:'100' }}>
                    <div style={logoStyle}>
                        <div onClick={this.handleLogoClick.bind(this)} style={{ color: '#ffffff' }}>自来水管网材料申报管理</div>
                    </div>
                    <StaticMenu history={this.props.history} user={this.state.user} currentKey={this.state.currentKey} />
                </Header>
                <Content style={{ padding: '100px 50px 10px 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280, height: '900px' }}>
                        <Switch>
                            <Route exact path={PAGE.INDEX} component={MaterialTypeContent} />
                            <Route exact path={PAGE.MATERIAL_TYPE} component={MaterialTypeContent} />
                            <Route exact path={PAGE.MATERIAL} component={MaterialContent} />
                            <Route exact path={PAGE.TEMPLATE} component={TemplateContent}/>
                            <Route exact path={PAGE.MISSION} component={MissionContent}/>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2019 Created by Maoyingjie</Footer>
            </div>
        );
    }
}

export default index;