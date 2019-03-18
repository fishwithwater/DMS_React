import React, { Component } from 'react'
import { Row, Col,Typography } from 'antd'
import { WrappedNormalLoginForm as LoginForm } from '../../components/common/LoginForm'
const {Title} = Typography

export default class LoginPage extends Component {


    render() {
        return (
            <div style={{backgroundColor:'#1DA57A',height:'100vh'}}>
                <Row style={{paddingTop:'150px'}}>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Title level={1} style={{textAlign:'center',color:'#eeeeee',paddingBottom:'30px'}}>自来水管网材料申报管理</Title>
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <LoginForm history={this.props.history}/>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div>
        )
    }
}
