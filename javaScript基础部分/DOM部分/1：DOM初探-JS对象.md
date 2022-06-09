# DOM基础-JS对象-XML

## DOM

> DOM：通过浏览器提供的一套方法表示或者操作HTML和XML
>
> document object model：文档对象模型



## js的三种对象

- 本地对象  `Navative Object`
  - `Object Function Array String Number Boolean Error EvalError`
  - `SyntaxError RangeError ReferenceError TypeError URIError`
  - `Date RegExp`
- 内置对象  `Built-in Object`
  - Global
    - `isNaN() parseInt() Number decodeURI encodeURI`
    - `Infinity NaN` 
  -  Math
- 宿主对象  `Host Object`
  - 执行js脚本的环境提供的对象，浏览器对象，兼容性问题
  - 浏览器对象：window （BOM）和 document（DOM）

本地对象和内置对象都是ES内部对象



## **XML**

> XML -> XHTML -> HTML

更加语义化的标签

```html
<person>
  <useName>哈哈</useName>
</person>
<script>
	var person = document.getElementsByTagName('person')[0];
  var useName = person.getElementsByTagName('useName')[0];
  console.log(userName.innerText);
</script>
```

