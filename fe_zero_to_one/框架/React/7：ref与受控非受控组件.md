# ref、受控、非受控组件

## ref

和vue中的ref含义一样、用来操作Dom对象

### 两种用法

1. 字符串（不建议、后续会被删除）

   ```jsx
     render() {
       return (
         <div>
           {/* <h2 ref=字符串/对象/函数>Hello React</h2> */}
           <h2 ref="titleRef">Hello React</h2>
           <button onClick={e => this.appBtnClick()}>App按钮</button>
         </div>
       )
     }
     changeText() {
       this.refs.titleRef.innerHTML = "Hello Coderwhy";
     }
   ```



2. React.createRef() 方式创建（**目前React推荐的方式**）

   1. 当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref **接收底层 DOM 元素作为其 current 属性**
   2. **当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性**
   3. 不能在函数组件上使用 ref 属性，因为他们没有实例；

   ```jsx
   import React, { PureComponent, createRef, Component } from 'react';
   
   export default class App extends PureComponent {
   
     constructor(props) {
       super(props);
   
       this.titleRef = createRef();
       this.titleEl = null
     }
   
     render() {
       return (
         <div>
           {/* 这两种本质是一样的 */}
           <h2 ref={this.titleRef}>Hello React</h2>
           <h2 ref={arg => this.titleEl = arg}>Hello React</h2>
           <button onClick={e => this.changeText()}>改变文本</button>
         </div>
       )
     }
   
     changeText() {
       // 使用 createRef 方法调用 Dom 需要这么写
       this.titleRef.current.innerHTML = "Hello JavaScript";
       this.titleEl.innerHTML = "Hello TypeScript";
     }
   }
   ```



### ref的转发

上面说了ref不能用于函数组件、因为没this；这里说一下函数式组件的ref、**通过forwardRef高阶函数**

**forwardRef 两个参数**

1. props传进来的数据
2. ref 传进来的ref

```jsx
import React, { PureComponent, createRef, forwardRef } from 'react';

// 高阶组件forwardRef
const Profile = forwardRef(function (props, ref) {
  return <p ref={ref}>Profile</p>
})

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.profileRef = createRef();
  }

  render() {
    return (
      <div>
        <Profile ref={this.profileRef} name={"why"} />
        <button onClick={e => this.printRef()}>打印ref</button>
      </div>
    )
  }

  printRef() {
    console.log(this.profileRef.current);
  }
}
```



## 受控组件

表单输入的值通过state来展示、通过setState来改变就是受控组件；总结就是**表单数据是由 React 组件来管理的；**



## 非受控组件

与受控组件相反、**表单数据将交由 DOM 节点来处理**