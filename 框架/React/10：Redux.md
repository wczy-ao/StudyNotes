# Redux

## 纯函数的概念

纯函数的维基百科定义：

- 相同的输入就会有相同的输出

- 不会产生函数副作用、诸如“触发事件”，使输出设备输出，或更改输出值以外物件的内容等

```js
// 纯函数
function sum(n1,n2) {
    return n1+n2
}

// 具有副作用、不是纯函数
const obj = {
    n1:1,
    n2:3
}

function sum(obj) {
    obj.n1 = 2
    return obj.n1+obj.n2
}
sum(obj)
```



## Redux是什么

React是在视图层帮助我们解决了DOM的渲染过程，但是State依然是留给我们自己来管理、但是随着业务越来越复杂、State管理也变得越来越难；这个时候就需要 Redux状态管理器来管理



### Redux的三大原则

**单一数据源**

- 整个应用程序的state被存储在一颗object tree中，并且这个object tree只存储在一个 store 中
- Redux并没有强制让我们不能创建多个Store，但是那样做并不利于数据的维护
- 单一的数据源可以让整个应用程序的state变得方便维护、追踪、修改；



**state是只读的**

- 唯一修改State的方法一定是触发action，不要试图在其他地方通过任何的方式来修改State：
- 这样就确保了View或网络请求都不能直接修改state，它们只能通过action来描述自己想要如何修改state；



**使用纯函数执行修改**

- 通过reducer将 旧state和 actions联系在一起，并且返回一个新的State
- 随着应用程序的复杂度增加，我们可以将reducer拆分成多个小的reducers，分别操作不同state tree的一部分；
- 但是所有的reducer都应该是纯函数，不能产生任何的副作用；



### 使用过程

1. .创建一个对象，作为我们要保存的状态
2. .创建`Store`来存储这个`state`
   - 创建`store`时必须创建`reducer`；
   - 我们可以通过 `store.getState` 来获取当前的`state`
3. .通过`action`来修改`state`
   - 通过`dispatch`来派发`action`；
   - 通常`action`中都会有type属性，也可以携带其他的数据；
4. 修改`reducer`中的处理代码
   - 这里一定要记住，`reducer`是一个纯函数，不需要直接修改`state`；
5. 可以在派发`action`之前，监听`store`的变化

```js
const redux = require('redux');

const initialState = {
  counter: 0
}

// reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 }
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 }
    case "ADD_NUMBER":
      return { ...state, counter: state.counter + action.num }
    case "SUB_NUMBER":
      return { ...state, counter: state.counter - action.num }
    default:
      return state;
  }
}

// store(创建的时候需要传入一个reducer)
const store = redux.createStore(reducer)

// 订阅store的修改
store.subscribe(() => {
  console.log("counter:", store.getState().counter);
})

// actions
const action1 = { type: "INCREMENT" };
const action2 = { type: "DECREMENT" };

const action3 = { type: "ADD_NUMBER", num: 5 };
const action4 = { type: "SUB_NUMBER", num: 12 };

// 派发action
store.dispatch(action1);
store.dispatch(action2);
store.dispatch(action2);
store.dispatch(action3);
store.dispatch(action4);
```



## 在组件中使用redux

1. `store.subscribe` 返回的函数再次执行可以取消订阅、与`Vue3`中的`watchEffect`一样

```jsx
import React, { PureComponent } from 'react';

import store from '../store';
import { 
  subAction
} from "../store/actionCreators";

export default class About extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counter: store.getState().counter
    }
  }

  componentDidMount() {
    this.unsubscribue = store.subscribe(() => {
      this.setState({
        counter: store.getState().counter
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribue();
  }

  render() {
    return (
      <div>
        <hr/>
        <h1>About</h1>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.decrement()}>-1</button>
        <button onClick={e => this.subNumber(5)}>-5</button>
      </div>
    )
  }

  decrement() {
    store.dispatch(subAction(1));
  }

  subNumber(num) {
    store.dispatch(subAction(num));
  }
} 
```





