
let url={}  //导出url
let __host__ = 'http://rqiang.mynatapp.cc/api/v1';
// let _dev_api = false
// global._dev_api = _dev_api
//
// if(process.env.NODE_ENV == 'development'){
// 	if(_dev_api){
// 		__host__= 'http://rqiang.mynatapp.cc/api/v1'
// 	}else{
// 		__host__= 'http://rqiang.mynatapp.cc/api/v1'
// 	}
// }else{
// 	__host__= location.origin+'/api/v1/'
// }

Object.defineProperties(url, {
	register: {value: __host__ + '/users'},
	login: {value: __host__ + '/sessions'},
	carousels: {value: __host__ + '/carousels'},
	educations: {value: __host__ + '/educations'},
});

export default url
