import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	Redirect
} from 'react-router-dom'
import asyncComponent from "@/components/AsyncComponent";
const Nav = asyncComponent(() => import("~/Nav"));
const Footer = asyncComponent(() => import("~/Footer"));
const Home = asyncComponent(() => import("~/Home"));
const Topics = asyncComponent(() => import("~/Topics"));

export default function Routers(){
	return (
		<Router>
			<div>
				<Nav />
				<Switch>
					<Redirect exact from='/' to='/home'/>
					<Route path="/home" component={Home}/>
					<Route path="/topics" component={Topics}/>
				</Switch>
				<Footer />
			</div>
		</Router>
	)
}
