# node.js和浏览器

## 什么是Node.？

官方对Node.js的定义：

- Node.js是一个基于V8 JavaScript引擎的JavaScript运行时环境。

问题来了，什么是V8，什么是 JavaScript引擎，什么运行环境？，为什么JavaScript需要特别的运行环境？



在我们回答上述问题前，我们先了解下浏览器

## 浏览器

我们网上冲浪时有没有想过为什么我们能看到各种形形色色的信息，如美女照片，美食诱惑等等，这一些列的东西都与浏览器内核有关

### 浏览器内核

我们经常说的浏览器内核指的是浏览器的排版引擎（`layout engine`），也称为浏览器引擎（`browser engine`）、页面渲染引擎（`rendering engine`） 或样版引擎。

不同的浏览器有不同的内核组成：

- Gecko：早期被Netscape和Mozilla Firefox浏览器使用；
- Trident：微软开发，被IE4~IE11浏览器使用，但是Edge浏览器已经转向Blink；
- Webkit：苹果基于KHTML开发、开源的，用于Safari，Google Chrome之前也在使用；
- Blink：是Webkit的一个分支，Google开发，目前应用于Google Chrome、Edge、Opera等；



#### 内核的组成

先以WebKit为例，WebKit事实上由两部分组成的

- WebCore：负责HTML解析、布局、渲染等等相关的工作
- JavaScriptCore：解析、执行JavaScript代码

#### 内核的工作过程

![工作流程](D:\学习\StudyNotes\node.js\images\渲染引擎的工作流程.jpg)

但是在这个执行过程中，HTML解析的时候遇到了JavaScript标签，应该怎么办呢？毕竟script是可以内嵌的

- 会停止解析HTML，而去加载和执行JavaScript代码；
- 不会异步加载和执行JavaScript代码；这是因为JavaScript代码可以操作我们的DOM；这是因为JavaScript代码可以操作我们的DOM

这个时候我们的另一位朋友JavaScript引擎就要出来了，就是它来执行的JavaScript代码



### JavaScript引擎

#### 为什么需要JavaScript引擎呢？

因为引擎可以将JavaScript（高级语言）转向机器语言（低级语言），机器语言，才能被CPU所执行；

#### 常见的JavaScript引擎

- SpiderMonkey：第一款JavaScript引擎，由Brendan Eich开发（也就是JavaScript作者）；
- JavaScriptCore：WebKit中的JavaScript引擎，Apple公司开发；
- V8：Google开发的强大JavaScript引擎，也帮助Chrome从众多浏览器中脱颖而出；



我们这里以V8引擎为例，展开叙述：

#### V8引擎

> 工作流程：

![](D:\学习\StudyNotes\node.js\images\v8工作流程.jpg)

- Parse模块会将JavaScript代码转换成AST（抽象语法树），这是因为解释器并不直接认识JavaScript代码；
  - 如果函数没有被调用，那么是不会被转换成AST的；
  - Parse的V8官方文档：https://v8.dev/blog/scanner
- Ignition是一个解释器，会将AST转换成ByteCode（字节码）
  - 同时会收集TurboFan优化所需要的信息（比如函数参数的类型信息，有了类型才能进行真实的运算）；
  - 如果函数只调用一次，Ignition会执行解释执行ByteCode；
  - Ignition的V8官方文档：https://v8.dev/blog/ignition-interpreter
- TurboFan是一个编译器，可以将字节码编译为CPU可以直接执行的机器码；
  - 如果一个函数被多次调用，那么就会被标记为热点函数，那么就会经过TurboFan转换成优化的机器码，**提高代码的执行性能**；
  - TurboFan的V8官方文档：https://v8.dev/blog/turbofan-jit



## 浏览器和Node.js架构区别

> 区别

![](D:\学习\StudyNotes\node.js\images\js引擎和内核的区别.jpg)