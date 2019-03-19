import axios from 'axios';
import qs from 'qs';
import {
    message
} from 'antd';


/**
 * 
 * @param {*} url 
 * @param {*} method 
 * @param {*} data 
 * @param {*} obj 
 * obj.success()
 * obj.fail()
 * obj.contentType
 */
function request(url, data = {}, method = "GET", obj) {
    if (method.toLocaleUpperCase() === "GET") {
        let urlSearch = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                urlSearch.push(key + '=' + data[key])
            }
        }
        url += urlSearch.length === 0 ? '' : ('?' + urlSearch.join('&'))
        axios.get(url)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 1000) {
                        if (obj.success) {
                            obj.success(res.data)
                        }
                    } else {
                        message.error(res.data.msg)
                        if (obj.fail) {
                            obj.fail(res.data)
                        }
                    }
                } else {
                    message.error(res.statusText)
                }
            })
            .catch(err => {
                console.error(err)
                message.error("网络异常或其他错误")
            })
    } else {
        let d;
        if (obj.contentType || obj.contentType === "form") {
            d = new FormData()
            for (let k in data) {
                d.append(k, data[k])
            }
        } else if (obj.contentType || obj.contentType === "xform") {
            d = qs.stringify({
                data
            })
        } else {
            d = data
        }
        axios.post(url, d)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 1000) {
                        if (obj.success) {
                            obj.success(res.data)
                        }
                    } else {
                        message.error(res.data.msg)
                        if (obj.fail) {
                            obj.fail(res.data)
                        }
                    }
                } else {
                    message.error(res.statusText)
                }
            })
            .catch(err => {
                console.error(err)
                message.error("网络异常或其他错误")
            })
    }
}

export {
    request
}