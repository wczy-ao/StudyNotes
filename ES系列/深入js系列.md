# 深入理解js

> 本文章来自于 https://github.com/mqyqingfeng/Blog 大佬博客，自己用于学习加深理解

## 1：原型与原型链

### 构造函数创建对象

我们先使用构造函数创建一个对象：

```
function Person() {

}
var person = new Person();
person.name = 'Kevin';
console.log(person.name) // Kevin
```

在这个例子中，Person 就是一个构造函数，我们使用 new 创建了一个实例对象 person

### prototype

> 指向一个对象，这个对象是调用该构造函数而创建实例的**原型**

**每个函数都有一个 prototype 属性**，就是我们经常在各种例子中看到的那个 prototype ，比如：

```
function Person() {

}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = 'Kevin';
var person1 = new Person();
var person2 = new Person();
console.log(person1.name) // Kevin
console.log(person2.name) // Kevin
```

函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的**实例**的原型，也就是这个例子中的 person1 和 person2 **的原型**。

### 什么是原型

每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

### **proto**

> 这是每一个JavaScript对象(除了 null )都具有的一个属性，叫**proto**，这个属性会指向该对象的原型。

```
function Person() {

}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
```

### 问题

> 既然实例对象和构造函数都可以指向原型，那么原型是否有属性指向构造函数或者实例呢？

### constructor

> 指向实例倒是没有，因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的，这就要讲到第三个属性：constructor，每个原型都有一个 constructor 属性指向关联的构造函数。

```
function Person() {

}
console.log(Person ===Person.prototype.constructor); // true
```

### 实例与原型

> 当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。

```
function Person() {

}

Person.prototype.name = 'Kevin';

var person = new Person();

person.name = 'Daisy';
console.log(person.name) // Daisy

delete person.name;
console.log(person.name) // Kevin
```

我们给实例对象 person 添加了 name 属性，当我们打印 person.name 的时候，结果自然为 Daisy。

但是当我们删除了 person 的 name 属性时，读取 person.name，从 person 对象中找不到 name 属性就会从 person 的原型也就是 person.**proto** ，也就是 Person.prototype中查找，幸运的是我们找到了 name 属性，结果为 Kevin。

### 原型的原型

```
var obj = new Object();
obj.name = 'Kevin'
console.log(obj.name) // Kevin
```

实例obj的**proto**和Object.prototype指向原型，原型是一个对象，对象就有**proto**属性，又指向原型

### 原型链

> 就是原型的原型，直到原型是null

```
console.log(Object.prototype.__proto__ === null) // true
```

### 补充

- null 表示“没有对象”，即该处不应该有值。
- constructor

```
function Person() {

}
var person = new Person();
console.log(person.constructor === Person); // true
```

当获取 person.constructor 时，其实 person 中并没有 constructor 属性,当不能读取到constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，正好原型中有该属性，所以：

```
person.constructor === Person.prototype.constructor
```

## 2：作用域

> 作用域分两种，静态作用域也叫词法作用域和动态作用域

### 静态作用域

> 函数的作用域在函数定义的时候就决定了。

### 动态作用域

> 函数的作用域是在函数调用的时候才决定的。

### 例子

```
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();
// 结果是 ???
```

> 假设JavaScript采用静态作用域，让我们分析下执行过程：

执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。

> 假设JavaScript采用动态作用域，让我们分析下执行过程：

执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。

## 3：执行上下文

### 顺序执行？

如果要问到 JavaScript 代码执行顺序的话，想必写过 JavaScript 的开发者都会有个直观的印象，那就是顺序执行，毕竟：

```
var foo = function () {

    console.log('foo1');

}

foo();  // foo1

var foo = function () {

    console.log('foo2');

}

foo(); // foo2
```

但是这段代码

```
function foo() {

    console.log('foo1');

}

foo();  // foo2

function foo() {

    console.log('foo2');

}

foo(); // foo2
```

JavaScript 引擎并非一行一行地分析和执行程序，而是一段一段地分析执行。当执行一段代码的时候，会进行一个“准备工作”，比如第一个例子中的变量提升，和第二个例子中的函数提升。

### 可执行代码

这就要说到 JavaScript 的可执行代码(executable code)的类型有哪些了？

