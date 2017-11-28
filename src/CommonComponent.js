import React, { Component } from 'react'
import { hashHistory, browserHistory, Link } from 'react-router'
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import HeaderSelf from 'Component/Header'
import MySidebar from 'Component/SideBar/MySidebar.js'
import BreadcrumbSelf from 'Component/Breadcrumb'
import { connect } from 'react-redux'
import { updateNav } from 'Action/user_nav'
import {warpCommonPage} from 'CommonPage'
class CommonComponent extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {
			location,
			routes
		} = this.props
		let insertContent = warpCommonPage(this.props);
		return (
			<Layout>
				<HeaderSelf />
				<Layout>
					<MySidebar location={location}/>
					<Content className="container">
						<BreadcrumbSelf routes={routes} />
						{ insertContent }
						{ location.pathname }
					</Content>
				</Layout>
			</Layout>
		)
	}
}

export default CommonComponent