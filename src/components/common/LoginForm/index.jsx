import React, { Component } from 'react'
import {
    Form, Icon, Input, Button, message
} from 'antd'
import {request} from '../../../utils/AxiosRequest'
import { API } from '../../../config/api.config'

class LoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                request(API.login,values,"post",{
                    success:data=>{
                        message.success("登录成功")
                        console.log(data)
                    },
                    contentType:'form'
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码！' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button shape="round" block={true} type="primary" htmlType="submit" className="login-form-button">
                        登录
            </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);
export { WrappedNormalLoginForm }  