**其实很简单，就三种，全局代码、函数代码、eval代码。**

举个例子，当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做"**执行上下文**(execution context)"。

### 执行上下文栈

执行上下文栈就是来管理上面说的执行上下文，JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文

为了模拟执行上下文栈的行为，让我们定义执行上下文栈是一个数组：

```
ECStack = [];
```

#### 全局执行上下文

当JavaScript开始解释执行代码时，最先遇到全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，我们用 globalContext 表示它，并且只有当整个应用程序结束的时候，ECStack 才会被清空，所以程序结束之前， **ECStack 最底部永远有个 globalContext：**

```
ECStack = [
    globalContext
];
```

#### 函数执行上下文

`当执行一个函数的时候，就会创建一个执行上下文`，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。

```
// 伪代码

// fun1()
ECStack.push(<fun1> functionContext);

// fun1中竟然调用了fun2，还要创建fun2的执行上下文
ECStack.push(<fun2> functionContext);

// 擦，fun2还调用了fun3！
ECStack.push(<fun3> functionContext);

// fun3执行完毕
ECStack.pop();

// fun2执行完毕
ECStack.pop();

// fun1执行完毕
ECStack.pop();

// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext
```

#### 例子

```
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```

> 第一段代码：

```
ECStack.push(<checkscope> functionContext);
ECStack.push(<f> functionContext);
ECStack.pop();
ECStack.pop();
```

> 第二段代码：

```
ECStack.push(<checkscope> functionContext);
ECStack.pop();
ECStack.push(<f> functionContext);
ECStack.pop();
```





## 4：变量对象

> 关于vo和ao的理解

https://blog.csdn.net/qq_38882976/article/details/103562294

> 对于每个执行上下文，都有三个重要属性：

- 变量对象(Variable object，VO)
- 作用域链(Scope chain)
- this

### 定义

变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。

### 全局上下文中的变量对象

> 就是全局对象

### 函数上下文中的变量对象

> 在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。

活动对象和变量对象其实是一个东西，叫法不同，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 activation object 呐，而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。

活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象。

### 执行过程

执行上下文的代码会分成两个阶段进行处理：分析和执行，我们也可以叫做：

1. 进入执行上下文
2. 代码执行

#### 进入执行上下文

当进入执行上下文时，这时候还没有执行代码，

变量对象会包括：

1. 函数的所有形参 (如果是函数上下文)
   - 由名称和对应值组成的一个变量对象的属性被创建
   - 没有实参，属性值设为 undefined
2. 函数声明
   - 由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
   - 如果变量对象已经存在相同名称的属性，则完全替换这个属性
3. 变量声明
   - 由名称和对应值（undefined）组成一个变量对象的属性被创建；
   - 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性

举个例子：

```
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}

foo(1);
```

> 在进入执行上下文后，这时候的 AO 是：

```
AO={
    arguments: {
        0: 1,
        length: 1
    },
    a:1,
    b:undefined
    c:function c(){},
    d:undefined,
   
}
```

#### 代码执行

在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值

还是上面的例子，当代码执行完后，这时候的 AO 是：

```
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}
```

### 思考题

```
function foo() {
    console.log(a);
    a = 1;    //这个地方不是变量声明，所以不会变量提升
}

foo(); //  a not defined

function bar() {
    a = 1; //先执行这一步的话，a被隐式转化成全局变量
    console.log(a);
}
bar(); // ???
```





## 5：作用域链

### 定义：

当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。



### 函数创建

函数的作用域在函数定义的时候就决定了。

这是因为函数有一个内部属性 [[scope]]，当函数创建的时候，就会**保存所有父变量对象到其中**，你可以理解 [[scope]] 就是所有父变量对象的层级链，但是注意：[[scope]] 并不代表完整的作用域链！



> 举个例子：

```
function foo() {
    function bar() {
        ...
    }
}
    
函数创建时，各自的[[scope]]为：

foo.[[scope]] = [
  globalContext.VO
];

bar.[[scope]] = [
    fooContext.AO,
    globalContext.VO
];
```

### 函数激活

当函数激活时，进入函数上下文，创建 VO/AO 后，就会将活动对象添加到作用链的前端。

这时候执行上下文的作用域链，我们命名为 Scope：

```
Scope = [AO].concat([[Scope]]);
```

