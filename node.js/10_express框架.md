# Express

目前在Node中比较流行的Web服务器框架是express、koa；

**Express整个框架的核心就是中间件，理解了中间件其他一切都非常简单！**



## Express安装

express的使用过程有两种方式：

1. 通过express提供的脚手架，直接创建一个应用的骨架；
   - `npm install -g express-generator `安装脚手架
   - `express express-demo`  创建项目
   - `npm install` 安装依赖
   - `node bin/www` 启动项目
2. 从零搭建自己的express应用结构
   - `npm init -y`

## 基本使用

```js
const express = require("express");
const app = express();
app.get("/", (req, res, next) => {
  res.end("hello express");
});

app.listen(8000, () => {
  console.log("express 开启了");
});
```

相比于原生的`http`模块，`express`在`url`，请求方法等方面的体验是大大提高了的

## 中间件

Express是一个路由和中间件的Web框架，它本身的功能非常少，**Express应用程序本质上是一系列中间件函数的调用；**



**中间件的定义：**

中间件的本质是传递给`express`的一个回调函数；函数有三个参数：

- 请求对象（`request`对象）
- 响应对象（`response`对象）
- `next`函数（在`express`中定义的用于执行下一个中间件的函数）；



**中间件的作用：**