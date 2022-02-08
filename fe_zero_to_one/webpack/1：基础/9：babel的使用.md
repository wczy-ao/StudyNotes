# babel的使用

babel本身可以作为一个独立的工具（和postcss一样），不和webpack等构建工具配置来单独使用。如果我们希望在命令行尝试使用babel，需要安装如下库

@babel/core：babel的核心代码，必须安装

@babel/cli：可以让我们在命令行使用babel

```
npm install @babel/cli @babel/core -D
```

**直接使用babel命令还是比较少，更多的还是通过babel-loader来处理，但是必须手动配置插件，换句话说就是要转成什么就得配置什么插件**

```
npm install bable-loader -D
```

```js
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
    ]
  },
  output: {
  	filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
  	new HtmlWebpackPlugin({
    	template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
```



## 预设

手动配置插件比较麻烦的，我们可以使用预设，直接给webpack提供一个 preset；webpack会根据我们的预设来加载对应的插件列表，并且将其传递给babel

```
npm install @babel/preset-env
```

```js
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
        loader: 'babel-loader',
        options: {
        	presets: ['@babel/preset-env']
        },
        exclude: /node_modules/
      },
    ]
  },
  output: {
  	filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
  	new HtmlWebpackPlugin({
    	template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

## polyfill

> 照顾一些浏览器能够执行es6代码

使用polyfill会增加打包后的代码量和体积

增加polyfill配置来减少代码体积 useBuiltIns: 'usage' , 按需引入

### 安装

```
npm install @babel/polyfill --save
```

```js
module.exports = {
  devtool: 'none',
  mode: 'development',
	entry: './src/index.js',
  module: {
  	rules: [
      {
      	test: /\.js$/,
        loader: 'babel-loader',
        options: {
        	presets: [['@babel/preset-env', {
          	useBuiltIns: 'usage'
          }]]
        },
        exclude: /node_modules/
      },
    ]
  },
}
```

## 打包警告

npm run build 的时候会报一些警告，这是因为没有设置corejs的版本号

```
npm install core-js 
```

```js
module.exports = {
  devtool: 'none',
  mode: 'development',
	entry: './src/index.js',
  module: {
  	rules: [
      {
      	test: /\.js$/,
        loader: 'babel-loader',
        options: {
        	presets: [['@babel/preset-env', {
          	useBuiltIns: 'usage',
            corejs: 3
          }]]
        },
        exclude: /node_modules/
      },
    ]
  },
}
```

## babel/polyfill的一些问题

> babel/polyfill 会污染全局

- **开发组件的时候使用这种方式**

- 安装 npm install @babel/plugin-transform-runtime --save-dev 来解决全局污染的问题
- 安装 npm install @babel/runtime --save
- 去除polyfill方式配置的presets
- 安装 npm install @babel/runtime-corejs3 --save

```js
module.exports = {
  devtool: 'none',
  mode: 'development',
	entry: './src/index.js',
  module: {
  	rules: [
      {
      	test: /\.js$/,
        loader: 'babel-loader',
        options: {
          plugins: [['@babel/plugin-transform-runtime', {
          	'absoluteRuntime': false,
            'corejs': 3,
            'helpers': true,
            'regenerator': true,
            'useESModules': false,
            'version': '7.0.0-beta.0'
          }]]
        },
        exclude: /node_modules/
      },
    ]
  },
}
```



## bable配置文件

新建.babelrc配置文件

```JS
// 两种写法
// 1
{
	"presets": [
  	[
    	"@babel/preset-env",
      {
      	"useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  
// 2
  "plugins": [
  	['@babel/plugin-transform-runtime', {
          	'absoluteRuntime': false,
            'corejs': 3,
            'helpers': true,
            'regenerator': true,
            'useESModules': false,
            'version': '7.0.0-beta.0'
          }]
  ]
}
```

