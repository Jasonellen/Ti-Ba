
let url={}  //导出url
let __host__ = '';
let __host1__ = '';
let _dev_api = false
global._dev_api = _dev_api

if(process.env.NODE_ENV == 'development'){
	if(_dev_api){
		__host__= 'http://scnc.mdslife.com/api/v1/'
		__host1__ = 'http://scnc.mdslife.com/'
	}else{
		__host__= 'https://m.scnc-sh.com/api/v1/'
		__host1__ = 'https://m.scnc-sh.com/'
	}
}else{
	__host__= location.origin+'/api/v1/'
	__host1__ = location.origin+'/'
}

Object.defineProperties(url, {
	home: {value: __host__ + 'home.jbuilder'},  //主页  get
	products: {value:(id)=>__host__ + `products/${id}.jbuilder`}, //详情页  get
});

export default url

