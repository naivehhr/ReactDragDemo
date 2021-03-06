import React, { Component } from 'react'
import { Menu, Icon, Breadcrumb } from 'antd'
import { Link, hashHistory } from 'react-router'
import {
    Form, Table, Input, Select, Checkbox, Radio, Button, InputNumber, Spin,
    DatePicker, Row, Col, message, Modal
} from 'antd'

import { getErrorNum, endErrorsToAntdErrors } from 'Util'

import { formItemLayout, modalInputStyle } from 'Setting'
import ReactJsonForm from "ReactJsonSchema";

const CheckboxGroup = Checkbox.Group
const FormItem = Form.Item
const createForm = Form.create
const Option = Select.Option
const RadioGroup = Radio.Group


export default class AddDerivedVariable extends Component {
    constructor(props) {
        super(props)
    }
    submit = async () => {
        const usage = 'Derived'
        const { submitForm, close } = this.props
        const { getFieldsError, validateFields, getFieldsValue, setFields, getFieldValue } = this.props.form
        validateFields()
        const values = getFieldsValue()
        const errors = getFieldsError()
        if (getErrorNum(errors)) {
            return null
        }
        const result = await submitForm({ ...values, usage })
        if (result.code === 200) {
            close()
        }
        if (result.code === 1000) {
            let errors = result.errors
            endErrorsToAntdErrors(errors).map(_ => {
                setFields({
                    [_.label]: {
                        errors: _.errors,
                        value: getFieldValue(_.label)
                    }
                })
            })
            return null
        }
    }
    
    onOk = () => {
        close()
    }

    onSubmit = async (e) => {
        const usage = 'Derived'
        const { submitForm, close } = this.props
        const result = await submitForm({ ...e, usage })
        if (result.code === 200) {
            close()
        }
    }
    render() {
        // const { title } = this.props
        // const { getFieldDecorator, getFieldError, isFieldValidating, getFieldsValue } = this.props.form
        // const nameProps = getFieldDecorator('key', {
        //     rules: [
        //         { required: true, message: '请填写名称' },
        //     ],
        // });

        // const typeProps = getFieldDecorator('type', {
        //     rules: [
        //         { required: true, whitespace: true, message: '请填写类型' },
        //     ],
        // })

        // const exprProps = getFieldDecorator('expr', {
        //     rules: [
        //         { required: true, whitespace: true, message: '请填写表达式' },
        //     ],
        // })
        const schema = {
            "type": "object",
            "title": "新建衍生变量",
            "properties": {
                "key": {
                    "type": "string",
                    "title": "变量名"
                },
                "type": {
                    "type": "string",
                    "title": "类型",
                    "enumNames": ["字符型", "数值型", "日期型"],
                    "enum": ["String", "Number", "Date"]
                }
                ,
                "expr": {
                    "type": "string",
                    "title": "表达式"
                }
            },
            "required": [
                "key",
                "type",
                "expr"
            ]
        }

        return (
            <Modal title={'衍生变量'} visible={true} onOk={this.props.close} onCancel={this.props.close} onOk={this.submit} footer={[]}>
                <AntdForm
                    ref="myForm"
                    schema={schema}
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                />
            </Modal>
        )



        // return <Modal title={title || '衍生变量'} visible={true} onOk={this.submit} onCancel={this.props.close}>
        //     <FormItem label='变量名' {...formItemLayout} hasFeedback>
        //         {
        //             nameProps(<Input placeholder="请输入名称" style={modalInputStyle} />)
        //         }
        //     </FormItem>
        //     <FormItem label='类型' {...formItemLayout} hasFeedback>
        //         {
        //             typeProps(<Select style={modalInputStyle}>
        //                 <Option value="String" disabled>字符型</Option>
        //                 <Option value="Number">数值型</Option>
        //                 <Option value="Date" disabled>日期型</Option>
        //             </Select>)
        //         }
        //     </FormItem>
        //     <FormItem label='表达式' {...formItemLayout} hasFeedback>
        //         {
        //             exprProps(<Input placeholder="请输入表达式" style={modalInputStyle} />)
        //         }
        //     </FormItem>
        //     <Row>
        //         <Col offset={6} span={16}>
        //             <p>提示:</p>
        //             <p>1、请使用单引号引用变量名称，如 '营业时长' </p>
        //             <p>2、请使用双引号引用字符串，如 "营业时长1~2年"</p>
        //             <p>3、支持的运算符：加、减、乘、除</p>
        //         </Col>
        //     </Row>
        // </Modal>
    }
}
const AntdForm = Form.create()(ReactJsonForm)

