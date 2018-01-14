import React, {Component} from 'react';
import { Button, Pagination, Modal, Icon } from 'antd';
import './index.scss'
// import { bindActionCreators } from 'redux'
// import {connect} from 'react-redux';
// import { browserHistory} from 'react-router'
// import * as addAddressAction from '@/actions/addAddress.js';

export default class AddAddress extends Component {
	state = { visible: false }
	showModal = () => {
		this.setState({
			visible: true,
		});
	}
	handleOk = (e) => {
		this.setState({
			visible: false,
		});
	}
	handleCancel = (e) => {
		this.setState({
			visible: false,
		});
	}
	render() {
		return (
			<div className="AddAddress">
				<Button type="primary" onClick={this.showModal}>Primary</Button>
				<Button>Default</Button>
				<Button type="dashed">Dashed</Button>
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
