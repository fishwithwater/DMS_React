import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd';
import { API } from '../../config/api.config'

const Dragger = Upload.Dragger;



export default class UploadMissionForm extends Component {

    constructor(props) {
        super(props)
        const cb = (errRow) => {
            this.setState({ errRow })
            this.props.refreshTable()
        }
        const draggerProps = {
            name: 'file',
            multiple: false,
            accept: '.xls',
            action: API.upload_mission_config,
            data: { id: props.data.id },
            beforeUpload(file, fileList) {
                const words = file.name.split(".")
                if (words[words.length - 1] !== 'xls') {
                    message.error('不支持的文件格式')
                    return false
                }
                if (file.size > 50 * 1024 * 1024) {
                    message.error('文件过大')
                    return false
                }
                return true
            },
            onChange(info) {
                const status = info.file.status;
                const res = info.file.response
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    if (res.status === 1000) {
                        message.success(`${info.file.name} 上传成功`);
                        cb(res.data)
                    } else {
                        message.error(res.msg)
                    }

                } else if (status === 'error') {
                    message.error(`${info.file.name} 上传失败`);
                }
            },
        };
        this.state = { draggerProps }
    }


    render() {
        const { draggerProps, errRow } = this.state
        const { data } = this.props
        return (
            <div>
                <Dragger {...draggerProps}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="file-excel" />
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
                    <p className="ant-upload-hint">仅支持 {data.template.name} 模版， .xls格式的Excel文件，一次上传一个</p>
                </Dragger>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p>{errRow ? (`解析结束！有${errRow.length}条异常数据` + (errRow.length === 0 ? '' : `分别在第${errRow.map(x => x + ' ')}行。`)) : ''}</p>
                    <p>{errRow ? (errRow.length !== 0 ? `注：错误原因可能有材料不在模版中，材料名或规格名错误，数量处填写的为字符等。修改完成后仅上传修改的行！` : '') : ''}</p>
                </div>

            </div>
        )
    }

}







