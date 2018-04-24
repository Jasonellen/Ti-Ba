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
const VIP = asyncComponent(() => import("~/Vip"));
// const VIPActivate = asyncComponent(() => import("~/Vip/activate"));
const SchoolService = asyncComponent(() => import("~/SchoolService"));
const ZNZJ = asyncComponent(() => import("~/ZNZJ"));
const Papers = asyncComponent(() => import("~/Papers"));
const PapersTest = asyncComponent(() => import("~/PapersTest"));
// const ShiJuanDetail = asyncComponent(() => import("~/ShiJuanDetail"));
const HelpCenter = asyncComponent(() => import("~/HelpCenter"));
// const OnlineTest = asyncComponent(() => import("~/OnlineTest"));
// const TestResult = asyncComponent(() => import("~/OnlineTest/TestResult"));
const BeiKeDetail = asyncComponent(() => import("~/BeiKeDetail"));
// const Double = asyncComponent(() => import("~/Double"));
// const DoubleDetail = asyncComponent(() => import("~/DoubleDetail"));
const DownloadPage = asyncComponent(() => import("~/DownloadPage"));
const PersonalCenter = asyncComponent(() => import("~/PersonalCenter"));
const NoticeDetail = asyncComponent(() => import("~/NoticeDetail"));

export default function Routers(){
	return (
		<Router forceRefresh={!supportsHistory}>
			<div>
				<Nav />
				<div className='BigContainer'>
					<Switch>
						<Redirect exact from='/' to='/home'/>
						<Route path="/home" component={Home}/>
						<Route path="/Beike" component={Beike}/>
						<Route path="/XuanTi/:id" component={XuanTi}/>
						<Route path="/AnswerDetail/:id" component={AnswerDetail}/>
						<Route path="/VIP" component={VIP}/>
						{/*<Route path="/VIPActivate" component={VIPActivate}/>*/}
						<Route path="/SchoolService" component={SchoolService}/>
						<Route path="/znzj/:id" component={ZNZJ}/>
						<Route path="/Papers" component={Papers}/>
						<Route path="/PapersTest" component={PapersTest}/>
						{/*<Route path="/ShiJuanDetail/:id" component={ShiJuanDetail}/>*/}
						<Route path="/HelpCenter" component={HelpCenter}/>
						{/*<Route path="/OnlineTest/:id" component={OnlineTest}/>*/}
						{/*<Route path="/TestResult/:id" component={TestResult}/>*/}
						<Route path="/BeiKeDetail/:id" component={BeiKeDetail}/>
						{/*<Route path="/Double" component={Double}/>*/}
						{/*<Route path="/DoubleDetail/:id" component={DoubleDetail}/>*/}
						<Route path="/DownloadPage/:id" component={DownloadPage}/>
						<Route path="/PersonalCenter" component={PersonalCenter}/>
						<Route path="/NoticeDetail/:id" component={NoticeDetail}/>
					</Switch>
				</div>
				<Footer />
			</div>
		</Router>
	)
}
