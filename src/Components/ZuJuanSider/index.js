import React from 'react'
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
import './index.scss'

function onSelect(selectedKeys, info){
	console.log('selected', selectedKeys, info);
}
export default function ZuJuanSider(props){
	return(
		<div className="ZuJuanSider">
			<div className="title">选择章节</div>
			<div className="content">
				<Tree
					{...props}
					showLine
					onSelect={onSelect}
				>
					<TreeNode title="parent 1" key="0-0">
						<TreeNode title="parent 1-0" key="0-0-0">
							<TreeNode title="leaf" key="0-0-0-0" />
							<TreeNode title="leaf" key="0-0-0-1" />
							<TreeNode title="leaf" key="0-0-0-2" />
						</TreeNode>
						<TreeNode title="parent 1-1" key="0-0-1">
							<TreeNode title="leaf" key="0-0-1-0" />
						</TreeNode>
						<TreeNode title="parent 1-2" key="0-0-2">
							<TreeNode title="leaf" key="0-0-2-0" />
							<TreeNode title="leaf" key="0-0-2-1" />
						</TreeNode>
					</TreeNode>
				</Tree>
				<Tree
					showLine
					onSelect={onSelect}
				>
					<TreeNode title="parent 1" key="0-0">
						<TreeNode title="parent 1-0" key="0-0-0">
							<TreeNode title="leaf" key="0-0-0-0" />
							<TreeNode title="leaf" key="0-0-0-1" />
							<TreeNode title="leaf" key="0-0-0-2" />
						</TreeNode>
						<TreeNode title="parent 1-1" key="0-0-1">
							<TreeNode title="leaf" key="0-0-1-0" />
						</TreeNode>
						<TreeNode title="parent 1-2" key="0-0-2">
							<TreeNode title="leaf" key="0-0-2-0" />
							<TreeNode title="leaf" key="0-0-2-1" />
						</TreeNode>
					</TreeNode>
				</Tree>
				<Tree
					showLine
					onSelect={onSelect}
				>
					<TreeNode title="parent 1" key="0-0">
						<TreeNode title="parent 1-0" key="0-0-0">
							<TreeNode title="leaf" key="0-0-0-0" />
							<TreeNode title="leaf" key="0-0-0-1" />
							<TreeNode title="leaf" key="0-0-0-2" />
						</TreeNode>
						<TreeNode title="parent 1-1" key="0-0-1">
							<TreeNode title="leaf" key="0-0-1-0" />
						</TreeNode>
						<TreeNode title="parent 1-2" key="0-0-2">
							<TreeNode title="leaf" key="0-0-2-0" />
							<TreeNode title="leaf" key="0-0-2-1" />
						</TreeNode>
					</TreeNode>
				</Tree>
			</div>
		</div>
	)
}
