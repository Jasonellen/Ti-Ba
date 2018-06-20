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
import {connect} from 'react-redux';
const SubMenu = Menu.SubMenu;

@connect(
	state => state.persist,
	null
)
export default class PersonalCenter extends Component{
	state={}
	componentDidMount() {
		let index = location.href.lastIndexOf('/')
		let str = location.href.slice(index+1)
		this.setState({
			defaultSelectedKeys:[str]
		})
		eventEmitter.on('user_name_changed',()=>{
			this.forceUpdate()
		});
	}
	render(){
		const { user,vips } = this.props
		return (
			<div className="PersonalCenter contentCenter">
				<div className="left">
        	<div className="user-msg">
						<div className="msg-box clearfix">
						  <div className="user-pic">
					      <div className="pic-border">
									{/*user.avatar_data.original*/}
				          <img src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3000486203,1644928777&fm=27&gp=0.jpg'/>
					      </div>
  						</div>
							<div className="user-id">
								<p className="user-idname">{user.name || user.login}</p>
								<p className="user-level">{vips.length>0 ? <span><img src={vip} alt=""/>VIP用户</span> : '普通用户'}</p>
							</div>
						</div>
					  {/*<div className="points clearfix">
					    <ul>
				        <li><p><span>5</span>积分</p></li>
				        <li><p className="line-border"><span>0</span>学币</p></li>
					    </ul>
						</div>*/}
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
