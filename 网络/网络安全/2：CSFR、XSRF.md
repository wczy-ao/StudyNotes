# CSFR、XSRF

[网络安全CSRF](https://juejin.cn/post/6844903689702866952#heading-8)

CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。




一个典型的CSRF攻击有着如下的流程：

- [受害者登录a.com](https://link.juejin.cn?target=http%3A%2F%2Fxn--a-f38al5vkzdt61bv7l.com)，并保留了登录凭证（Cookie）。
- [攻击者引诱受害者访问了b.com](https://link.juejin.cn?target=http%3A%2F%2Fxn--b-nv6ao4io8bp6po6e00mu47cda4311avpa330h.com)。
- [b.com](https://link.juejin.cn?target=http%3A%2F%2Fb.com) 向 [a.com](https://link.juejin.cn?target=http%3A%2F%2Fa.com) 发送了一个请求：[a.com/act=xx。浏览器会…](https://link.juejin.cn?target=http%3A%2F%2Fa.com%2Fact%3Dxx%E3%80%82%E6%B5%8F%E8%A7%88%E5%99%A8%E4%BC%9A%E9%BB%98%E8%AE%A4%E6%90%BA%E5%B8%A6a.com%E7%9A%84Cookie%E3%80%82)
- a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求。
- a.com以受害者的名义执行了act=xx。
- 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作。






## 类型

- GET类型的CSRF

  GET类型的CSRF利用非常简单，只需要一个HTTP请求，一般会这样利用：

  ```html
   <img src="http://bank.example/withdraw?amount=10000&for=hacker" > 
  ```

  在受害者访问含有这个`img`的页面后，浏览器会自动向`http://bank.example/withdraw?account=xiaoming&amount=10000&for=hacker`发出一次HTTP请求。`bank.example`就会收到包含受害者登录信息的一次跨域请求。



- POST类型的CSRF

  这种类型的CSRF利用起来通常使用的是一个自动提交的表单，如：

  ```html
   <form action="http://bank.example/withdraw" method=POST>
      <input type="hidden" name="account" value="xiaoming" />
      <input type="hidden" name="amount" value="10000" />
      <input type="hidden" name="for" value="hacker" />
  </form>
  <script> document.forms[0].submit(); </script> 
  ```

  访问该页面后，表单会自动提交，相当于模拟用户完成了一次POST操作。

  POST类型的攻击通常比GET要求更加严格一点，但仍并不复杂。任何个人网站、博客，被黑客上传页面的网站都有可能是发起攻击的来源，后端接口不能将安全寄托在仅允许POST上面。



- 链接类型的CSRF

  访问该页面后，表单会自动提交，相当于模拟用户完成了一次POST操作。

  POST类型的攻击通常比GET要求更加严格一点，但仍并不复杂。任何个人网站、博客，被黑客上传页面的网站都有可能是发起攻击的来源，后端接口不能将安全寄托在仅允许POST上面。

  ```html
    <a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
    重磅消息！！
    <a/>
  ```

  



## 特点

- 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生。

- 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据。

- 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。

- 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。

CSRF通常是跨域的，因为外域通常更容易被攻击者掌控。但是如果本域下有容易被利用的功能，比如可以发图和链接的论坛和评论区，攻击可以直接在本域下进行，而且这种攻击更加危险。





## 预防

CSRF通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对CSRF的防护能力来提升安全性。

上文中讲了CSRF的两个特点：

- CSRF（通常）发生在第三方域名。
- CSRF攻击者不能获取到Cookie等信息，只是使用。

针对这两点，我们可以专门制定防护策略，如下：

- 阻止不明外域的访问
  - 同源检测
  - `Samesite Cookie`
- 提交时要求附加本域才能获取的信息
  - CSRF Token
  - 双重Cookie验证

### 解决

[网络安全](https://juejin.cn/post/6844903689702866952#heading-8)

