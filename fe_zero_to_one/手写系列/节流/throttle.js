var container = document.getElementById("container");

var count = 1;
var container = document.getElementById("container");
function getUserAction() {
  console.log(this);
  container.innerHTML = count++;
}

// 第二版  时间戳
// function throttle1(func, wait) {
//   var previous = 0;
//   return function () {
//     var now = +new Date();
//     if (now - previous > wait) {
//       func();
//       previous = now;
//     }
//   };
// }

// 第二版  定时器
// function throttle2(func, wait) {
//   var timer;
//   return function () {
//     if (!timer) {
//       timer = setTimeout(() => {
//         func();
//         timer = null;
//       }, wait);
//     }
//   };
// }

// 第三版  移入移出都触发
// 第三版
function throttle3(func, wait) {
  var timeout, context, args, result;
  var previous = 0;

  var later = function () {
    previous = +new Date();
    timeout = null;
    func.apply(context, args);
  };

  var throttled = function () {
    var now = +new Date();
    //下次触发 func 剩余的时间
    var remaining = wait - (now - previous);
    console.log(remaining);
    context = this;
    args = arguments;
    // 如果没有剩余的时间了或者你改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
  };
  return throttled;
}

container.onmousemove = throttle3(getUserAction, 1000);
