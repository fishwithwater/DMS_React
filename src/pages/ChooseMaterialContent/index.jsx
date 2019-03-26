import React, { Component } from 'react'
import { Table, Button, Tag, Row, Col, Tooltip, Popconfirm, message, Input, Modal } from 'antd'
import { request } from '../../utils/AxiosRequest'
import { API } from '../../config/api.config'
import { WrappedNormalChangePriceForm as ChangePriceForm } from '../../components/form/ChangePriceForm'


export default class ChooseMaterialContent extends Component {

    constructor(props) {
        super(props)
        const tableParam = {
            page: 1,
            size: 10
        }
        this.loadTable(tableParam)
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
            title: '材料名称'
        }, {
            align: 'center',
            key: 'spec',
            dataIndex: 'spec',
            title: '规格'
        }, {
            align: 'center',
            key: 'unit',
            dataIndex: 'unit',
            title: '单位'
        }, {
            align: 'center',
            key: 'number',
            dataIndex: 'number',
            title: '总消耗数量'
        }, {
            align: 'center',
            key: 'price',
            dataIndex: 'price',
            title: '当前价格'
        }, {
            align: 'center',
            key: 'typename',
            dataIndex: 'type.name',
            title: '类别'
        }, {
            align: 'center',
            key: 'addStatus',
            dataIndex: 'addStatus',
            title: '状态',
            render: (text, record, index) => {
                if (text === 0) {
                    return <Tag color="red">已在模版中</Tag>
                } else {
                    return <Tag color="green">{this.props.type ? '可替换' : '可添加'}</Tag>
                }
            }
        }, {
            align: 'center',
            key: 'action',
            title: '操作',
            width: 200,
            render: (text, record, index) => {
                return <div>
                    {record.addStatus !== 0 ? (
                        <Popconfirm
                            title={"是否以当前价格" + (this.props.type ? '替换' : '添加') + "到模板？"}
                            onConfirm={this.handleConfirm.bind(this, record)}
                            onCancel={this.handleCancel.bind(this, record)}
                            okText="是"
                            cancelText="否">

                            <Tooltip title={this.props.type ? '替换' : '添加'} placement="bottom">
                                <Button
                                    style={btnStyle}
                                    icon={this.props.type ? 'swap' : 'plus'}
                                    type="primary"
                                    shape="circle" />
                            </Tooltip>
                        </Popconfirm>
                    ) : (
                            <Tooltip title={this.props.type ? '替换' : '添加'} placement="bottom">
                                <Button
                                    disabled={true}
                                    style={btnStyle}
                                    icon={this.props.type ? 'swap' : 'plus'}
                                    type="primary"
                                    shape="circle" />
                            </Tooltip>
                        )}
                </div>
            }
        }]
        const loading = true
        const changePriceVisible = false
        this.state = { column, loading, tableParam, changePriceVisible }
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
                        this.setState(tableParam)
                        this.loadTable(tableParam)
                    }
                }
            })
        }
        params['tid'] = this.props.tid
        const url = params.key ? API.get_material_with_template_status_like : API.get_material_with_template_status
        request(url, params, "GET", {
            success(res) {
                res.data.data.map(x => x['key'] = x.id)
                cb(res.data)
            }
        })
    }

    handleConfirm(data) {
        const { tid, cancelModal, type, configId } = this.props
        const { tableParam } = this.state
        const cb = () => this.loadTable(tableParam)
        const url = type ? API.update_template_config : API.add_template_config
        let reqData = {tid: tid, mid: data.id}
        if(type){
            reqData['id'] = configId
        }
        request(url, reqData, "POST", {
            contentType: 'form',
            success(res) {
                message.success((type ? '替换' : '添加') + "成功！")
                cancelModal ? cancelModal() : cb()
            }
        })
    }

    handleCancel(data) {
        const { configId } = this.props
        data['tid'] = this.props.tid
        data['mid'] = data.id
        data['id'] = configId
        this.setState({
            changePriceVisible: true,
            changePriceData: data
        })
    }

    handleSearch(key) {
        const { tableParam } = this.state
        tableParam.key = key === '' ? undefined : key
        this.loadTable(tableParam)
        this.setState({ tableParam })
    }


    cancelModal() {
        const { tableParam } = this.state
        this.loadTable(tableParam)
        this.setState({
            changePriceVisible: false
        })
    }


    render() {
        const { column, loading, dataSource, pagination, changePriceVisible, changePriceData } = this.state
        const { type } = this.props
        return (
            <div>
                <Row>
                    <Col span={6}></Col>
                    <Col span={10}>
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
                    visible={changePriceVisible}
                    title="修改价格添加"
                    onCancel={this.cancelModal.bind(this)}
                    footer={null}
                    zIndex={400}
                    destroyOnClose={true}>
                    <ChangePriceForm data={changePriceData} cancelModal={this.cancelModal.bind(this)} type={type} />
                </Modal>
            </div>
        )
    }
}
