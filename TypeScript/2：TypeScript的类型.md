# TypeScript的类型
- [TypeScript的类型](#typescript的类型)
  - [变量声明](#变量声明)
    - [简单变量](#简单变量)
    - [复杂对象](#复杂对象)
    - [数组的声明](#数组的声明)
      - [元组 tuple 类型](#元组-tuple-类型)
    - [对象的声明](#对象的声明)
    - [any 类型](#any-类型)
      - [`noImplicitAny`](#noimplicitany)
    - [unknown 类型](#unknown-类型)
    - [void 类型](#void-类型)
    - [never 类型](#never-类型)
    - [可选类型](#可选类型)
    - [联合类型](#联合类型)
    - [类型别名 type](#类型别名-type)
    - [接口 Interfaces](#接口-interfaces)
    - [接口与类型的区别](#接口与类型的区别)
      - [接口扩展方式](#接口扩展方式)
      - [类型别名扩展方式](#类型别名扩展方式)
    - [类型断言 as](#类型断言-as)
    - [非空类型断言 !](#非空类型断言-)
    - [可选链 ?](#可选链-)
    - [字面量类型](#字面量类型)
      - [结合联合类型](#结合联合类型)
## 变量声明

变量声明需要类型注解、可以和下面例子一样显示定义、也可以不用、TypeScript 会自动推断类型；

如果推断不出来的话、就会默认为 any 类型

```ts
// 自动推断
let str = "1"
str = 2 // error

// 推断不出来
let str
str = 1
str = '2'
```



### 简单变量

```ts
//  var/let/const 标识符: 数据类型 = 赋值;
let str: string = 'hello world'
let num: number = 1
let flag: boolean = false
```



### 复杂对象

### 数组的声明

```ts
// 两种声明方式、优先第一种
const arr: string[] = []
const arr1: Array<string> = []
```



#### 元组 tuple 类型

数组中通常建议存放相同类型的元素，不同类型的元素是不推荐放在数组中。（可以放在对象或者元组中）

```ts
const info: [string, number, number] = ["why", 18, 1.88]
```



### 对象的声明

```ts
const info: object = {
    age: 10,
    name: "wan"
}

/**
 * 不能直接用 . / [] 读取属性值；具体原因后面到了接口会讲
 * info.age = 22 报错
 * info['age'] = 22 报错
 * Property 'name' does not exist on type '{}'.
 */
```





### any 类型

想怎么用怎么用、之前简单变量声明限制了类型、比如不能将 `numbe`r 赋给 `string`；这里随便用、和写 `js` 一样；

```ts
let str: any = 12
str = 'a'
str = true
```



#### `noImplicitAny`

如果你没有指定一个类型，TypeScript 也不能从上下文推断出它的类型，编译器就会默认设置为 `any` 类型。

如果你总是想避免这种情况，毕竟 TypeScript 对 `any` 不做类型检查，你可以开启编译项 [noImplicitAny (opens new window)](https://www.typescriptlang.org/tsconfig#noImplicitAny)，当被隐式推断为 `any` 时，TypeScript 就会报错。

### unknown 类型

TypeScript中比较特殊的一种类型，它用于描述类型不确定的变量

```ts
/**
 * 有一点值得注意
 * unknown 类型的变量只能赋给 any、不能赋给其他类型变量
 */
let str: unknown = 1
let num: any = 2
let count:number = 12


num = str
count = str // error
```





### void 类型

通常用来指定一个函数是没有返回值的，那么它的返回值就是void类型

```ts
function sum(num1: number, num2: number):void {
  console.log(num1 + num2)
}

sum(20, 30)
```





### never 类型

表示永远不会发生值的类型

```ts
function handleMessage(message: string | number | boolean) {
  switch (typeof message) {
    case 'string':
      console.log("string处理方式处理message")
      break
    case 'number':
      console.log("number处理方式处理message")
      break
    case 'boolean':
      console.log("boolean处理方式处理message")
      break
    default:
          // 永远不会发生的场景
      const check: never = message
  }
}
```





### 可选类型

只需要在属性名后添加一个 `?`、表示该属性可以没有、其实可选类型就是 undefined 与 具体类型的 联合类型 `last?: string === undefined | string`

```ts
function printName(obj: { first: string; last?: string }) {
}

printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```





### 联合类型

一个联合类型是由两个或者更多类型组成的类型，表示值可能是这些类型中的任意一个。

```ts
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
```



### 类型别名 type

有的时候，一个类型会被使用多次，此时我们更希望通过一个单独的名字来引用它。这个时候就可以用类型别名；**需要注意的是 类型别名是唯一的，不能重复**

```ts
type Point = {
  x: number;
  y: number;
};

type Id = string | number


function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

function getId(id: Id) {
    
}

type Id = string | number
type Id = boolean | number
```





### 接口 Interfaces

接口声明（interface declaration）是命名对象类型的另一种方式

```ts
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```



### 接口与类型的区别

大部分时候，你可以任意选择使用。接口的几乎所有特性都可以在 `type` 中使用，**两者最关键的差别在于类型别名本身无法添加新的属性，而接口是可以扩展的。**

#### 接口扩展方式

1. 重复定义接口类型

   ```ts
   interface Point {
       x: number,
       y?: number
   }
   interface Point {
       ts: boolean
   }
   // 可扩展
   const obj: Point = {
       x: 1,
       ts:false
   }
   ```

   

2. 继承父类接口

   ```ts
   interface Animal {
       name: string
   }
   
   interface Bear extends Animal {
       honey: boolean
   }
   
   const obj: Bear = {
       name: 'wan',
       honey: false
   }
   ```

   



#### 类型别名扩展方式

1. 交集扩展

   ```ts
   type Parent = {
       hooby: string
   }
   
   type Son = Parent & {
       subject: string
   }
   
   const obj: Son = {
       hooby: '跳舞',
       subject: '体育'
   }
   ```

   



### 类型断言 as

你知道一个值的类型，但 TypeScript 不知道。这个时候就需要你将值断言成你知道的类型；但是断言有以下几条规则

- 只能从不具体的类型断言到具体类型、因为这两种类型是有一部分重叠的

  ```ts
  const myCanvas = document.getElementById("main_canvas");
  
  // const myCanvas: HTMLCanvasElement
  const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
  ```



- 不能从具体类型到另一个不相关的具体类型

  ```ts
  const myCanvas = document.getElementById("main_canvas") as string;
  // error:类型 "HTMLElement" 到类型 "string" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。
  ```

  

- 如果你很想把一个具体类型断言成另一个具体类型、那么需要双断言、先断言成 `unknown`

  ```ts
  const myCanvas = document.getElementById("main_canvas") as unknown as string;
  ```




### 非空类型断言 !

可以在不做任何检查的情况下，从类型中移除 `null` 和 `undefined`、`last !`表示它的值不可能是 `null` 或者 `undefined`

**但是要记住的是：只有当你明确的知道这个值不可能是 `null` 或者 `undefined` 时才使用 `!`**

**但是要记住的是：只有当你明确的知道这个值不可能是 `null` 或者 `undefined` 时才使用 `!`**

**但是要记住的是：只有当你明确的知道这个值不可能是 `null` 或者 `undefined` 时才使用 `!`**

```ts
function printName(last?: string ) {
    console.log(last!.length) // 执行报错
}
printName()
```



### 可选链 ?

其存在就是为了解决可选类型是导致值不存在的问题

```ts
function printName(obj: { first: string; last?: string }) {
    console.log(last?.length) // last 有值就执行后面、不存在就返回undefined
}
```



### 字面量类型

除了常见的类型 `string` 和 `number` ，我们也可以**将类型声明为更具体的数字或者字符串**。

```typescript
let x: "hello" = "hello";

// x 只能被赋给 'hello'，不能赋给 '其他字符串'
x = 'hello'

x = 1 // 不能将类型“1”分配给类型“"hello"”
```



#### 结合联合类型

可以限制函数参数是某些特定字符串或者返回值是某些值

```typescript
function printText(s: string, alignment: "left" | "right" | "center") {
  
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.
```



```typescript
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

