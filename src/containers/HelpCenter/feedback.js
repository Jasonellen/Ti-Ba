import React from 'react';
import { Input, Button, Select } from 'antd';
const { TextArea } = Input;
const InputGroup = Input.Group;
const Option = Select.Option;

export default function FeedBack(){
	return(
		<div className='feedback'>
			<div className="title">意见反馈</div>
			<div className="content">
					尊敬的二一教育用户：
					<p>您在使用“二一组卷”过程中遇到产品使用问题，请在此处告诉我们，或者二一组卷在线客服（<a>4006379991</a>）进行反馈。我们的工作人员会及时处理，多谢您的宝贵意见！</p>
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
		</div>
	)
}