## 自定义`connect`函数

React-Redux将所有组件分为两大类：展示组件（UI组件），容器组件、connect方法就是将两者连接起来

**展示组件的特征**

- 只负责 UI 的呈现，不带有任何业务逻辑
- 没有状态（即不使用`this.state`这个变量）
- 所有数据都由参数（`this.props`）提供
- 不使用任何 Redux 的 API



**容器组件有以下几个特征：**

- 负责管理数据和业务逻辑，不负责 UI 的呈现
- 带有内部状态
- 使用 Redux 的 API



**connect方法解析**

- `mapStateToProps`必须是`function`,作为输入逻辑，
- `mapDispatchToProps`可以是`funciton`,也可以是对象，作为输出，

```js
// connect 方法

import React, { PureComponent } from "react";

// import { StoreContext } from './context';
import store from "../store";

export function connect(mapStateToProps, mapDispachToProp) {
  return function enhanceHOC(WrappedComponent) {
    class EnhanceComponent extends PureComponent {
      constructor(props) {
        super(props);

        this.state = {
          storeState: mapStateToProps(store.getState())
        }
      }

      componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
          this.setState({
            storeState: mapStateToProps(store.getState())
          })
        })
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        return <WrappedComponent {...this.props}
          {...mapStateToProps(store.getState())}
          {...mapDispachToProp(store.dispatch)} />
      }
    }

    return EnhanceComponent;
  }
}
```



```jsx
// ui 组件

import React from 'react';
import { connect } from '../utils/connect';

import { 
  decAction,
  subAction
} from "../store/actionCreators";

function About(props) {
  return (
    <div>
      <hr />
      <h1>About</h1>
      <h2>当前计数: {props.counter}</h2>
      <button onClick={e => props.decrement()}>-1</button>
      <button onClick={e => props.subNumber(5)}>-5</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    counter: state.counter
  }
};
const mapDispatchToProps = dispatch => {
  return {
    decrement: function() {
      dispatch(decAction());
    },
    subNumber: function(num) {
      dispatch(subAction(num))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
```



## react-redux中的connect

虽然我们之前已经实现了connect、Provider这些帮助我们完成连接redux、react的辅助工具，但是实际上redux官方帮助我们 提供了 react-redux 的库，可以直接在项目中使用，并且实现的逻辑会更加的严谨和高效。

```jsx
// src/index.js
import { Provider } from 'react-redux';
ReactDOM.render(
    // 这里用的是store、前面通过context来传值、用的是value
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

```jsx
import React from 'react';
import { connect } from 'react-redux';

import {
  decAction,
  subAction
} from "../store/actionCreators";

function About(props) {
  console.log("About页面重新渲染了");
  return (
    <div>
      <hr />
      <h1>About</h1>
      {/* <h2>当前计数: {props.counter}</h2> */}
      <button onClick={e => props.decrement()}>-1</button>
      <button onClick={e => props.subNumber(5)}>-5</button>
      <h1>Banner</h1>
      <ul>
        {
          props.banners.map((item, index) => {
            return <li key={item.acm}>{item.title}</li>
          })
        }
      </ul>
      <h1>Recommend</h1>
      <ul>
        {
          props.recommends.map((item, index) => {
            return <li key={item.acm}>{item.title}</li>
          })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    banners: state.banners,
    recommends: state.recommends
  }
};

const mapDispatchToProps = dispatch => {
  return {
    decrement: function () {
      dispatch(decAction());
    },
    subNumber: function (num) {
      dispatch(subAction(num))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
```



## 总结

先到现在、我认为核心思想还是redux的工作流程

- action只能是对象、当然形式可以有多种、通常是函数返回出来的
- dispatch里的参数一定是action对象、然后就会进入reducer纯函数中进行数据处理
- connect 其实是一个高阶函数、返回了一个高阶组件函数
- connect方法的两个参数、一个用来存储数据的对象、一个用来存储操作的对象**（函数执行后返回的都是对象）**
