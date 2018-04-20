import React,{ Component } from 'react'
import ShiTiItem from '@/Components/ShiTiItem'
import SmallNavBar from '@/Components/SmallNavBar'

export default class Pshiti extends Component{
	state={

	}

	render(){
		return (
      <div className="download">
      	<h1>试题收藏</h1>
      	<SmallNavBar />
      	<SmallNavBar /><br/>
				<ul>
					<li>
						<ShiTiItem />
						<div className="title"></div>
					</li>
				</ul>
      </div>
		)
	}
}

