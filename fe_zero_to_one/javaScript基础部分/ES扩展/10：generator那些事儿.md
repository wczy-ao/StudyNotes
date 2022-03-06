[阮一峰–es6–generator](https://6e9de850.wiz06.com/wapp/pages/view/share/s/1KDuxg3NQx7G22jsfI2P8GS708O07O0nckIg29j9g809nKAV)

```js
let fs = require("fs");

fs.readFile("./foo.txt", "utf-8", (err, data) => {
  fs.readFile(data, "utf-8", (err, data) => {
    console.log(data);
  });
});
```





```js
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (data) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  };
}

let readFile = promisify(fs.readFile);
readFile("./foo.txt", "utf-8")
  .then((res) => readFile(res, "utf-8"))
  .then((res) => console.log("第二次：", res));
```





```js
let fs = require("fs");
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (data) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  };
}
var readFile = promisify(fs.readFile);
function* read() {
  let value1 = yield readFile("./foo.txt", "utf-8");
  let value2 = yield readFile(value1, "utf-8");
  console.log(value2);
}
var iter = read();
let { value, done } = iter.next();
value.then((res) => {
  console.log(res);
  let { value, done } = iter.next(res); // res 会赋值给value1
  value.then((val) => {
    console.log(val);
  });
});

```





```js
let fs = require("fs");
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (data) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  };
}
var readFile = promisify(fs.readFile);
function* read() {
  let value1 = yield readFile("./foo.txt", "utf-8");
  let value2 = yield readFile(value1, "utf-8");
  console.log(value2);
}
function Co(iter) {
  return new Promise((resolve, reject) => {
    let next = (data) => {
      let { value, done } = iter.next(data);
      if (done) {
        resolve(value);
      } else {
        value.then((val) => {
          next(val);
        });
      }
    };
    next();
  });
}

let promise = Co(read());
promise.then((val) => console.log(val));
```

