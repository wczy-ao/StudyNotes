# `devServer`

没有`WebpackDevServer`，修改了源代码，需要重新执行 `npm run build` 进行打包， 刷新页面，才可以看到最新的代码执行结果；`webpack-dev-server` 为你提供了一个基本的 web server，并且具有 live reloading(实时重新加载) 功能



## 安装

```js
npm install webpack-dev-server --save-dev
```

## 配置

```js
const path = require('path')
const HtmlWebpackPlugin = require('HtmlWebpackPlugin')
const CleanWebpackPlugin = require('CleanWebpackPlugin')
module.exports = {
  devtool: 'none',
  mode: 'development',
  devServer: {
  	contentBase: './dist', // 服务器从这个文件中获取内容。
    open: true
  },
	entry: './src/index.js',
  module: {
  	rules: [
      {
      	test: /\.(jpe?g|png|gif)$/,
        use: {
        	loader: 'url-loader',
          options: {
          	name: '[name].[ext]', // 设置loader文件的名字
            outputPath: 'img/', // 将打包的文件放入到img文件夹
          }
        }
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
    new CleanWebpackPlugin()
  ]
}
```

### 开启代理

```js
  devServer: {
  	contentBase: './dist',
    open: true,
    proxy: {
    	'/Yixiantong': {
      	target: 'http://study.js.com/',
        changeOrigin: true,
        pathRewrite: {
        	'^/api': ''
        }
      }
    }
  },
```



#### `pathRewrite` 路径重写

将 `xxx/api/Yixiantong` 的路径重写为 `/Yixiantong` 

```js
  devServer: {
  	contentBase: './dist',
    open: true,
    proxy: {
    	'/api': {
      	target: 'http://study.js.com/',
        changeOrigin: true,
        pathRewrite: {
        	'^/api': ''
        }
      }
    }
  },
```

