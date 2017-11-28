import 'Style/antd.scss'
import 'Style/base.scss'

import 'babel-polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { hashHistory, Router, Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

import Login from 'PageUser/Login'
import Register from 'PageUser/Register'

import LoanRequestCreate from 'PageUser/loan/LoanRequestCreate'
import LoanRequestUpdate from 'PageUser/loan/LoanRequestUpdate'
import LoanRequestList from 'PageUser/loan/LoanRequestList'
import LoanRequestInfo from 'PageUser/loan/LoanRequestInfo'
import LoanCreateSelectFund from 'PageUser/loan/LoanCreateSelectFund'
import LoanUpdateSelectFund from 'PageUser/loan/LoanUpdateSelectFund'

import AccountInfo from 'PageUser/account/AccountInfo'
import FundInfo from 'PageUser/fund/FundInfo'
import { updateNav } from 'Action/user_nav'

class App extends Component {

  onEnter(key, params){
    // this.props.dispatch(updateNav({ currentRoute: '/loanrequest/list' }))
    // console.log('跳转', key)
  }
  render() {
    return <div className="root-container">
      
      <Router history={hashHistory}>
        <Redirect from="/" to="/account/info" />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />

        {/* <Route path='/loanrequest/update' component={LoanRequestUpdate} />
        <Route path='/loanrequest/info' component={LoanRequestInfo} /> */}
        
        <Redirect from="account" to="account/info"></Redirect>
        <Route path="account" breadcrumbName="我的账户">
          <Route breadcrumbName="账号详情" path='info' component={AccountInfo} />
        </Route>

        <Redirect from="loanrequest" to="loanrequest/list"></Redirect>
        <Route path="loanrequest" breadcrumbName="用款管理">
          <Route breadcrumbName="订单列表" path='list' component={LoanRequestList} />
          <Route breadcrumbName="用款详情" path='info' component={LoanRequestInfo} />
          <Route breadcrumbName="编辑用款" path='update' component={LoanRequestUpdate} />
          <Route breadcrumbName="新建用款" path='create' component={LoanRequestCreate} 
            onEnter={this.onEnter.bind(this, '/loanrequest/list')} 
          />
          <Route breadcrumbName="选择资金" path='selectfund' component={LoanCreateSelectFund} />
          <Route breadcrumbName="" path='update/selectfund' component={LoanUpdateSelectFund} />
        </Route>
        
        <Redirect from="fund" to="fund/info"></Redirect>
        <Route path="fund" breadcrumbName="资金">
          <Route breadcrumbName="资金列表" path='info' component={FundInfo} />
        </Route>
      </Router>
    </div>
  }
}
export default connect()(App)
