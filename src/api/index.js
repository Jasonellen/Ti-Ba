
let url={}  //导出url
let __host__ = 'http://rqiang.mynatapp.cc/api/v1';

Object.defineProperties(url, {
	register: {value: __host__ + '/users'},
	login: {value: __host__ + '/sessions'},
	carousels: {value: __host__ + '/carousels'},
	educations: {value: __host__ + '/educations'},
	get_users: {value: __host__ + '/users/detail'},
});

export default url
