
let url={}  //导出url
let __host__ = 'http://admin.gbtibawang.com/api/v1';
__host__ = 'http://rqiang.mynatapp.cc/api/v1';
__host__ = 'http://192.168.0.115:3008/api/v1';



Object.defineProperties(url, {
	register: {value: __host__ + '/users'},
	login: {value: __host__ + '/sessions'},
	carousels: {value: __host__ + '/carousels'},
	educations: {value: __host__ + '/educations'},
	get_users: {value: __host__ + '/users/detail'},
	features: {value: __host__ + '/features'},  //网站特色
	recommends: {value: __host__ + '/recommends'},  //首页专题推荐
	helps: {value: __host__ + '/helps'},  //帮助中心
	notices: {value: __host__ + '/notices'},  //公告
	home: {value: __host__ + '/home'},  //首页组卷轮播
	homelogo: {value: __host__ + '/home/web'},  //首页logo和电话
	chapters: {value: __host__ + '/chapters'},  //章节树形数据
	topics: {value: __host__ + '/topics'},  //题目列表
	action_stores: {value: __host__ + '/action_stores'},  //收藏点赞
	knowledges: {value: __host__ + '/knowledges'},  //知识点树
	owner_exam_records: {value: __host__ + '/exam_records'},  //手动生成试卷
	packages: {value: __host__ + '/packages'},  //VIP套餐列表
	owner_star_topics: {value: __host__ + '/owner/star/topics'},  //试题收藏
	owner_users: {value: __host__ + '/owner/users/'},  //获取个人信息
	orders: {value: __host__ + '/orders'},  //创建订单
	owner_orders: {value: __host__ + '/owner/orders'},  //获取我的订单
	correct_records: {value: __host__ + '/correct_records'},  //试题纠错
	owner_correct_records: {value: __host__ + '/owner/correct_records'},  //纠错记录
	download_records: {value: __host__ + '/download_records'},  //试卷下载
});
export default url
