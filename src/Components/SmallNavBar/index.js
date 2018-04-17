import React from 'react'
import PropTypes from 'prop-types';
import './index.scss'

export default function SmallNavBar(props){
	return(
		<div className="SmallNavBar clearfix">
			<div className='first left' style={{width:props.width}}>{props.title} ：</div>
			<ul className="left clearfix" style={{width: `calc(100% - ${props.width})`}}>
			{
				props.data.length> 0 && props.data.map((item)=>{
					return <li className='left' key={item.id} onClick={()=>props.onChange && props.onChange(item.id)}>{item.name || item.title}</li>
				})
			}
			</ul>
		</div>
	)
}
SmallNavBar.propTypes = {
	title: PropTypes.string,
	data: PropTypes.array.isRequired,
};

SmallNavBar.defaultProps = {
	type: '未知',
	data: []
};
