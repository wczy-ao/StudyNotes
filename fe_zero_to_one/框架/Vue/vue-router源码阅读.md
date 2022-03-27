## addRoute是怎么动态添加路由的

```js
router.addRoute(parentStr, route) // parentStr：父级路由url；route：子路由对象
```



### `vue-router/src/index.js`

`VueRouter` 类中有一个 `addRoute`方法，而我们的`router`正是`VueRouter` 的实例

```js
 addRoute (parentOrRoute, route) {
    this.matcher.addRoute(parentOrRoute, route)
  }
```

`this.matcher`是什么

在构造函数中 `this.matcher = createMatcher(options.routes || [], this)` 只要知道`createMatcher`返回了什么就可以知道`this.matcher`是什么



### `vue-router/src/create-matcher.js`

```js
function createMatcher (routes, router){
    // 添加写死的路由映射对象
    const { pathList, pathMap, nameMap } = createRouteMap(routes)
    // 动态添加路由对象
    function addRoute (parentOrRoute, route) {
    }
	return {
        addRoute,
      }
}
```

先看`createMatcher`的两个参数，`createMatcher(options.routes || [], this)`一个是写死的路由映射关系数组，一个是`VueRouter` 的实例



结合这些能知道

`router.addRoute(parentStr, route)` ==

`this.matcher.addRoute(parentOrRoute, route)` ==

`createMatcher(options.routes || [], this).addRoute(parentOrRoute, route)`



需要注意的是，`options.routes`是写死的映射关系数组，`route`是要动态添加的路由对象



所以只需要动态添加的路由对象属性值正确就可以添加上