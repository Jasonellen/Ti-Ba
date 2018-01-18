import React, {Component} from 'react';
import { Button, Pagination, Modal, Icon } from 'antd';
import './index.scss'
import About from '~/About'
import {
  Route,
  Link,
} from 'react-router-dom'

// import { bindActionCreators } from 'redux'
// import {connect} from 'react-redux';
// import { browserHistory} from 'react-router'
// import * as addAddressAction from '@/actions/addAddress.js';


export default class Home extends Component {
	
	state = { visible: false }
	showModal = () => {
		this.setState({
			visible: true,
		});
	}
	handleOk = () => {
		this.setState({
			visible: false,
		});
	}
	handleCancel = () => {
		this.setState({
			visible: false,
		});
	}
	render() {
		return (
			<div className="Home">
				<Button type="primary" onClick={this.showModal}>Primary</Button>
				<Link to='/home/1'><Button>Default</Button></Link>
				<Button type="danger">Danger</Button>
				<Pagination defaultCurrent={1} total={50} />
				<Modal
					title="Basic Modal"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					<p>Some contents...</p>
					<p>Some contents...</p>
					<p>Some contents...</p>
				</Modal>
				<Icon type="question-circle" spin/>
				<Route path="/home/:id" component={About}/>
			</div>
		);
	}
}
// const mapStateToProps = (state) => {
// 	return {
// 		state:state.addAddress
// 	}
// };
// const mapDispatchToProps = (dispatch) => {
// 	return bindActionCreators(addAddressAction, dispatch)
// };
// export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
