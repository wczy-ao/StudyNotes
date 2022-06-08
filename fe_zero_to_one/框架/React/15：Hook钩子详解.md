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

Effect Hook 可以让你来完成一些类似于class中生命周期的功能、比如网络请求、事件监听；

事实上，类似于**网络请求、手动更新DOM、一些事件的监听，都是React更新DOM的一些副作用（Side Effects）**；**所以对于完成这些功能的Hook被称之为 Effect Hook；**



### 执行时机

**useEffect要求我们传入一个回调函数，在React执行完更新DOM操作之后，就会回调这个函数；**

**默认情况下，无论是第一次渲染之后，还是每次更新之后，都会执行这个 回调函数；**



**而我们通过`useState`可以知道、只要执行了`setxxx` 就会重新渲染函数组件、所以就会重新执行`useEffect`**

```jsx
import React, { useEffect, useState } from 'react'

export default function App() {
  const [count, setcount] = useState(0)
  useEffect(() => {
    console.log('useEffect执行了')
  })

  return (
    <div>
      <h1>APP</h1>
      <button onClick={e => setcount(count + 1)}>加1</button>
    </div>
  )
}
```



### useEffect参数解析

两个参数、第一个参数是函数、第二个可选、数组或不写



#### 第一个参数---函数能做的事

- 网络请求
- 更新DOM

这个函数可以返回一个函数、这个**返回的函数通常用来清除副作用**

- 事件监听

  > React 会在组件更新和卸载的时候执行清除操作

  ```jsx
  import React, { useEffect, useState } from 'react'
  
  export default function App() {
    const [count, setcount] = useState(0)
    useEffect(() => {
      console.log('订阅了')
  
      return () => {
        console.log('取消订阅');
      }
    })
  
    return (
      <div>
        <h1>APP</h1>
        <button onClick={e => setcount(count + 1)}>jiayi</button>
      </div>
    )
  }
  ```

  

#### 第二个参数能做的事

这个参数就是控制`useEffect`是否执行（首次除外）具体作用就是该 `useEffect` 在哪些`state`发生变化时，才重新执行；

- **只执行一次---空数组**

​		首次执行一次便不再执行、即使这个组件重新渲染

```jsx
import React, { useEffect, useState } from 'react'

export default function App() {
  console.log('render'); // setcount 就会执行
  const [count, setcount] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      console.log('网络请求'); // 只执行一次
    }, 1000);
  }, [])

  return (
    <div>
      <h1>APP</h1>
      <button onClick={e => setcount(count + 1)}>加1</button>
    </div>
  )
}
```

​		



- **选择性性执行**

​		根据数组中的依赖选择性执行、只有相同的依赖改变了才执行

```jsx
import React, { useEffect, useState } from 'react'

export default function App() {
  console.log('render');
  const [count, setcount] = useState(0)
  const [show, setshow] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      console.log('网络请求');
    }, 1000);
  }, [count]) // 只有 count 改变才会执行

  return (
    <div>
      <h1>APP</h1>
      <button onClick={e => setcount(count + 1)}>加1</button>
      <button onClick={e => setshow(!show)}>切换</button>
    </div>
  )
}
```





- **不写**

​	只要组件渲染就会执行、一般不要这么用

```jsx
import React, { useEffect, useState } from 'react'

export default function App() {
  console.log('render');
  const [count, setcount] = useState(0)
  const [show, setshow] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      console.log('网络请求');
    }, 1000);
  })

  return (
    <div>
      <h1>APP</h1>
      <button onClick={e => setcount(count + 1)}>加1</button>
      <button onClick={e => setshow(!show)}>切换</button>
    </div>
  )
}
```





## useContext

函数组件想用 createContext 跨组件传值、需要多层嵌套、比较麻烦

```jsx
// app.js
import React, { createContext } from 'react'
import About from './page/About'
export const UserContext = createContext()
export const FileContext = createContext()
export default function App() {
  return (
    <UserContext.Provider value={{ name: 'wan', age: 18 }}>
      <FileContext.Provider value={{ height: 1.99 }}>
        <About />
      </FileContext.Provider>
    </UserContext.Provider>
  )
}


// about.js
import React from 'react'
import {UserContext, FileContext} from '../App'

export default function About() {
  
  return (
    <UserContext.Consumer>
      {
        value => {
          console.log('UserContext',value);
          return (
            <FileContext>
              {
                file => {
                  console.log('file', file);
                  return (
                    <h1>about</h1>
                  )
                }
              }
            </FileContext>
          )
        }
      }
    </UserContext.Consumer>
  )
}
```



因此`useContext`就是解决这个问题的

```jsx
import React, {useContext} from 'react'
import {UserContext, FileContext} from '../App'

export default function About() {
  const user = useContext(UserContext)
  const file = useContext(FileContext)
  console.log(user, file);
  return (
    <div>About</div>
  )
}
```





## useReducer

**和`redux`没关系、如果组件状态以来两个相同的值、并且数据不需要共享、那么可以用这个**；可以替代useState

```

```







## useCallback