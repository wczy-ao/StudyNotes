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

