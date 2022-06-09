# 懒加载、CSS分割

## 懒加载

用到才加载

```js
// 同步
import _ from 'lodash';
const result = _.join(['test1', 'test2', 'test3'], '-');

// 异步   懒加载
function createElement(){
	return import('lodash').then(({default: _}) => {
  	const result = _.join(['test1', 'test2', 'test3'], '-');
    const div = document.createElement('div');
    div.innerText = result;
    return div;
  })
}
const createElementPromise = createElement();
createElementPromise.then(div => {
	document.body.appendChild(div);
})
```

## css分割与压缩

[MiniCssExtractPlugin：分割](https://webpack.docschina.org/plugins/mini-css-extract-plugin#root)

本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 `SourceMaps` 的按需加载。

[CssMinimizerWebpackPlugin：压缩](https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/)

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader:"css-loader"
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minChunks: 1,
      minSize: 20000,
      cacheGroups: {
        test: {
          test: /[\\/]node_modules[\\/]/, // 从node_modules 引入的文件
          priority: -10, // 优先级
          reuseExistingChunk: true, // 已经存在的模块会重复利用，不会再打包
          filename: "vendors.js",
        },
        default: {
          priority: -20,
          filename: "common.js",
          minChunks: 2,
        },
      },
    },
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
};

```

