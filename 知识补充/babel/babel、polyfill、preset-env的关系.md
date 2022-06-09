# babel、polyfill、preset-env的关系

## Babel 工作原理

babel的工作过程分为三个阶段：**parsing(解析)、transforming（转化）、printing（生成）**

- parsing阶段babel内部的 babylon 负责将es6代码进行语法分析和词法分析后转换成抽象语法树
- transforming阶段内部的 babel-traverse 负责对抽象语法树进行变换操作
- printing阶段内部的 babel-generator 负责生成对应的代码

第二步的转化是重中之重，babel的插件机制也是在这一步发挥作用的，plugins在这里进行操作，**转化成新的AST**，再交给第三步的babel-generator。



## preset-env, polyfill, preset-env 区别

babel将ECMAScript 2015+ 版本的代码分为了两种情况处理：

- 语法层： let、const、class、箭头函数等，这些需要在构建时进行转译，是指在语法层面上的转译
- api方法层：Promise、includes、map等，这些是在全局或者Object、Array等的原型上新增的方法，它们可以由相应es5的方式重新定义

babel对这两种情况的转译是不一样的，我们需要给出相应的配置。

以下面代码为例子：

```js
//compiled.js
const fn = () => {
  console.log("wens");
};

const p = new Promise((resolve, reject) => {
  resolve("wens");
});
const list = [1, 2, 3, 4].map(item => item * 2);
```



### 加入preset-env

babel 官方定义的 presets 配置项表示的是一堆plugins的集合，省的我们一个个的写plugins

- 语法层面全部降级、api层面没有变化

```js
// 转译后的代码
//compiled.js
"use strict";
var fn = function fn() {
  console.log("wens");
};

var p = new Promise(function (resolve, reject) {
  resolve("wens");
});
var list = [1, 2, 3, 4].map(function (item) {
  return item * 2;
});
```



### 加入polyfill

 polyfill 就是把当前浏览器不支持的方法通过用支持的方法重写来获得支持。

```js
// index.js
import "@bable/polyfill";
const fn = () => {
  console.log("wens");
};
const p = new Promise((resolve, reject) => {
  resolve("wens");
});
const list = [1, 2, 3, 4].map(item => item * 2);
```



- 没有别的变化，就多了一行require("@bable/polyfill")
- 所有的polyfill都引入进来了

```js
// 转译后
// compiled.js
"use strict";

require("@bable/polyfill");

var fn = function fn() {
  console.log("wens");
};

var p = new Promise(function (resolve, reject) {
  resolve("wens");
});
var list = [1, 2, 3, 4].map(function (item) {
  return item * 2;
});
```



### 配置 useBuiltIns 按需加载

上面我们通过 `import "@bable/polyfill"` 的方式来实现针对api层面的“抹平”、从 babel v7.4.0开始官方就**不建议采取**这样的方式了。 因为引入 @bable/polyfill 就相当于在代码中引入下面两个库

```js
import "core-js/stable"; 
import "regenerator-runtime/runtime";
```

直接全局引入 polyfill 会有两个问题

1. 不能按需加载
2. 全局空间被污染、因为它是通过向全局对象和内置对象的prototype上添加方法来实现的



所以不要全局引入，只需按需配置即可

```js
// webpack.config.js
module.exports = {
  presets: [
    [
      "@babel/env",
      {
        useBuiltIns: "usage", // 实现按需加载
        corejs: { 
          version: 3, 
          proposals: true 
        }
      }
    ]
  ],
  plugins: []
};
```

```js
// 转译后的代码
// compiled.js
"use strict";

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

var fn = function fn() {
  console.log("wens");
};

var p = new Promise(function (resolve, reject) {
  resolve("wens");
});
var list = [1, 2, 3, 4].map(function (item) {
  return item * 2;
});
```



## 总结

babel提供了一个平台、它本身是不做任何polyfill的事情的、真正做事情的还是preset/env里面的东西