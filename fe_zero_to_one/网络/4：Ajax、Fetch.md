# Ajax、Fetch

[文章来源](https://juejin.cn/post/6844903618764603399)

[TOC]

## Ajax

### 什么是Ajax

**Ajax是一种异步请求数据的web开发技术**，简单地说，**在不需要重新刷新页面的情况下，Ajax 通过异步请求加载后台数据，并在网页上呈现出来**。**Ajax的目的是提高用户体验，减少网络数据的传输量。**同时，由于AJAX请求获取的是数据而不是HTML文档，因此它也节省了网络带宽，让互联网用户的网络冲浪体验变得更加顺畅。




### Ajax原理是什么

浏览器提供的XMLHttpRequest对象，使得浏览器可以发出HTTP请求与接收HTTP响应。**浏览器接着做其他事情，等收到XHR返回来的数据再渲染页面**。



### Ajax的使用

#### 创建XHR(兼容IE)

```js
var xhr = null;
if (window.XMLHttpRequest) {
  // 兼容 IE7+, Firefox, Chrome, Opera, Safari
  xhr = new XMLHttpRequest();
} else {
  // 兼容 IE6, IE5
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
}
```



#### 发送

```js
xhr.open(method,url,async);  
xhr.send(string);//post请求时才使用字符串参数，否则不用带参数。
```

- method：请求的类型；GET 或 POST
- url：文件在服务器上的位置
- async：true（异步）或 false（同步） **注意：post请求一定要设置请求头的格式内容**

```js
xhr.open("POST","test.html",true);  
// setRequestHeader此方法必须在 open() 方法和 send() 之间调用
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
xhr.send("fname=Henry&lname=Ford");  //post请求参数放在send里面，即请求体
```



#### 响应处理

分为两种同步和异步

**响应数据：**

1. responseText 获得字符串形式的响应数据。

2. esponseXML 获得XML 形式的响应数据。

##### 同步

直接从 XHR 对象中取响应数据

```js
xhr.open("GET","info.txt",false);  
xhr.send();  
document.getElementById("myDiv").innerHTML=xhr.responseText; //获取数据直接显示在页面上
```

##### 异步

在请求状态改变事件中处理。

```js
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    document.getElementById("myDiv").innerHTML = xhr.responseText;
  }
};
```

##### readyState

0：未初始化 -- 尚未调用.open()方法；

1：启动 -- 已经调用.open()方法，但尚未调用.send()方法；

2：发送 -- 已经调用.send()方法，但尚未接收到响应；

3：接收 -- 已经接收到部分响应数据；

4：完成 -- 已经接收到全部响应数据，而且已经可以在客户端使用了；



### Ajax的封装

```js
<script>
        // 封装自己的ajax函数
        /* 参数1：{string} method 请求方法
           参数2：{string} url 请求地址
           参数2：{Object} params 请求参数
           参数3：{function} done 请求完成后执行的回调函数
        */
       function ajax(method,url,params,done){
            // 创建xhr对象，兼容写法
            var xhr = window.XMLHttpRequest 
            ? new XMLHttpRequest()
            : new ActiveXObject("Microsoft.XMLHTTP");

            // 将method转换成大写
            method = method.toUpperCase();
            // 参数拼接
            var pair = [];
            for(var k in params){
                pair.push(k + "=" + params[k]);
            }
            var str = pair.join("&");
            // 判断请求方法
            if(method === "GET"){
                // 字符串拼接 或者 模板字符串
                url += "?" + str;
            }
            xhr.open(method,url);

            var data = null;
            if(method === "POST"){
                // 需要请求头
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                data = str;
            }
            xhr.send(data);

            // 指定xhr状态变化事件处理函数
            // 执行回调函数
            xhr.onreadystatechange = function (){
                if(this.readyState === 4){
                    // 返回的应该是一个对象，这样客户端更好渲染
                    done(JSON.parse(xhr.responseText));
                }
            }
       }

    //    调用自己写的ajax函数
    ajax("get","http://localhost:3000/users",{
        name:"zs",
        age:45
    },function (a){
        console.log(a);
    });
</script>
```



## Fetch

### Fetch是什么

fetch号称是ajax的替代品，它的API是基于Promise设计的，旧版本的浏览器不支持Promise，需要使用polyfill es6-promise

### Fetch的用法

**举个例子：**

```js
// 原生XHR
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText)   // 从服务器获取数据
    }
}
xhr.send()
// fetch
fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err))
```

**加上await：**

```js
try {
  let response = await fetch(url);
  let data = response.json();
  console.log(data);
} catch(e) {
  console.log("Oops, error", e);
}
// 注：这段代码如果想运行，外面需要包一个 async function
```



### Fetch的坑

1. Fetch 请求默认是不带 cookie 的，需要设置 `fetch(url, {credentials: 'include'})`
2. 服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。

