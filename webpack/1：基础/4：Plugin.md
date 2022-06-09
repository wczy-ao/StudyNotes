# Plugin

## `HtmlWebpackPlugin`

自动生成Html文件

### 安装

```
npm install --save-dev html-webpack-plugin
```

### 配置

```js
const path = require('path')
const HtmlWebpackPlugin = require('HtmlWebpackPlugin')
module.exports = {
  mode: 'development',
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
      {
      	test: /\.scss$/,
        use: [
          'style-loader', 
          {
          	loader: 'css-loader',
            options: {
            	importLoaders: 2,
              modules: true
            }
          },
          'postcss-loader', 
          'sass-loader'
        ],
      },
      {
      	test: /\.(eot|svg|ttf|woff)/,
        loader: 'file-loader'
      }
    ]
  },
  output: {
  	filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
  	new HtmlWebpackPlugin()
  ]
}
```

### 配置模板文件

```js
  plugins: [
  	new HtmlWebpackPlugin({
    	template: './src/index.html'
    })
  ]
```



## `clean-webpack-plugin`

### 安装

```
npm i clean-webpack-plugin -D
```

### 配置

```js
const path = require('path')
const HtmlWebpackPlugin = require('HtmlWebpackPlugin')
const CleanWebpackPlugin = require('CleanWebpackPlugin')
module.exports = {
  mode: 'development',
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
      {
      	test: /\.scss$/,
        use: [
          'style-loader', 
          {
          	loader: 'css-loader',
            options: {
            	importLoaders: 2,
              modules: true
            }
          },
          'postcss-loader', 
          'sass-loader'
        ],
      },
      {
      	test: /\.(eot|svg|ttf|woff)/,
        loader: 'file-loader'
      }
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

