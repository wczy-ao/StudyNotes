# Tree Shaking

## 什么时 `Tree Shaking`？

前端中的tree-shaking可以理解为通过工具**筛选**我们的JS文件，将其中用不到的代码**筛选掉**，是一个性能优化的范畴

比如说：`.src/test.js` 文件中导出两个函数，但是只用了一个，通过 `tree shaking` 打包就会把另一个函数筛选掉



## 开启 tree shaking

tree shaking 有以下特点

1. 只打包使用过的模块
2. 只支持 ES Module , 不支持 common.js
3. 生产环境自动开启



```js
// webpack.config.js

const path = require('path')

const webpack = require('webpack')

const HtmlWebpackPlugin = require('HtmlWebpackPlugin')
const CleanWebpackPlugin = require('CleanWebpackPlugin')

module.exports = {
  devtool: 'none',
  mode: 'development',
  hot: true,
	entry: './src/index.js',
  module: {
  	rules: [
      {
      	test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
      	test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
  	new HtmlWebpackPlugin({
    	template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  // 开启 tree shaking
  optimization: {
  	usedExports: true
  }
}
```

## 哪些文件不执行 tree shaking

这个需要在`package.json`文件中关闭副作用

```json
"sideEffects": [
    "./src/extends.js",
    "*.css" 
 ]

```

