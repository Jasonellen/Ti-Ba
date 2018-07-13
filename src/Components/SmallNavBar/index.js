import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './index.scss'

export default class SmallNavBar extends Component{
	state={
		title:this.props.title,
		data:this.props.data,
		width:this.props.width
	}
	componentDidMount(){
		this.initial()
		let newData = this.state.data
		if(this.props.noall){
			this.handleClick(newData[0].id)
		}
	}
	componentWillReceiveProps(nextprops){
		let data = this.state.data
		if(data.length == 1){
			this.setState({
				data:nextprops.data
			},this.initial)
		}
	}

	initial = ()=>{
		let newData = this.state.data
		newData.map(function(item){
			item.checked = false
		})
		if(this.props.noall){
			if(newData.length>0){
				newData[0].checked = true
			}
			this.setState({
				data:newData
			})
		}else{
			this.setState({
				data:[{id:'',title:'全部',name:'全部',checked:true}].concat(newData)
			})
		}
	}
	handleClick=(id)=>{
		let newData = this.state.data
		newData.map(function(item){
			if(item.id === id){
				item.checked = true
			}else{
				item.checked = false
			}
		})
		this.setState({},()=>{
			this.props.onChange && this.props.onChange(id)
		})
	}
	render(){
		const { title, data, width } = this.state
		return(
			<div className="SmallNavBar clearfix">
				<div className='first left' style={{width}}>{title} ：</div>
				<ul className="left clearfix" style={{width: `calc(100% - ${width})`}}>
					{
						data.length> 0 && data.map((item)=>{
							return <li className={`left ${item.checked && 'active'}`} key={item.id} onClick={()=>this.handleClick(item.id)}>{item.name || item.title}</li>
						})
					}
				</ul>
			</div>
		)
	}
}
SmallNavBar.propTypes = {
	title: PropTypes.string,
	data: PropTypes.array.isRequired,
};

SmallNavBar.defaultProps = {
	type: '未知',
	data: []
};
