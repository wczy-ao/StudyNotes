# Array的那些事儿

## ES5

### `reduce`

```js
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (previousValue, currentValue, index, arr) => previousValue + currentValue,
  initialValue
);
```

需要注意以下几种情况：

1. 如果有 *初始值*，reduce遍历从 0 开始
2. 如果没有 *初始值*， reduce遍历从 1 开始
3. 如果数组为空，且没有 *初始值*    报错
4. 如果数组为空，有 *初始值*，不会遍历直接返回初始值
5. 数组不为空元素只有一个，但没有初始值，不会遍历直接返回数组一个元素 

```js
var maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x );

[].reduce( maxCallback ); // TypeError 第三种情况

```



#### 常见用法

1. 求和求乘

   ```js
   // 求和
   [3, 5, 4, 3, 6, 2, 3, 4].reduce((a, i) => a + i);
   // 30
   
   // 有初始化值
   [3, 5, 4, 3, 6, 2, 3, 4].reduce((a, i) => a + i, 5 );
   // 35
   
   // 如果看不懂第一个的代码，那么下面的代码与它等价
   [3, 5, 4, 3, 6, 2, 3, 4].reduce(function(a, i){return (a + i)}, 0 );
   
   // 乘法
   [3, 5, 4, 3, 6, 2, 3, 4].reduce((a, i) => a * i);
   ```

2. 扁平数组

   ```js
   let data = [
       ["The","red", "horse"],
       ["Plane","over","the","ocean"],
       ["Chocolate","ice","cream","is","awesome"], 
       ["this","is","a","long","sentence"]
     ]
   
   let strArr = data.map(item =>item.reduce((allStr, acc)=> `${allStr} ${acc}`))
   
   // 第二种写法
   let flattened = [[3, 4, 5], [2, 5, 3], [4, 5, 6]].reduce(
     (singleArr, nextArray) => singleArr.concat(nextArray), [])
   
   // 结果：[3, 4, 5, 2, 5, 3, 4, 5, 6]
   
   
   ```

3. 去重

   ```js
   let dupes = [1,2,3,'a','a','f',3,4,2,'d','d']
   
   let singlArr = dupes.reduce((pre,acc)=>{
       if(!pre.includes(acc)) pre.push(acc)
       return pre
   },[])
   ```

4. 按属性分组

   ```js
   let obj = [
       {name: 'Alice', job: 'Data Analyst', country: 'AU'},
       {name: 'Bob', job: 'Pilot', country: 'US'},
       {name: 'Lewis', job: 'Pilot', country: 'US'},
       {name: 'Karen', job: 'Software Eng', country: 'CA'},
       {name: 'Jona', job: 'Painter', country: 'CA'},
       {name: 'Jeremy', job: 'Artist', country: 'SP'},
     ]
     let ppl = obj.reduce((group, curP) => {
       let newkey = curP['country']
       if(!group[newkey]){
         group[newkey]=[]
       }
       group[newkey].push(curP)
       return group
     }, [])
   ```

5. 反序字符串

   ```js
   var str = 'sadfsdfyhjfg'
   const reverseStr = [...str].reduce((a,v)=>v+a)
   ```

6. 二进制转十进制

   ```js
   var str = 1011
   const bin2dec = [...String(str)].reduce((acc, cur) => {
       return +cur + acc * 2
   }, 0)
   ```

7. 匹配括号

   ```js
   let a = [..."(())()(()())"].reduce((a, i) => {
       i === '(' ? a + 1 : a - 1
   }, 0);
   ```

   



## ES6