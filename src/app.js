// application's entry
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist' // 做本地持久化
import { asyncSessionStorage } from 'redux-persist/storages'
import '@/service/global'
import Routers from '@/routers/router'
import store from '@/service/store'


// 开启局部热更新
if (module.hot) {
	module.hot.accept() //无刷新
	// Enable Webpack hot module replacement for reducers
	module.hot.accept('@/Redux/reducers/index', () => {
		const nextRootReducer = require('@/Redux/reducers/index');
		store.replaceReducer(nextRootReducer);
	});
}

// 做本地持久化
persistStore(store, {
	storage: asyncSessionStorage,
	whitelist: ['persist']  //黑白名单只能选择一个,优先选择白名单
}, ()=>{
	render((
		<Provider store={store}>
			<Routers />
		</Provider>
	), document.getElementById('root'))
})
