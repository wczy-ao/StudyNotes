import MyPromise from "./promise";

//promise.js
let promise = new MyPromise((resolve, reject) => {
   resolve('success')
   reject('err')
 })

 promise.then(value => {
   console.log('resolve', value)
 }, reason => {
   console.log('reject', reason)
 })
// 打印 resolve success
