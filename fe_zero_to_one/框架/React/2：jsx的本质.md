# JSX的本质

```jsx
let aaa = <div><h2>{this.state.message}</h2><button>改变</button></div>
```

比如上面是JSX语法、浏览器无法识别、这个时候需要babel将其转化成某种形式，能够让浏览器识别

## 经过[babel](https://babeljs.io/repl/#?presets=react)转化

```js
/*#__PURE__*/
React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, (void 0).state.message), /*#__PURE__*/React.createElement("button", null, "\u6539\u53D8"));
```

通过上面babel的转化、很明显 **JSX 元素最后会成为 React.createElement方法返回的东西**

## React.createElement

在我们调用`React.createElement`方法来创建对象的时候，其会返回一个`ReactElement`类型的对象、

## `ReactElement`

ReactElement`类型的对象也就是我们常说的`虚拟DOM、即`React`利用`ReactElement`对象组成了一个`JavaScript的对象树`



