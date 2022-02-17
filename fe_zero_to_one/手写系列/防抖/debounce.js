
// 博客来源：https://github.com/mqyqingfeng/Blog/issues/22

var count = 1;
var container = document.getElementById('container');
function getUserAction() {
    console.log(this);
    container.innerHTML = count++;
};


// 第一版防抖---正常使用
function debounce1(fun, wait) {
    var timer
    return function () {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fun()
        }, wait);
    }
}

// 第二版---this问题
function debounce2(fun, wait) {
    var timer
    return function () {
        var context = this
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fun.call(context)
        }, wait);
    }
}

// 第三版---立即执行一次
function debounce3(fun, wait, immediate) {
    var timer
    return function () {
        if (timer) clearTimeout(timer)
        var context = this
        if (immediate) {
            var callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, wait);
            if (callNow) fun.call(context)
        } else {
            timer = setTimeout(() => {
                fun.call(context)
            }, wait);
        }
    }
}


container.onmousemove = debounce3(getUserAction, 1000, true)
