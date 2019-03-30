import React, { Component } from 'react'
import {
    Form, Icon, Input, Button, message, Select
} from 'antd'
import { request } from '../../utils/AxiosRequest'
import { API } from '../../config/api.config'


class AddMissionForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            templateListFlag: false
        }
    }

    componentWillMount() {
        const cb = (data) => {
            this.setState({
                templateList: data,
                templateListFlag: true
            })
        }
        request(API.list_template, {}, "GET", {
            success(res) {
                cb(res.data)
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { form, cancelModal } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                request(API.add_mission, values, "POST", {
                    contentType: 'form',
                    success: (res) => {
                        message.success('新增成功')
                        cancelModal()
                    }
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading, templateListFlag, templateList } = this.state
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="add-mission-name-form" style={{ padding: '0 50px' }}>
                <Form.Item>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入任务名称' }],
                    })(
                        <Input prefix={<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="任务名称" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('no', {
                        rules: [{ required: true, message: '请输入任务编号' }],
                    })(
                        <Input prefix={<Icon type="info-circle" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="任务编号" />
                    )}
                </Form.Item>
                {templateListFlag ? <Form.Item>
                    {getFieldDecorator('templateId', {
                        rules: [{ required: true, message: '请选择模版' }],
                    })(
                        <Select placeholder="选择模板">
                            {templateList.map(x => {
                                return (
                                    <Select.Option
                                        key={x.id}
                                        value={x.id}
                                    >
                                        {x.name}
                                    </Select.Option>
                                )
                            })}
                        </Select>
                    )}
                </Form.Item> : <div></div>}
                <Form.Item>
                    <Button block={true} type="primary" htmlType="submit" loading={loading} className="add-mission-form-button">
                        保存
            </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalAddMissionForm = Form.create({ name: 'normal_add_mission' })(AddMissionForm);
export { WrappedNormalAddMissionForm }  