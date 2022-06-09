# React认识、JSX

## React初识

开发React依赖三个库

- react：包含react所必须的核心代码
- react-dom：react渲染在不同平台所需要的核心代码
- - react-dom针对web和native所完成的事情不同
- - web端：react-dom会讲jsx最终渲染成真实的DOM，显示在浏览器中
- - react-dom会讲jsx最终渲染成原生的控件（比如Android中的Button，iOS中的UIButton）
- babel：将jsx转换成React代码的工具

CDN 引入
crossorigin的属性，这个属性的目的是为了拿到跨域脚本的错误信息

```html
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```



### ReactDOM

- `ReactDOM.render` 会把绑定元素中的数据清除

  ```jsx
  <div id="app">dafdasf</div>
  // dafdasf 会被覆盖
  function render() {
        ReactDOM.render(
          <div>
            <h2>{message}</h2>
            <button onClick={btnClick}>改变文本</button>
          </div>,
          document.getElementById("app")
        );
   }
  ```

### React组件

#### 继承 `React.Component`

```jsx
class App extends React.Component{
    constructor(){
        super()
        this.state = {
            message:"world"
        }
    }
    render(){
        return (
            <div>
                <h2>{this.state.message}</h2>
                <button onClick={this.change.bind(this)}>改变</button>
            </div>
        )
    }
    change(){
        this.setState({
            message:"React"
        })
    }
}
ReactDOM.render(<App/>,document.getElementById('app'))

```



#### React组件中 this 问题

优先使用第 4 种方式

```jsx
{/*方案1：显示绑定*/}
<button onClick={this.change.bind(this)}>改变</button>


{/*方案2：构造函数中统一绑定*/}
constructor(){
    super()
    this.state = {
        message:"world"
    }
    this.change = this.change.bind(this)
}
<button onClick={this.change}>改变</button>


{/*方案3：箭头函数*/}
// 因为 箭头函数中没有this，使用的话就会一层一层往外找
<button onClick={this.change}>改变</button>
change = () => {
    console.log(this.state.message)
}

{/*方案4：注册事件使用箭头函数*/}
//推荐使用这种方式绑定 this
<button onClick={() => {this.change()}}>改变</button>
change(){
    console.log(this.state.message)
}
```



#### React组件传递事件对象

```jsx
render() {
    return (
      <div>
        <button onClick={this.btnClick}>按钮</button>
        
        <ul>
          {
            this.state.movies.map((item, index, arr) => {
              return (
                <li className="item" onClick={ e => { this.liClick(item, index, e) }}>
                  {item}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
```



#### React组件状态修改

```jsx
constructor(){
   super()
   this.state = {
     message:"world"
   }
 }
 
change(){
  this.setState({
    message:"React"
  })
}
```



#### React组件中元素的循环

`render return` 中的数据是数组会被循环出来、不需要像 `vue` 中的 `v-for`

```jsx
render(){
    const listArr = []
    for(let movie of this.state.movies) {
        listArr.push(<li>{movie}</li>)
    }
    return (
        <div>
            <h2>电影列表</h2>
            <ul>
                {this.state.movies.map(item => {return <li>{item}</li>})}
                {listArr}
            </ul>
        </div>
    )
}
```



## JSX

### 语法特点

1. 一个根标签

   ```jsx
   <div id="app">dafdasf</div>
   
   function render() {
    ReactDOM.render(
      <div>
         <h2>{message}</h2>
         <button onClick={btnClick}>改变文本</button>
      </div>,
      document.getElementById("app")
      );
   }
   ```

2. 绑定用的是单大括号 {}、而不是 {{}}

   ```jsx
   <button onClick={btnClick}>改变文本</button>
   <h2 title={this.state.title}>{this.state.name}</h2>
   <img src={getImgUrl()} />
   ```

3. jsx 绑定class

   ```jsx
   // 样式用className、而不是class、 label 用 htmlFor、而不是 for
   <h2 className="dddd" title={this.state.title}>{this.state.name}</h2>
   <div className="box title">我是div元素</div>
   <div className={"box title " + (active ? "active": "")}>我也是div元素</div>
   <label htmlFor="sss"></label>
   ```

4. jsx 绑定style

   ```jsx
   // fontSize 小驼峰
   <div style={{color:"red",fontSize:"50px"}}>style</div>
   ```

   

5. 注释

   ```jsx
   render() {
       return (
           <div>
               {/* 我是注释 */}
               <h2>hello world</h2>
           </div>
       )
   }
   ```

6. 数据显示

   ```jsx
   // true、false、null、undefined 不显示、对象不能直接展示
   class App extends React.Component {
       constructor() {
           super()
           this.state = {
               name:'one',
               age:12,
               names:[1,2,3,4],
               test:true,
               test1:false,
               test2:undefined,
               test3:null,
               friend:{
                   name:'zzz'
               }
           }
   
       }
       
       render() {
           return (
               <div>
                   {/* 我是注释 */}
                   <h2>{this.state.name}</h2>
                   <h2>{this.state.age}</h2>
                   <h2>{this.state.names}</h2>
                   {/*true、false、null、undefined 不显示、对象不能直接展示*/}
                   <h2>{this.state.test}</h2>
                   <h2>{this.state.test1}</h2>
                   <h2>{this.state.test2}</h2>
                   <h2>{this.state.test3}</h2>
                   <h2>{this.state.friend}</h2>
               </div>
           )
       }
   
   }
   ReactDOM.render(<App/>, document.getElementById('app'))
   ```

7. jsx内嵌表达式

   ```jsx
   render() {
       return (
           <div>
               {/* 三元 */}
               <h2>{islogin? '登陆了'：'未登录'}</h2>
               {/* 函数调用 */}
               <h2>{this.getFullName()}</h2>
           </div>
       )
   }
   ```

8. 条件渲染

   ```jsx
   // 逻辑与非、三元、if
   <h2>{ isLogin && "你好啊, coderwhy" }</h2>
   { isLogin && <h2>你好啊, coderwhy</h2> }
   ```

   

9. jsx 控制显隐

   ```jsx
   <h2 style={{display: titleDisplayValue}}>你好啊, coderwhy</h2>
   ```

