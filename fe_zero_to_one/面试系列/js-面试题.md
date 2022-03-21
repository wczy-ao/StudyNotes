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

   