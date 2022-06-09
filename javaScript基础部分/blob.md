# Blob对象

## 简介：

Blob 对象表示一个二进制文件的数据内容，比如一个图片文件的内容就可以通过 Blob 对象读写。它通常用来读写文件，它的名字是 Binary Large Object （二进制大型对象）的缩写。它用于**操作二进制文件**。

与Date，Number等构造函数不同的是，浏览器原生提供`Blob()`构造函数，用来生成实例对象。

`Blob`构造函数接受两个参数。第一个参数是数组，成员是字符串或二进制对象，表示新生成的`Blob`实例对象的内容；第二个参数是可选的，是一个配置对象，目前只有一个属性`type`，它的值是一个字符串，表示数据的 MIME 类型，默认是空字符串。

```js
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'})
```

## 实例属性和实例方法

`Blob`具有两个实例属性`size`和`type`，分别返回数据的大小和类型

```js
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});

myBlob.size // 32
myBlob.type // "text/html"
```

`Blob`具有一个实例方法`slice`，用来拷贝原来的数据，返回的也是一个`Blob`实例。

`slice`方法有三个参数，都是可选的。它们依次是起始的字节位置（默认为0）、结束的字节位置（默认为`size`属性的值，该位置本身将不包含在拷贝的数据之中）、新实例的数据类型（默认为空字符串）。

```js
myBlob.slice(start, end, contentType)
```

## Blob的操作

### 下载文件

AJAX 请求时，如果指定`responseType`属性为`blob`，下载下来的就是一个 Blob 对象。

```js
function getBlob(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    callback(xhr.response);
  }
  xhr.send(null);
}
```

### 生成 URL

浏览器允许使用`URL.createObjectURL()`方法，针对 Blob 对象生成一个临时 URL，方便图片视频的预览或者文件的下载；如：

```js
// 服务获得的data是二进制文件，转为blob对象
let url = window.URL.createObjectURL(new Blob([data]))
let link = document.createElement('a')
link.style.display = 'none'
link.href = url
link.setAttribute('download', fileName)
document.body.appendChild(link)
link.click()
document.body.removeChild(link) // 下载完成移除元素
window.URL.revokeObjectURL(url) // 释放掉blob对象
```