至此，作用域链创建完毕。

### 例子

```
var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();
```

> 执行过程如下：

1.checkscope 函数被创建，保存作用域链到 内部属性[[scope]]

```
checkscope.[[scope]] = [
    globalContext.VO  //保存全局GO
];
```

2.执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈

```
ECStack = [
    checkscopeContext,//这个就是函数
    globalContext
];
```

3.checkscope 函数并不立刻执行，开始做准备工作，第一步：复制函数[[scope]]属性创建作用域链

```
checkscopeContext = {
    Scope: checkscope.[[scope]],
}
```

4.第二步：用 arguments 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明

```
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    }，
    Scope: checkscope.[[scope]],
}
```

5.第三步：将活动对象压入 checkscope 作用域链顶端

```
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    },
    Scope: [AO, [[Scope]]]
}
```

6.准备工作做完，开始执行函数，随着函数的执行，修改 AO 的属性值

```
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: 'local scope'
    },
    Scope: [AO, [[Scope]]]
}
```

7.查找到 scope2 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出

```
ECStack = [
    globalContext
];
```

## 6：深入this

本文主要提供一个新的角度去理解this的指向，但具体的

> ECMAScript 的类型分为语言类型和规范类型。
>
> ECMAScript 语言类型是开发者直接使用 ECMAScript 可以操作的。其实就是我们常说的Undefined, Null, Boolean, String, Number, 和 Object。
>
> 而规范类型相当于 meta - values，是用来用算法描述 ECMAScript 语言结构和 ECMAScript 语言类型的。
>
> 规范类型包括：Reference, List, Completion, Property Descriptor, Property Identifier, Lexical Environment, 和 Environment Record。



### Reference

**其中的 Reference 类型。它与 this 的指向有着密切的关联。**

> Reference 类型就是用来解释诸如 delete、typeof 以及赋值等操作行为的。





> 抄袭尤雨溪大大的话，就是：
>
> 这里的 Reference 是一个 Specification Type，也就是 “只存在于规范里的抽象类型”。
>
> 它们是为了更好地描述语言的底层行为逻辑才存在的，但并不存在于实际的 js 代码中。



Reference 的构成，由三个组成部分，分别是：

- base value
- referenced name
- strict reference

base value 就是属性所在的对象或者就是 EnvironmentRecord，它的值只可能是 undefined, an Object, a Boolean, a String, a Number, or an environment record 其中的一种。

referenced name 就是属性的名称。



举个例子：

```
// var foo = 1;

// 对应的Reference是：
// var fooReference = {
//     base: EnvironmentRecord,
//     name: 'foo',
//     strict: false
// };
```

再来个例子

```
// var foo = {
//     bar: function () {
//         return this;
//     }
// };
// ----------------------------------------------

// foo.bar(); // foo

// bar对应的Reference是：
// var BarReference = {
//     base: foo,
//     propertyName: 'bar',
//     strict: false
// };
```



而且规范中还提供了获取 Reference 组成部分的方法，比如 GetBase 和 IsPropertyReference。

> 1.GetBase

- 返回 reference 的 base value。

> 2.IsPropertyReference

- 简单的理解：如果 base value 是一个对象，就返回true。

除此之外GetValue，一个用于从 Reference 类型获取对应值的方法： GetValue。



> 这些方法都不可以用，因为 Reference 是抽象的，底层中才能用

```
var foo = 1;

var fooReference = {
    base: window,
    name: 'foo',
    strict: false
};
console.log(GetBase(fooReference));  //报错
GetValue(fooReference) // 1;
```

**调用 GetValue，返回的将是具体的值，而不再是一个 Reference**



### this的值

当函数调用的时候，如何确定 this 的取值。步骤如下

1.计算 MemberExpression 的结果赋值给 ref

2.判断 ref 是不是一个 Reference 类型

```
2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)

2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)

2.3 如果 ref 不是 Reference，那么 this 的值为 undefined
```



#### 具体分析

1. 计算 MemberExpression 的结果赋值给 ref

MemberExpression :

- PrimaryExpression // 原始表达式 可以参见《JavaScript权威指南第四章》
- FunctionExpression // 函数定义表达式
- MemberExpression [ Expression ] // 属性访问表达式
- MemberExpression . IdentifierName // 属性访问表达式
- new MemberExpression Arguments // 对象创建表达式



