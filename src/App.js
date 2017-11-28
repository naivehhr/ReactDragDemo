import 'Style/antd.scss'
import 'Style/base.scss'

import 'babel-polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, hashHistory, Router, Route, Redirect } from 'react-router'

import Login from 'Page/Login'

//strategy start
//流程
import { Flow } from 'Page/strategy/Flow'
import { AddFlow } from 'Page/strategy/AddFlow'

//变量
import { DerivedVariable } from 'Page/strategy/DerivedVariable'
import { GlobalVariable } from 'Page/strategy/GlobalVariable'

//细分
import { OneDimensionSubdivision } from 'Page/strategy/OneDimensionSubdivision'
import { AddOneDimensionSubdivision } from 'Page/strategy/AddOneDimensionSubdivision'
import { UpdateOneDimensionSubdivision } from 'Page/strategy/UpdateOneDimensionSubdivision'
import { TwoDimensionSubdivision } from 'Page/strategy/TwoDimensionSubdivision'
import { AddTwoDimensionSubdivision } from 'Page/strategy/AddTwoDimensionSubdivision'
import { UpdateTwoDimensionSubdivision } from 'Page/strategy/UpdateTwoDimensionSubdivision'
import { CustomDimensionSubdivision } from 'Page/strategy/CustomDimensionSubdivision'

//组件
import { ScoreCard } from 'Page/strategy/ScoreCard'
import { GrantCard } from 'Page/strategy/GrantCard'
import { AddGrantCard } from 'Page/strategy/AddGrantCard'
import { AddScoreCard } from 'Page/strategy/AddScoreCard'
//strategy end


import CustomerFieldConfig from 'Page/setting/CustomerFieldConfig'


import Test from 'Page/Test'

import LoanRequestList from 'Page/loan/LoanRequestList'
import LoanRequestReview from 'Page/loan/LoanRequestReview'
import LoanRequestInfo from 'Page/loan/LoanRequestInfo'

import CustomerCreate from 'Page/customer/CustomerCreate'
import CustomerUpdate from 'Page/customer/CustomerUpdate'
import CustomerInfo from 'Page/customer/CustomerInfo'
import CustomerList from 'Page/customer/CustomerList'


import FundCreate from 'Page/fund/FundCreate'
import FundUpdate from 'Page/fund/FundUpdate'
import FundList from 'Page/fund/FundList'
import FundInfo from 'Page/fund/FundInfo'



import CreditUpdate from 'Page/credit/CreditUpdate'


import NotFound from './NotFound'

export class App extends Component {
  render() {
    return <div className="root-container">

      <Router history={browserHistory}>
        <Redirect from="/" to="/customer/list" />
        <Route path='/login' component={Login} />

        {/* strategy start */}
        <Redirect from="strategy" to="strategy/flow" />
        <Route path='strategy' breadcrumbName="策略管理">
          <Route breadcrumbName="流程管理" path='flow' component={Flow} />
          <Route breadcrumbName="新建流程" path='add-flow' component={AddFlow} />
          <Route breadcrumbName="编辑流程" path='update-flow/:id' component={AddFlow} />

          <Route breadcrumbName="衍生变量" path='derived-variable' component={DerivedVariable} />
          <Route breadcrumbName="全局变量" path='global-variable' component={GlobalVariable} />
          <Route breadcrumbName="变量管理" path='variableManage' />

          <Route breadcrumbName="一维细分" path='one-dimension-subdivision' component={OneDimensionSubdivision} />
          <Route breadcrumbName="新建一维细分" path='add-one-dimension-subdivision' component={AddOneDimensionSubdivision} />
          <Route breadcrumbName="编辑一维细分" path='update-one-dimension-subdivision/:id' component={UpdateOneDimensionSubdivision} />
          <Route breadcrumbName="二维细分" path='two-dimension-subdivision' component={TwoDimensionSubdivision} />
          <Route breadcrumbName="新建二维细分" path='add-two-dimension-subdivision' component={AddTwoDimensionSubdivision} />
          <Route breadcrumbName="编辑二维细分" path='update-two-dimension-subdivision/:id' component={UpdateTwoDimensionSubdivision} />
          <Route breadcrumbName="自定义细分" path='custom-dimension-subdivision' component={CustomDimensionSubdivision} />

          <Route breadcrumbName="授信策略" path='grantcard' component={GrantCard} />
          <Route breadcrumbName="新建授信策略" path='add-grantcard' component={AddGrantCard} />
          <Route breadcrumbName="编辑授信策略" path='update-grantcard/:id' component={AddGrantCard} />
          <Route breadcrumbName="评分卡" path='scorecard' component={ScoreCard} />
          <Route breadcrumbName="新建评分卡" path='add-scorecard' component={AddScoreCard} />
          <Route breadcrumbName="编辑评分卡" path='update-scorecard/:id' component={AddScoreCard} />
        </Route>

        {/* strategy end */}

        <Redirect from="fieldconfig" to="fieldconfig/customer" />
        <Route breadcrumbName="设置" path='fieldconfig'>
          <Route breadcrumbName="客户表单管理" path='customer' component={CustomerFieldConfig} />
        </Route>


        <Route path='/test' component={Test} />

        <Redirect from="loanrequest" to="loanrequest/loanlist" />
        <Route path="loanrequest" breadcrumbName="用款管理">
          <Route breadcrumbName="用款订单" path='loanlist' component={LoanRequestList} />
          <Route breadcrumbName="用款审批" path='review' component={LoanRequestReview} />
          <Route breadcrumbName="查看详情" path='info' component={LoanRequestInfo} />
        </Route>

        <Redirect from="customer" to="customer/list"></Redirect>
        <Route path='customer' breadcrumbName="客户管理">
          <Route breadcrumbName="客户列表" path='list' component={CustomerList} />
          <Route breadcrumbName="查看详情" path='info' component={CustomerInfo} />
          <Route breadcrumbName="新建客户" path='create' component={CustomerCreate} />
          <Route breadcrumbName="编辑信息" path='update' component={CustomerUpdate} />
          <Route breadcrumbName="编辑授信" path='/credit/update' component={CreditUpdate} />
        </Route>

        <Redirect from="fund" to="fund/list"></Redirect>
        <Route path="fund" breadcrumbName="资金管理">
          <Route breadcrumbName="新建资金" path='create' component={FundCreate} />
          <Route breadcrumbName="编辑资金" path='update' component={FundUpdate} />
          <Route breadcrumbName="资金列表" path='list' component={FundList} />
          <Route breadcrumbName="查看资金" path='info' component={FundInfo} />
        </Route>

        {/* <Route breadcrumbName="编辑授信" path='/credit/update' component={CreditUpdate} /> */}

        <Route path='*' component={NotFound} />

      </Router>
    </div>
  }
}
