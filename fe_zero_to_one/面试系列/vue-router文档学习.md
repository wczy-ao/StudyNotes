[TOC]



#### 1：创建路由

- 导入路由

  ```
  import Vue from 'vue'
  import Router from 'vue-router'
  ```

- 安装路由插件

  ```
  Vue.use(Router)
  ```

- 创建路由映射对象

  ```js
  const routes = [
    //配置路由和组件之间的对应关系
    {
      path: '/home',//home  前端路由地址
      name: 'Home',
      component: Home //组件名
    },
    {
      path: '/about',//about 前端路由地址
      name: 'About',
      component: () => import('@/components/About') //懒加载组件
    }
  ]
  const router = new Router({
    //配置路由和组件之间的应用关系
    routes
  })
  ```

- 导出路由

  ```
  export default router
  ```

  

#### 2：动态路由

[多种匹配模式](https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js)

```js
const routes = [{
    path: "/home/:id", //动态参数
    component: Home
  },
  {
    path: "/about",
    component: About
  },
];
```

```vue
<template>
  <div>
    <!-- 手动传值 -->
    <router-link to="/home/2">首页</router-link> |
    <router-link to="/about">关于</router-link>
    <router-view/>
  </div>
</template>
```

#### 3：获取动态参数

1. 

#### 4：捕获所有路由和 404 not found 

```js
const routes = [{
    path: "/home",
    component: Home
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/user-*", // 匹配user-开头的路由
    component: NotFound
  },
  {
    path: "*", // 上面没有匹配上就会来这里
    component: NotFound
  },
];

```

#### 5：嵌套路由

```js
const routes = [{
    path: "/home",
    component: Home
  },
  {
    path: "/about",
    component: About,
    children: [{
      path: 'dist', // 子路由不要加 /
      component: Dist
    }]
  },
  {
    path: "*", // 匹配user-开头的路由
    component: NotFound
  },
];
```



#### 6：编程时导航

使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="...">` 等同于调用 `router.push(...)`。

##### 四种导航方式

```js
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```



需要注意的是，下面这种会丢失`params`参数，这种需要换成上面的`path`和`query`或者`name`和`params`组合

```js
router.push({ path: 'user', params: { userId: '123' }})
```



#### 7：别名

访问`about`和`aboutName`路径是一样的

```js
const routes = [
  {
    path: "/about",
    name: 'about',
    alias: '/aboutName',
    component: About,
  },
];
```

#### 8：路由组件传参

1. props解耦

   ```js
   // 设置props属性，在所属组件中可以拿到动态传参值 id
   const routes = [
     {
       path: "/about/:id",
       name: 'about',
       props: true,
       alias: '/aboutName',
       component: About,
       children: [{
         path: 'dist',
         component: Dist
       }]
     },
   ];
   ```

   ```vue
   <template>
     <div>
       ddd
       {{ id }}
       <router-view></router-view>
     </div>
   </template>
   <script>
   export default {
     name: "About",
     computed: {},
     props: ["id"],
     mounted() {
       console.log(this);
     },
   
     methods: {},
   };
   </script>
   
   ```



#### 9：导航守卫

> “导航”表示路由正在发生改变。

##### 全局前置守卫

`router.beforeEach` 注册一个全局前置守卫：

```js
router.beforeEach((to, from, next) => {
  console.log("to：", to);
  console.log("from：", from);
  next()
})
```

值得注意的是第三个参数—`next` 

- 正常调用

  - **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
  - `next({ name: 'Login' })` ：选择去具体某一个路由

- 非正常调用

  - 不调用：from属性值永远是空的
  - `next(false)`：from属性值永远是空的

- 调用多次

  - ```js
    // BAD
    router.beforeEach((to, from, next) => {
      if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
      // 如果用户未能验证身份，则 `next` 会被调用两次
      next()
    })
    
    // GOOD
    router.beforeEach((to, from, next) => {
      if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
      else next()
    })
    ```

    

##### 全局解析守卫`router.beforeResolve`

> 与全局前置守卫类似

##### 全局后置钩子

全局后置钩子不会接受 `next` 函数也不会改变导航本身，因为已经到了这个路由就不会在去改变了

```
router.afterEach((to, from) => {
  // ...
})
```

##### 路由独享守卫

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```



#### 10：组件内的守卫

- `beforeRouteEnter`
- `beforeRouteUpdate` (2.2 新增)
- `beforeRouteLeave`

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建，但是可以通过传一个回调给 next来访问组件实例。
      next(vm => {
          // 通过 `vm` 访问组件实例
      })
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```



#### 11：完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。





#### 11：滚动行为

切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。

**注意: 这个功能只在支持 `history.pushState` 的浏览器中可用。**

```js
const router = new Router({
  routes, // (缩写) 相当于 routes: routes
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return {} || 'falsy' || savedPosition // 返回原有位置
    return { x: 0, y: 0 } // 返回顶部
  }
});
```

