const PENDDING = "PENDDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED";

class Mypromsie {
  constructor(executor) {
    this.status = PENDDING;
    this.value = undefined;
    this.reason = undefined;

    this.onResolvedCallbacks = [];
    this.rejCallbacks = [];
    const resolve = (value) => {
      this.status = FULFILLED;
      this.value = value;
      // 发布
      this.onResolvedCallbacks.forEach((fn) => fn());
    };

    const rejected = (reason) => {
      this.status = REJECTED;
      this.reason = reason;
      // 发布
      this.rejCallbacks.forEach((fn) => fn());
    };

    try {
      executor(resolve, rejected);
    } catch (error) {
      rejected(error);
    }
  }

  then(res, rej) {
    if (this.status === FULFILLED) {
      res(this.value);
    }
    if (this.status === REJECTED) {
      rej(this.reason);
    }
    if (this.status === PENDDING) {
      // 订阅
      this.onResolvedCallbacks.push(() => {
        res(this.value);
      });
      // 订阅
      this.rejCallbacks.push(() => {
        rej(this.reason);
      });
    }
  }

  static resolve(parameter) {
    if (parameter instanceof Mypromsie) return parameter;

    return new Mypromsie((resolve) => {
      resolve(parameter);
    });
  }

  static reject(reason) {
    return new Mypromsie((resolve, reject) => {
      reject(reason);
    });
  }

  static all(pmList) {
    var resPm = new Mypromsie((resolve, reject) => {
      var count = 0,
        result = [],
        length = pmList.length;

      if (!length) return resolve(result);

      pmList.forEach((pm, index) => {
        Mypromsie.resolve(pm).then(
          (value) => {
            count++;
            result[count] = value;
            if (count === length) resolve(result);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
    return resPm;
  }

  static race(pmList) {
    var resPm = new Mypromsie((resolve, reject) => {
      var length = pmList.length;
      if (!length) return resolve();
      for (let i = 0; i < length; i++) {
        Mypromsie.resolve(pmList[i]).then(
          (value) => {
            return resolve(value);
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
    return resPm;
  }

  static allSettled(pmList) {
    return new Mypromsie((resolve) => {
      var length = pmList.length,
        resulte = [],
        count = 0;

      if (!length) return resolve(result);

      for (let i = 0; i < length; i++) {
        var currentPm = Mypromsie.resolve(pmList[i]);
        currentPm.then(
          (value) => {
            count++;
            resulte[i] = {
              status: "fulfilled",
              value,
            };

            if (count === length) return resolve(result);
          },
          (reason) => { 
            count++;
            resulte[i] = {
              status: "rejected",
              reason,
            };
            if (count === length) return resolve(result);
          }
        );
      }
    });
  }
  static any(pmList) {
    return new Mypromsie((resolve,reject) => {
      var length = pmList.length,
      count = 0,
      result = [];
      if (!length) return resolve(result)
      for(let i = 0; i < length; i++) {
        Mypromsie.resolve(pmList[i]).then(value => {
          
        })
      }
    })
    
  }
}
Mypromsie.prototype.catch = (onRejected) => {
  this.then(null, onRejected);
};

Mypromsie.prototype.finally = function (fn) {
  return this.then(
    (value) => {
      return Mypromsie.resolve(fn()).then(() => {
        return value;
      });
    },
    (err) => {
      return Mypromsie.resolve(fn()).then(() => {
        throw err;
      });
    }
  );
};
module.exports = Mypromsie;
