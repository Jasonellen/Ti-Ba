
let url={}  //导出url
let __host__ = 'http://rqiang.mynatapp.cc/api/v1';
// __host__ = 'http://192.168.0.111:3008/api/v1';

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
});

export default url
