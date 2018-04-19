
import React, { Component }from 'react';
import { Menu, Input,Select, Button } from 'antd';
import {Route,Link, Redirect} from 'react-router-dom'
import './index.scss'
const { TextArea } = Input;
const Option = Select.Option;
const InputGroup = Input.Group;
const SubMenu = Menu.SubMenu;


export default class HelpCenter extends Component{
	state={
		data:[],
		help_detail:{}
	}
	componentDidMount() {
		this.getData()
	}
	handleClick = (e) => {
		_axios.get(url.helps+'/'+e.key)
			.then(data=>{
				this.setState({
					help_detail:data.help
				})
			})
	}
	//获取数据
	getData = ()=>{
		_axios.get(url.helps)
			.then(data=>{
				this.setState({
					data:data.helps
				},()=>this.handleClick({key:data.helps[0].id}))
			})
	}
	render(){
		const { data, help_detail } = this.state
		let defaultSelectedKeys = ''
		if(data.length>0 && data.datas && data.datas.length>0){
			defaultSelectedKeys = String(data.datas[0].id)
		}
		let defaultOpenKeys = []
		data.length>0 && data.map(function(item){
			defaultOpenKeys.push(String(item.id))
		})
		return (
			<div className='HelpCenter contentCenter clearfix'>
				<div className="left">
				{
					data.length>0 && (
						<Menu
			        onClick={this.handleClick}
			        style={{ width: 256 }}
			        defaultSelectedKeys={['1']}
			        defaultOpenKeys={defaultOpenKeys}
			        mode="inline"
			      >
			      {
			      	data.map((item)=>{
			      		return(
									<SubMenu key={String(item.id)} title={<span className='subTitle'><img src={item.avatar_data.original} alt=""/><span>{item.title}</span></span>}>
					          {
					          	item.datas.length>0 && item.datas.map((iitem)=>{
					          		return(
													<Menu.Item key={String(iitem.id)}>{iitem.title}</Menu.Item>
					          		)
					          	})
					          }
					        </SubMenu>
			      		)
			      	})
			      }
			      </Menu>
					)
				}
				</div>
				<div className="right right_content">
					<div className="title">{help_detail.title}</div>
					<div dangerouslySetInnerHTML={{__html: help_detail.content }}></div>
					{/*<div className='feedback'>
						<div className="content">
							<div className='constro'>
								<span>*</span>反馈内容<small>(请在此处详细描述您的问题与建议，如果涉及到资源问题，可附带资源链接)</small>
							</div>
							<TextArea rows={10} maxLength={2400} placeholder='请输入反馈的内容'/>
							<br/>
							<br/>
							<div className='constro'>
								联系方式<small> (请正确填写信息，以便收到我们的反馈)</small>
							</div>
							<InputGroup compact>
			          <Select size='large' defaultValue="QQ">
			            <Option value="QQ">&nbsp;&nbsp;&nbsp;&nbsp;QQ</Option>
			            <Option value="邮箱">&nbsp;&nbsp;&nbsp;&nbsp;邮箱</Option>
			            <Option value="手机号码">手机号码</Option>
			          </Select>
			          <Input style={{ width: '40%' }} size='large'/>
			        </InputGroup>
			        <div className="submit"><Button type='primary'>提交反馈</Button></div>
						</div>
					</div>*/}
				</div>
			</div>
		)
	}
}
