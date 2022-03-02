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