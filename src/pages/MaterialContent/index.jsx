import React, { Component } from 'react'
import { Table, Button, Tag, Row, Col, Tooltip, Modal, Popconfirm, message } from 'antd'
import { request } from '../../utils/AxiosRequest'
import { API } from '../../config/api.config'
import {WrappedNormalAddMaterialForm as AddMaterialForm} from '../../components/form/AddMaterialForm'
import {WrappedNormalChangeMaterialForm as ChangeMaterialForm} from '../../components/form/ChangeMaterialForm'

export default class MaterialTypeContent extends Component {

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
      },{
        align: 'center',
        key: 'number',
        dataIndex: 'number',
        title: '总消耗数量'
      },{
        align: 'center',
        key: 'price',
        dataIndex: 'price',
        title: '当前价格'
      },{
        align: 'center',
        key: 'typename',
        dataIndex: 'type.name',
        title: '类别'
      },{
      align: 'center',
      key: 'status',
      dataIndex: 'status',
      title: '状态',
      render: (text, record, index) => {
        if (text === 0) {
          return <Tag color="green">启用</Tag>
        } else {
          return <Tag color="red">禁用</Tag>
        }
      }
    }, {
      align: 'center',
      key: 'action',
      title: '操作',
      width: 200,
      render: (text, record, index) => {
        return <div>
          <Tooltip title="编辑" placement="bottom">
            <Button
              style={btnStyle}
              icon="edit"
              shape="circle"
              onClick={this.handleEditTypeName.bind(this, record)} />
          </Tooltip>
          <Popconfirm
            title={"确定" + (record.status === 0 ? "禁用" : "启用") + "吗？"}
            onConfirm={this.handleTypeAble.bind(this, record.id)}
            okText="是"
            cancelText="否">
            <Tooltip title={record.status === 0 ? "禁用" : "启用"} placement="bottom">
              <Button
                style={btnStyle}
                icon={record.status === 0 ? "lock" : "unlock"}
                type={record.status === 0 ? "danger" : "primary"}
                shape="circle" />
            </Tooltip>
          </Popconfirm>
          <Tooltip title="删除" placement="bottom">
            <Button
              style={btnStyle}
              icon="delete"
              type="danger"
              shape="circle"
              onClick={this.handleTypeDelete.bind(this, record.id)} />
          </Tooltip>
        </div>
      }
    }]
    const loading = true
    const editvisible = false
    const addvisible = false
    this.state = { column, loading, editvisible, addvisible, page, size }
  }


  handleEditTypeName(data) {
    this.setState({
      editData: data,
      editvisible: true
    })
  }

  handleTypeAble(id) {
    const cb = () => {
      const { page, size } = this.state
      this.loadTable({ page, size })
    }

    request(API.update_material_status, { id }, "POST", {
      contentType: 'form',
      success: () => {
        message.success("操作成功")
        cb()
      }
    })
  }

  handleTypeDelete(id) {
    message.info('删除暂不支持')
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
    request(API.get_material_list_pagination, params, "GET", {
      success(res) {
        res.data.data.map(x => x['key'] = x.id)
        cb(res.data)
      }
    })
  }

  handleCancel() {
    this.setState({ editvisible: false, addvisible: false });
  }

  cancelEditModal() {
    const { page, size } = this.state
    this.loadTable({ page, size })
    this.setState({
      editvisible: false
    })
  }

  cancelAddModal() {
    const { page, size } = this.state
    this.loadTable({ page, size })
    this.setState({
      addvisible: false
    })
  }

  handleAddModal() {
    this.setState({
      addvisible: true
    })
  }


  render() {
    const { column, loading, dataSource, pagination, editvisible, addvisible } = this.state
    return (
      <div>
        <Row style={{ padding: '0 0 30px 0' }}>
          <Col span={2}></Col>
          <Button type="primary" icon="plus" onClick={this.handleAddModal.bind(this)}>新增材料</Button>
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
          title="修改材料信息"
          onCancel={this.handleCancel.bind(this)}
          footer={null}
          destroyOnClose={true}
        >
          <ChangeMaterialForm data={this.state.editData} cancelModal={this.cancelEditModal.bind(this)}/>
        </Modal>
        <Modal
          visible={addvisible}
          title="新增材料"
          onCancel={this.handleCancel.bind(this)}
          footer={null}
          destroyOnClose={true}
        >
            <AddMaterialForm cancelModal={this.cancelAddModal.bind(this)}/>
        </Modal>
      </div>
    )
  }
}
