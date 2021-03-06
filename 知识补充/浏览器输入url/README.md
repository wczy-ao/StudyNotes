# 浏览器输入URL

老生常谈的面试题了、简单讲就是以下几个步骤

- DNS 域名解析
- 建立TCP连接
- 发送HTTP请求、获得响应结果
- 关闭TCP连接
- 浏览器渲染



但是今天着重对每个细节都稍微深入一点



## DNS域名解析

解析成啥？解析成IP、ip比较难记、所以需要好记的域名来代替、DNS再将域名解析成IP



### 解析流程

**本地查找**

1. 浏览器缓存中查找
2. 本地的hosts文件查找
3. DNS解析器缓存查找
4. 本地DNS服务器查找

这个过程中任何一步找到了都会结束查找流程



**服务器查找**

1. 本地DNS服务器查找
2. 根域名服务器查找
3. 顶级域名服务查找
4. 权威域名服务商查找



**总结一下：我们可以知道域名的查找在本地通常是靠缓存的、而在服务器中查找会把找到结果存入缓存**



## TCP连接

三次握手



## 发送HTTP请求、获得响应结果

具体没有什么、就是返回具体资源



## 关闭TCP连接

四次挥手



## 浏览器渲染

有以下几个流程

1. 渲染进程将 HTML 内容转为DOM 树。
2. 渲染引擎将 CSS 样式表转为styleSheets，计算 DOM 节点的样式
3. 创建布局树，并计算元素的布局信息。
4. 对布局树进行分层，并生成分层树。
5. 为每个图层生成绘制列表，并将其提交到合成线程。合成线程将图层分图块，并**栅格化**将图块转换成位图。
6. 合成线程发送绘制图块命令给浏览器进程。**浏览器进程根据指令生成页面，并显示到显示器上。**