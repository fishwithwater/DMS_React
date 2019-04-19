import React, { Component } from 'react'
import {
    Form, Icon, Input, Button, message
} from 'antd'
import { request } from '../../utils/AxiosRequest'
import { API } from '../../config/api.config'


class ChangeNumberForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: props.data
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { form, cancelModal } = this.props
        const {data} = this.state
        form.validateFields((err, values) => {
            values['id'] = data.id
            values['waitNumber'] = data.waitNumber
            values['status'] = data.status
            if (!err) {
                request(API.update_mission_config, values, "POST", {
                    contentType: 'form',
                    success: (res) => {
                        message.success('修改成功')
                        cancelModal()
                    }
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading, data } = this.state
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="change-number-form" style={{ padding: '0 50px' }}>
                <Form.Item>
                    <Input defaultValue={data.id} disabled={true} prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="id" />
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('number', {
                        initialValue: data.number,
                        rules: [{ required: true, message: '请输入数量' }],
                    })(
                        <Input prefix={<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="数量" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button block={true} type="primary" htmlType="submit" loading={loading} className="change-number-form-button">
                        保存
            </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalChangeNumberForm = Form.create({ name: 'normal_change_number' })(ChangeNumberForm);
export { WrappedNormalChangeNumberForm }  