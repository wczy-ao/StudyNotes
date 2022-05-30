# `setState` 详解

## 异步还是同步

先给结论、异步的、但是在某些情况下可以表现出同步的效果



**如果是同步的话：**

- 频繁修改state中的值导致页面频繁渲染是非常浪费性能的、最好的办法就是批量更新
- state和props不能保持统一、因为state改变导致render执行、这个时候才会把数据传给子组件、所以可能会有一个时间差；在开发中会有很多问题



**同步的情况有哪些：**

- 外面包一层定时器

  ```jsx
    changeText() {
      // 情况一: 将setState放入到定时器中
      setTimeout(() => {
        this.setState({
          message: "你好啊,李银河"
        })
        console.log(this.state.message);
      }, 0);
    }
  ```

- 原生DOM事件

  ```jsx
    componentDidMount() {
      document.getElementById("btn").addEventListener("click", (e) => {
        this.setState({
          message: "你好啊,李银河"
        })
        console.log(this.state.message);
      })
  ```

  



## `setState`参数

两个参数

- [第一个参数是对象或者函数](https://zh-hans.reactjs.org/docs/react-component.html#setstate)
- 第二个参数是回调函数、这个回调函数会在state值被修改后调用

```jsx
this.setState({
  message: "你好啊,李银河"
}, () => {
  console.log(this.state.message);
})
```

## `setState` 参数合并

`setState`的第一个参数是对象、React对这个方法是用`Object.assign({},this.state,{message:'hello'})`来实现对象的合并的



## `setState` 函数合并

函数合并有两种方式、取决于`setState`的第一个参数

- 参数是对象的话、会被覆盖只执行最后一个

  ```jsx
      this.setState({
        counter: this.state.counter + 1
      });
      this.setState({
        counter: this.state.counter + 1
      });
      this.setState({
        counter: this.state.counter + 2
      });
  ```

  

- 参数是函数的话、都会执行；`prevState `就是  `this.state`

  ```jsx
  this.setState((prevState, props) => {
    return {
       counter: prevState.counter + 1
    }
  });
  this.setState((prevState, props) => {
    return {
      counter: prevState.counter + 1
    }
  });
  this.setState((prevState, props) => {
    return {
      counter: prevState.counter + 1
    }
  });
  ```



## 不变性

