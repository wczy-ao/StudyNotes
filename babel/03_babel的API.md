# babel的API

我们知道 babel 的编译流程分为三步：parse、transform、generate，每一步都暴露了一些 api 出来。

- parse 阶段有`@babel/parser`，功能是把源码转成 AST
- transform 阶段有 `@babel/traverse`，可以遍历 AST，并调用 visitor 函数修改 AST
  - 修改 AST 自然涉及到 AST 的判断、创建、修改等，这时候就需要 `@babel/types` 了
  - 需要批量创建 AST 的时候可以使用 `@babel/template` 来简化 AST 创建逻辑。

- generate 阶段会把 AST 打印为目标代码字符串，同时生成 sourcemap，需要 `@babel/generator` 包

- 中途遇到错误想打印代码位置的时候，使用 `@babel/code-frame` 包

- babel 的整体功能通过 `@babel/core` 提供，基于上面的包完成 babel 整体的编译流程，并应用 plugin 和 preset



## @babel/parser

`babel parser` 默认只能 `parse js` 代码，`jsx`、`flow`、`typescript` 这些非标准的语法的解析需要指定语法插件。

**它提供了有两个 `api：parse` 和 `parseExpression`。两者都是把源码转成 `AST`，粒度不同。**

- `parse` 返回的 `AST` 根节点是 `File`（整个 `AST`）
- `parseExpression` 返回的 `AST` 根节点是是 `Expression`（表达式的 `AST`）