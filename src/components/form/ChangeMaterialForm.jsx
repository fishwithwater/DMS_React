import React, { Component } from 'react'
import {
    Form, Icon, Input, Button, message, Select
} from 'antd'
import { request } from '../../utils/AxiosRequest'
import { API } from '../../config/api.config'


class ChangeMaterialForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: props.data,
            materialTypeListFlag: false
        }
    }

    componentWillMount() {
        const cb = (data) => {
            this.setState({
                materialTypeList: data,
                materialTypeListFlag: true
            })
        }
        request(API.get_material_type_list, {}, "GET", {
            success(res) {
                cb(res.data)
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { form, cancelModal } = this.props
        form.validateFields((err, values) => {
            values['id'] = this.state.data.id
            if (!err) {
                values['number'] = parseFloat(values['number'])
                values['price'] = parseFloat(values['price'])
                request(API.update_material, values, "POST", {
                    contentType: "form",
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
        const { loading, data, materialTypeListFlag, materialTypeList } = this.state
        return (
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onSubmit={this.handleSubmit.bind(this)}
                className="change-material-form"
                style={{ padding: '0 50px' }}>
                <Form.Item label="编号">
                    <Input defaultValue={data.id} prefix={<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="编号" disabled={true} />
                </Form.Item>
                <Form.Item label="材料名称">
                    {getFieldDecorator('name', {
                        initialValue:data.name,
                        rules: [{ required: true, message: '请输入材料名称' }],
                    })(
                        <Input  prefix={<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="材料名称" />
                    )}
                </Form.Item>
                <Form.Item label="规格">
                    {getFieldDecorator('spec', {
                        initialValue:data.spec,
                        rules: [{ required: true, message: '请输入规格' }],
                    })(
                        <Input prefix={<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="规格" />
                    )}
                </Form.Item>
                <Form.Item label="单位">
                    {getFieldDecorator('unit', {
                        initialValue:data.unit,
                        rules: [{ required: true, message: '请输入单位' }],
                    })(
                        <Input prefix={<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="单位" />
                    )}
                </Form.Item>
                <Form.Item label="消耗数量">
                    {getFieldDecorator('number', {
                        initialValue:data.number,
                        rules: [{ required: true, message: '请输入消耗数量' }],
                    })(
                        <Input prefix={<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} type="number" placeholder="消耗数量" />
                    )}
                </Form.Item>
                <Form.Item label="当前价格">
                    {getFieldDecorator('price', {
                        initialValue:data.price,
                        rules: [{ required: true, message: '请输入当前价格' }],
                    })(
                        <Input prefix={<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} type="number" placeholder="当前价格" />
                    )}
                </Form.Item>
                {materialTypeListFlag ? <Form.Item label="类别">
                    {getFieldDecorator('tid', {
                        initialValue:data.tid,
                        rules: [{ required: true, message: '请选择类别' }],
                    })(
                        <Select placeholder="选择类别">
                            {materialTypeList.map(x => {
                                return (
                                    <Select.Option
                                        key={x.id}
                                        value={x.id}
                                        disabled={x.status === 1 ? true : false} >
                                        {x.name}{x.status === 1 ? '(已禁用)' : ''}
                                    </Select.Option>
                                )
                            })}
                        </Select>
                    )}
                </Form.Item> : <div></div>}
                <Button block={true} type="primary" htmlType="submit" loading={loading} className="change-material-form-button">
                    保存
            </Button>
            </Form>
        );
    }
}

const WrappedNormalChangeMaterialForm = Form.create({ name: 'normal_change_material' })(ChangeMaterialForm);
export { WrappedNormalChangeMaterialForm }  