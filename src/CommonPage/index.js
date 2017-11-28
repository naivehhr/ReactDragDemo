import React, { Component } from 'react';
import Container from 'Page/Container';
import { warpComponentBySchema } from './schemacomponent';
import { getSchemaByPath } from './schemaconfigmock';

class CommonPage extends Component {
  constructor() {
		super()
		this.state = {
      pageReady: false,
      pageSchema: null
    }
	}

  componentDidMount() {
    this.fetchPageSchema();
  }

  fetchPageSchema = async () => {
    let { pathname } = this.props.location;
    let schema = await getSchemaByPath(pathname);
		this.setState({ 
			pageReady: true,
      pageSchema: schema
		});
	}

  renderPageContainer() {
    if (this.state.pageReady !== true) {
      return <div> loading ... </div>;
    }
    if (this.state.pageSchema == null) {
      return <div> un support component </div>;
    }
    if (this.state.pageSchema.pageUI != null) {
      const PageUIFactory = this.state.pageSchema.pageUI;
      return <PageUIFactory {...this.props}></PageUIFactory>;
    }
    //根据pageschema中的数据来初始化component列表
    let components = this.state.pageSchema.components.map((componentConfig, index) => {
      return warpComponentBySchema(componentConfig, this.props)
    });
    return <div>{components}</div>;
  }

  render () {
    let innerComponent = this.renderPageContainer();
    return <div>
            { innerComponent }
          </div>
  }
}

export const warpCommonPage = (props) => {
  class DyCommonpage extends Component {
    render () {
      return <CommonPage {...this.props} />
    }
  }
  return <DyCommonpage {...props}/>
}