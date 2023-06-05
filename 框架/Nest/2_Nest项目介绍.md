# Nest项目

通过cli创建简单demo，这里不做演示，直接看文档即可



## 目录说明

```js
+-- dist[目录]                      // 编译后的目录，用于预览项目
+-- node_modules[目录]              // 项目使用的包目录，开发使用和上线使用的都在里边
+-- src[目录]                       // 源文件/代码，程序员主要编写的目录
|  +-- app.controller.spec.ts      // 对于基本控制器的单元测试样例
|  +-- app.controller.ts           // 控制器文件，可以简单理解为路由文件
|  +-- app.module.ts               // 模块文件，在NestJS世界里主要操作的就是模块
|  +-- app.service.ts              // 服务文件，提供的服务文件，业务逻辑编写在这里
|  +-- app.main.ts                 // 项目的入口文件，里边包括项目的主模块和监听端口号
+-- test[目录]                      // 测试文件目录，对项目测试时使用的目录，比如单元测试...
|  +-- app.e2e-spec.ts             // e2e测试，端对端测试文件，测试流程和功能使用
|  +-- jest-e2e.json               // jest测试文件，jset是一款简介的JavaScript测试框架
+-- .eslintrc.js                   // ESlint的配置文件
+-- .gitignore                     // git的配置文件，用于控制哪些文件不受Git管理
+-- .prettierrc                    // prettier配置文件，用于美化/格式化代码的
+-- nest-cli.json                  // 整个项目的配置文件，这个需要根据项目进行不同的配置
+-- package-lock.json              // 防止由于包不同，导致项目无法启动的配置文件，固定包版本
+-- package.json                   // 项目依赖包管理文件和Script文件，比如如何启动项目的命令
+-- README.md                      // 对项目的描述文件，markdown语法
+-- tsconfig.build.json            // TypeScript语法构建时的配置文件
+-- tsconfig.json                  // TypeScript的配置文件，控制TypeScript编译器的一些行为   
```





## 脚本说明

```js
"start": "nest start",                              // 最常用的开始模式
"start:dev": "nest start --watch",                  // 开发模式的启动 有监视功能
"start:debug": "nest start --debug --watch",        // 调试Bug时的启动 调试程序时使用
```

