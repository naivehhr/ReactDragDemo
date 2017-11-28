import { Modal } from 'antd'
import _ from 'lodash'

import { retrieveSchema, getDefaultFormState } from './ReactJsonSchema/utils'
const confirm = Modal.confirm

export const remapPropsToFields = data => Object
    .keys(data)
    .map(_ => ({ [_]: { value: data[_] } }))
    .reduce((prev, next) => ({ ...prev, ...next }), {})

export const getErrorNum = data => Object
    .keys(data)
    .map(_ => data[_] || [])
    .map(_ => _.length)
    .reduce((a, b) => a + b, 0)

export const transfrom = map => key => map[key] || key

export const promiseConfirm = ({ title, content, }) => new Promise((reso, reje) => {
    confirm({
        title: title,
        content: content,
        onOk() { reso(true) },
        onCancel() { reso(false) },
    })
})

export const endErrorsToAntdErrors = err => Object
    .keys(err)
    .map(_ => ({ label: _.split('.').reduce((a, b) => a + `[${b}]`), errors: [err[_]] }))

export const makeTreeDataBase = (schema) => {
    let treeData = {}
    let _schema = _.cloneDeep(schema)
    let properties = schema.properties
    const makeData = (treeObject = {}, children = {}) => {
        let rootNodeKeys = Object.keys(treeObject)
        let result = {}
        for (let itemKey in treeObject) {
            if (itemKey == 'setting') continue
            let item = treeObject[itemKey]
            result[itemKey] = {
                title: item.title,
                type: item.type,
            }
            if (item.type == 'object' || item.type == 'array') {
                result[itemKey].children = makeData(item.properties)
            } else {
                // console.log('找到最后简单类型叶子节点')
            }
        }
        return result
    }
    return makeData(properties)
}

export const processRely = (state, originalState = {}) => {
    // console.log('originalState', originalState)
    const { schema, formData } = state
    let _schema = _.cloneDeep(schema)
    Object.keys(_schema.relation).forEach((key) => {
        let idStr = makeIdStrById(key.split("."))
        let sourceObj = _.get(_schema, idStr)//源对像
        // console.log('sourceObj', sourceObj)
        let { rely, invalidHidden } = _schema.relation[key]
        let keys = Object.keys(rely) || [] //被关联的所有key
        let result = true;
        for (let i = 0, len = keys.length; i < len && result; i++) {
            let key = keys[i],//被关联的key
                targetValue = _.get(formData, key),//被关联的值
                valueArr = rely[key] || []//关联条件值列表
                // console.log(valueArr, targetValue, valueArr.indexOf(targetValue))
            if (valueArr.indexOf(targetValue) > -1) {
                //有效
            } else {
                //无效
                result = false
            }
        }
        // console.log(`key=${key}`, `result=${result}`, `invalidHidden==${invalidHidden}`)
        // 获取required信息
        let idReqArr = idStr.split(".")
        let currentId = idReqArr[idReqArr.length - 1]
        let idReqStr = idReqArr.slice(0, idReqArr.length-2).join('.') + '.required'
        let reqOrigArr = _.get(originalState, idReqStr)
        let reqCurrArr = _.get(_schema, idReqStr)
        // console.log('currentId', currentId)
        // console.log('reqCurrArr', reqCurrArr)
        if (result) {
            //有效
            sourceObj.hidden = false
            // 有效require就回复原始状态
            // console.log('reqOrigArr', reqOrigArr)
            // console.log('reqCurrArr', reqCurrArr)
            if((reqOrigArr.indexOf(currentId) != -1) && (reqCurrArr.indexOf(currentId) == -1)) {
                reqCurrArr.push(currentId)
            }
        } else {
            //无效
            sourceObj.hidden = invalidHidden 
            // 无效时要判断 invalidHidden 如果是true 去掉require 如果false 还原初始状态
            if(invalidHidden) {
                // 隐藏必删除req
                _.remove(reqCurrArr, (i) => i == currentId)
            } else {
                // 如果原req中包含currentId则添加
                if((reqOrigArr.indexOf(currentId) != -1) && (reqCurrArr.indexOf(currentId) == -1)) {
                    reqCurrArr.push(currentId)
                }
            }
            // console.log('reqCurrArr', reqCurrArr)
            /**
             * TODO
             * 查看本组字段是否都已隐藏
             */
        }
    })
    // console.log('_schema', _schema)
    return _schema
}

/**
 * @param {id arr} idArr 
 * @return idStr
 */
const makeIdStrById = (idArr) => {
    return `properties.${idArr.join(".properties.")}`
}



export const sleep = (milliSeconds) => {
	let startTime = new Date().getTime(); // get the current time    
	while (new Date().getTime() < startTime + milliSeconds);
}