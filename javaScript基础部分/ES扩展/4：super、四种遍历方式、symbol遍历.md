# super、四种遍历方式、symbol遍历

## 修改原型

getPrototypeOf、setPrototypeOf

- setPrototypeOf : 参数最好是对象，不然可能会失效

```js
var proto = {
	y: 20,
  z: 30
}
var obj = {
	x: 10
}
Object.setPrototypeOf(obj, proto); // proto 是原型
console.log(Object.getPrototypeOf(obj)); // proto

```



## super

指向对象的原型对象

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



## symbol

[阮一峰--es6--symbol](https://6e9de850.wiz06.com/wapp/pages/view/share/s/1KDuxg3NQx7G22jsfI2P8GS73eu3Ui2mn4Jb2KrSiv0bToAU)

`Symbol.hasInstance`：用于判断某对象是否为某构造器的实例

instanceof 判断对象原理在于这个 Symbol.hasInstance

```js
var s = Symbol(),
    obj = {},
    str = new String(),
    arr = [];


console.log(Symbol[Symbol.hasInstance](s)); // false
console.log(Array[Symbol.hasInstance](obj)); // false
console.log(String[Symbol.hasInstance](str)); //true
console.log(Array[Symbol.hasInstance](arr)); // true
```



