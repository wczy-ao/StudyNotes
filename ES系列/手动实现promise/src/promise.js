// myPromise.js
// 定义成常量是为了复用且代码有提示
const PENDING = 'pending' // 等待
const FULFILLED = 'fulfilled' // 成功
const REJECTED = 'rejected' // 失败
// 定义一个构造函数
export default class MyPromise {
  constructor (executor) {
      console.log(executor);
    // executor是一个执行器，进入会立即执行，并传入resolve和reject方法
    executor(this.resolve, this.reject)
  }

  // 实例对象的一个属性，初始为等待
  status = PENDING
  // 成功之后的值
  value = undefined
  // 失败之后的原因
  reason = undefined

  // resolve和reject为什么要用箭头函数？
  // 如果直接调用的话，普通函数this指向的是window或者undefined
  // 用箭头函数就可以让this指向当前实例对象
  resolve = value => {
      debugger
    // 判断状态是不是等待，阻止程序向下执行
    if(this.status !== PENDING) return
    // 将状态改成成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
  }
  reject = reason => {
    if(this.status !== PENDING) return
    // 将状态改为失败
    this.status = REJECTED
    // 保存失败之后的原因
    this.reason = reason
  }
  then (successCallback, failCallback) {
    //判断状态
    if(this.status === FULFILLED) {
      // 调用成功回调，并且把值返回
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      // 调用失败回调，并且把原因返回
      failCallback(this.reason)
    }
  }
}
