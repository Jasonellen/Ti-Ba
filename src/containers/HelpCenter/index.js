
import React, { Component }from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {Route,Link, Redirect} from 'react-router-dom'
import './index.scss'
import Base from './base'
import FeedBack from './feedback'

export default class HelpCenter extends Component{
	handleClick = (e) => {
		this.props.history.push(e.key)
	}
	render(){
		return (
			<div className='HelpCenter contentCenter clearfix'>
				<div className="left">
					<Menu
		        onClick={this.handleClick}
		        style={{ width: 256 }}
		        defaultSelectedKeys={['/helpcenter/base']}
		        defaultOpenKeys={['sub1','sub2','sub3']}
		        mode="inline"
		      >
		        <SubMenu key="sub1" title={<span><Icon type="appstore-o" /><span>产品介绍</span></span>}>
		          <Menu.Item key="/helpcenter/base">基本介绍</Menu.Item>
	            <Menu.Item key="/helpcenter/feedback">服务反馈</Menu.Item>
		        </SubMenu>
		        <SubMenu key="sub2" title={<span><Icon type="api" /><span>服务介绍</span></span>}>
		          <Menu.Item key="5">Option 5</Menu.Item>
		          <Menu.Item key="6">Option 6</Menu.Item>
		        </SubMenu>
		        <SubMenu key="sub3" title={<span><Icon type="question-circle-o" /><span>使用帮助</span></span>}>
		          <Menu.Item key="9">Option 9</Menu.Item>
		          <Menu.Item key="10">Option 10</Menu.Item>
		          <Menu.Item key="11">Option 11</Menu.Item>
		          <Menu.Item key="12">Option 12</Menu.Item>
		        </SubMenu>
		      </Menu>
				</div>
				<div className="right right_content">
					<Route path="/helpcenter/base" component={Base}/>
					<Route path="/helpcenter/feedback" component={FeedBack}/>
				</div>
			</div>
		)
	}
}
