import React,{ Component } from 'react'
import ShiTiItem from '@/Components/ShiTiItem'
import SmallNavBar from '@/Components/SmallNavBar'
import {connect} from 'react-redux';

@connect(
	state => state.persist,
	null
)
export default class Pshiti extends Component{
	state={
		educations:[],
		educations_id:'',
		subjects:[],
		subjects_id:'',
	}
	componentDidMount(){
		const { educations } = this.props
		let subjects = []
		let educations_id = ''
		let subjects_id = ''
		if(educations.length>0){
			subjects = educations[0].subjects
			educations_id = educations[0].id
			subjects_id = subjects[0].id
		}
		this.setState({
			educations,
			subjects,
			educations_id,
			subjects_id
		})
	}
	render(){
		const { educations, subjects, educations_id, subjects_id } = this.state
		return (
			<div className="download">
      	<h1>试题收藏</h1>
				<SmallNavBar
					noall
					title='学段'
					data={educations}
					onChange={(x)=>console.log(x)}
					key={'e'+educations_id}
				/>
				<SmallNavBar
					noall
					title='学科'
					data={subjects}
					onChange={(x)=>console.log(x)}
					key={'s'+subjects_id}
				/><br/>
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
