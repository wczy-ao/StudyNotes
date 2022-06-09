# Set、WeakSet 

[阮一峰--es6--Set和weakSet](https://6e9de850.wiz06.com/wapp/pages/view/share/s/1KDuxg3NQx7G22jsfI2P8GS70b0yUr2b1QSS2w3I_43XdKT2)

## set

1. for of 可以遍历 set数据结构、说明set具有 iterator 接口

   ```js
   var set = new Set([1,2,3,5,5,5]);
   for (let  i of set) {
       console.log(i);
   }
   ```

2. set 不会重复添加相同的值

   ```js
   var set = new Set();
   set.add(1).add(1)
   console.log(set); //只有一个 1
   
   set.add(NAN).add(NAN) // NAN在set中判断不相同。所以两个 NAN
   ```

3. set 数据结构没有key，换句话说key和value是一样的

   ```js
   var set = new Set([1,2,3,5,5,5]);
   for (let  i of set.keys()) {
       console.log(i); // 1 2 3 5
   }
   ```

4. 利用set 获取交集，并集，差集

   ```js
   var a = new Set([1,2,3]);
   var b = new Set([4,3,2]);
   var union = new Set([...a, ...b]);
   console.log('交集', union);
   var intersect = new Set([...a].filter(x => b.has(x)));
   console.log('并集', intersect);
   var difference = new Set([...a].filter(x => !b.has(x)));
   console.log('差集', difference);
   ```

   

## WeakSet

1. WeakSet的成员只能是对象，而且不能是包装类的对象

   ```js
   var set1 = new WeakSet()
   var num = Number(1)
   var obj = {}
   set1.add(obj)
   set1.add(num) // 报错
   console.log(set1);
   ```

2. 弱引用：WeakSet中的对象都是弱引用，就是**垃圾回收机制决定这个对象的回收，不考虑它是不是还在WeakSet中引用了**；所以WeakSet通常用来存储DOM节点

3. WeakSet不可遍历

   1. 这就是因为**运行前后的个数不一样了**，所以步可遍历

