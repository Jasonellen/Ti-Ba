import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';


const Home = (location, cb) => {require.ensure([], require => {cb(null, require('~/Home').default)})}; //主页Tab


export default class Routers extends Component {

	render() {

		return (
			<Router history={browserHistory}>
				<Route path='/' getComponent={Home}></Route>
			</Router>
		)
	}
}
