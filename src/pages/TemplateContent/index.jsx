import React, { Component } from 'react'
import { Table, Button, Row, Col, Tooltip, Modal, Popconfirm, message } from 'antd'
import { request } from '../../utils/AxiosRequest'
import { API } from '../../config/api.config'
import { WrappedNormalChangeTemplateNameForm as ChangeTemplateNameForm } from '../../components/form/ChangeTemplateNameForm'
import { WrappedNormalAddTemplateForm as AddTemplateForm } from '../../components/form/AddTemplateForm'
import TemplateConfigContent from '../TemplateConfigContent/'

export default class TemplateContent extends Component {

    constructor(props) {
        super(props)
        const page = 1
        const size = 10
        this.loadTable({ page, size })
        let btnStyle = {
            margin: '0 10px'
        }
        const column = [{
            align: 'center',
            key: 'id',
            dataIndex: 'id',
            title: '编号'
        }, {
            align: 'center',
            key: 'name',
            dataIndex: 'name',
            title: '模板名称'
        }, {
            align: 'center',
            key: 'createTime',
            dataIndex: 'createTime',
            title: '创建时间'
        }, {
            align: 'center',
            key: 'count',
            dataIndex: 'count',
            title: '材料数量'
        }, {
            align: 'center',
            key: 'action',
            title: '操作',
            width: 300,
            render: (text, record, index) => {
                return <div>
                    <Tooltip title="导出xls" placement="bottom">
                        <Button
                            style={btnStyle}
                            icon="cloud-download"
                            shape="circle"
                            onClick={this.handleDownloadTemplate.bind(this, record)} />
                    </Tooltip>
                    <Tooltip title="编辑模板材料" placement="bottom">
                        <Button
                            style={btnStyle}
                            icon="profile"
                            shape="circle"
                            onClick={this.handleEditTemplateMaterial.bind(this, record)} />
                    </Tooltip>
                    <Tooltip title="编辑模板名称" placement="bottom">
                        <Button
                            style={btnStyle}
                            icon="edit"
                            shape="circle"
                            onClick={this.handleEditTemplateName.bind(this, record)} />
                    </Tooltip>
                    <Popconfirm
                        title={"确定删除吗？"}
                        onConfirm={this.handleDelete.bind(this, record.id)}
                        okText="是"
                        cancelText="否">
                        <Tooltip title="删除" placement="bottom">
                            <Button
                                style={btnStyle}
                                icon="delete"
                                type="danger"
                                shape="circle" />
                        </Tooltip>
                    </Popconfirm>
                </div>
            }
        }]
        const loading = true
        const editvisible = false
        const addvisible = false
        const editTemplateVisible = false
        this.state = { column, loading, editvisible, addvisible, editTemplateVisible, page, size }
    }

    loadTable(params) {
        const cb = (res) => {
            this.setState({
                dataSource: res.data,
                loading: false,
                pagination: {
                    current: params.page,
                    pageSize: params.size,
                    total: res.total,
                    showTotal:(total, range) => `当前为第 ${range[0]} 到 ${range[1]} 条数据，总共 ${total} 条数据`,
                    onChange: (page, size) => {
                        this.setState({ page, size })
                        this.loadTable({ page, size })
                    }
                }
            })
        }
        request(API.list_template_pagination, params, "GET", {
            success(res) {
                res.data.data.map(x => x['key'] = x.id)
                cb(res.data)
            }
        })
    }

    render() {
        const { column, loading, dataSource, pagination, editvisible, addvisible, editTemplateVisible, editTemplateMaterialData } = this.state
        return (
            <div>
                <Row style={{ padding: '0 0 30px 0' }}>
                    <Col span={2}></Col>
                    <Button type="primary" icon="plus" onClick={this.handleAddModal.bind(this)}>新增模板</Button>
                </Row>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Table
                            bordered={true}
                            columns={column}
                            loading={loading}
                            dataSource={dataSource}
                            pagination={pagination} />
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <Modal
                    visible={editvisible}
                    title="修改模板名称"
                    onCancel={this.handleCancel.bind(this)}
                    footer={null}
                    destroyOnClose={true}
                >
                    <ChangeTemplateNameForm data={this.state.editTemplateData} cancelModal={this.cancelEditTemplateModal.bind(this)} />
                </Modal>
                <Modal
                    visible={addvisible}
                    title="新增模板"
                    onCancel={this.handleCancel.bind(this)}
                    footer={null}
                    destroyOnClose={true}
                >
                    <AddTemplateForm cancelModal={this.cancelAddModal.bind(this)} />
                </Modal>
                <Modal
                    visible={editTemplateVisible}
                    title={editTemplateMaterialData ? `模板材料 - ${editTemplateMaterialData.name} - 创建于 ${editTemplateMaterialData.createTime}` : "模板材料"}
                    onCancel={this.handleCancel.bind(this)}
                    footer={null}
                    destroyOnClose={true}
                    width="96%"
                    zIndex={200}
                >
                    <TemplateConfigContent templateData={editTemplateMaterialData}/>
                </Modal>
            </div>
        )
    }

    handleDownloadTemplate(record){
        request(API.download_template_excel,{tid:record.id},"GET",{
            success(res){
                message.success("正在下载...")
                const w = window.open('about:blank')
                w.location.href = res.data
            }
        })
    }


    handleDelete(id) {
        const { page, size } = this.state
        const cb = () => { this.loadTable({ page, size }) }
        request(API.delete_template, { id: id }, "POST", {
            contentType: "form",
            success(res) {
                message.success("删除成功")
                cb()
            }
        })
    }

    /**打开模态框 */
    handleAddModal() {
        this.setState({
            addvisible: true
        })
    }

    handleEditTemplateMaterial(data) {
        this.setState({
            editTemplateMaterialData: data,
            editTemplateVisible: true
        })
    }

    handleEditTemplateName(data) {
        this.setState({
            editTemplateData: data,
            editvisible: true
        })
    }

    /**关闭模态框 */

    handleCancel() {
        const { page, size } = this.state
        this.loadTable({ page, size })
        this.setState({ editvisible: false, addvisible: false, editTemplateVisible: false });
    }

    cancelAddModal() {
        const { page, size } = this.state
        this.loadTable({ page, size })
        this.setState({
            addvisible: false
        })
    }

    cancelEditTemplateModal() {
        const { page, size } = this.state
        this.loadTable({ page, size })
        this.setState({
            editvisible: false
        })
    }

    cancelEditTemplateMaterialModal() {
        const { page, size } = this.state
        this.loadTable({ page, size })
        this.setState({
            editTemplateVisible: false
        })
    }
}
