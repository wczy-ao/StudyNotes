# 彻底搞明白Promise

## Promise是什么

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件的结果。

## Promise的内容

从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

### Promise的状态

`Promise`对象代表一个异步操作，有三种状态：

- `pending`（进行中）
- `fulfilled`（已成功）
- `rejected`（已失败）

**只有异步操作的结果**，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

#### 状态的改变

`romise`对象的状态改变，只有两种可能：

- `pending`变为`fulfilled`
- `pending`变为`rejected`

只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。



### Promise的缺点

1. 无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。
2. 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。
3. 当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。



### Promise的基本用法

ES6 规定，`Promise`对象是一个构造函数，用来生成`Promise`实例。

```js
const promise = Promise((resolve, reject) => {
    /**一些异步操作 */ 
    // const value = setTimeout(() => {
    //     return 100
    // }, 1000);
    if (value) {
        resolve(value)

    } else {
        reject(err)
    }
})
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

#### `resolve`的函数作用

将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；

#### `reject`函数的作用

将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。



`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

```js
promise.then(res=>{
    console.log('success');
},rej=>{
    console.log('failure');
})
```

`then`方法可以接受两个回调函数作为参数：

- 第一个回调函数是`Promise`对象的状态变为`resolved`时调用
- 第二个回调函数是`Promise`对象的状态变为`rejected`时调用

#### `resolve`和`reject`的参数

- `reject`的参数一般都是Error对象

- resolve的参数可以多种，但当参数是一个promise实例的时候；如

  ```js
  const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 3000)
  })
  
  const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000)
  })
  
  p2
    .then(result => console.log(result))
    .catch(error => console.log(error))
  ```

`p1`是一个 Promise，3 秒之后变为`rejected`。`p2`的状态在 1 秒之后改变，`resolve`方法返回的是`p1`。由于`p2`返回的是另一个 Promise，导致`p2`自己的状态无效了，由`p1`的状态决定`p2`的状态；

#### `Promise`对象实现异步加载图片

```js
const getJson = function (path) {
    const promise = new Promise((resolv, reject) => {
        const image = new Image()
        image.onload = function () {
            resolv(image)
        }
        image.onerror = function () {
            reject(new Error('image path error'))
        }
        image.src = path
    })
    return promise
}

getJson('./tool_current.png').then(res => {
    document.body.appendChild(res)
}).catch(err => {
    console.log(err);
})
```

#### `Promise`对象实现的 Ajax 

```js
const getJson = function (url) {
    const promise = new Promise((resolv, reject) => {
        const client = new XMLHttpRequest()
        const handler = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
        client.open('get', url)
        client.onreadystatechange = handler
        client.responseType = 'json'
        client.setRequestHeader("Accept", 'application/json')
        client.send()
    })
    return promise
}

getJSON("/posts.json").then(function (json) {
    console.log('Contents: ' + json);
}, function (error) {
    console.error('出错了', error);
});
```



### `Promise.prototype.then`

`then`方法是定义在原型对象`Promise.prototype`上的。它的作用是为 Promise 实例添加状态改变时的回调函数。`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数是`rejected`状态的回调函数，它们都是可选的。



**注意：**

`then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。

只要执行了`then`方法就会返回一个新的`promise`实例：

```js
const p =getJson('./tool_current.png').then(res=>{
    document.body.appendChild(res)
}).then(res=>{
    console.log(11);
}).then(res=>{
    console.log(res);
})
```

如果在then中显示的return 一个结果的活，同样也是一个新的promise实例，只是其`PromiseResult`的结果是return 的结果

```js
const p =getJson('./tool_current.png').then(res=>{
    document.body.appendChild(res)
}).then(res=>{
    return 'ssss'
}).then(res=>{
    console.log(res);
})
```



### `Promise.prototype.catch`

##### 基本概念

`Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

```js
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

