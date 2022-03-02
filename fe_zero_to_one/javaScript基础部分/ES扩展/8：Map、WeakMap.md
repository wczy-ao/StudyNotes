# Map、WeakMap

[阮一峰--es6--Map](https://6e9de850.wiz06.com/wapp/pages/view/share/s/1KDuxg3NQx7G22jsfI2P8GS70GK5LT2HIkl72f8Dk10J3vqi)

1. 正常对象使用变量当键

```js
var m = {};
var x = {id: 1},
    y = {id: 2};
m[x] = 'foo';
m[y] = 'bar';
console.log(m[x]); // bar
console.log(m[y]); // bar
console.log(m); // [object Object]: "bar"
```



**Map 就是解决上面的问题而存在的**



## Map

1. 对象也能当 键

   ```js
   var m = new Map();
   var x = {id: 1},
       y = {id: 2};
   m.set(x, 'foo');
   m.set(y, 'bar');
   console.log(m);
   console.log(m.get(x)); // foo
   console.log(m.get(y)); // bar
   ```

2. **Map构造函数参数**

   只接受**具有 iterator 接口**同时**每一个成员都是双元素数组**的数据结构当参数

   ```js
   var m = new Map({id: 1}); // 报错 TypeError: Iterator value 1 is not an entry object
   var m = new Map([1,2]); // 报错 TypeError: Iterator value 1 is not an entry object
   
   var m = new Map([{name:222}]); // 不报错，但没有值
   
   var m = new Map([[1,2]]); // 不报错，有值
   ```

3. Map构造函数的原理

   ```js
   const items = [
       ['name','李四'],
       ['age',18]
   ]
   let map = new Map()
   
   items.forEach(
       ([key, value]) => map.set(key,value)
   )
   ```





## WeakMap

与Map类似，用于生成键值对的集合

1. 只接受对象作为键名（null除外）

2. 键名所指对象不计入垃圾回收机制

3. 键名弱引用，不是键值

   ```js
   const wm = new WeakMap()
   let key = {}
   let obj = {foo: 1}
   
   wm.set(key,obj)
   obj = null
   wm.get(key) // {foo : 1}
   ```

   