import React from 'react'
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
import './index.scss'

function onSelect(selectedKeys, info){
	console.log('selected', selectedKeys, info);
}
export default function ZuJuanSider(props){
	let data = props.data || []
	return(
		<div className="ZuJuanSider">
			<div className="title">{props.title}</div>
			<div className="content">
			{
				data.length>0 && (
					<Tree
						checkable = {props.checkable}
						showLine
						onSelect={onSelect}
					>
						{
							data.map(function(item){
								return (
									<TreeNode title={item.name} key={item.id}>
										{
											item.children.length>0 && item.children.map(function(iitem){
												return (
													<TreeNode title={iitem.name} key={iitem.id}>
														{
															iitem.children.length>0 && iitem.children.map(function(iiitem){
																return (
																	<TreeNode title={iiitem.name} key={iitem.id} />
																)
															})
														}
													</TreeNode>
												)
											})
										}
									</TreeNode>
								)
							})
						}
					</Tree>
				)
			}
				
			</div>
		</div>
	)
}