> **简单理解 MemberExpression 其实就是()左边的部分。**

```
function foo() {
    console.log(this)
}

foo(); // MemberExpression 是 foo

function foo() {
    return function() {
        console.log(this)
    }
}

foo()(); // MemberExpression 是 foo()

var foo = {
    bar: function () {
        return this;
    }
}

foo.bar(); // MemberExpression 是 foo.bar
```



1. 判断 ref 是不是一个 Reference 类型。

> 关键就在于看规范是如何处理各种 MemberExpression，返回的结果是不是一个Reference类型。

举个例子

```
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

//示例1
console.log(foo.bar());
//示例2
console.log((foo.bar)());
//示例3
console.log((foo.bar = foo.bar)());
//示例4
console.log((false || foo.bar)());
//示例5
console.log((foo.bar, foo.bar)());
```



**foo.bar()，(foo.bar)()**

在示例 1 中，MemberExpression 计算的结果是 foo.bar，**该表达式返回了一个 Reference 类型！**（为什么来目前省略）

按照 2.1 的判断流程走：

> 2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)
>
> 
>
> IsPropertyReference(ref)，如果ref是对象返回true
>
> 
>
> 这个时候我们就可以确定 this 的值了：this = GetBase(ref)， GetBase(ref)返回值就是Reference 中的 base 属性值 所以 this 的值就是 foo



**(foo.bar = foo.bar)()，(false || foo.bar)()，(foo.bar, foo.bar)()**

> 都是调用GetValue，返回的值不是Reference 类型，this 为 undefined





#### 多说一句

> 尽管我们可以简单的理解 this 为调用函数的对象，如果是这样的话，如何解释下面这个例子呢？

```
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}
console.log((false || foo.bar)()); // 1
```



## 7：闭包

### 理论定义：

闭包是指那些能够访问自由变量的函数。

#### 自由变量：

自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

> 闭包 = 函数 + 函数能够访问的自由变量

例子

```
var a = 1;

function foo() {
    console.log(a);
}

foo();
```

### 实际角度上的闭包

1. 从实践角度：以下函数才算是闭包：
   1. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
   2. 在代码中引用了自由变量

### 必刷题

实现打印0，1，2（采用闭包方式）

```
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();
```

> 闭包方式

```
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
        return function(){
            console.log(i);
        }
  })(i);
}

data[0]();
data[1]();
data[2]();
```

### 立即执行函数（IIFE)

IIFE英文就是 immediately invocted function express，立即调用函数表达式

函数又分为两种创建方式，函数声明和函数表达式

```js
function a(){
    console.log('function description')
}()//报错

var a=function (){
    log
}()//不报错
```

但是就真的没有办法解决函数声明式的调用立即执行函数吗？当然可以，只要把函数声明转化成表达式就可以

```js
(function a(){
    console.log('function description')
}()//不报错)
(function a(){
    console.log('function description')
})()//不报错
```



需要注意的是，在外面不能调用立即执行函数，IIFE是具有独立作用域的，一旦执行完后，会自动销毁执行上下文栈

```js
(function a(){
    console.log('function description')
}())

a()//报错
```











## 8：参数按值传递

### 定义

在《JavaScript高级程序设计》第三版 4.1.3，讲到传递参数：

> ECMAScript中所有函数的参数都是按值传递的。

什么是按值传递呢？

> 也就是说，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。

### 按值传递

```
var value = 1;
function foo(v) {
    v = 2;
    console.log(v); //2
}
foo(value);
console.log(value) // 1
```

很好理解，当传递 value 到函数 foo 中，相当于拷贝了一份 value，假设拷贝的这份叫 _value，函数中修改的都是 _value 的值，而不会影响原来的 value 值。

### 引用传递？

> 红宝书都说了 ECMAScript 中所有函数的参数都是按值传递的，这怎么能按"引用传递"成功呢？

```
var obj = {
    value: 1
};
function foo(o) {
    o.value = 2;
    console.log(o.value); //2
}
foo(obj);
console.log(obj.value) // 2
```

所谓按引用传递，就是传递对象的引用，函数内部对参数的任何改变都会影响该对象的值，因为两者引用的是同一个对象。

