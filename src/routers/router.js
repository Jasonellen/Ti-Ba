import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'
const supportsHistory = 'pushState' in window.history
import asyncComponent from "@/components/AsyncComponent";
const Nav = asyncComponent(() => import("~/Nav"));
const Footer = asyncComponent(() => import("~/Footer"));
const Home = asyncComponent(() => import("~/Home"));
const Beike = asyncComponent(() => import("~/Beike"));
const XuanTi = asyncComponent(() => import("~/XuanTi"));
const AnswerDetail = asyncComponent(() => import("~/AnswerDetail"));

export default function Routers(){
	return (
		<Router forceRefresh={!supportsHistory}>
			<div>
				<Nav />
				<Switch>
					<Redirect exact from='/' to='/home'/>
					<Route path="/home" component={Home}/>
					<Route path="/Beike" component={Beike}/>
					<Route path="/XuanTi/:id" component={XuanTi}/>
					<Route path="/AnswerDetail/:id" component={AnswerDetail}/>
				</Switch>
				<Footer />
			</div>
		</Router>
	)
}
