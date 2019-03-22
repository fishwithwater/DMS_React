import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import ChangePasswordModal from '../../../components/modal/ChangePasswordModal'
import store from '../../../utils/store'
import {PAGE} from '../../../config/page.config'

export default class StaticMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentKey: props.currentKey,
      user: props.user,
      changePasswordModalVisible: false
    }
  }

  cancelModal(){
    this.setState({
      changePasswordModalVisible: false
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentKey !== this.state.currentKey){
      this.setState({
        currentKey:nextProps.currentKey
      })
    }
  }

  handleClick(e) {
    this.setState({
      currentKey:e.key
    })
    switch(e.key){
      case "1":{
        this.props.history.replace(PAGE.INDEX)
        break;
      }
      case "2":{
        this.props.history.replace(PAGE.MATERIAL_TYPE)
        break;
      }
      case "3":{
        this.props.history.replace(PAGE.MATERIAL)
        break;
      }
      case "4":{
        this.props.history.replace(PAGE.TEMPLATE)
        break;
      }
      case "5":{
        this.setState({
          changePasswordModalVisible: true
        })
        break;
      }
      case "6":{
        store.clear('token')
        store.clear('user')
        window.location.reload()
        break;
      }
      default:{
      }
      
    }
  }


  render() {
    return (
      <div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[this.state.currentKey]}
          style={{ lineHeight: '64px', position: 'absolute', right: '50px' }}
          onClick={this.handleClick.bind(this)}
        >
          <Menu.Item key="1"><Icon type="home" />首页</Menu.Item>
          <Menu.SubMenu title={<span className="submenu-title-wrapper"><Icon type="build" />材料管理</span>}>
            <Menu.Item key="2">材料类别</Menu.Item>
            <Menu.Item key="3">材料</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="4"><Icon type="profile" />模版管理</Menu.Item>
          <Menu.SubMenu title={<span className="submenu-title-wrapper"><Icon type="user" />{this.state.user.username ? this.state.user.username : ''}</span>}>
            <Menu.Item key="5">修改密码</Menu.Item>
            <Menu.Item key="6">注销</Menu.Item>
          </Menu.SubMenu>
        </Menu>
        <ChangePasswordModal show={this.state.changePasswordModalVisible} cancelModal={this.cancelModal.bind(this)} />
      </div>
    )
  }
}
