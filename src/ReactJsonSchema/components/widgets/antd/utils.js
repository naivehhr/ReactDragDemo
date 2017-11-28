import _ from 'lodash';
import {
	message
} from 'antd'
/**
 * 
 * @param {*} errors 
 */
export const getErrorMsg = (errors) => {
	return id => {
		if(!errors) return 
		if(!id) return errors
		let newMap = errors.reduce((pre, cur) => {
			return {...pre, ...cur}
		}, {})
		let key = id.split('.').pop()
		return newMap[key]
	}
}

/**
 * 通过schema得到检验条件
 * @param {*} data 
 * @param {*} schema 
 */
export const valArrLength = (data, schema) => {
	if(!data){
		console.error('校验Arr数据错误')
		return false
	}
	let l = data.length
	const { minLength, maxLength } = schema
	if(minLength && maxLength){
		return _.inRange(data.length, minLength, maxLength+1);
	}else if(minLength) {
		return l >= minLength
	} else {
		return l <= maxLength
	}
}