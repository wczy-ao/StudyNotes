# forEach中的回调函数为什么不支持async

## 起因

今天写代码遇到一个问题，我在一个方法中使用了forEach，并添加了async，如下：

```js
const fun2 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("222");
    }, 1000);
  });
};
const fun3 = function () {
  return new Promise(function (resolve, reject) {
    resolve("333");
  });
};
var list = [fun2, fun3];

list.forEach(async(fn) => {
  const res = await fn()
  console.log(res);
})

/**
 * 我想要的结果是：
 * 222
 * 333
 */

/**
 * 实际的结果是：
 * 333
 * 222
 */
```



我查询了比较多的笔记，基本都是说结论，没有探究内部！



## 解释

于是我看了下forEach的源码，找到了关键的地方：`while 循环`

```js
Array.prototype.forEach =function(callback/*, thisArg*/) {
  var T, k;
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  var O = Object(this);
  var len = O.length >>> 0;
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  if (arguments.length > 1) {
    T = arguments[1];
  }
  k = 0;
  while (k < len) {
    var kValue;
    if (k in O) {
      kValue = O[k];
      callback.call(T, kValue, k, O); 
    }
    k++;
  }
};

list.forEach(async(fn) => {
  const res = await fn()
  console.log(res);
})
```



```js
while (k < len) {
  var kValue;
  if (k in O) {
    kValue = O[k];
    // callback：具体函数，T：undefined，kValue：数组中的每一项，k：次序，O：整个数组
    callback.call(T, kValue, k, O);
  }
  k++;
}


// 由于T是undefined，那就相当于 callback(kValue)，也就是直接在window上面直接注册两个async函数
(async(fun3) => {
  const res = await fun3()
  console.log(res);
})()
(async(fun4) => {
  const res = await fun4()
  console.log(res);
})()

// async 函数只能控制内部函数按着await 顺序同步进行，如果是多个async就不能保证同步就行了，因为系统会调用这一系列的函数，执行快慢取决于内部
```



## for 为什么可以实现

```js
const forFun = async () => {
  for (let index = 0; index < list.length; index++) {
    const fn = list[index];
    const res = await fn(); // 所有的都在一个async中，所以可以同步
    console.log(res);
  }
};

forFun()
```



## 总结

`forEach`不支持回调函数使用`async`，是由于内部是通过`while`循环往外注册函数导致的，相当于表面`forEach`回调的一个`async`，在内部变成了多个 `async` 且立即执行，这样就不能保证同步了