### 第三种传递方式--按共享传递

> **按引用传递是传递对象的引用，而按共享传递是传递对象的引用的副本！**

```
var obj = {
    value: 1
};
function foo(o) {
    o = 2;
    console.log(o); //2
}
foo(obj);
console.log(obj.value) // 1
```

所以修改 o.value，可以通过引用找到原值，但是直接修改 o，并不会修改原值。所以第二个和第三个例子其实都是按共享传递。

## 9：深入之call模拟实现

### call

一句话介绍 call：

> call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

举个例子：

```
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1
```

注意两点：

1. call 改变了 this 的指向，指向到 foo
2. bar 函数执行了

### 模拟实现第一步

```
var foo = {
    value: 1,
    bar: function() {
        console.log(this.value)
    }
};

foo.bar(); // 1
```

这个时候 this 就指向了 foo，

但是这样却给 foo 对象本身添加了一个属性，这可不行呐！

不过也不用担心，我们用 delete 再删除它不就好了~

#### 步骤

1. 将函数设为对象的属性
2. 执行该函数
3. 删除该函数

```
// 第一步
foo.fn = bar
// 第二步
foo.fn()
// 第三步
delete foo.fn
```

#### 第一版

```
// 第一版
Function.prototype.call2 = function(context) {
    // 首先要获取调用call的函数，用this可以获取
    context.fn = this;
    context.fn();
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call2(foo); // 1
```

#### 第二版--加参数

最一开始也讲了，call 函数还能给定参数执行函数。举个例子：

```
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call(foo, 'kevin', 18);
// kevin
// 18
// 1
```

注意：传入的参数并不确定，这可咋办？

不急，我们可以从 Arguments 对象中取值，取出第二个到最后一个参数，然后放到一个数组里。

比如这样：

```
// 以上个例子为例，此时的arguments为：
// arguments = {
//      0: foo,
//      1: 'kevin',
//      2: 18,
//      length: 3
// }
// 因为arguments是类数组对象，所以可以用for循环
var args = [];
for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
}

// 执行后 args为 ["arguments[1]", "arguments[2]", "arguments[3]"]
```

我们接着要把这个参数数组放到要执行的函数的参数里面去。

用 eval 方法拼成一个函数，类似于这样：

```
eval('context.fn(' + args +')')
```

##### eval函数接收参数是个字符串

定义和用法

> eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。

语法：`eval(string)`

> string必需。要计算的字符串，其中含有要计算的 JavaScript 表达式或要执行的语句。该方法只接受原始字符串作为参数，如果 string 参数不是原始字符串，那么该方法将不作任何改变地返回。因此请不要为 eval() 函数传递 String 对象来作为参数。



> 简单来说吧，就是用JavaScript的解析引擎来解析这一堆字符串里面的内容，这么说吧，你可以这么理解，你把`eval`看成是`<script>`标签。



```js
// 第二版
Function.prototype.call2 = function(context) {
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    eval('context.fn(' + args +')'); // 不太明白这种写法
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call2(foo, 'kevin', 18); 
// kevin
// 18
// 1
```



> 我这样写也能实现

```JS
Function.prototype.call2 = function(context) {
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }
    eval(context.fn(...args));
    delete context.fn;
    
}
```

------

## 10：深入之bind的模拟实现

> bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )

### 返回函数的模拟实现

```JS
// 第一版
Function.prototype.bind2 = function (context) {
    var self = this;  // this 就是 bar
    return function () {
        return self.apply(context);
    }

}


var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

// 返回了一个函数
var bindFoo = bar.bind2(foo); 

bindFoo(); // 1
```



### 传参的模拟实现

```js
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);

}

var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18');
```

这个地方会有点疑惑， bindFoo 是一个函数，然后还能继续传参？

```js
// 第二版
Function.prototype.bind2 = function (context) {

    var self = this;
    // 获取bind2函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        // 这个时候的arguments是指bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(context, args.concat(bindArgs));
    }

}
```

这个时候的 bindFoo('18') 会把 实参传进去，与之前的参数通过concat方法串联起来

### 有一个问题

当我们使用bind返回函数作为构造函数的时候，bind 时指定的 this 会失效，但传入的参数会生效

```js
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```

因为这个时候通过new来创建对象实例，这个this指向的是obj