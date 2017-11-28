/*
 * @Author: jiankang.zhang
 */
import React from 'react';
import { post, get } from 'Ajax/method';
import { Link } from 'react-router';
import {
	message, Tabs, Table, Form, Icon, Input, Button, Select, Row, Col, Spin, Tooltip
} from 'antd';
import 'Page/customer/style.scss';
import UpdateComponent from 'Component/UpdateComponent';
import CreateComponent from 'Component/CreateComponent';
import QueryTable from 'Component/QueryTable';

function _warpDataSource(source) {
  if (source.method == "post") {
    return post(source.url);
  }
  return get(source.url)
}

function _warpCreateComponent(schema, props) {
  let uiSchemeFetcher = _warpDataSource(schema.uiSchemeSource);
  let submitFetcher = _warpDataSource(schema.dataSource.pushSource);
  let finUrl = schema.dataSource.callbackSource.url;
  return <CreateComponent
           {...props}
           fetchDataFun={uiSchemeFetcher}
           submitFun={submitFetcher}
           pushOnSubmit={finUrl}
         />
}

function _warpUpdateComponent(schema, props) {
  let { params } = props.location.state;
  //请求数据参数
  let uiSchemeFetcher = _warpDataSource(schema.uiSchemeSource);
  let fetchParams = null;
  if (schema.uiSchemeSource.fetchParams != null) {
    fetchParams = params[schema.uiSchemeSource.fetchParams];
  }

  //提交数据参数
  let submitFetcher = _warpDataSource(schema.dataSource.pushSource);
  let subParams = null;
  if (schema.dataSource.pushSource.fetchParams != null) {
    subParams = {};
    schema.dataSource.pushSource.fetchParams.map((key, index) => {
      subParams[key] = params[key];
    });
  }

  //更新之后的回跳
  let finUrl = schema.dataSource.callbackSource.url;
  return <UpdateComponent
            {...props}
            fetchDataFun={uiSchemeFetcher}
            fetchDataParams={fetchParams}
            submitFun={submitFetcher}
            pushParams={subParams}
            pushOnSubmit={finUrl}
          />;
}

function _warpItemTitleComponent(schema, props) {
  return <Row className='item-title'>
          <Col span="24">
            <h1 className="title">{ schema.ui.title }</h1>
            <div className="btn-box">
              <Link to={ schema.ui.leftbtnlink }>
                <Button icon="plus" type="primary">{ schema.ui.leftbtnlabel }</Button>
              </Link>
            </div>
          </Col>
        </Row>;
}

function _warpQueryTableComponent(schema, props) {
  let opt = null;
  let { router } = props;
  if (schema.action_opt != null) {
    opt = {};
    opt.title = schema.action_opt.title;
    opt.fixed = schema.action_opt.fixed;
    opt.width = schema.action_opt.width;
    opt.key = schema.action_opt.key;
    opt.render = (text, record) => {
      let actChildren = [];
      for (let i = 0; i < schema.action_opt.renderitems.length; i++) {
        let actitem = schema.action_opt.renderitems[i];
        let itemFun = function() {};
        if (actitem.action.type == 'link') {
          let target = {
            pathname: actitem.action.path,
            state: {params:{}}
          }
          for (let j = 0; j < actitem.action.params.length; j++) {
            let key = actitem.action.params[j];
            target.state.params[key] = record[key];
          }
          itemFun = function() {
            router.push(target);
          }
        }
        actChildren.push((
          <Tooltip placement="top" title={actitem.title} mouseEnterDelay={0.2}><Icon style={{ cursor: 'pointer',fontSize:'18px'}} type={actitem.icon} onClick={itemFun}/></Tooltip>
        ))
        if (i != (schema.action_opt.renderitems.length - 1)) {
          actChildren.push((
            <span className="ant-divider" />
          ))
        }
      }
      return (<span>
        { actChildren }
      </span>)
    };
  }
  return <QueryTable type={schema.queryType} opt={opt} />
}

const WarpMethodMap = {
  'ItemTitle': _warpItemTitleComponent,
  'QuertTable': _warpQueryTableComponent,
  'CreateComponent': _warpCreateComponent,
  'UpdateComponent': _warpUpdateComponent
}

export const warpComponentBySchema = (schema, props) => {
  let warpMethod = WarpMethodMap[schema.component_type];
  if (warpMethod == null) return null;
  return warpMethod(schema, props);
}