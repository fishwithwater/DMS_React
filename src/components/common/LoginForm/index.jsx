import React, { Component } from 'react'
import {
    Form, Icon, Input, Button, message
} from 'antd'
import { request } from '../../../utils/AxiosRequest'
import { API } from '../../../config/api.config'
import store from '../../../utils/store'


class LoginForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        const r = ()=>{this.props.history.replace('/')}
        
        this.props.form.validateFields((err, values) => {
            if (!err) {
                request(API.login, values,"post", {
                    success(res){
                        message.success("登录成功")
                        store.set('user', JSON.stringify(res.data.user))
                        store.set('token', res.data.token)
                        store.get('token')
                        setTimeout(r, 1000)
                    },
                    contentType: 'form'
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form" style={{ backgroundColor: '#FFFFFF', padding: '80px 100px 30px 100px', borderRadius: '10px', boxShadow: '0px 4px 12px #555555' }}>
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