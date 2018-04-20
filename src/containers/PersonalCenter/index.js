import React,{ Component } from 'react'
import { Menu, Icon } from 'antd';
import './index.scss'
import vip from 'static/vip.jpg'
import { Route } from 'react-router-dom'
import Pdownload from './download'
import Pzujuanrecord from './zujuanrecord'
import Pshijuan from './Mycollection/shijuan'
import Pshiti from './Mycollection/shiti'
import Pjiucuo from './jiucuo'
import Pdingdan from './dingdan'
import PersonalInfo from './personalInfo'

const SubMenu = Menu.SubMenu;


export default class PersonalCenter extends Component{
	state={

	}
	componentDidMount() {
		let index = location.href.lastIndexOf('/')
		let str = location.href.slice(index+1)
		this.setState({
			defaultSelectedKeys:[str]
		},()=>{
			console.log(this.state.defaultSelectedKeys)
		})
	}
	render(){
		return (
      <div className="PersonalCenter contentCenter">
        <div className="left">
        	<div className="user-msg">
						<div className="msg-box clearfix">
						  <div className="user-pic">
					      <div className="pic-border">
				          <img src="http://passport.21cnjy.com/avatar.php?uid=8949652"/>
					      </div>       			
  						</div>
							<div className="user-id">
								<p className="user-idname">21jy_230026031</p>
								<p className="user-level"><img src={vip} alt=""/>VIP用户</p>
							</div>
						</div>
					  <div className="points clearfix">
					    <ul>
				        <li><p><span>5</span>积分</p></li>
				        <li><p className="line-border"><span>0</span>学币</p></li>
					    </ul>				
						</div>
       		</div>
          <Menu
          	key={this.state.defaultSelectedKeys}
            onClick={(item)=>this.props.history.push('/PersonalCenter/'+item.key)}
            style={{ width: 256 }}
            defaultSelectedKeys={this.state.defaultSelectedKeys}
            defaultOpenKeys={['c']}
            mode="inline"
          >
            <Menu.Item key="download"><Icon type="download" />下载记录</Menu.Item>
            <Menu.Item key="Pzujuanrecord"><Icon type="book" />组卷记录</Menu.Item>
            <SubMenu key='c' title={<span><Icon type="heart-o" /><span>我的收藏</span></span>}>
              <Menu.Item key="Pshiti">试题收藏</Menu.Item>
              <Menu.Item key="Pshijuan">试卷收藏</Menu.Item>
            </SubMenu>
            <Menu.Item key="Pjiucuo"><Icon type="search" />纠错记录</Menu.Item>
            <Menu.Item key="PersonalInfo"><Icon type="setting" />个人信息</Menu.Item>
            <Menu.Item key="Pdingdan"><Icon type="pay-circle-o" />订单管理</Menu.Item>
          </Menu>
        </div>
        <div className="right">
          <Route path="/PersonalCenter/download" component={Pdownload}/>
          <Route path="/PersonalCenter/Pzujuanrecord" component={Pzujuanrecord}/>
          <Route path="/PersonalCenter/Pshiti" component={Pshiti}/>
          <Route path="/PersonalCenter/Pshijuan" component={Pshijuan}/>
          <Route path="/PersonalCenter/Pjiucuo" component={Pjiucuo}/>
          <Route path="/PersonalCenter/PersonalInfo" component={PersonalInfo}/>
          <Route path="/PersonalCenter/Pdingdan" component={Pdingdan}/>
        </div>
      </div>
		)
	}
}

