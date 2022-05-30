# render 函数执行时机及其优化



## 通常

1. 创建时、所有类组件都会执行render函数
2. 当更改App组件中的state的值的话、所有组件都被重新执行一遍了

```jsx
import React, { Component } from 'react';

// Header
function Header() {
  console.log("Header被调用");
  return <h2>我是Header组件</h2>
}

// Main
class Banner extends Component {
  render() {
    console.log("Banner render函数被调用");
    return <h3>我是Banner组件</h3>
  }
}

function ProductList() {
  console.log("ProductList被调用");
  return (
    <ul>
      <li>商品列表1</li>
      <li>商品列表2</li>
      <li>商品列表3</li>
      <li>商品列表4</li>
      <li>商品列表5</li>
    </ul>
  )
}

class Main extends Component {
  render() {
    console.log("Main render函数被调用");
    return (
      <div>
        <Banner/>
        <ProductList/>
      </div>
    )
  }
}

// Footer
function Footer() {
  console.log("Footer被调用");
  return <h2>我是Footer组件</h2>
}


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  render() {
    console.log("App render函数被调用");
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
}

```





## `shouldComponentUpdate` 限制

该函数通过返回true或者false可以限制当前组件render函数的重新执行

两个参数：最新的props和state

- `nextProps`
- `nextState`

```jsx
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.counter !== nextState.counter) {
      return true;
    }

    return false;
  }
```



## `PureComponent`

上面的`shouldComponentUpdate`函数限制render函数执行时间需要手动限制、React提供了`PureComponent`类**自动判断state中的值是否改变(浅层判断)、改变了执行render函数、未改变不执行**

```jsx
import React, { PureComponent } from 'react';

// Header
function Header() {
  console.log("Header被调用");
  return <h2>我是Header组件</h2>
}

// Main
class Banner extends PureComponent {
  render() {
    console.log("Banner render函数被调用");
    return <h3>我是Banner组件</h3>
  }
}

function ProductList() {
  console.log("ProductList被调用");
  return (
    <ul>
      <li>商品列表1</li>
      <li>商品列表2</li>
      <li>商品列表3</li>
      <li>商品列表4</li>
      <li>商品列表5</li>
    </ul>
  )
}

class Main extends PureComponent {
  render() {
    console.log("Main render函数被调用");
    return (
      <div>
        <Banner />
        <ProductList />
      </div>
    )
  }
}

// Footer
function Footer() {
  console.log("Footer被调用");
  return <h2>我是Footer组件</h2>
}


export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  render() {
    console.log("App render函数被调用");
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <Header />
        <Main data={this.state.counter} />
        <Footer />
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
}

```



## memo

在上面的例子中使用`PureComponent`实现类组件选择性执行render函数、但是对于函数组件来说是没有state的、因此Memo高阶组件可以做这个事、**触发机制与`PureComponent`一样、浅层stat或者props改变**

函数组件 = `memo`包裹原来的函数组件

```jsx
import React, { PureComponent, memo } from 'react';

// Header
const MemoHeader = memo(function Header() {
  console.log("Header被调用");
  return <h2>我是Header组件</h2>
})


// Main
class Banner extends PureComponent {
  render() {
    console.log("Banner render函数被调用");
    return <h3>我是Banner组件</h3>
  }
}

const MemoProductList = memo(function ProductList() {
  console.log("ProductList被调用");
  return (
    <ul>
      <li>商品列表1</li>
      <li>商品列表2</li>
      <li>商品列表3</li>
      <li>商品列表4</li>
      <li>商品列表5</li>
    </ul>
  )
})

class Main extends PureComponent {
  render() {
    console.log("Main render函数被调用");
    return (
      <div>
        <Banner/>
        <MemoProductList/>
      </div>
    )
  }
}

// Footer
const MemoFooter = memo(function Footer() {
  console.log("Footer被调用");
  return <h2>我是Footer组件</h2>
})


export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  render() {
    console.log("App render函数被调用");
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <MemoHeader/>
        <Main/>
        <MemoFooter/>
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
}

```
