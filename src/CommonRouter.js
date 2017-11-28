import React, { Component } from 'react'
import { browserHistory, hashHistory, Router, Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import Container from './Container'
import CommonComponent from './CommonComponent'
import { sleep } from './Util'
import NotFound from './NotFound'
import { updateRouter } from 'Action/router'
class CommonRouter extends Component {

	state = {
		routers: {},
	}

	componentWillMount() {
		this.fetchData()
	}

	// componentDidMount() {
	// 	console.log('CommonRouter componentDidMount')
	// }



	fetchData = async () => {
		const { dispatch } = this.props
		console.log('获取路由等信息')
		sleep(1000)
		let routerObj = {
			"customerRedirect": {
				"type": "redirect",
				"from": "customer",
				"to": "customer/list"
			},
			"customer": {
				"type": "route",
				"level": "father",
				"breadcrumbName": "客户管理",
				"path": "/customer",
				"component": "CommonComponent",
				"childRoutes": [
					{
						"type": "route",
						"level": "child",
						"breadcrumbName": "创建客户",
						"path": "create",
						"component": "CommonComponent"
					},
					{
						"type": "route",
						"level": "child",
						"breadcrumbName": "更新客户",
						"path": "update",
						"component": "CommonComponent"
					},
					{
						"type": "route",
						"level": "child",
						"breadcrumbName": "客户信息",
						"path": "info",
						"component": "CommonComponent"
					},
					{
						"type": "route",
						"level": "child",
						"breadcrumbName": "客户列表",
						"path": "list",
						"component": "CommonComponent"
					}
				]
			},
			"loanrequestRedirect": {
				"type": "redirect",
				"from": "loanrequest",
				"to": "loanrequest/list"
			},
			"loanrequest": {
				"type": "route",
				"level": "father",
				"breadcrumbName": "用款管理",
				"path": "/loanrequest",
				"component": "CommonComponent",
				"childRoutes": [
					{
						"type": "route",
						"level": "child",
						"breadcrumbName": "创建用款",
						"path": "create",
						"component": "CommonComponent"
					},
					{
						"type": "route",
						"level": "child",
						"breadcrumbName": "更新用款",
						"path": "update",
						"component": "CommonComponent"
					},
					{
						"type": "route",
						"level": "child",
						"breadcrumbName": "用款信息",
						"path": "info",
						"component": "CommonComponent"
					},
					{
						"type": "route",
						"level": "child",
						"breadcrumbName": "用款列表",
						"path": "list",
						"component": "CommonComponent"
					}
				]
			},
			"strategyRedirect": {
				"type": "redirect",
				"from": "strategy",
				"to": "strategy/flow"
			},
			"strategy": {
				"type": "route",
				"level": "father",
				"breadcrumbName": "策略管理",
				"path": "/strategy",
				"component": "CommonComponent",
				"childRoutes": [
					{
						"type": "route",
						"level": "child",
						"breadcrumbName": "策略管理",
						"path": "flow",
						"component": "CommonComponent"
					}
				]
			},
			"fundRedirect": {
				"type": "redirect",
				"from": "fund",
				"to": "fund/list"
			},
			"fund": {
				"type": "route",
				"level": "father",
				"breadcrumbName": "资金管理",
				"path": "/fund",
				"component": "CommonComponent",
				"childRoutes": [
					{
						"type": "route",
						"level": "child",
						"breadcrumbName": "新建资金",
						"path": "create",
						"component": "CommonComponent"
					},
					{
						"type": "route",
						"level": "child",
						"breadcrumbName": "编辑资金",
						"path": "update",
						"component": "CommonComponent"
					},
					{
						"type": "route",
						"level": "child",
						"breadcrumbName": "资金列表",
						"path": "list",
						"component": "CommonComponent"
					},
					{
						"type": "route",
						"level": "child",
						"breadcrumbName": "查看资金",
						"path": "info",
						"component": "CommonComponent"
					},
				]
			},
			"fieldconfigRedirect": {
				"type": "redirect",
				"from": "fund",
				"to": "fieldconfig/customer"
			},
			"fieldconfig": {
				"type": "route",
				"level": "father",
				"breadcrumbName": "设置",
				"path": "/fieldconfig",
				"component": "CommonComponent",
				"childRoutes": [
					{
						"type": "route",
						"level": "child",
						"breadcrumbName": "客户表单管理",
						"path": "customer",
						"component": "CommonComponent"
					},
				]
			}
		}

		let siderObj = {
			"CustomerSider": {
				"path": "customer",
				"list": [
					{
						"title": "客户管理",
						"key": "list",
						"list": 0
					}
				]
			},
			"LoanRequestSider": {
				"path": "loanrequest",
				"list": [
					{
						"title": "用款订单",
						"key": "list",
						"list": 0
					}
				]
			},
			"CusregfieldSider": {
				"path": "fieldconfig",
				"list": [
					{
						"title": "客户表单",
						"key": "customer",
						"list": 0
					}
				]
			},
			"FundSider": {
				"path": "fund",
				"list": [
					{
						"title": "资金管理",
						"key": "list",
						"list": 0
					}
				]
			},
			"StrategySider": {
				"path": "strategy",
				"defaultOpenKeys": ["variable", "subdivision", "component"],
				"list": [
					{
						"title": "流程管理",
						"key": "flow",
						"list": 0
					},
					{
						"title": "变量管理",
						"key": "variable",
						"icon": "team",
						"list": [
							{
								"title": "衍生变量",
								"key": "derived-variable",
								"icon": 0
							},
							{
								"title": "全局变量",
								"key": "global-variable",
								"icon": 0
							}
						]
					},
					{
						"title": "细分管理",
						"key": "subdivision",
						"icon": "team",
						"list": [
							{
								"title": "一维细分",
								"key": "one-dimension-subdivision",
								"icon": 0
							},
							{
								"title": "二维细分",
								"key": "two-dimension-subdivision",
								"icon": 0
							},
							{
								"title": "自定义细分",
								"key": "custom-dimension-subdivision",
								"icon": 0
							}
						]
					},
					{
						"title": "组件管理",
						"key": "component",
						"icon": "bars",
						"list": [
							{
								"title": "评分卡",
								"key": "scorecard",
								"icon": 0
							},
							{
								"title": "授信策略",
								"key": "grantcard",
								"icon": 0
							}
						]
					}
				]
			}
		}

		let headerObj = {
			"defaultSelectedKeys": ["/customer/list"],
			"headers": {
				"/customer/list": "客户管理",
				"/loanrequest/list": "用款管理",
				"/fund/list": "资金管理",
				"/strategy/flow": "策略管理",
				"/fieldconfig/customer": "设置"
			}
		}
		let updateObj = {
			"router": routerObj,
			"sider": siderObj,
			"header": headerObj
		}
		console.log('获取完成')
		dispatch(updateRouter(updateObj))
		this.setState({ routers: routerObj })
	}

	makeRouter = (routers) => {
		let oRoutes = []
		for (let i in routers) {
			let routerInstance = routers[i]
			if (routerInstance.type == 'route') {
				if (routerInstance.level == 'father') {
					let childRoute = this.makeRouter(routerInstance.childRoutes)
					oRoutes.push(
						<Route breadcrumbName={routerInstance.breadcrumbName} path={routerInstance.path}>
							{childRoute}
						</Route>
					)
				} else if (routerInstance.level == 'child') {
					oRoutes.push(
						<Route breadcrumbName={routerInstance.breadcrumbName} path={routerInstance.path} component={CommonComponent} />
					)
				} else {
					console.log('level error', routerInstance);
				}
			} else if (routerInstance.type == 'redirect') {
				oRoutes.push(
					<Redirect from={routerInstance.from} to={routerInstance.to} />
				)
			}
		}
		return oRoutes
	}

	render() {
		const { routers } = this.state
		let oRoutes = this.makeRouter(routers)
		return (
			<div>
				<Router history={browserHistory}>
					<Route path="/" component={Container}>
						<Route breadcrumbName={'1'} path={'/test'} component={CommonComponent} />
						{oRoutes}
						<Route path='*' component={NotFound} />
					</Route>
				</Router>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		routerConfig: state.routerConfig
	}
}
export default connect(mapStateToProps)(CommonRouter)