import React, { Component } from 'react'
import { Modal } from 'antd'
import { WrappedNormalChangePasswordForm as ChangePasswordForm } from '../form/ChangePasswordForm'

export default class ChangePasswordModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: props.show
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.show !== this.state.visible){
            this.setState({
                visible: nextProps.show
            })
        }
    }

    handleCancel = () => {
        this.setState({ visible: false });
        this.props.cancelModal()
    }

    render() {
        const { visible } = this.state;
        return (
            <div>
                <Modal
                    visible={visible}
                    title="修改密码"
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <ChangePasswordForm cancelModal={this.handleCancel.bind(this)}/>
                </Modal>
            </div>
        );
    }
}
