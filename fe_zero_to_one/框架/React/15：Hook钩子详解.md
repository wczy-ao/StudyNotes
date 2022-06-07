# Hook钩子详解

## 限制

钩子函数不是在哪里都能用的、**只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。**

**只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用**

## useState

### 参数

- 可以是一个值
- **也可以是一个函数(不需要参数)**

```jsx
const [count, setCount] = useState(0)
const [count, setCount] = useState(() => 0)
```

### 返回值

返回值是数组、包含两个元素、状态值和设置状态值的函数

### set###的复用

和setState一样、分两种：

- **set###参数是值的话、只调用一次**

```jsx
  function handleBtnClick() {
    setCount(count + 10);
    setCount(count + 10);
    setCount(count + 10);
    setCount(count + 10);
   
  }
```



- **set###参数是函数的话、调用多次**

```jsx
  function handleBtnClick() {
    setCount((prevCount) => prevCount + 10);
    setCount((prevCount) => prevCount + 10);
    setCount((prevCount) => prevCount + 10);
    setCount((prevCount) => prevCount + 10);
  }
```



### 引用类型

`setList`参数的类型取决于`useState`参数值得类型、**`setList`是否起作用取决于状态值的内存是否改变**

```jsx
import React, { useState } from 'react'

export default function App() {
  const [list, setList] = useState(['first', 'second', 'three'])
  function addUser() {
    const arr = [...list]
    arr.push('Four')
    setList(arr)
  }
  return (
    <div>
      <h1>人员列表：</h1>
      <ul>
        {
          list.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
      <button onClick={e => addUser()}>添加人员</button>
    </div>
  )
}
```



## useEffect

## useContext

## useReducer

## useCallback