# JS-面试题

## 解构赋值

1. ```js
   let x,
   {x: y = 1} = {x}
   // x 是模式不是变量
   console.log(x) // undefined
   console.log(y) // 1
   
   // 类似
   var {x = 3} = {}; // 3
   
   var {x, y = 5} = {x: 1};
   x // 1
   y // 5
   
   var {x: y = 3} = {};
   y // 3
   
   var {x: y = 3} = {x: 5};
   y // 5
   ```

   

## 浏览器与nodejs的event loop

[**不要混淆nodejs和浏览器中的event loop**](https://cnodejs.org/topic/5a9108d78d6e16e56bb80882)

[**浏览器与Node的事件循环(Event Loop)有何区别?**](https://zhuanlan.zhihu.com/p/54882306)



## 纯函数

[**函数式编程指北**](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch1.html)

[JavaScript专题之柯里化](https://github.com/mqyqingfeng/Blog/issues/42)