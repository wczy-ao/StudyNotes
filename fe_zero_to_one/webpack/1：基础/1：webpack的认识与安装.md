# 认识与安装

## 认识

> `webpack`是一个静态的模块化打包工具，为现代的JavaScript应用程序

- 打包`bundler：webpack`可以将帮助我们进行打包，所以**它是一个打包工具**
- 静态的`(static)`：这样表述的原因是我们最终可以将代码**打包成最终的静态资源**（部署到静态服务器）
- **模块化**(`module：webpack`)默认支持各种模块化开发，`ES Module、CommonJS`、`AMD`等
- 现代的：我们前端说过，正是因为现代前端开发面临各种各样的问题，才催生了`webpack`的出现和发 展

## 安装

`webpack`的安装目前分为两个：`webpack`、`webpack-cli`

`npm install webpack webpack-cli –g`   全局安装

`npm install webpack webpack-cli –D`   局部安装

### 指定版本安装

```js
npm install webpack@4.41.2 webpack-cli@3.3.10 -D // 下面例子中用到的版本
```



###  `webpack webpack-cli`的关系

> `webpack-cli`是为了让我们能使用`webpack`命令

- 执行`webpack`命令，会执行`node_modules`下的`.bin`目录下的`webpack`
- `webpack`在执行时是依赖`webpack-cli`的，如果没有安装就会报错
- `webpack-cli`中代码执行时，才是真正利用`webpack`进行编译和打包的过程
- 所以在安装`webpack`时，我们需要同时安装`webpack-cli`（第三方的脚手架事实上是没有使用`webpack-cli`的，而是类似于自 己的`vue-service-cli`的东西

