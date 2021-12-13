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



### **中间件的定义：**

中间件的本质是传递给`express`的一个回调函数；函数有三个参数：

- 请求对象（`request`对象）
- 响应对象（`response`对象）
- `next`函数（在`express`中定义的用于执行下一个中间件的函数）；



### **中间件的作用：**

- 执行任何代码；
- 更改请求（request）和响应（response）对象
- 结束请求-响应周期（返回数据）；
- 调用栈中的下一个中间件

如果当前中间件功能没有结束请求-响应周期，则必须调用next()将控制权传递给下一个中间件功能，否则，请求 将被挂起。



### 中间件的类型：

> 若有多个中间件则按照顺序执行，任何方法类型都行

- 普通的中间件

  ```js
  const app = express();
  
  // 编写普通的中间件
  // use注册一个中间件(回调函数)
  app.use((req, res, next) => {
    console.log("注册了第01个普通的中间件~");
    next();
  });
  
  app.listen(8000, () => {
    console.log("普通中间件服务器启动成功~");
  });
  
  ```

- path匹配中间件

  ```js
  app.use((req, res, next) => {
    console.log("common middleware01");
    next();
  })
  
  // 路径匹配的中间件
  app.use('/home', (req, res, next) => {
    console.log("home middleware 01");
  });
  ```

- path和method匹配中间件

  ```js
  app.get('/home', (req, res, next) => {
    console.log("home path and method middleware01");
  });
  
  app.post('/login', (req, res, next) => {
    console.log("login path and method middleware01");
  })
  ```

- 注册多个中间件

  ```js
  app.get("/home", (req, res, next) => {
    console.log("home path and method middleware 02");
    next();
  }, (req, res, next) => {
    console.log("home path and method middleware 03");
    next();
  }, (req, res, next) => {
    console.log("home path and method middleware 04");
    res.end("home page");
  });
  ```



## 应用中间件

并非所有的中间件都需要我们从零去编写，express有内置一些帮助我们完成对request解析的中间件；

#### 1：body解析

在客户端发送post请求时，会将数据放到body中；客户端可以通过json的方式传递；也可以通过form表单的方式传递；

如果自己编写中间件的话：

```js
// 自己编写的json解析
app.use((req, res, next) => {
  if (req.headers["content-type"] === "application/json") {
    req.on("data", (data) => {
      const info = JSON.parse(data.toString());
      req.body = info;
    });

    req.on("end", () => {
      next();
    });
  } else {
    next();
  }
});
```

内置中间件编写：

```js
app.use(express.json());// 先使用普通中间件
app.post("/login", (req, res, next) => {
  console.log(req.body);
  res.end("Coderwhy, Welcome Back~");
});
```

#### 2：文件上传

在http模块那章我们编写上传组件代码比较麻烦，在这里我们可以使用express提供的multer来完成：

```js
const multer = require("multer");
const upload = multer({
  dest: "./uploads/",
});
app.post("/upload", upload.single("file"), (req, res, next) => {
  console.log(req.file);
  res.end("文件上传成功~");
});
```

文件上传成功但是打不开

#### 3：参数传递

两种，一种query模式，一种prams模式

```js
// 1：query
// url:http://localhost:8000/login?username=why&password=123
app.get('/login', (req, res, next) => {
  console.log(req.query);
  res.end("用户登录成功~");
})
// 2：params
// url:http://localhost:8000/login/abc/why
app.get('/products/:id/:name', (req, res, next) => {
  console.log(req.params);
  // req.params => 在数据库中查询真实的商品数据
  res.end("商品的详情数据~");
})
```

#### 4：响应数据

- end方法：类似于http中的response.end方法，用法是一致的
- json方法：json方法中可以传入很多的类型：object、array、string、boolean、number、null等，它们会被转换成 json格式返回；



## Express路由

如果所有代码逻辑都写在app中，app里面的逻辑会变得复杂；这个时候可以使用路由来分别处理；

```js
// user.js
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json(["why", "kobe", "lilei"]);
});

router.get('/:id', (req, res, next) => {
  res.json(`${req.params.id}用户的信息`);
});

router.post('/', (req, res, next) => {
  res.json("create user success~");
});

module.exports = router;

// index.js
const userRouter = require('./routers/users');
app.use("/users", userRouter);
```

## 静态资源服务器

```js
const express = require('express');

const app = express();

app.use(express.static('./build'));

app.listen(8000, () => {
  console.log("路由服务器启动成功~");
});

```

