import React, { Component } from 'react';
import { Button, Tooltip, Popconfirm, Table, Modal, Row, Col, Input, message, Tag } from 'antd'
import { request } from '../../utils/AxiosRequest'
import { API } from '../../config/api.config'
import { WrappedNormalChangeNumberForm as ChangeNumberForm } from '../../components/form/ChangeNumberForm'
import UploadMissionForm from '../../components/form/UploadMissionForm'

export default class MissionConfigContent extends Component {

    constructor(props) {
        super(props)
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
            key: 'material.name',
            dataIndex: 'material.name',
            title: '材料名称'
        }, {
            align: 'center',
            key: 'material.spec',
            dataIndex: 'material.spec',
            title: '规格'
        }, {
            align: 'center',
            key: 'material.type.name',
            dataIndex: 'material.type.name',
            title: '类别'
        }, {
            align: 'center',
            key: 'price',
            dataIndex: 'price',
            title: '当前价格'
        }, {
            align: 'center',
            key: 'number',
            dataIndex: 'number',
            title: '数量'
        }, {
            align: 'center',
            key: 'material.unit',
            dataIndex: 'material.unit',
            title: '单位'
        }, {
            align: 'center',
            key: 'waitNumber',
            dataIndex: 'waitNumber',
            title: '待确认数量'
        }, {
            align: 'center',
            key: 'status',
            dataIndex: 'status',
            title: '状态',
            render: (text, record, index) => {
                return (
                    <div>
                        <Tag color={text === 2 ? 'green' : 'red'}>{text === 2 ? '正常' : '有待确认数'}</Tag>
                    </div>
                )
            }
        }, {
            align: 'center',
            key: 'action',
            title: '操作',
            width: 200,
            render: (text, record, index) => {
                return <div>
                    <Popconfirm
                        title={"是否将待确认数量并入数量？"}
                        okText="是"
                        cancelText="否"
                        onConfirm={this.handleConfirmConfig.bind(this, record, true)}
                        onCancel={this.handleConfirmConfig.bind(this, record, false)}
                    >
                        <Tooltip title="处理待确认数量" placement="bottom">
                            <Button
                                style={btnStyle}
                                icon="fork"
                                shape="circle" />
                        </Tooltip>
                    </Popconfirm>
                    <Tooltip title="修改数量" placement="bottom">
                        <Button
                            style={btnStyle}
                            icon="edit"
                            onClick={this.handleChangeNumberModal.bind(this, record)}
                            shape="circle" />
                    </Tooltip>
                    <Popconfirm
                        title={"确定删除吗？"}
                        okText="是"
                        cancelText="否"
                        onConfirm={this.handleDeleteConfig.bind(this, record)}
                    >
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
        const tableParam = { page: 1, size: 10 }
        this.state = { column, loading, tableParam }
        this.loadTable(tableParam)
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
                        const tableParam = this.state
                        tableParam.page = page
                        tableParam.size = size
                        this.setState({ tableParam })
                        this.loadTable(tableParam)
                    }
                }
            })
        }
        params['mission_id'] = this.props.missionData.id
        const url = params.key ? API.list_mission_config_like_pagination : API.list_mission_config_pagination
        request(url, params, "GET", {
            success(res) {
                res.data.data.map(x => x['key'] = x.id)
                cb(res.data)
            }
        })
    }

    handleSearch(key) {
        const { tableParam } = this.state
        tableParam.key = key === '' ? undefined : key
        this.loadTable(tableParam)
        this.setState({
            tableParam
        })
    }

    render() {
        const { column, dataSource, loading, pagination, changeNumberVisible, changeNumberData, uploadFileVisible } = this.state
        const { missionData } = this.props
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={2}>
                        <Tooltip title={`需导入 ${missionData.template.name} 模板`} placement="bottom">
                            <Button
                                type="primary"
                                icon="cloud-upload"
                                onClick={this.handleUploadFileModal.bind(this)}
                            >导入模版</Button>
                        </Tooltip>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={2}>
                        <Popconfirm
                            title={"确定数量吗？"}
                            okText="是"
                            cancelText="否"
                            onConfirm={this.handleConfirmAll.bind(this,true)}
                            onCancel={this.handleConfirmAll.bind(this,false)}
                        >
                            <Tooltip title="确认/取消待确认数量" placement="bottom">
                                <Button
                                    icon="fork"
                                    type="primary" >
                                    确认数量
                                    </Button>
                            </Tooltip>
                        </Popconfirm>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={6}>
                        <Input.Search
                            placeholder="搜索材料"
                            onSearch={this.handleSearch.bind(this)}
                            enterButton
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Table
                            bordered={true}
                            columns={column}
                            loading={loading}
                            size="small"
                            dataSource={dataSource}
                            pagination={pagination} />
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <Modal
                    visible={changeNumberVisible}
                    title="修改数量"
                    onCancel={this.handleCancel.bind(this)}
                    footer={null}
                    zIndex={300}
                    destroyOnClose={true}
                >
                    <ChangeNumberForm data={changeNumberData} cancelModal={this.cancelChangeNumberModal.bind(this)} />
                </Modal>
                <Modal
                    visible={uploadFileVisible}
                    title="导入模版"
                    onCancel={this.handleCancel.bind(this)}
                    footer={null}
                    zIndex={300}
                    destroyOnClose={true}
                >
                    <UploadMissionForm data={missionData} refreshTable={this.refreshTable.bind(this)} />
                </Modal>
            </div>
        );
    }

    handleConfirmConfig(data, isConfirm) {
        const cb = () => {
            const { tableParam } = this.state
            this.loadTable(tableParam)
        }

        request(API.confirm_mission_config, { id: data.id, is_confirm: isConfirm }, "POST", {
            contentType: 'form',
            success(res) {
                cb()
                message.success("操作成功")
            }
        })
    }

    handleDeleteConfig(data) {
        const cb = () => {
            const { tableParam } = this.state
            this.loadTable(tableParam)
        }

        request(API.delete_mission_config, { id: data.id }, "POST", {
            contentType: 'form',
            success(res) {
                cb()
                message.success("删除成功")
            }
        })
    }

    handleChangeNumberModal(data) {
        this.setState({
            changeNumberVisible: true,
            changeNumberData: data
        })
    }
    cancelChangeNumberModal() {
        const { tableParam } = this.state
        this.loadTable(tableParam)
        this.setState({
            changeNumberVisible: false
        })
    }

    handleCancel() {
        this.setState({
            changeNumberVisible: false,
            uploadFileVisible: false
        })
    }

    handleUploadFileModal() {
        this.setState({
            uploadFileVisible: true
        })
    }

    refreshTable() {
        const { tableParam } = this.state
        this.loadTable(tableParam)
    }

    handleConfirmAll(isConfirm){
        const cb = () => {
            const { tableParam } = this.state
            this.loadTable(tableParam)
        }
        request(API.confirm_all_mission_config,{id:this.props.missionData.id,is_confirm:isConfirm},'POST',{
            contentType:'form',
            success(res){
                message.success('操作成功')
                cb()
            }
        })
    }
}
