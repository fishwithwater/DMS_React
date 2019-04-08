import React, { Component } from 'react';
import { Table, Row, Col, Tooltip, Button, Popconfirm, Modal, message, Input } from 'antd';
import { API } from '../../config/api.config'
import { request } from '../../utils/AxiosRequest'
import ChooseMaterialContent from '../ChooseMaterialContent';
import { WrappedNormalChangePriceForm as ChangePriceForm } from '../../components/form/ChangePriceForm'

class TemplateConfigContent extends Component {

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
            key: 'material.unit',
            dataIndex: 'material.unit',
            title: '单位'
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
            key: 'action',
            title: '操作',
            width: 200,
            render: (text, record, index) => {
                return <div>
                    <Tooltip title="更换材料" placement="bottom">
                        <Button
                            style={btnStyle}
                            icon="swap"
                            onClick={this.handleReplaceMaterialModal.bind(this, record)}
                            shape="circle" />
                    </Tooltip>
                    <Tooltip title="修改价格" placement="bottom">
                        <Button
                            style={btnStyle}
                            icon="edit"
                            onClick={this.handleChangePriceModal.bind(this, record)}
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
        const addConfigVisible = false
        const changePriceVisible = false
        this.state = { column, loading, tableParam, addConfigVisible, changePriceVisible }
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
                        const {tableParam} = this.state
                        tableParam.page = page
                        tableParam.size = size
                        this.setState({ tableParam })
                        this.loadTable(tableParam)
                    }
                }
            })
        }
        params.tid = this.props.templateData.id
        const url = params.key ? API.list_template_config_pagination_like : API.list_template_config_pagination
        request(url, params, "GET", {
            success(res) {
                res.data.data.map(x => x['key'] = x.id)
                cb(res.data)
            }
        })
    }

    handleDeleteConfig(data) {
        const { tableParam } = this.state
        const cb = () => this.loadTable(tableParam)
        request(API.delete_template_config, { id: data.id }, "POST", {
            contentType: "form",
            success() {
                message.success("删除成功")
                cb()
            }
        })
    }

    handleSearch(key){
        const {tableParam} = this.state
        tableParam.key = key === '' ? undefined : key
        this.loadTable(tableParam)
        this.setState({
            tableParam
        })
    }


    render() {
        const { column, loading, dataSource, pagination, addConfigVisible, addTid, changePriceData, changePriceVisible, replaceMaterialVisible, replaceTid, replaceConfigId } = this.state
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={1}>
                        <Button
                            type="primary"
                            icon="plus"
                            onClick={this.handleAddConfigModal.bind(this)}
                        >添加材料</Button>
                    </Col>
                    <Col span={6}></Col>
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
                    destroyOnClose={true}
                    visible={addConfigVisible}
                    zIndex={300}
                    title="添加材料"
                    width="80%"
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <ChooseMaterialContent tid={addTid} />
                </Modal>
                <Modal
                    destroyOnClose={true}
                    visible={changePriceVisible}
                    zIndex={300}
                    title="修改模版中的材料价格"
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <ChangePriceForm data={changePriceData} cancelModal={this.cancelModal.bind(this)} type="update" />
                </Modal>
                <Modal
                    destroyOnClose={true}
                    visible={replaceMaterialVisible}
                    zIndex={300}
                    title="替换材料"
                    width="80%"
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <ChooseMaterialContent tid={replaceTid} configId={replaceConfigId} type="replace" cancelModal={this.cancelModal.bind(this)} />
                </Modal>
            </div>
        );
    }

    handleAddConfigModal(id) {
        const { templateData } = this.props
        this.setState({
            addConfigVisible: true,
            addTid: templateData.id
        })
    }

    handleReplaceMaterialModal(data) {
        const { templateData } = this.props
        this.setState({
            replaceMaterialVisible: true,
            replaceTid: templateData.id,
            replaceConfigId: data.id
        })
    }

    handleCancel() {
        this.setState({
            addConfigVisible: false,
            changePriceVisible: false,
            replaceMaterialVisible: false
        })
    }

    handleChangePriceModal(data) {
        data['tid'] = this.props.templateData.id
        data['mid'] = data.id
        this.setState({
            changePriceVisible: true,
            changePriceData: data
        })
    }

    cancelModal() {
        const { tableParam } = this.state
        this.loadTable(tableParam)
        this.setState({
            changePriceVisible: false,
            replaceMaterialVisible: false
        })
    }
}

export default TemplateConfigContent;