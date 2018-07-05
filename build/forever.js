
var path = require('path')
var express = require('express')
var webpack = require('webpack')

var webpackConfig = require('./forever.config')

var app = express()
var compiler = webpack(webpackConfig) //创建webpack编译对象

var devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: '/',
  quiet: true //禁用在控制台输出相关信息
})

//单页SPA，router/index.js的’*‘设置404页面
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
//设置静态文件路径->现在可以在html中通过/static访问根目录/static静态文件了
app.use('/static', express.static('./static'))

var uri = 'http://localhost:8090'

console.log('> Starting dev server...')
//当开发中间件生效的时候打印日志并打开浏览器
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
})

var server = app.listen(8090)
