var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var SshWebpackPlugin = require('ssh-webpack-plugin');
var options = {}

if(process.env.DEPLOY === 'deploy-test'){
	options = {
		host: '114.115.215.249',
		port: '22',
		username: 'deploy',
		//password: 'Remote password',//or use privateKey login(privateKey: require('fs').readFileSync('/path/to/private/key')).
		privateKey: require('fs').readFileSync('/Users/nannan/.ssh/id_rsa'),
		from: 'dist',
		to: '/data/www/html',//important: If the 'cover' of value is false,All files in this folder will be cleared before starting deployment.
		cover:false, //覆盖形式
	}
}
if(process.env.DEPLOY === 'deploy-build'){
	options = {
		host: '120.78.173.52',
		port: '22',
		username: 'tiba',
		//password: 'Remote password',//or use privateKey login(privateKey: require('fs').readFileSync('/path/to/private/key')).
		privateKey: require('fs').readFileSync('/Users/nannan/.ssh/id_rsa'),
		from: 'dist',
		to: '/opt/html/',//important: If the 'cover' of value is false,All files in this folder will be cleared before starting deployment.
		cover:false, //覆盖形式
	}
}
var webpackConfig = merge(baseWebpackConfig, {
	output: {
		//产出路径，后面的路径都是根据这个来的
    path: config.build.path,
    filename: config.build.jsPath+'/[name].[chunkhash:5].js',
    chunkFilename: config.build.jsPath+'/[name].[chunkhash:5].js'
  },
  devtool: 'cheap-module-source-map', //显示报错文件，'cheap-module-eval-source-map' 显示报错行，正式环境用这个tool报错
  plugins: [
		//设置全局变量，比如npm start -> cross-env NODE_ENV=development这里只是将development传给了webpack
		//process.env.NODE_ENV==‘development’仅在webpack中有用，在其他文件中无效，通过下面设为全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // 解决css重复的问题
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true, //移除注释
        collapseWhitespace: false, //换行被解析
        removeAttributeQuotes: true //移除属性的双引号
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // 按chunks已依赖关系逐个插入
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
		// 将entry下所有的模块的公共部分提取到一个通用的chunk中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // 生成manifest来检测依赖的插件是否有变动，如果变动了才重新生成vendor.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'] //依赖vendor
    }),
    // copy custom static assets
		//将根目录的static 拷贝到'static'中(outpath+static == dist/static)
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.staticPath,
        // ignore: ['.*']
      }
    ]),
  ]
})
if(process.env.DEPLOY){
	webpackConfig.plugins.push(SshWebpackPlugin(options))
}
//build完成后会在浏览器以可视化的形式展示使用了哪些文件，及大小
if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
