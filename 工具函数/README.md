# 工具函数
- [工具函数](#工具函数)
  - [深拷贝](#深拷贝)
  - [类型查找](#类型查找)
  - [滚动距离](#滚动距离)
  - [可视区域](#可视区域)
  - [滚动长度](#滚动长度)
  - [盒子到页面边缘距离](#盒子到页面边缘距离)
  - [鼠标坐标](#鼠标坐标)
  - [鼠标拖拽](#鼠标拖拽)
  - [元素属性](#元素属性)
  - [事件函数](#事件函数)
  - [移除事件](#移除事件)
  - [找子元素](#找子元素)
  - [找父元素](#找父元素)
  - [取消冒泡](#取消冒泡)
  - [文档解析](#文档解析)
  - [AJAX](#ajax)
  - [替换空格](#替换空格)
  - [时间日期](#时间日期)
  - [cookie](#cookie)
  - [请求数据](#请求数据)
  - [url参数获取](#url参数获取)
## 深拷贝

```js
function deepClone(origin, target) {
  //万一用户不传target参数，自己默认创建空对象
  var target = target || {},
    toStr = Object.prototype.toString,
    arrType = '[object Array]';

  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      if (typeof (origin[key]) === 'object' && origin[key] !== null) {

        if (toStr.call(origin[key]) === arrType) {
          target[key] = [];
        } else {
          target[key] = {};
        }

        deepClone(origin[key], target[key]);

      } else {
        target[key] = origin[key];
      }
    }
  }
  return target;
}
// // var person2 = deepClone(person1);
```



## 类型查找

```js
//封装myTypeof()
function myTypeof(val) {
  var type = typeof (val),
    toStr = Object.prototype.toString,
    res = {
      '[object Array]': 'array',
      '[object Object]': 'object',
      '[object Number]': 'object number',
      '[object String]': 'object string',
      '[object Boolean]': 'object boolean'
    }
  if (val === null){
    return 'null';
  } else if (type === 'object') {
    var ret = toStr.call(val);
    return res[ret];
    //返回原始值
    //
  } else {
    return type;
  }
}
```





## 滚动距离

```js
/**
 * 封装兼容IE8&IE9以下的滚动条距离函数
 * @返回值 返回左/上滚动距离
 * 找到滚动距离
 * getScrollOffset()
 */

function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else {
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}

getScrollOffset().top;
```



## 可视区域

```js
/**
 * 封装兼容IE8&IE9以下的可视区域宽高尺寸的函数
 * 获取可视窗口宽度/高度
 * 原理：判断模式是否为怪异
 */

function getViewportSize() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    if (document.compatMode === 'BackCompat') {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    } else {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
}

getViewportSize().width
```



## 滚动长度

```js
/**
 * 封装兼容IE8&IE9以下的滚动尺寸的函数
 * 获取整个文档的宽度/高度
 */

function getScrollSize() {
  if (document.body.scrollWidth) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}

getScrollSize().width
```



## 盒子到页面边缘距离

```js
/**
 * 封装合并子盒子与父盒子到左侧/上侧 到 页面左侧/上侧的 距离
 */

function getElemDocPosition(el) {
  //找到有定位的父级盒子
  var parent = el.offsetParent,
    //找到当前盒子左侧/上侧到页面左侧/上侧的距离
    offsetLeft = el.offsetLeft,
    offsetTop = el.offsetTop;

  // 如果parent存在
  while (parent) {
    // 循环出来的parent是定位元素
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    //重新赋值parent，找到外层盒子继续加
    parent = parent.offsetParent;
  }

  return {
    left: offsetLeft,
    top: offsetTop
  }
}

getElemDocPosition(son);
//{left: 230, top: 230}
```



## 鼠标坐标

```js
/**
 * 封装页面坐标函数pagePos()
 * @e 元素
 * @返回值 页面内的x/y坐标
 */

function pagePos(e) {
  //获取滚动条距离
  //使用获取滚动条距离函数
  var sLeft = getScrollOffset().left,
    sTop = getScrollOffset().top,
    //获取文档偏移
    //documentElement.clientLeft IE8及以下不存在(undefined)
    cLeft = document.documentElement.clientLeft || 0,
    cTop = document.documentElement.clientTop || 0;

  return {
    //可视区域坐标 + 滚动条距离 - 偏移距离
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop
  }
}
```



## 鼠标拖拽

```js
/**
 * 封装拖拽函数
 */

function elemDrag(elem) {
  var x, y;

  //鼠标按下时
  addEventListener(elem, "mousedown", function (e) {
    var e = e || window.event;
    //pagePos()找到鼠标点击的坐标
    //getStyles()找到目标元素左上顶点到浏览器窗口边缘的left/top值
    x = pagePos(e).X - getStyles(elem, "left");
    y = pagePos(e).Y - getStyles(elem, "top");

    addEventListener(document, "mouseMove", mousemove);
    addEventListener(document, "mouseUp", mouseup);
    cancelBubble(e);
    preventDefaultEvent(e);
  });

  //鼠标移动时
  function mouseMove(e) {
    var e = e || window.event;
    //鼠標移動后有新的pagePos().X/Y值
    //雖然鼠標位置變了，但是計算后的x/y值是不變的
    //新的pagePos().X/Y值 - x/y = 新目標元素到瀏覽器邊緣的距離 
    elem.style.top = pagePos(e).Y - y + "px";
    elem.style.left = pagePos(e).X - x + "px";
  }

  //鼠标抬起时释放绑定的事件
  function mouseUp(e) {
    var e = e || window.event;
    removeEvent(document, "mousemove", mouseMove);
    removeEvent(document, "mouseup", mouseUp);
  }
}
```



## 元素属性

```js
/**
 * 获取元素属性
 * @elem 元素
 * @prop 属性
 * @返回值 返回指定元素的属性值
 */

function getStyles(elem, prop) {
  //检测getComputedStyle是否存在
  if (window.getComputedStyle) {
    //存在，打印具体属性值
    if (prop) {
      return parseInt(window.getComputedStyle(elem, null)[prop]);
    }
    //不存在，打印集合
    return window.getComputedStyle(elem, null);
  } else {
    if (prop) {
      return parseInt(elem.currentStyle[prop]);
    } else {
      return elem.currentStyle;
    }
  }
}

getStyles(div);
getStyles(div, 'height'); //200px
```



## 事件函数

```js
/**
 * 封装兼容低版本的事件绑定处理函数
 * @el 元素
 * @type 事件类型
 * @fn 事件处理函数
 */
function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, function () {
      fn.call(el);
    })
  } else {
    el['on' + type] = fn;
  }
}
```



## 移除事件

```js
/**
 * 解除事件处理函数
 * @el 元素
 * @type 事件类型
 * @fn 事件处理函数
 */

function removeEvent(elem, type, fn) {
  if (elem.addEventListener) {
    elem.removeEventListener(type, fn, false);
  } else if (elem.attachEvent) {
    elem.detachEvent('on' + type, fn);
  } else {
    elem['on' + 'type'] = null;
  }
}
```





## 找子元素

```js
//找子元素函数
function elemChildren(node) {
  var temp = {
    'length': 0,
    'push': Array.prototype.push,
    'splice': Array.prototype.splice
  };

  var children = node.childNodes,
    len = children.length,
    item;

  for (var i = 0; i < len; i++) {
    item = children[i];
    if (item.nodeType === 1) {
      temp.push(item);
    }
  }
  return temp;
}
```



## 找父元素

```js
  /**
   * 封装找父级元素的函数
   * @node 子元素节点
   * @n 寻找第几个父级元素
   * @返回值 返回父级元素
   */
  function elemParent(node, n) {
    var type = typeof (n);

    if (type === 'undefined') {
      return node.parentNode;
    } else if (n <= 0 || type !== 'number') {
      return undefined;
    }

    while (n) {
      node = node.parentNode;
      n--;
    }
    return node;
  }
```



## 取消冒泡

```js
/**
 * 兼容性写法封装：
 * 封装取消冒泡方法
 */

function cancelBubble(e) {
  var e = e || window.event;
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }
}
```



## 文档解析

```js
function domReady(fn) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
      //释放内容
      document.removeEventListener('DOMContentLoaded', arguments.callee, false);
      fn();
    }, false);
    //兼容IE
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function () {
      //文档加载完成
      if (this.readyState === 'complete') {
        document.attachEvent('onreadystatechange', arguments.callee);
        fn();
      }
    })
  }
  //doScroll可以操作滚动条
  //如果文档没有解析完渲染完会报错
  if (document.documentElement.doScroll && typeof (window.frameElement) === 'undefined') {
    try {
      document.documentElement.doScroll('left');

    } catch (e) {
      return setTimeout(arguments.callee, 20);
    }
    fn();
  }
}
domReady(fn);
```



## AJAX

```JS
/**
 * AJAX封装
 * 
 * 调用写法一：
 * $.ajax({
 *   url: 'xxx',
 *   type: 'POST',
 *   dataType: 'JSON',
 *   data: {
 *     status: 1
 *   },
 *   success: function (data) {
 *     console.log(data);
 *   }
 * })
 * 
 * 调用写法二：
 * $.post('http://localhost/xxx', { status: 1 }, function (data) { console.log(data); });
 * 
 * 调用写法三：
 * $.get('http://localhost/xxx?status=1', function (data) { console.log(data); });
 * 
 * 
 */

//老写法：
// var $ = {
//   ajax: function (opt) {
//     var url = opt.url;
//     console.log(url);
//   },
//   post: function () {
//     console.log('post');
//   },
//   get: function () {
//     console.log('get');
//   }
// }

// 模块化写法
var $ = (function () {
  //利用_doAjax函数传参拿到局部作用域ajax函数里的形参
  function _doAjax(opt) {
    //兼容IE5,IE6
    var o = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    //IE4及以下
    if (!o) {
      throw new Error('您的浏览器不支持异步发起HTTP请求');
    }

    //初始化传入的配置
    var opt = opt || {},
      // console.log(opt); //{type: "POST"}
      //初始化请求类型为GET
      type = (opt.type || 'GET').toUpperCase(),
      // console.log(type); //POST
      // 同步/异步 false/true
      async = '' + opt.async === 'false' ? false : true,
        url = opt.url,
        //如果GET请求就为null
        data = opt.data || null,
        //响应数据
        dataType = opt.dataType || 'JSON',
        //后端定义的cb或callback字符串
        jsonp = opt.jsonp || 'cb',
        //定义的函数名称方便给后端匹配
        jsonpCallback = opt.jsonpCallback || 'jQuery' + randomNum() + '_' + new Date().getTime(),
        timeout = opt.timeout || 30000,
        error = opt.error || function () {},
        success = opt.success || function () {},
        //不管成功或失败都执行complete函数
        complete = opt.complete || function () {},

        // 初始化定时器
        t = null;

    if (!url) {
      throw new Error('您没有填写url');
    }

    if (dataType.toUpperCase === 'JSONP' && type !== 'GET') {
      throw new Error('如果dataType为JSONP,请您将type设置为GET');
    }

    //格式: xxx.domain.com/xxx.php?jsonp=jsonpCallback
    //情况1:xxx.domain.com/xxx.php?cb=test
    //情况2:xxx.domain.com/xxx.php?wd=xxx&cb=test
    if (dataType.toUpperCase() === 'JSONP') {
      var oScript = document.createElement('script');
      oScript.src = url.indexOF('?') === -1 ?
        //情况1:如果没有? 则加?
        url + '?' + jsonp + '=' + jsonpCallback :
        //情况2:如果有? 证明多参数情况下加 & 隔开
        url + '&' + jsonp + '=' + jsonpCallback;
      document.body.appendChild(oScript);
      document.body.removeChild(oScript);

      //定义函数并挂载到window
      window[jsonpCallback] = function (data) {
        //关联ajax里的success函数,执行success函数
        success(data);
      }
      //阻止ajax向下执行
      return;
    }

    /**发送HTTP请求
     * @type 请求类型
     * @url 请求地址
     * @async 异步/同步
     */
    o.open(type, url, async);

    //超时设置 写法一： 设置超时时间 30s 
    //兼容性不太好
    // o.ontimeout = 30000;

    //设置POST请求头
    //如果为真走后面
    type === 'POST' && o.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    //如果是GET请求，不用传参数
    o.send(type === 'GET' ? null : formatDatas(data));

    //监听响应事件
    o.onreadystatechange = function () {
      if (o.readyState === 4) {
        //请求已完成，且响应已就绪
        if (o.status >= 200 && o.status < 300 && o.status === 304) {
          switch (dataType.toUpperCase()) {
            case 'JSON':
              // 成功时响应服务器JSON数据
              success(JSON.parse(o.responseText));
              break;
            case 'TEXT':
              // 成功时响应服务器文本数据
              success(o.responseText);
              break;
            case 'XML':
              // 成功时响应服务器XML数据
              success(o.responseXML);
              break;
            default:
              // 默认响应服务器JSON数据
              success(JSON.parse(o.responseText));
          }
        } else {
          error();
        }
        // 无论成功与否都要执行complete函数
        complete();
        clearTimeout(t);
        t = null;
        o = null;
      }
    }

    // 超时设置 写法一：
    //只要超时就会执行的函数
    //兼容性不太好
    // o.ontimeout = function () {
    //   //o对象的所有程序都会中止
    //   o.abort();
    //   //并销毁对象
    //   o = null;
    // }

    // 超时设置 写法二：
    t = setTimeout(function () {
      //o对象的所有程序都会中止
      o.abort();
      clearTimeout(t);
      t = null;
      o = null;
      //抛出错误
      throw new Error('This request has been timeout for' + url);
    }, timeout);
  }

  //希望将{status:1,flag:2}转为'status=1&flag=2'
  //格式化传入的data数据
  function formatDatas(obj) {
    var str = '';
    for (var key in obj) {
      str += key + '=' + obj[key] + '&';
    }
    //去掉最后一项的 &
    //正则规则：以&结尾 替换为空字符
    return str.replace(/&$/, '');
  }

  return {
    ajax: function (opt) {
      _doAjax(opt);
    },
    get: function (url, dataType, successCB, errorCB, completeCB) {
      _doAjax({
        type: 'GET',
        url: url,
        dataType: dataType,
        success: successCB,
        error: errorCB,
        complete: completeCB
      });
    },
    post: function (url, data, dataType, successCB, errorCB, completeCB) {
      _doAjax({
        type: 'POST',
        url: url,
        data: data,
        dataType: dataType,
        success: successCB,
        error: errorCB,
        complete: completeCB
      });
    }
  }
})();

//随机生成
function randomNum() {
  var num = '';
  for (var i = 0; i < 20; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}
```



## 替换空格

```js
function trimSpace(str) {
  return str.replace(/\s+/gim, '');
}
```





## 时间日期

```js
/**
 * 格式化时间日期
 * JavaScript时间单位带毫秒
 * PHP时间不带毫秒
 * @ts 时间戳 如1548744604
 * @type 日期格式 如日期/时间/日期+时间
 */
function getDateTime(ts, type) {
  // 转为字符串才有length属性
  var len = ts.toString().length;

  //证明是php以秒为单位的格式,需要转为JS单位
  if (len === 10) {
    ts = ts * 1000;
  }

  //获取年月日时分秒
  var dt = new Date(ts),
    y = dt.getFullYear(),
    //注意：month从0开始
    m = addZero(dt.getMonth() + 1),
    d = addZero(dt.getDate()),
    h = addZero(dt.getHours()),
    i = addZero(dt.getMinutes()),
    s = addZero(dt.getSeconds());

  switch (type) {
    case 'date':
      return y + '-' + m + '-' + d;
      break;
    case 'time':
      return h + ':' + i + ':' + s;
      break;
    case 'dateTime':
      return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
      break;
    default:
      return y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s;
  }

  //把一位数字补齐为两位 格式为 1 -> 01
  function addZero(num) {
    return num < 10 ? ('0' + num) : num;
  }
}
```





## cookie

```
/**
 * 封装cookie增删改查的函数
 */
var manageCookies = {
  /**
   * 设置cookie属性及时间
   * 例如：document.cookie = 'name=xiaohong;max-age=1000'
   * 注意：只能逐条设置
   * @param {*} key 属性名
   * @param {*} value 属性值
   * @param {*} expTime 过期时间
   * @returns 
   */
  set: function (key, value, expTime) {
    document.cookie = key + '=' + value + ';max-age=' + expTime;
    //实现链式调用
    return this;
  },

  /**
   * 删除cookie属性
   * 例如: document.cookie = 'name=xiaohong;max-age=-1'
   * @param {*} key 被删的属性
   */
  delete: function (key) {
    return this.set(key, '', -1);
  },

  /**
   * 查询cookie属性
   * 例如：document.cookie => 'hobby=basketball;sex=male;age=20'
   * 使用：get('hobby', function(data){console.log(data)})
   * @param {*} key 
   * @param {*} cb 
   * @returns 
   */
  get: function (key, cb) {
    //将拿到的字符串用冒号分割成为数组
    //'hobby=basketball;sex=male;age=20'
    // => ['hobby=basketball','sex=male','age=20']
    var CookiesArray = document.cookie.split('; ');

    for (var i = 0; i < CookiesArray.length; i++) {
      var CookieItem = CookiesArray[i];
      //循环每一项并用等号分割
      //['hobby','basketball']
      //['sex','male']
      //['age','20']
      var CookieItemArray = CookieItem.split('=');

      if (CookieItemArray[0] == key) {
        cb(CookieItemArray[1]);
        return this;
      }
    }
    //如果没有cookie里面的属性报undefined
    cb(undefined);
    return this;
  }
}
```



## 请求数据

```js
//api > request.js
//封装get请求函数
const ERR_OK = 200;

//柯里化的形式固定第一个参数
//http://localhost:8080/area/info?name=广州市
function getData(url) {
  return function (params) {
    return axios.get(url, params)
      .then(res => {
        const {
          status,
          data
        } = res;

        if (status === ERR_OK) {
          return data;
        }
      })
      .catch(e => {});
  }
}

export {
  getData
}
```

```js
//api > index.js
import {
  get
} from './request';

//它接收一个函数
const getCityInfo = get('/area/info');

export {
  getCityInfo
}
```





## url参数获取

```js
//获取url地址参数
function getUrlQueryParams(queryStr) {
  var result = {};

  //'?name=广州市&area=tianhe'
  //[?&]指的是以 ? 或 & 开头
  //[]指的是 一串非 ? 和 & 的字符 一个或多个
  // =
  var reg = /[?&][^?&]+=[^?&]+/g,
    found = queryStr.match(reg),
    tem,
    key,
    value;

  //['?name=广州市', '&area=tianhe']
  //有匹配结果时
  if (found) {
    found.forEach((item) => {
      //去除第一个字符 ? 或 &
      //以 = 隔开 拿到隔开后的数组 ['name', '广州市']
      tem = item.substring(1).split('=');
      key = tem[0];
      value = tem[1];
      result[key] = value;
    });
  }

  // console.log(result);
  //{name: '广州市', area: 'tianhe'}
  return result;
}
```

