import React from 'react';
import { Component } from 'react';
import { Link, hashHistory, browserHistory } from 'react-router'
import { Layout, Menu, Button } from 'antd';
import { connect } from 'react-redux'
import { updateNav } from 'Action/user_nav'
const { Header } = Layout;

import './index.scss';

class HeaderSelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
    }
  }

  componentDidMount() {
    // console.log('path', document.location)
    // let cp = document.location.hash.split('#')
    // let h = document.location.hash
    let pathname = document.location.pathname
    let newNav = ''
    let newSide
    if (pathname.indexOf('fieldconfig') != -1) {
      newNav = '/fieldconfig/customer'
    } else if (pathname.indexOf('loanrequest') != -1) {
      newNav = '/loanrequest/list'
    } else if (pathname.indexOf('fund') != -1) {
      newNav = '/fund/list'
    } else if (pathname.indexOf('strategy') != -1) {
      newNav = '/strategy/flow'
    } else if (pathname.indexOf('customer') != -1) {
      newNav = '/customer/list'
    }
    let arr = pathname.split('/')
    if (pathname.indexOf('?') != -1)
      newSide = arr.slice(arr.length - 2, arr.length - 1)
    else
      newSide = arr.pop()
    newSide = arr.indexOf(newSide[0]) != -1 ? 'list' : newSide // hard code for current sider
    // console.log('menu change newSide', newSide)
    // console.log('Header change newNav', newNav)
    this.props.dispatch(updateNav({ currentRoute: newNav, currentSide: newSide })) //currentSide: newSide 
    console.log('header init complete')
  }

  handleClick = (e) => {
    const { dispatch } = this.props
    let strArr = e.key.split('/')
    let newSide = strArr[strArr.length - 1]
    // console.log('newSide', newSide)
    dispatch(updateNav({ currentRoute: e.key, currentSide: newSide }))
    browserHistory.push(e.key)
  }

  render() {
    const { header } = this.props.routerConfig
    let itemView = Object.keys(header.headers).map(i => {
      return <Menu.Item key={i}>{header.headers[i]}</Menu.Item>
    })
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            onClick={this.handleClick}
            selectedKeys={[this.props.userNav.currentRoute]}
            mode="horizontal"
            defaultSelectedKeys={header.defaultSelectedKeys}
          >
            {itemView}
            {/* <Menu.Item key="/customer/list">客户管理</Menu.Item>
            <Menu.Item key="/loanrequest/list">用款管理</Menu.Item>
            <Menu.Item key="/fund/list">资金管理</Menu.Item>
            <Menu.Item key="/strategy/flow">策略管理</Menu.Item>
            <Menu.Item key="/fieldconfig/customer">设置</Menu.Item> */}
            {/* <Menu.Item key="setting/cusregfield">设置</Menu.Item> */}

            {/* <Menu.Item className={"right"} >退出</Menu.Item>
            <Menu.Item className={"right"} >admin</Menu.Item> */}
          </Menu>
        </Header>
      </Layout>
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
export default connect(mapStateToProps)(HeaderSelf)