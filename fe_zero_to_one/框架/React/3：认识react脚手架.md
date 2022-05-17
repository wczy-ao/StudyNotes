安装

```
npm install -g create-react-app
```

安装是否成功

```
create-react-app --version
```

报错：`react中-create-react-app不是内部或者外部命令...-解决方案/`

```
执行下面这个
npx create-react-app my-app
```



组件化开发

- 函数式组件和类组件
- 有状态组件和无状态组件



类组件有如下要求

- 组件名称必须大写、因为JSX中严格区分大小写、大写的标签会被当成一个组件、小写的会被当成html标签
- 类组件必须继承React.Component
- 类组件必须实现render函数
- constructor是可选的，我们通常在constructor中初始化一些数据
- **render() 方法是 class 组件中唯一必须实现的方法**



## 类组件

```jsx
import React, {
  Component
} from 'react'
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      message: '你好啊'
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    )
  }
}
```

render函数返回的值有哪些

- React 元素：
  - 通常通过 JSX 创建
  - html标签或者react组件（div、App）均为React元素
- **数组或fragments**：使得 render 方法可以返回多个元素。
- **字符串或数值类型**：它们在 DOM 中会被渲染为文本节点
- **布尔类型或 null**：什么都不渲染
- **Portals**：可以渲染子节点到不同的 DOM 子树中。

## 函数式组件

- 没有内部状态
- 没有this对象

```jsx
export default function App() {
  return (
    <h2>我是函数组件、app组件</h2>
  )
}
```

函数组件return 返回的东西和类组件render返回的东西是一样的





## 生命周期函数

函数式组件没有生命周期函数，通产说的生命周期函数都是针对类组件的

![image-20220517145109500](C:/Users/wanzh/AppData/Roaming/Typora/typora-user-images/image-20220517145109500.png)

1. 挂载阶段--执行顺序
   1. 先执行 `constructor`
   2. 再执行 `render`
   3. 后面执行 `componentDidMount()`
2. 更新阶段
   1. `props`、`setState`、`forceUpdate` 调用的时候重新执行 render 函数
   2. 后面执行 `componentDidUpdate`

```JSX
import React, {
  Component
} from 'react'

class Cpn extends Component {
  render() {
    return (
      <h1>我是Cpn组件</h1>
    )
  }
  componentWillUnmount() {
    console.log('执行 componentWillUnmount');
  }
}
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      message: '你好啊',
      counter: 1,
      isShow: true
    }
    console.log('执行了constructor');
  }
  render() {
    console.log('执行了render');
    return (
      <div>
        <h1>{this.state.message}</h1>
        <h1>当前计数：{this.state.counter}</h1>
        <button onClick={e => this.increment()}>增加</button>
        <hr />
        <button onClick={e => this.change()}>切换</button>
        {this.state.isShow && <Cpn />}
      </div>
    )
  }
  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
  change() {
    this.setState({
      isShow: !this.state.isShow
    })
  }
  componentDidMount() {
    console.log('执行了componentDidMount');
  }
  componentDidUpdate() {
    console.log('执行了componentDidUpdate');
  }
}
```





## 组件通讯

类组件

```jsx
class ChildCpn extends App {
    constructor(props) {
        super()
        this.props = props
    }
    render() {
        return (
            <div>子组件:{this.props.name}</div>
        )
    }
}
```

函数式组件

```jsx
function ChildCpn(props) {
    return (
        <div>子组件:{props.name}</div>
    )
}
```



### super(props)

```
class ChildCpn extends App {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>子组件:{this.props.name}</div>
        )
    }
}
```



### props验证

```js
ChildCpn.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    height: PropTypes.number,
    names: PropTypes.array
}

ChildCpn.defaultProps = {
    name: "why",
    age: 30,
    height: 1.98,
    names: ["aaa", "bbb"]
}
```

