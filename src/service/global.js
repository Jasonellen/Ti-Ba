import '@/style/common.scss'
import './extends'
import url from '@/api'
import _axios from './fetch'
import FastClick from 'fastclick' // 解决移动端300ms延迟
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
// 解决移动端300ms延迟
FastClick.attach(document.body)

//全局变量
Object.defineProperties(global, {
	url: {value: url},
	_axios: {value: _axios},
	eventEmitter:{value: eventEmitter},
});