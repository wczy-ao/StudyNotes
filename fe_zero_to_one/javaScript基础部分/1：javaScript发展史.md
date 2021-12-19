# JavaScript的发展史

## 发展史

### 1：浏览器与内核

| 主流浏览器 |     内核      |
| :--------: | :-----------: |
|     IE     |    trident    |
|    Edge    |     blink     |
|   chrome   | webkit blink  |
|   safari   |    webkit     |
|  firefox   |     gecko     |
|   opera    | presto->blink |

### 2：浏览器的历史和JS诞生

| 时间 |                                                              |
| :--: | :----------------------------------------------------------: |
| 1990 | 蒂姆.伯纳斯.李，第一个网页浏览器WorldWideWeb，移植到C  Libwww(真正意义上的浏览器),允许别人浏览他人编写的网站 |
| 1993 | 美国伊利诺大学 NCSA组织(马克.安德森)搞出了一个Mosaic浏览器，可以显示图片，第一个图形化浏览器 |
| 1994 | 马克.安德森和吉姆.克拉克共同创立Mosaic公司；(伊利诺大学把Mosaic商标权转让给spyglass公司)；为避免商标拥有权产生问题，Mosaic公司改名网景公司(Netscape)；搞出了个网页浏览器(Netscape Navigator) |
| 1996 | 1：微软收购spyglass -> IE浏览器；IE3 JSscript(脚本语言)；2：网景公司Brendan Eich在NetScape Navigator开发出了livescript；JAVA火起来，网景公司和Sun公司合作推广 livescript->JavaScript |
| 2001 |                    IE6 -> 单独形成JS引擎                     |
| 2003 |        Mozilla公司 firefox（Netscape Navigator开源）         |
| 2008 | Google基于webkit blink -> Chrome -> V8引擎(JS引擎)；V8的快在于两点；1：直接翻译机器码；2：独立于浏览器运行 |
| 2009 |         Oracle公司收购了Sun公司，JS的所有权归Oracle          |

## JavaScript的三部分

### 1：ECMA

European Computer Manufactures Association（欧洲计算机制造联合会）

- ECMA-262 脚本语言的规范 ECMAScript
  - ECMAScript（语法、类型、语句、关键字...）：由ECMA-262定义并提供核心功能。
- ES5 ES6 规范化脚本语言
  - 补充一些新的语法

### 2：DOM（Document Object Model）

提供与网页内容交互的方法和接口（W3C规范）。

### 3：BOM（Browser Object Model）

提供与浏览器交互的方法和接口（没有规范）。

