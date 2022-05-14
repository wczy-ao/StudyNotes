# websocket

## 什么是websocket

WebSocket 是一种在单个TCP连接上进行全双工通信的协议。WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。

> 全双工通信：客户端可以向服务端发消息，服务端也可以向客户端发消息；两者可以同时发
>
> 半双工通信：客户端可以向服务端发消息，服务端也可以向客户端发消息；两者不能同时发

在 WebSocket API 中，**浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接**， 并进行双向数据传输。



WebSocket本质上一种`计算机网络应用层的协议`，用来弥补http协议在持久通信能力上的不足。



### WebSocket 的特点

- 没有同源限制，客户端可以与任意服务器通信。

- 协议标识符是`ws`（如果加密，则为`wss`），服务器网址就是 URL。

  ```
  ws://example.com:80/some/path
  ```

- 数据格式比较轻量，性能开销小，通信高效。

- 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且**握手阶段采用 HTTP 协议**，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

- 建立在 TCP 协议之上，服务器端的实现比较容易。



### 为什么需要 WebSocket？

HTTP 协议有一个缺陷：通信只能由客户端发起，不具备服务器推送能力。只能是客户端向服务器发出请求，服务器返回查询结果。

如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用["轮询"](https://link.juejin.cn/?target=https%3A%2F%2Fwww.pubnub.com%2Fblog%2F2014-12-01-http-long-polling%2F)：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室。轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。



在 WebSocket 协议出现以前，创建一个和服务端进双通道通信的 web 应用，需要依赖HTTP协议，进行不停的轮询，这会导致一些问题：

- 服务端被迫维持来自每个客户端的大量不同的连接
- **大量的轮询请求会造成高开销，比如会带上多余的header，造成了无用的数据传输。**



### WebSocket 与 HTTP 的区别

**相同点：** 都是一样基于TCP的，都是可靠性传输协议。都是应用层协议。

**联系：** WebSocket在建立握手时，数据是通过HTTP传输的。但是建立之后，在真正传输时候是不需要HTTP协议的。

**区别：**

- WebSocket是双向通信协议，模拟Socket协议，可以双向发送或接受信息，而HTTP是单向的；
- WebSocket是需要浏览器和服务器握手进行建立连接的，而http是浏览器发起向服务器的连接。
- **虽然HTTP/2也具备服务器推送功能，但HTTP/2 只能推送静态资源，无法推送指定的信息**



### WebSocket协议的原理

由于WebSocket协议也需要通过已建立的TCP连接来传输数据、具体实现上是通过http协议建立通道，然后在此基础上用真正的WebSocket协议进行通信，所以WebSocket协议和http协议是有一定的交叉关系的。

**看一个WebSocket的的请求头**

多出来了几个首部字段：`Upgrade、Sec-WebSocket-Version、Sec-WebSocket-Key、Sec-WebSocket-Extensions、Connection`

```js
Request URL: wss://socketio-chat-h9jt.herokuapp.com/socket.io/
Request Method: GET
Status Code: 101 Switching Protocols
// 请求升级到websocket协议
Connection: Upgrade
Upgrade: websocket
// 可选的客户端支持的协议扩展列表，指示了客户端希望使用的协议级别的扩展
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
// 自动生成的key,已验证服务器对协议的支持
Sec-WebSocket-Key: IRjFlYB21UIe5wMQDpEMYg==
// 可选的应用指定的子协议列表 、 区分同 URL 下，不同的服务所需要的协议
Sec-WebSocket-Protocol: chat, superchat
// 客户端使用的websocket协议版本
Sec-WebSocket-Version: 13
```

**看一个WebSocket的响应头**

```js
HTTP/1.1 101 Switching Protocols
// 告诉客户端已经切换协议
Upgrade: websocket
Connection: Upgrade
// 告诉客户端已经被服务器确认
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
// 最终使用的协议
Sec-WebSocket-Protocol: chat
```

最后、客户端收到连接成功的消息后，开始借助于TCP传输信道进行全双工通信。



### Websocket的优缺点

优：

- WebSocket协议一旦建议后，互相沟通所消耗的请求头是很小的
- 服务器可以向客户端推送消息了

缺：

- 有的浏览器版本不支持或者方式有区别



### WebSocket的断线重连

- 心跳包 [你不知道的WebSocket](https://juejin.cn/post/7020964728386093093)



## WebSocket的事件

- open
- close
- error
- message
- connection
- send

前端需要

- open
- close
- error
- message
- send

后端

- open
- close
- error
- message
- connection
- send

## Demo

[聊天室](https://github.com/wczy-ao/WebSocket-demo-chat)