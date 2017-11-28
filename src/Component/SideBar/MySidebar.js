import React from 'react';
import { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link, browserHistory, hashHistory, IndexRedirect } from 'react-router';
import { connect } from 'react-redux'
import { updateNav } from 'Action/user_nav'

const { Header, Content, Sider } = Layout;
const { SubMenu, MenuItemGroup } = Menu

class MySidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			routes: props.routes,
			siderModule: null
		}
	}



	componentWillMount() {
		const { location } = this.props
		if (!location) return
		const { pathname } = location
		this.updateSiderModule(pathname)
	}

	componentDidMount() {
		console.log('sider init complete')
	}

	updateSiderModule = (pathname) => {
		const { sider } = this.props.routerConfig
		const {
			CustomerSider,
			LoanRequestSider,
			StrategySider,
			FundSider,
			CusregfieldSider
		} = sider
		let siderModule = CustomerSider
		let currentPath = pathname.match(/\/(\S*?)\//) && pathname.match(/\/(\S*?)\//)[1]
		switch (currentPath) {
			case 'customer':
				siderModule = CustomerSider
				break;
			case 'fund':
				siderModule = FundSider
				break
			case 'loanrequest':
				siderModule = LoanRequestSider
				break
			case 'strategy':
				siderModule = StrategySider
				break
			case 'fieldconfig':
				siderModule = CusregfieldSider
				break
			default:
				console.log('sider dict config error')
		}
		this.setState({ siderModule })
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.location && nextProps.location.pathname != this.props.location.pathname) {
			this.updateSiderModule(nextProps.location.pathname)
		}
	}

	handleClick = e => {
		let path = this.state.siderModule.path + '/'
		let newPatch = '/' + path + e.key
		// console.log(' newPatch==', newPatch)
		this.props.dispatch(updateNav({ currentRoute: newPatch, currentSide: e.key }))
		browserHistory.push(newPatch)
	}

	render() {
		const { userNav } = this.props
		const { siderModule } = this.state
		if (!siderModule) return <div />
		return (
			<Sider width={"15%"} className="aside" >
				<Menu onClick={this.handleClick}
					mode="inline"
					defaultOpenKeys={siderModule.defaultOpenKeys}
					selectedKeys={[userNav.currentSide]}
				>
					{
						siderModule.list.map((item) => {
							if (!item.list) {
								return <Menu.Item key={item.key}>
									<Icon type={item.icon} />{item.title}
								</Menu.Item>
							} else {
								return <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
									{
										item.list.map((ele) => {
											return <Menu.Item key={ele.key}>{ele.title}</Menu.Item>
										})
									}
								</SubMenu>
							}
						})
					}
				</Menu>
			</Sider>
		)
	}
}
const mapStateToProps = state => {
	return {
		user: state.user,
		userNav: state.userNav,
		routerConfig: state.routerConfig
	}
}
export default connect(mapStateToProps)(MySidebar)