import React, { Component } from 'react';
import { Table, Row, Col, Tooltip, Button, Popconfirm } from 'antd';
import { API } from '../../config/api.config'
import { request } from '../../utils/AxiosRequest'

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
                            shape="circle" />
                    </Tooltip>
                    <Tooltip title="修改价格" placement="bottom">
                        <Button
                            style={btnStyle}
                            icon="edit"
                            shape="circle" />
                    </Tooltip>
                    <Popconfirm
                        title={"确定删除吗？"}
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
        const page = 1
        const size = 10
        this.state = { column, loading, page, size }
        this.loadTable({page,size})
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
                    onChange: (page, size) => {
                        this.setState({ page, size })
                        this.loadTable({ page, size })
                    }
                }
            })
        }
        params.tid = this.props.templateData.id
        request(API.list_template_config_pagination, params, "GET", {
            success(res) {
                res.data.data.map(x => x['key'] = x.id)
                cb(res.data)
            }
        })
    }


    render() {
        const { column, loading, dataSource, pagination } = this.state
        return (
            <div>
                <Row>

                </Row>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Table
                            bordered={true}
                            columns={column}
                            loading={loading}
                            dataSource={dataSource}
                            pagination={pagination}/>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        );
    }
}

export default TemplateConfigContent;