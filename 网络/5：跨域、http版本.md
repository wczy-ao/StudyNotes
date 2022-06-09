# 跨域、http版本、http安全

[TOC]



## 跨域

### 同源策略

同源指的是我们访问站点的：`协议`、`域名`、`端口号`必须一至，才叫`同源`。

```
eg
https://juejin.cn/post
https://juejin.cn:80/post
```

上面两个url并不同源，https的端口号默认为443

#### 同源策略的限制

1. **DOM层面**：不同源站点之间不能相互访问和操作DOM
2. **数据层面**：不能获取不同源站点的Cookie、LocalStorage、indexDB等数据
3. **网络层面**：不能通过XMLHttpRequest向不同源站点发送请求



### 什么是跨域？

`不同域`之间相互请求资源，就算作`跨域`



#### 怎么处理跨域

网上有十种跨域大法（真让人头大），我这里给出三种 `Jsonp` `CORS` `Nginx`

#### 标签跨域

这三个标签是允许跨域加载资源：

- `<img src=XXX>`
- `<link href=XXX>`
- `<script src=XXX>`

#### `Jsonp` 

利用 `<script>` 标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的 JSON 数据。**JSONP请求一定需要对方的服务器做支持才可以**。

**实现如下：**

```js
// html
let script = document.createElement('script')
script.type = 'text/javascript'
script.src = 'http://localhost:3000/say?callback=handleCallback'
document.body.appendChild(script)
function handleCallback(res) {
    console.log(res)
}
```



```js
// server.js
let express = require("express");
let app = express();
app.get("/say", function (req, res) {
  let { callback } = req.query;
  res.end(`${callback}('6666')`);
});
app.listen(3000);
```



#### `CORS`

**CORS 需要浏览器和后端同时支持。IE 8 和 9 需要通过 XDomainRequest 来实现**。

浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域。**服务端设置 Access-Control-Allow-Origin 就可以开启 CORS**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script>
        // index.html
        let xhr = new XMLHttpRequest()
        document.cookie = 'name=xiamen' // cookie不能跨域
        xhr.withCredentials = true // 前端设置是否带cookie
        xhr.open('PUT', 'http://localhost:4000/getData', true)
        xhr.setRequestHeader('name', 'xiamen')
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    console.log(xhr.response)
                    //得到响应头，后台需设置Access-Control-Expose-Headers
                    console.log(xhr.getResponseHeader('name'))
                }
            }
        }
        xhr.send()
    </script>
</body>

</html>
```



```js
//server.js
let express = require("express");
let app = express();
let whitList = ["http://127.0.0.1:5500"]; //设置白名单
app.use(function (req, res, next) {
  let origin = req.headers.origin;
  if (whitList.includes(origin)) {
    console.log(1);
    // 设置哪个源可以访问我
    res.setHeader("Access-Control-Allow-Origin", origin);
    // 允许携带哪个头访问我
    res.setHeader("Access-Control-Allow-Headers", "name");
    // 允许哪个方法访问我
    res.setHeader("Access-Control-Allow-Methods", "PUT");
    // 允许携带cookie
    res.setHeader("Access-Control-Allow-Credentials", true);
    // 预检的存活时间
    res.setHeader("Access-Control-Max-Age", 6);
    // 允许返回的头
    res.setHeader("Access-Control-Expose-Headers", "name");
    if (req.method === "OPTIONS") {
      res.end(); // OPTIONS请求不做任何处理
    }
  }
  next();
});
app.put("/getData", function (req, res) {
  console.log(req.headers);
  res.setHeader("name", "jw"); //返回一个响应头，后台需设置
  res.end("我不爱你");
});
app.get("/getData", function (req, res) {
  console.log(req.headers);
  res.end("我不爱你");
});
app.use(express.static(__dirname));
app.listen(4000);
```



####  `Nginx`

浏览器之前有同源策略，服务器之间没有这个限制

`Nginx`实现原理类似于Node中间件代理，需要你搭建一个中转nginx服务器，用于转发请求。

**通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。**

```js
// proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;
    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
```



## http版本

| http 0.9                     | http 1.0                                                     | http 1.1                                      | http 2.0                                                     |
| ---------------------------- | ------------------------------------------------------------ | --------------------------------------------- | ------------------------------------------------------------ |
| 仅支持GET请求方式。          | 增加POST和HEAD请求方式。                                     | **默认开启Connection:keep-alive**             | 增加双工模式（客户端同时发送多个请求，服务端同时处理多个请求） |
| 仅能请求访问HTML格式的资源。 | 支持多种数据格式的请求与访问。                               | **增加管道机制。（支持多个请求同时发送）**    | 二进制协议（头信息与数据体使用二进制进行传输）               |
|                              | **支持cache缓存功能。**                                      | **增加身份认证机制。**                        | 头信息压缩机制（每次请求都会带上所有信息发送给服务端【HTTP协议不带状态】） |
|                              | 新增状态码、多字符集支持、内容编码等。                       | 增加100状态码，（Continue）支持只发送头信息。 | 服务器推送（服务器会把客户端需要的资源一起推送到客户端，合适加载静态资源） |
|                              | **后期HTTP/1.0增加Connection:keep-alive字段（非标准字段），开始支持长连接。** | 增加Host字段。（指定服务器域名）              |                                                              |
|                              |                                                              | 增加PUT/PATCH/OPTION/DELETE等请求方式。       |                                                              |



## http安全