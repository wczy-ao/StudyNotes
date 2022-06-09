# iterator、for...of、TypeArray

[阮一峰-es6-iterator](https://6e9de850.wiz06.com/wapp/pages/view/share/s/1KDuxg3NQx7G22jsfI2P8GS72PA4Gu1ORQDT2zqmCf05-xX4)

## iterator

1. 为各种数据结构提供了一个统一的访问机制
2. 对于数据结构的读取是有序的、连续的一种方式
3. `iterator` 在 `Symbol.iterator` 中

```js
var arr1 = [1,2,3,4,5];
var ite = arr1[Symbol.iterator](); // 获取iterator方法
console.log(ite);
```

### 实现 iterator

```js
function MyIterator(arr) {
    let index = 0;
    return {
        next() {
            return index < arr.length ? {value: arr[index++], done: false} : {value: undefined, done: true}
        }
    }
}
let arr = [1,2,3,4]
let iter = MyIterator(arr)

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
```



## for...of

for of 访问的就是 iterator 接口，像数组可以使用for of 方法，但是对象不行，因为 iterator 是一种有序的，连续的访问方式，但是对象不是；

> 只要部署了 iterator 接口就可以使用 for of；对象部署iterator的键名是[Symbol.iterator]

```js
var obj = {
	start: [8,6,1,2,3,4],
  end: [5,6,7,2,3],
  [Symbol.iterator](){
  	let index = 0,
        arr = [...this.start, ...this.end],
        len = arr.length;
    return {
    	next(){
      	if(index < len){
        	return {
          	value: arr[index++],
            done: false
          }
        }else{
        	return {
          	value: undefined,
            done: true
          }
        }
      }
    }
  }
}
for(let i of obj){
	console.log(i);
}

var arr1 = [...obj]; // 部署了迭代器接口的对象可以使用...运算符
console.log(arr1);
```

## TypeArray

类型数组和类数组不一样，有点像nodejs中的buffer

```js
var tArr = new Int8Array(5);
tArr[0] = 100;
```

