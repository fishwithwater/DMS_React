import React, { Component } from 'react'
import { Row, Col,Typography } from 'antd'
import { WrappedNormalLoginForm as LoginForm } from '../../components/common/LoginForm'
const {Title} = Typography

export default class LoginPage extends Component {
    render() {
        return (
            <div>
                <Row style={{marginTop:'200px'}}>
                    <Col span={9}></Col>
                    <Col span={6}>
                        <Title style={{textAlign:'center',color:'#888888'}}>自来水管网材料申报管理</Title>
                    </Col>
                    <Col span={9}></Col>
                </Row>
                <Row>
                    <Col span={10}></Col>
                    <Col span={4}>
                        <LoginForm />
                    </Col>
                    <Col span={10}></Col>
                </Row>
            </div>
        )
    }
}
