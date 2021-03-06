
let url={}  //导出url
let __host__ = 'http://admin.gdtibawang.com/api/v1';  //正式
// __host__ = 'http://admin.imzzb.cn/api/v1'; //测试
// __host__ = 'http://rqiang.s3.natapp.cc//api/v1';
// __host__ = 'http://192.168.0.115:3008/api/v1';

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
	group_exam_hand_exams: {value: __host__ + '/group_exam/hand_exams'},  //知识点树
	exam_records: {value: __host__ + '/exam_records'},  //+id 生成试卷详情
	packages: {value: __host__ + '/packages'},  //VIP套餐列表
	owner_star_topics: {value: __host__ + '/owner/star/topics'},  //试题收藏
	owner_star_exams: {value: __host__ + '/owner/star/exams'},  //试卷收藏
	owner_users: {value: __host__ + '/owner/users/'},  //获取个人信息
	orders: {value: __host__ + '/orders'},  //创建订单
	orders_check: {value: __host__ + '/orders/check'},  //创建订单
	owner_orders: {value: __host__ + '/owner/orders'},  //获取我的订单
	correct_records: {value: __host__ + '/correct_records'},  //试题纠错
	owner_correct_records: {value: __host__ + '/owner/correct_records'},  //纠错记录
	download_records: {value: __host__ + '/download_records'},  //试卷下载
	attachments: {value: __host__ + '/attachments'},  //保存图片
	owner_download_records: {value: __host__ + '/owner/download_records'},  //下载记录
	owner_exam_records: {value: __host__ + '/owner/exam_records'},  //组卷记录
	group_exam_subjects: {value: __host__ + '/group_exam/subjects'},  //自动组卷获取试题数量
	group_exam_smart_exams: {value: __host__ + '/group_exam/smart_exams'},  //自动组卷
	owner_carts: {value: __host__ + '/owner/carts'},  //get 获取购物车  post添加 put删除
	applies: {value: __host__ + '/applies'},  //校园号申请
	home_search: {value: __host__ + '/home/search'},  //首页搜索
	exams: {value: __host__ + '/exams'},  //试卷列表 exams/1 详情页
	sms_new: {value: __host__ + '/sms/new'},  //验证码
	users_change: {value: __host__ + '/users/change'},  //忘记密码
	exam_types: {value: __host__ + '/exam_types'},  //试卷类型
	regions: {value: __host__ + '/regions'},  //适用地区
	course_categories: {value: __host__ + '/course_categories'},  //备课类型
	courses: {value: __host__ + '/courses'},  //备课列表
	project_types: {value: __host__ + '/project_types'},  //细目表类型
	projects: {value: __host__ + '/projects'},  //推荐细目表列表
	owner_projects: {value: __host__ + '/owner/projects'},  //我的细目表列表
});
export default url
