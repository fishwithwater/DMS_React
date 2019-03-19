import React, { Component } from 'react'
import {
    Form, Icon, Input, Button, message
} from 'antd'
import { request } from '../../utils/AxiosRequest'
import { API } from '../../config/api.config'


class ChangeTypeNameForm extends Component {

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
        form.validateFields((err, values) => {
            values['id'] = this.state.data.id
            if (!err) {
                request(API.update_material_type_name, values, "POST", {
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
            <Form onSubmit={this.handleSubmit.bind(this)} className="change-type-name-form" style={{ padding: '0 50px' }}>
                <Form.Item>
                    <Input defaultValue={data.id} disabled={true} prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="id" />
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('name', {
                        initialValue: data.name,
                        rules: [{ required: true, message: '请输入类别名称' }],
                    })(
                        <Input prefix={<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="类别名称" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button block={true} type="primary" htmlType="submit" loading={loading} className="change-type-name-form-button">
                        保存
            </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalChangeTypeNameForm = Form.create({ name: 'normal_change_type_name' })(ChangeTypeNameForm);
export { WrappedNormalChangeTypeNameForm }  