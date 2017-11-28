/*
 * @Author: aran.hu 
 * @Date: 2017-08-24 10:58:20 
 * @Last Modified by: aran.hu
 * @Last Modified time: 2017-11-22 17:45:12
 */


import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import Container from 'Page/Container'

class NotFound extends Component {
	constructor() {
		super()

	}


	render() {
		return (
			<Container  {...this.props}>
				<div>
					<h4>404</h4>
				</div>
			</Container>
		)
	}
}
export default NotFound