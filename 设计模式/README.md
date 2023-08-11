# 设计模式

## 工厂模式

工厂模式是一种创建对象的方法，它将对象的创建过程与使用过程分离。

```js
function CarFactory(make, model, year) {
  const car = {};

  car.make = make;
  car.model = model;
  car.year = year;

  car.getInfo = function() {
    return `${this.make} ${this.model} (${this.year})`;
  };

  return car;
}

const car1 = CarFactory("Toyota", "Corolla", 2020);
console.log(car1.getInfo()); // 输出 "Toyota Corolla (2020)"
```



## 单例模式

单例模式确保一个类只有一个实例，并提供一个全局访问点。

```js
const Singleton = (function() {
  let instance;

  function createInstance() {
    const obj = new Object("I am the instance");
    return obj;
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // 输出 true
```



## 观察者模式

观察者模式是一种行为设计模式，它定义了一种一对多的依赖关系，当一个对象（主题）的状态发生变化时，所有依赖它的对象（观察者）都会得到通知并自动更新。

```js
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log("Observer updated with data:", data);
  }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notify("Hello, observers!"); // 输出 "Observer updated with data: Hello, observers!" 两次
```



## 模块模式

模块模式允许您创建私有作用域和公共接口，从而实现封装和信息隐藏。这有助于组织代码并避免全局命名空间污染。

```js
const myModule = (function() {
  const privateVar = "I am private";

  function privateMethod() {
    console.log("I am a private method");
  }

  return {
    publicVar: "I am public",
    publicMethod: function() {
      console.log("I am a public method");
      privateMethod();
    },
  };
})();

console.log(myModule.publicVar); // 输出 "I am public"
myModule.publicMethod(); // 输出 "I am a public method" 和 "I am a private method"
```





## 适配器模式

它允许将一个类的接口转换成另一个接口，使原本接口不兼容的类可以一起工作。适配器模式主要用于解决已有的类或接口之间的不兼容问题，而无需修改它们的源代码。

适配器模式的核心思想是在不改变原有类或接口的基础上，通过创建一个新的适配器类，将不兼容的接口转换为目标接口。适配器类实现目标接口，并在内部包装（或引用）原有类的实例，从而实现接口转换。

```js
class OldInterface {
  oldMethod() {
    return "Old method result";
  }
}

class NewInterface {
  newMethod() {
    return "New method result";
  }
}

class Adapter {
  constructor(oldInterface) {
    this.oldInterface = oldInterface;
  }

  newMethod() {
    return this.oldInterface.oldMethod();
  }
}

const oldInterface = new OldInterface();
const adapter = new Adapter(oldInterface);

console.log(adapter.newMethod()); // 输出 "Old method result"
```



## 装饰器模式

它允许在不改变对象结构的情况下，动态地向对象添加新的行为或功能。装饰器模式通过将对象包装在一个装饰器类中，以扩展对象的功能，并且可以在运行时动态地添加或删除功能。

装饰器模式的核心思想是通过创建一个装饰器类，该类实现了与原始对象相同的接口，并在内部包装（或引用）原始对象的实例。装饰器类可以通过在调用原始对象的方法之前或之后执行额外的操作，从而实现对原始对象的功能扩展。

```js
class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getInfo() {
    return `${this.make} ${this.model} (${this.year})`;
  }
}

function addNavigation(car) {
  const getInfo = car.getInfo;

  car.getInfo = function() {
    return `${getInfo.call(car)} with Navigation`;
  };
}

// 创建原始对象
const car1 = new Car("Toyota", "Corolla", 2020);

// 使用装饰器扩展功能
addNavigation(car1);

console.log(car1.getInfo()); // 输出 "Toyota Corolla (2020) with Navigation"
```

