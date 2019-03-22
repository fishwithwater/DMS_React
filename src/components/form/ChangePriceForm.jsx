import React, { Component } from 'react'
import {
    Form, Icon, Input, Button, message
} from 'antd'
import { request } from '../../utils/AxiosRequest'
import { API } from '../../config/api.config'


class ChangePriceForm extends Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            loading: false,
            data: props.data
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { form, cancelModal, type } = this.props
        form.validateFields((err, values) => {
            values['tid'] = this.state.data.tid
            if(type){
                values['id'] = this.state.data.id
            }
            values['mid'] = type==="update" ? this.state.data.material.id : this.state.data.mid
            values['price'] = parseFloat(values['price'])
            console.log(values)
            if (!err) {
                const url = type ? API.update_template_config : API.add_template_config
                request(url, values, "POST", {
                    contentType: 'form',
                    success: (res) => {
                        message.success(type ? '修改成功' : '添加成功')
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
            <Form onSubmit={this.handleSubmit.bind(this)} className="change-price-form" style={{ padding: '0 50px' }}>
                <Form.Item>
                    {getFieldDecorator('price', {
                        initialValue: data.price,
                        rules: [{ required: true, message: '请输入当前价格' }],
                    })(
                        <Input prefix={<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} type="number" placeholder="当前价格" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button block={true} type="primary" htmlType="submit" loading={loading} className="change-price-form-button">
                        保存
            </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalChangePriceForm = Form.create({ name: 'normal_change_price' })(ChangePriceForm);
export { WrappedNormalChangePriceForm }  