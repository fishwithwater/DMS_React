import React, { Component } from 'react'
import {
    Form, Icon, Input, Button, message
} from 'antd'
import { request } from '../../utils/AxiosRequest'
import { API } from '../../config/api.config'
import store from '../../utils/store'


class ChangePasswordForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            loading:false
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const {form,cancelModal} = this.props
        form.validateFields((err, values) => {
            if (!err) {
                const {new_password,confirm_password} = values
                if(new_password !== confirm_password){
                    message.error('两次密码不一致')
                }else{
                    delete values['confirm']
                    values.token = store.get('token')
                    request(API.change_password,values,"POST",{
                        contentType:'form',
                        success(res){
                            message.success("修改成功")
                            cancelModal()
                        }
                    })
                }
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {loading} = this.state
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="change-password-form" style={{padding:'0 50px'}}>
                <Form.Item>
                    {getFieldDecorator('old_password', {
                        rules: [{ required: true, message: '请输入原密码！' }],
                    })(
                        <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="原密码" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('new_password', {
                        rules: [{ required: true, message: '请输入新密码！' }],
                    })(
                        <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="新密码" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('confirm_password', {
                        rules: [{ required: true, message: '请输入确认密码！' }],
                    })(
                        <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button block={true} type="primary" htmlType="submit" loading={loading} className="change-password-form-button">
                        保存
            </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalChangePasswordForm = Form.create({ name: 'normal_change_password' })(ChangePasswordForm);
export { WrappedNormalChangePasswordForm }  