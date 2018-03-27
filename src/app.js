// application's entry
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {compose, createStore, applyMiddleware} from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist' // 做本地持久化
import { asyncSessionStorage } from 'redux-persist/storages'
import FastClick from 'fastclick' // 解决移动端300ms延迟
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from '@/reducers/index'
import '@/service/global'
import Routers from '@/routers/router'

// 解决移动端300ms延迟
FastClick.attach(document.body)

const middleWares = [thunk]
if (process.env.NODE_ENV == 'development') {
	const logger = createLogger()
	middleWares.push(logger)
}

let store = compose(applyMiddleware(...middleWares),autoRehydrate())(createStore)(reducers)
// 开启局部热更新
if (module.hot) {
	module.hot.accept() //无刷新
	// Enable Webpack hot module replacement for reducers
	module.hot.accept('@/reducers/index', () => {
		const nextRootReducer = require('@/reducers/index');
		store.replaceReducer(nextRootReducer);
	});
}

// 做本地持久化
persistStore(store, {
	storage: asyncSessionStorage,
	whitelist: []  //黑白名单只能选择一个,优先选择白名单
}, ()=>{
	render((
		<Provider store={store}>
			<Routers />
		</Provider>
	), document.getElementById('root'))
})
