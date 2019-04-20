import React, { Component } from 'react'
import { Row, Col, Table, Button, Tooltip, Popconfirm, Modal, message } from 'antd'
import { request } from '../../utils/AxiosRequest'
import { API } from '../../config/api.config'
import { WrappedNormalAddMissionForm as AddMissionForm } from '../../components/form/AddMissionForm'
import { WrappedNormalChangeMissionForm as ChangeMissionForm } from '../../components/form/ChangeMissionForm'
import MissionConfigContent from '../MissionConfigContent/'

export default class MissionContent extends Component {

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
            key: 'no',
            dataIndex: 'no',
            title: '任务编号'
        }, {
            align: 'center',
            key: 'name',
            dataIndex: 'name',
            title: '任务名称'
        }, {
            align: 'center',
            key: 'template.name',
            dataIndex: 'template.name',
            title: '使用模版'
        }, {
            align: 'center',
            key: 'createTime',
            dataIndex: 'createTime',
            title: '创建时间'
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
                            onClick={this.handleDownloadMission.bind(this, record)}
                        />
                    </Tooltip>
                    <Tooltip title="编辑任务材料" placement="bottom">
                        <Button
                            style={btnStyle}
                            icon="profile"
                            shape="circle"
                            onClick={this.handleEditMissionMaterial.bind(this, record)}
                        />
                    </Tooltip>
                    <Tooltip title="编辑任务" placement="bottom">
                        <Button
                            style={btnStyle}
                            icon="edit"
                            shape="circle"
                            onClick={this.handleEditMissionName.bind(this, record)}
                        />
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
        const addvisible = false
        const editMissionVisible = false
        this.state = { column, loading, addvisible, editMissionVisible, page, size }
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
                    showTotal: (total, range) => `当前为第 ${range[0]} 到 ${range[1]} 条数据，总共 ${total} 条数据`,
                    onChange: (page, size) => {
                        this.setState({ page, size })
                        this.loadTable({ page, size })
                    }
                }
            })
        }
        request(API.list_mission_pagination, params, "GET", {
            success(res) {
                res.data.data.map(x => x['key'] = x.id)
                cb(res.data)
            }
        })
    }

    render() {
        const { column, loading, dataSource, pagination, addvisible, editMissionVisible,editMissionMaterialVisible,editMissionData } = this.state
        return (
            <div>
                <Row style={{ padding: '0 0 30px 0' }}>
                    <Col span={2}></Col>
                    <Button
                        type="primary"
                        icon="plus"
                        onClick={this.handleAddModal.bind(this)}
                    >
                        新增任务
                    </Button>
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
                    visible={addvisible}
                    title="新增任务"
                    onCancel={this.handleCancel.bind(this)}
                    footer={null}
                    destroyOnClose={true}
                >
                    <AddMissionForm cancelModal={this.cancelAddModal.bind(this)} />
                </Modal>
                <Modal
                    visible={editMissionVisible}
                    title="修改任务信息"
                    onCancel={this.handleCancel.bind(this)}
                    footer={null}
                    destroyOnClose={true}
                >
                    <ChangeMissionForm data={this.state.editMissionData} cancelModal={this.cancelEditMissionModal.bind(this)} />
                </Modal>
                <Modal
                    visible={editMissionMaterialVisible}
                    title={editMissionData?`任务材料 - ${editMissionData.name} - 创建于 ${editMissionData.createTime}`:"编辑任务材料"}
                    onCancel={this.handleCancel.bind(this)}
                    footer={null}
                    destroyOnClose={true}
                    width="96%"
                    zIndex={200}
                >
                    <MissionConfigContent missionData={editMissionData}/>
                </Modal>
            </div>
        )
    }

    handleAddModal() {
        this.setState({
            addvisible: true
        })
    }

    cancelAddModal() {
        const { page, size } = this.state
        this.loadTable({ page, size })
        this.setState({
            addvisible: false
        })
    }

    handleCancel() {
        const { page, size } = this.state
        this.loadTable({ page, size })
        this.setState({ editMissionMaterialVisible: false, addvisible: false, editMissionVisible: false });
    }

    handleEditMissionName(data) {
        this.setState({
            editMissionData: data,
            editMissionVisible: true
        })
    }
    
    handleEditMissionMaterial(data) {
        this.setState({
            editMissionMaterialVisible: true,
            editMissionData:data
        })
    }


    cancelEditMissionModal() {
        const { page, size } = this.state
        this.loadTable({ page, size })
        this.setState({
            editMissionVisible: false
        })
    }

    handleDelete(id) {
        const { page, size } = this.state
        const cb = () => { this.loadTable({ page, size }) }
        request(API.delete_mission, { id: id }, "POST", {
            contentType: "form",
            success(res) {
                cb()
                message.success("删除成功")
            }
        })
    }

    handleDownloadMission(record){
        request(API.download_mission_excel,{id:record.id},"GET",{
            success(res){
                message.success("正在下载...")
                const w = window.open('about:blank')
                w.location.href = res.data
            }
        })
    }
}
