# class

## 基本概念

[阮一峰--es6--class](https://6e9de850.wiz06.com/wapp/pages/view/share/s/1KDuxg3NQx7G22jsfI2P8GS72dfsZA1YiQv92bFP1c2cdcK9)

1. 类中的方法不需要加 function 关键字；方法之间不需要逗号

2. 实例的属性除非显式定义在其本身（即定义在`this`对象上）或者直接写，否则都是定义在原型上

   ```js
   class Person{
       constructor(){
           this.x = 11
       }
       y = 2 // 直接写，这个是新写法
   }
   ```

   

3. 类的数据类型就是函数，类本身就指向构造函数

   ```js
   class Point {
     // ...
   }
   
   typeof Point // "function"
   Point === Point.prototype.constructor // true
   ```

4. 类的所有方法都定义在类的`prototype`属性上面。`constructor()`、`toString()`、`toValue()`这三个方法，其实都是定义在`Point.prototype`上面。

   ```js
   class Point {
     constructor() {
       // ...
     }
     toString() {
       // ...
     }
     toValue() {
       // ...
     }
   }
   // 等同于
   Point.prototype = {
     constructor() {},
     toString() {},
     toValue() {},
   };
   ```

5. **类的内部所有定义的方法，都是不可枚举的（non-enumerable）**

   ```js
   class Point {
     constructor(x, y) {
       // ...
     }
     toString() {
       // ...
     }
   }
   var Akk = function (x, y) {
     // ...
   };
   
   Akk.prototype.toString = function () {
     // ...
   };
   
   Object.keys(Point.prototype)
   // []
   Object.getOwnPropertyNames(Point.prototype) // getOwnPropertyNames 可以获取类中属性
   // ["constructor","toString"]
   
   Object.keys(Akk.prototype) //ES5
   // ["toString"]
   ```



## 继承

[JavaScript深入之继承的多种方式和优缺点]((https://github.com/mqyqingfeng/Blog/issues/16#))

Class 可以通过`extends`关键字实现继承，让子类继承父类的属性和方法。

```js
class Foo {
  constructor() {
    console.log(1);
  }
}

class Bar extends Foo {
  constructor() {
    super();
    console.log(2);
  }
}
```

### super

`super`这个关键字，既可以当作函数使用，也可以当作对象使用（第四篇文章有讲）。在这两种情况下，它的用法完全不同。

#### 函数使用

`super`作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次`super`函数。

```js
class A {}

class B extends A {
  constructor() {
    super();// 相等于 super()`在这里相当于`A.prototype.constructor.call(this)
  }
}
```

1. **`super`虽然代表了父类`A`的构造函数，但是返回的是子类`B`的实例，即`super`内部的`this`指的是`B`的实例，因此`super()`在这里相当于`A.prototype.constructor.call(this)`。**
2. super只能在子构造函数中使用，其他地方报错



#### 对象使用

super做对象使用表示当前对象的原型

```js
var proto = {
	y: 20,
  z: 30,
  bar: function(){
  	console.log(this.z);
  }
}

var obj = {
  x: 10,
  foo(){
  	console.log(super.y); //30
  },
  goo(){
  	super.bar(); //20
  }
}

Object.setPrototypeOf(obj, proto);
obj.foo();
obj.goo();
```



### es6和es5的继承

1. ES5 的继承机制，是先创造一个独立的子类的实例对象，然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。

   - 执行 var child1 = new Child() 时，构造函数内部是有 this 的，这个this 就是实例对象；所以是实例在前

   ```js
   function Parent () {
       this.names = 'kevin';
   }
   
   function Child () {
       this.age = 18
       Parent.call(this);
   }
   
   var child1 = new Child();
   
   console.log(child1); 
   ```

   

2. ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例，即“继承在前，实例在后”。

   - 先执行super()继承，在返回一个this实例

   ```js
   class Foo {
     constructor() {
       console.log(1);
     }
   }
   
   class Bar extends Foo {
     constructor() {
       super();
       this.name = 'www'
       console.log(2);
     }
   }
   ```

   

3. 这就是为什么 ES6 的继承必须先调用`super()`方法，因为这一步会生成一个继承父类的`this`对象，没有这一步就无法继承父类。



## class的babel转译

```js
class Parent {
  constructor(name) {
    this.name = name || "Parent";
    this.age = 21;
  }
  sayName() {
    console.log(this.name);
  }

  saySth(str) {
    console.log(str);
  }

  static staticMethod(str) {
    console.log(str);
  }
}


const p = new Parent("Parenttt");
```

转译后的class

```js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
      // 不可遍历
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
//   1：Parent是一个IIFE，返回的是一个函数，执行 new Parent() 就是内部的这个Partent
var Parent = /*#__PURE__*/ (function () {
  function Parent(name) {
      // 检查是不是 new 执行的
    _classCallCheck(this, Parent);

    this.name = name || "Parent";
    this.age = 21;
  }
//   2：执行 _createClass 返回的构造函数，很明显就是 函数变成了 类 做了一些操作
  _createClass(
    Parent,
    [
      {
        key: "sayName",
        value: function sayName() {
          console.log(this.name);
        }
      },
      {
        key: "saySth",
        value: function saySth(str) {
          console.log(str);
        }
      }
    ],
    [
      {
        key: "staticMethod",
        value: function staticMethod(str) {
          console.log(str);
        }
      }
    ]
  );

  return Parent;
})();

var p = new Parent("Parenttt");
```

1. Parent是一个IIFE，返回的是一个函数，执行 new Parent() 就是内部的这个Partent
2. 执行 _createClass 返回的是构造函数，很明显就是 函数变成了 类 做了一些操作
   - 第一个参数 Parent 就是构造函数
   - 第二个参数类上的方法
   - 第三个参数类上的静态方法
3. 最后执行 Parent函数，_classCallCheck先判断是不是new 执行的，其他的和 ES5的是一样的





## 修饰器

为对象添加新的功能，不改变原有的结构和功能

```
符号：@ 

```

修饰类

```js
@testable
class Person{
	constructor(name='lisi', age='19'){
  	this.name = name;
    this.age = age;
  }
  say(){
  	console.log('hello world')
  }
  eat(){
  	console.log('eat')
  }
}
var person = new Person();

function testable(target){
	console.log('target', target) // target 就是 Person
}
```

修饰属性

```js
class Person{
	constructor(name='lisi', age='19'){
  	this.name = name;
    this.age = age;
  }
  @readOnly
  say(){
  	console.log('hello world')
  }
  eat(){
  	console.log('eat')
  }
}
function readOnly(target, name, descriptor){
	console.log(target, name, descriptor)
  descriptor.writable = false
}

var person = new Person()
person.say()
```

埋点分析

```js
var log = (type) => {
	return function(target, name, descriptor){
  	let src_method = descriptor.value
    descriptor.value = (...arg) => {
    	src_method.apply(target, arg);
      console.log(type);
    }
  }
}

class AD{
  @log('show')
	show(){
  	console.log('ad show')
  }
  @log('click')
  click(){
  	console.log('ad click')
  }
}

```