`getJSON()`方法返回一个 Promise 对象，如果该对象状态变为`resolved`，则会调用`then()`方法指定的回调函数；如果异步操作抛出错误，状态就会变为`rejected`，就会调用`catch()`方法指定的回调函数，处理这个错误。另外，`then()`方法指定的回调函数，如果运行中抛出错误，也会被`catch()`方法捕获。

**连续出错呢**：

```js
getJSON('/post/1.json').then(function(post) {
  return getJSON(post.commentURL);
}).then(function(comments) {
  // some code
}).catch(function(error) {
  // 处理前面三个Promise产生的错误
});
```

上面代码中，一共有三个 Promise 对象：一个由`getJSON()`产生，两个由`then()`产生。它们之中任何一个抛出的错误，都会被最后一个`catch()`捕获。



##### **与`try/catch`的异同**

异：使用`try`必须要带上`catch`，`promise`里面可以不适用`catch`捕获错误

同：都不影响外层代码

```js
try {
    console.log(x);
} catch (err) {
    console.log(err);
}
console.log(2); // 不影响

const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);  // 不影响
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```



##### `catch`的返回

`catch()`方法返回的还是一个 Promise 对象，因此后面还可以接着调用`then()`方法。

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
```

上面代码运行完`catch()`方法指定的回调函数，会接着运行后面那个`then()`方法指定的回调函数。如果没有报错，则会跳过`catch()`方法。



如果最后一个`catcn`方法中抛出一个错误，后面没有别的`catch()`方法了，导致这个错误不会被捕获，也不会传递到外层。





### `Promise.prototype.finally`

`finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

`finally`本质上是`then`方法的特例。

```js
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);
```

面代码中，如果不使用`finally`方法，同样的语句需要为成功和失败两种情况各写一次。有了`finally`方法，则只需要写一次。

#### `finally`的实现

```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```



### `Promise.all`

`Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```
const p = Promise.all([p1, p2, p3]);
```

`Promise.all()`方法接受一个数组作为参数，`p1`、`p2`、`p3`都是 Promise 实例，**如果不是，就会先调用下面讲到的`Promise.resolve`方法，将参数转为 Promise 实例**，再进一步处理。另外，`Promise.all()`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。



`p`的状态由`p1`、`p2`、`p3`决定：

- 只有`p1`、`p2`、`p3`的状态都是`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

- 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

#### `Promise.all`的`catch`方法

如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。

```js
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]
```

上面代码中，`p1`会`resolved`，`p2`首先会`rejected`，但是`p2`有自己的`catch`方法，该方法返回的是一个新的 Promise 实例，`p2`指向的实际上是这个实例。该实例执行完`catch`方法后，也会变成`resolved`，导致`Promise.all()`方法参数里面的两个实例都会`resolved`，因此会调用`then`方法指定的回调函数，而不会调用`catch`方法指定的回调函数。



如果`p2`没有自己的`catch`方法，就会调用`Promise.all()`的`catch`方法。



### `Promise.race`

`Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```
const p = Promise.race([p1, p2, p3]);
```

只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

**race顾名思义：谁先执行谁就定义了状态**



### `Promise.resolve`

有时需要将现有对象转为 Promise 对象，`Promise.resolve()`方法就起到这个作用。



`Promise.resolve()`等价于下面的写法。

```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

`Promise.resolve()`方法的参数分成四种情况。

**1：参数是一个 Promise 实例**

如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

**2：参数是一个`thenable`对象**

`thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```

`Promise.resolve()`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then()`方法。

```js
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
  console.log(value);  // 42
});
```

上面代码中，`thenable`对象的`then()`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then()`方法指定的回调函数，输出42。

**3：参数不是具有`then()`方法的对象，或根本就不是对象**

如果参数是一个原始值，或者是一个不具有`then()`方法的对象，则`Promise.resolve()`方法返回一个新的 Promise 对象，状态为`resolved`。

```js
const p = Promise.resolve('Hello');

p.then(function (s) {
  console.log(s)
});
// Hello
```

**4：不带有任何参数**

`Promise.resolve()`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。



### `Promise.reject`

`Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

```js
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

