/*
 * @Author					: vincent.zhang 
 * @Date					: 2017-08-26 18:13:05 
 * @overview				: 
 * @Last Modified time		: 2017-08-26 18:13:05 
 */
import './index.scss'
import React, { Component } from 'react'
import moment from 'moment'
import NomalForm from 'Component/Schema/NomalForm'
import CollapseForm from 'Component/Schema/CollapseForm'

import {
    message, Tabs, Table, Form, Icon, Input, Button, Select, Row, Col, Spin, Modal, Pagination
} from 'antd'

const TabPane = Tabs.TabPane
const FormItem = Form.Item
const Option = Select.Option

const formStyle = {
    form: {
        marginBottom: 15
    },
    button: {
        marginRight: 5
    }
}

class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields()
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSubmit && this.props.onSubmit(values)
            }
        })
    }
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field])
    }
    reset = () => {
        this.props.form.setFieldsValue({
            searchType: undefined,
            searchContent: undefined
        })
        this.props.onSubmit(undefined)
        this.props.form.validateFields()
    }
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('searchType') && getFieldError('searchType')
        const passwordError = isFieldTouched('searchContent') && getFieldError('searchContent')
        const search = this.props.search || {}

        return (
            <Form layout="inline" onSubmit={this.handleSubmit} style={formStyle.form}>
                <FormItem
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('searchType', {
                        rules: [{ required: true, message: '请选择查询类型!' }],
                    })(
                        <Select style={{ width: 120 }} placeholder="请选择">
                            {Object.keys(search).map(key => <Option value={key}>{search[key]}</Option>)}
                        </Select>
                        )}
                </FormItem>
                <FormItem
                    validateStatus=''
                    help=''
                >
                    {getFieldDecorator('searchContent', {
                        rules: [{ required: true, message: '请输入查询内容' }],
                    })(
                        <Input prefix={<Icon type="edit" style={{ fontSize: 13 }} />} placeholder="查询关键字" />
                        )}
                </FormItem>
                <FormItem>
                    <Button style={formStyle.button} type="default" htmlType="submit" disabled={this.hasErrors(getFieldsError())}>筛选</Button>
                    <Button style={formStyle.button} type="default" htmlType="button" onClick={this.reset} >重置</Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm)
import { queryMeta, query, viewTableHeader, setTableHeaderPost } from 'Ajax'

