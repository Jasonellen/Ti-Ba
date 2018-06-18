import React from 'react';
import './index.scss'


export default function Footer(){
	return (
		<div className="Footer">
			<ul>
				<li>联系我们</li>
				<li>关于我们</li>
				<li>版权申明</li>
				<li style={{cursor:'pointer'}} onClick={()=>_history.push('/helpCenter')}>使用帮助</li>
			</ul>
			<p>题霸网 网站编号：4299101 电话：13680906950</p>
			<p>粤ICP备18046587号</p>
		</div>
	);
}
