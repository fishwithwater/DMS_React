import React, { Component } from 'react'
import { Row, Col, Typography } from 'antd'
import { WrappedNormalLoginForm as LoginForm } from '../../components/form/LoginForm'
import LinkedAnimate from '../../components/common/motion'
const { Title } = Typography

export default class LoginPage extends Component {

    render() {
        return (
            <LinkedAnimate>
                <div style={{marginTop:'200px'}}>
                    <Row>
                        <Col span={8}></Col>
                        <Col span={8}>
                            <Title level={1} style={{ textAlign: 'center', color: '#eeeeee', paddingBottom: '30px' }}>自来水管网材料申报管理</Title>
                        </Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                        <Col xxl={9} xl={8} lg={7} md={6} sm={4} xs={1}></Col>
                        <Col xxl={6} xl={8} lg={10} md={12} sm={16} xs={22}>
                            <LoginForm history={this.props.history} />
                        </Col>
                        <Col xxl={9} xl={8} lg={7} md={6} sm={4} xs={1}></Col>
                    </Row>
                </div>
            </LinkedAnimate>
        )
    }
}
