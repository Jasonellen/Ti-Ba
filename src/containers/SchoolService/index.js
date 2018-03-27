
import React, { Component }from 'react';
import { Checkbox, Button, Form, Input, Cascader, Col, AutoComplete, Timeline } from 'antd';
import './index.scss'
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;
import CityData from '@/lib/cities'

const formItemLayout = {
	labelCol: {sm: { span: 6 },},
	wrapperCol: {sm: { span: 18 },},
};
const tailFormItemLayout = {
	wrapperCol: {
		sm: {span: 16,offset: 8,},
	},
};
class SchoolService extends Component{
	constructor(props){
		super(props)
		this.state={
    	autoCompleteResult: [],
			plainOptions : ['Apple', 'Pear', 'Orange'],
		}
	}
	componentDidMount(){

	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}

	handleQQChange = (value) => {
		let autoCompleteResult;
		if (!value) {
			autoCompleteResult = [];
		} else {
			autoCompleteResult = ['@qq.com'].map(domain => `${value}${domain}`);
		}
		this.setState({ autoCompleteResult });
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		const { autoCompleteResult, plainOptions } = this.state;
		const qqOptions = autoCompleteResult.map(qq => (
			<AutoCompleteOption key={qq}>{qq}</AutoCompleteOption>
		));

		return (
			<div className='SchoolService contentCenter clearfix'>
				<h1>购买申请</h1>
				<div className="left">
					<Form onSubmit={this.handleSubmit}>
						<FormItem
							{...formItemLayout}
							label="申请人姓名"
						>
							{getFieldDecorator('name', {
								rules: [{
									required: true, message: '请填写申请人姓名',
								}],
							})(
								<div>
									<Input.Group size="large">
					          <Col span={12}>
					            <Input />
					          </Col>
					          <Col span={12}>
					            <span className='red'>学生申请无效</span>
					          </Col>
					        </Input.Group>
								</div>

							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="联系手机"
						>
							{getFieldDecorator('phone', {
								rules: [{
									required: true, message: '请填写手机号码',
								}],
							})(
								<div>
									<Input.Group size="large">
					          <Col span={12}>
					            <Input  type='number'/>
					          </Col>
					          <Col span={12}>
					            <span className='red'>建议填写您的手机，便于我方联系确认</span>
					          </Col>
					        </Input.Group>
								</div>
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="联系人QQ"
						>
							{getFieldDecorator('qq', {
								rules: [{
									required: true, message: '请填写QQ号码',
								}],
							})(
								<div>
									<AutoComplete
										dataSource={qqOptions}
										onChange={this.handleQQChange}
									>
										<Input size="large" style={{width:250}}/>
									</AutoComplete>
									<span className='red'>&nbsp;&nbsp;必需通讯工具，方便解决问题</span>
				        </div>
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label='学校名称'
						>
							{getFieldDecorator('school', {
								rules: [{ required: true, message: '请填写学校名称', whitespace: true }],
							})(
								<div>
									<Input.Group size="large">
					          <Col span={12}>
					            <Input  />
					          </Col>
					          <Col span={12}>
					            <span></span>
					          </Col>
					        </Input.Group>
								</div>
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="地区筛选"
						>
							{getFieldDecorator('area', {
								rules: [{ type: 'array', required: true, message: '请选择地区' }],
							})(
								<Cascader placeholder='请选择地区' options={CityData} />
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="学校班级数目"
						>
							{getFieldDecorator('classes', {
								rules: [{ required: true, message: '请填写班级数' }],
							})(
								<div>
									<Input.Group size="large">
					          <Col span={12}>
					            <Input  />
					          </Col>
					          <Col span={12}>
					            <span>贵校的班级数目，只能填数字</span>
					          </Col>
					        </Input.Group>
								</div>
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="学校老师人数"
						>
							{getFieldDecorator('teachers', {
								rules: [{ required: true, message: '请填写老师人数' }],
							})(
								<div>
									<Input.Group size="large">
					          <Col span={12}>
					            <Input  />
					          </Col>
					          <Col span={12}>
					            <span>贵校的老师数目，只能填数字</span>
					          </Col>
					        </Input.Group>
								</div>
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="学校学段"
						>
							{getFieldDecorator('high_level', {
								rules: [{ required: true, message: '请选择学段' }],
							})(
								<CheckboxGroup options={plainOptions} />
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="负责人姓名"
						>
							{getFieldDecorator('principal', {
								rules: [{ required: true, message: '请填写负责人姓名' }],
							})(
								<div>
									<Input.Group size="large">
					          <Col span={12}>
					            <Input  />
					          </Col>
					          <Col span={12}>
					            <span>负责学校教务的主任或者校长</span>
					          </Col>
					        </Input.Group>
								</div>
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="负责人职务"
						>
							{getFieldDecorator('job', {
								rules: [{ required: true, message: '请填写负责人职务' }],
							})(
								<div>
									<Input.Group size="large">
					          <Col span={12}>
					            <Input  />
					          </Col>
					          <Col span={12}>
					            <span>如教导主任、校长</span>
					          </Col>
					        </Input.Group>
								</div>
							)}
						</FormItem>
						<FormItem
							{...formItemLayout}
							label="负责人电话"
						>
							{getFieldDecorator('tel', {
								rules: [{ required: true, message: '请填写负责人电话' }],
							})(
								<div>
									<Input.Group size="large">
					          <Col span={12}>
					            <Input  />
					          </Col>
					          <Col span={12}>
					            <span className='red'>填写手机或固定电话（注明区号，分机）</span>
					          </Col>
					        </Input.Group>
								</div>
							)}
						</FormItem>
						<FormItem {...tailFormItemLayout}>
							<Button type="primary" htmlType="submit">提交申请</Button>
						</FormItem>
					</Form>
				</div>
				<div className="right">
					<aside className="apply-account">
						<div>
							<p className="col">申请事项说明如下：</p>
							<div className="con">
                1、产品在线申请只针对学校单位用户开放，每个学校只限一次免费试用机会，试用期为10天。<br/>
                2、贵校多媒体设施比较完善，办公电脑充足，有统一的上网出口 IP，以便开通权限。<br/>
                3、申请人或联系人最好是学校领导或其委托人。<br/>
                4、有任何疑问可联系客服 QQ：<a>4006379991</a>，或致电：4006379991。<br/>
                5、如有特别注意事项请在‘申请人备注’注明。<br/>
                6、我们收到申请后将会1-3个工作日内审核<br/>
                （工作时间：周一至周五8:30-5:30）
							</div>
						</div>
						<div>
							<p className="col">产品申请流程：</p>
							<div className="steps">
								<Timeline>
									<Timeline.Item color="green">填写申请表单</Timeline.Item>
									<Timeline.Item color="#ff9600">资料审核</Timeline.Item>
									<Timeline.Item color="red">开通试用</Timeline.Item>
									<Timeline.Item>确定购买</Timeline.Item>
								</Timeline>
							</div>
						</div>
					</aside>
				</div>
			</div>
		)
	}
}

export default Form.create()(SchoolService);