export default class QueryTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            loadingTable: true,
            totalSize: 0,
            pageSize: 10,
            pageNum: 1
        }
        this.fetchMetaData()
    }
    async fetchMetaData() {
        let { code, value } = await queryMeta[this.props.type]()
        if (code == 200) {
            let loading = false
            if (!Object.keys(value.tab).length) value.tab = undefined
            if (!Object.keys(value.search).length) value.search = undefined
            if (!Object.keys(value.filter).length) value.filter = undefined
            this.setState({ loading, queryMeta: value }, () => {
                let _queryParams = this.props.queryParams
                if (_queryParams)
                    this.refs.searchForm.setFieldsValue(_queryParams)
                this.fetchQueryData()
            })
        }
    }
    fetchQueryData() {
        let loadingTable = true,
            refs = this.refs,
            params = {
                "filter": {},
                "search": {},
                "tab": {},
                pageNum: this.state.pageNum,
                pageSize: this.state.pageSize,
            }, activeTab
        this.setState({ loadingTable })

        activeTab = this.state.activeTab || this.refs.tab && this.refs.tab.props.children[0].key || undefined

        if (activeTab) {
            params.tab[activeTab] = 'true'
        }

        refs.searchForm.validateFields(async (err, values) => {
            if (!err) {
                params.search[values.searchType] = values.searchContent
            } else {
                params.search = {}
            }

            let { code, value } = await query[this.props.type](params)
            if (code == 200) {
                loadingTable = false
                let totalSize = value.totalSize
                this.setState({ loadingTable, queryData: value, totalSize })
            }
        })
    }
    pageChange = (pageNum, b) => {
        console.log(pageNum)
        this.setState({ pageNum },this.fetchQueryData)
    }
    async fetchFields() {
        let fieldsLoading = false
        let { code, value } = await viewTableHeader[this.props.type]()
        if (code == 200) {
            console.log(value)
            this.setState({ fieldsLoading, fieldsData: value })
        }
    }
    callback = key => {
        this.setState({
            activeTab: key,
            pageNum:1
        }, function () {
            this.fetchQueryData()
        })
    }
    columns(data) {
        let tableHeaders = data && data.tableHeaders || [], opt

        // console.log(tableHeaders.length)

        if (tableHeaders.length < 9 && this.props.opt && this.props.opt.fixed) {
            opt = Object.assign({}, this.props.opt);
            delete opt.fixed
        } else if (this.props.opt) {
            opt = Object.assign({}, this.props.opt);
        }

        return tableHeaders.map(item => ({
            title: item.title,
            dataIndex: item.name,
            width: 150
        })).concat([opt])
    }
    getdata(data) {
        return data && data.rows || []
    }
    handleSubmit = values => {
        this.fetchQueryData()
    }

    handleModalCancel = () => {
        let customTitleShow = false
        this.setState({
            customTitleShow
        })
    }

    handleFieldsSubmit = async value => {
        let formData = value.formData
        let { code } = await setTableHeaderPost[this.props.type]({
            formData
        })
        if (code == 200) {
            message.success("定制表头成功")
            let fieldsData = this.state.fieldsData
            fieldsData.formData = formData
            this.setState({
                fieldsData
            }, this.fetchQueryData)
        }
    }

    render() {
        const { queryData, queryMeta, pageSize, totalSize } = this.state
        const columns = this.columns(queryData)
        const _data = this.getdata(queryData)
        const { tab, search, filter } = queryMeta || {}
        const { jsonSchema, formData, uiSchema = "{}" } = this.state.fieldsData || {}
        let _uiSchema = JSON.parse(uiSchema)
        let data = _data.map((v) => {
            if (typeof v.is_thrid_id_unity == 'boolean') {
                v.is_thrid_id_unity = v.is_thrid_id_unity ? '是' : '否'
            }
            return v
        })
        return (
            <div className="query-table">
                {/* 定制表头 */}
                <Modal
                    title="选择字段"
                    visible={this.state.customTitleShow}
                    onCancel={this.handleModalCancel}
                    className="query-table-custom-fields"
                    footer=""
                >
                    {
                        this.state.fieldsLoading ? (
                            <div className="loading">
                                <Spin />
                            </div>
                        ) : (
                                <CollapseForm btn={<div style={{ marginTop: 15 }}>
                                    <Button htmlType="submit" type="primary" style={{ marginRight: 5 }}>保存</Button>
                                    <Button onClick={this.handleModalCancel}>退出</Button>
                                </div>} disabled={true} submit={this.handleFieldsSubmit} jsonSchema={jsonSchema} formData={formData} uiSchema={_uiSchema} />
                            )
                    }

                </Modal>
                {this.state.loading ? (<div className="loading">
                    <Spin />
                </div>) : (<div>
                    {
                        tab ? (<Tabs ref="tab" onChange={this.callback} type="card">
                            {Object.keys(tab).map(item => <TabPane tab={tab[item]} key={item}></TabPane>)}
                        </Tabs>) : ('')
                    }
                    <div className="table-query-body">
                        {search ? (
                            <Row>
                                <Col span="20">
                                    <WrappedHorizontalLoginForm ref="searchForm" search={search} onSubmit={this.handleSubmit} />
                                </Col>
                                <Col span="4">
                                    <Icon onClick={() => {
                                        this.setState({ fieldsLoading: true, customTitleShow: true }, this.fetchFields)
                                    }} type="filter" title="定义显示列" style={{ fontSize: 20, color: '#c1c1c1', float: 'right', cursor: 'pointer' }} />
                                </Col>
                            </Row>
                        ) : ('')}
                        <Table pagination={{ pageSize: pageSize, total: totalSize, onChange: this.pageChange }} loading={this.state.loadingTable} columns={columns} dataSource={data} scroll={{ x: columns.length * 150 }} />
                    </div>
                </div>)}
            </div>
        )
    }
}
