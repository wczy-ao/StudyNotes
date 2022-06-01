# 认识 TypeScript

## 安装

```ts
npm install -g typescript
tsc hello.ts

tsc —— TypeScript 编译器
```



## TypeScript 知识补充

- TypeScript 代码转换为 JavaScript 代码、大部分 TypeScript 独有的代码会被抹除、比如类型注解

- **TypeScript 默认将 ES6 以及后面的语法转换为 ES3   `tsc --target es2015 hello.ts` 指定 ts 编译出来的 js 版本** 
- tsc 只是转译，并不执行，对于一些 null undefined 造成的错误不会发现

- **ts.config.json 的配置；主要是 `noImplicitAny` 和 `strictNullChecks`  一个处理 any 一个处理 null 和 undefined**

- 对于变量的类型注解，并不总是需要类型注解