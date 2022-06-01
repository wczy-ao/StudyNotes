# TypeScript 的函数

函数是 JavaScript 传递数据的主要方法。TypeScript 允许你指定函数的输入值和输出值的类型。



## 函数类型

语法 `(a: string) => void` 表示一个函数有一个名为 `a` ，类型是字符串的参数，这个函数并没有返回任何值。

```ts
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
 
function printToConsole(s: string) {
  console.log(s);
}
 
greeter(printToConsole);
```



或者使用类型别名定义一个函数

```ts
type Fn = (a: string) => void
function greeter(fn: Fn) {
  fn("Hello, World");
}
 
function printToConsole(s: string) {
  console.log(s);
}
 
greeter(printToConsole);
```











## 参数类型

```ts
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

### 可选参数

```ts
function foo(x: number, y?: number) {

}

foo(20, 30)
foo(20)
```





### 参数默认值

```ts
function foo(y: number, x: number = 20) {
  console.log(x, y)
}

foo(30)
```



### 剩余参数

剩余参数必须放在所有参数的最后面，并使用 `...` 语法

```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```



## 返回值类型注解

```ts
function getFavoriteNumber(): number {
  return 26;
}
```



## 匿名函数

匿名函数有一个特点、匿名函数的参数会被自动的指定类型；这个过程被称为**上下文推断**；从函数出现的上下文中推断出了它应该有的类型

```ts
names.forEach(function (s) {
    console.log(s.toUppercase());
    // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});

// Contextual typing also applies to arrow functions
names.forEach((s) => {
    console.log(s.toUppercase());
    // Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
```







## 函数重载

**联合类型实现**

```ts
function add(a1: number | string, a2: number | string) {
  if (typeof a1 === "number" && typeof a2 === "number") {
    return a1 + a2
  } else if (typeof a1 === "string" && typeof a2 === "string") {
    return a1 + a2
  }
}

add(10, 20)
```



**函数体实现**

这个例子中，我们写了两个函数重载，一个接受两个number类型参数，另外一个接受两个string类型参数。前面两个函数签名被称为重载签名

```ts
function add(num1: number, num2: number): number; // 没函数体
function add(num1: string, num2: string): string;

function add(num1: any, num2: any): any {
  if (typeof num1 === 'string' && typeof num2 === 'string') {
    return num1.length + num2.length
  }
  return num1 + num2
}

const result = add(20, 30)
const result2 = add("abc", "cba")
console.log(result)
console.log(result2)
```

