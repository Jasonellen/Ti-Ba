import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom'
import asyncComponent from "@/components/AsyncComponent";
const Home = asyncComponent(() => import("~/Home"));
const About = asyncComponent(() => import("~/About"));
const Topics = asyncComponent(() => import("~/Topics"));

export default function Routers(){
	return (
		<Router>
			<div>
				<ul>
					<li><Link to="/home">Home</Link></li>
					<li><Link to="/about">About</Link></li>
					<li><Link to="/topics">Topics</Link></li>
				</ul>

				<hr/>
				<Switch>
					<Redirect exact from='/' to='/home'/>
					<Route path="/home" component={Home}/>
					<Route path="/about" component={About}/>
					<Route path="/topics" component={Topics}/>
				</Switch>
			</div>
		</Router>
	)
}
