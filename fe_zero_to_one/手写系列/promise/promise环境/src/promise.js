const PENDDING = 'PENDDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED'

class Mypromsie {
  constructor(executor) {
    this.status = PENDDING
    this.value = undefined
    this.reason = undefined

       this.onResolvedCallbacks = []
       this.rejCallbacks = []
       const resolve = (value) => {
         this.status = FULFILLED
          this.value = value
          // 发布
          this.onResolvedCallbacks.forEach(fn => fn())
        }

       const rejected = (reason) => {
         this.status = REJECTED
          this.reason = reason
          // 发布
          this.rejCallbacks.forEach(fn => fn())
        }

     try {
       executor(resolve, rejected)
     } catch (error) {
       rejected(error)
     }
   }

   then(res, rej) {
     if (this.status === FULFILLED) {
       res(this.value)
     }
     if (this.status === REJECTED) {
       rej(this.reason)
     }
     if (this.status === PENDDING) {
       // 订阅
       this.onResolvedCallbacks.push(() => {
         res(this.value)
       })
       // 订阅
       this.rejCallbacks.push(() => {
         rej(this.reason)
       })
     }
   }
 }

module.exports = Mypromsie