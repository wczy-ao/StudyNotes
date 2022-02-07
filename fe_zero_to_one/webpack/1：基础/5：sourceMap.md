# sourceMap

[devtool](https://webpack.docschina.org/configuration/devtool/#devtool)

`devtool：`

- `none`  不配置
- `eval-source-map`
- `cheap-module-eveal-source-map`
  - cheap 只报出错的行数
  - module 会报loader和第三方模块的错误
- `cheap-module-source-map`

```js
const path = require('path')
const HtmlWebpackPlugin = require('HtmlWebpackPlugin')
const CleanWebpackPlugin = require('CleanWebpackPlugin')
module.exports = {
  devtool: 'none',
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

