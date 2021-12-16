# Koa框架

一个非常流行的Node Web服务器框架就是Koa。Koa旨在为Web应用程序和API提供更小、更丰富和更强大的能力；相对于express具有更强的异步处理能力；Koa的核心代码只有1600+行，是一个更加轻量级的框架，我们可以根据需要安装和使用中间件；

## 初体验

```js
const Koa = require("koa");

const app = new Koa();

app.use((ctx, next) => {
  ctx.response.body = ctx.request;
  // ctx.response.body = "Helslo World";
});

app.listen(8000, () => {
  console.log("koa初体验服务器启动成功~");
});
```

## 中间件

`koa`通过创建的`app`对象，注册中间件只能通过use方法；

`koa`注册的中间件提供了两个参数：

- `ctx`：上下文（`Context`）对象；
  - `koa`并没有像`express`一样，将`req`和`res`分开，而是将它们作为 `ctx`的属性
  - `ctx`代表依次请求的上下文对象；
  - `ctx`.`request`：获取请求对象；
  - `ctx`.`response`：获取响应对象
- `next`：本质上是一个`dispatch`，类似于之前的`next`；



`Koa`并没有提供`methods`的方式来注册中间件；也没有提供`path`中间件来匹配路径；将路径和method分离的方法如下：

- 根据`request`自己来判断
- 使用第三方路由中间件

```js
app.use((ctx, next) => {
  if (ctx.request.url === '/login') {
    if (ctx.request.method === 'GET') {
      console.log("来到了这里~");
      ctx.response.body = "Login Success~";
    }
  } else {
    ctx.response.body = "other request~";
  }
});
```

## 路由

`koa`官方并没有给我们提供路由的库，我们可以选择第三方 库：`koa-router`

```js
// router/user.js
const Router = require('koa-router');

// users 前缀
const router = new Router({prefix: "/users"});

router.get('/', (ctx, next) => {
  ctx.response.body = "User Lists~";
});

router.put('/', (ctx, next) => {
  ctx.response.body = "put request~";
});


module.exports = router;

// index.js
const userRouter = require('./router/user');
const app = new Koa();
app.use(userRouter.routes());
```



## 参数解析

- `params`：`http://localhost:8000/users/sss`

```js
const router = new Router({ prefix: "/users" });
router.get("/:id", (ctx, next) => {
  ctx.response.body = ctx.params.id;
});
```

- `query`：`http://localhost:8000/login?username=why&password=123`

```js
const router = new Router({ prefix: "/users" });
router.get("/", (ctx, next) => {
  ctx.response.body = ctx.request.query;
});
```

- `json`数据和`x-www-form-urlencoded`：

```
app.use((ctx, next) => {
  console.log(ctx.request.body);
  ctx.response.body = ctx;
});
```

- `form-data`

```js
const multer = require("koa-multer");
const app = new Koa();
const upload = multer({});

app.use(upload.any());

app.use((ctx, next) => {
  console.log(ctx.req.body);
  ctx.response.body = ctx.req.body;
});
```

- 上传图片

```js
const Koa = require("koa");
const Router = require("koa-router");
const multer = require("koa-multer");

const app = new Koa();
const uploadRouter = new Router({ prefix: "/upload" });

const upload = multer({
  dest: "./uploads/",
});

uploadRouter.post("/avatar", upload.single("avatar"), (ctx, next) => {
  console.log(ctx.req.file);
  ctx.response.body = "上传头像成功~";
});

app.use(uploadRouter.routes());

app.listen(8000, () => {
  console.log("koa初体验服务器启动成功~");
});
```

## 响应

状态码：`ctx.status = 404/ctx.response.status = 400`

body：

将响应主体设置为以下之一：

- string
- Buffer
- Stream
- Object|| Array
- null

- 如果response.status尚未设置，Koa会自动将状态设置为200或204。



## 静态服务器

koa并没有内置部署相关的功能，所以我们需要使用第三方库：

`npm install koa-static`

```js
const Koa = require('koa');
const staticAssets = require('koa-static');

const app = new Koa();

app.use(staticAssets('./build'));

app.listen(8000, () => {
  console.log("koa初体验服务器启动成功~");
});
```

