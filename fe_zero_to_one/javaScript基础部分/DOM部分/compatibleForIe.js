/**
 * 滚动条到顶端距离
 * 1：window.pageXOffset/pageYOffset
 * 2：IE9/IE8及以下不支持，支持以下两种之一
 *      document.body.scrollLeft/scrollTop
 *      document.documentElement.scrollLeft/scrollTop
 *      上面两种只有一种会生效，另一种的值就是0
 */
function getScrollOffset() {
    if(window.pageXOffset) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    } else {
        return {
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

/**
 * 浏览器可视区域尺寸（窗口的宽高）
 * 1：window.innerWidth, 1：window.innerHeight
 * 2：IE9.IE8及以下
 *      标准模式(CSS1Compat)：document.documentElement.clientWidth/clientHeight
 *      怪异(BackCompat)： document.body.clientWidth/clientHeight
 */
function getViewportSize() {
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        if (document.compatMode === 'BackCompat') {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        } else {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        }
    }
}

/**
 * 整个页面滚动高度
 * 1：scrollHeight,scrollWidth
 *      document.body/document.documentElement
 */
function getScrollSize() {
    if (document.body.scrollWidth) {
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        }
    } else {
        return {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
        }
    }
}
/**
 * 计算样式属性值
 * 1：window.getComputedStyle
 * 2：ie8及以下，支持 elem.currentStyle
 * @param {Element} elem 
 * @param {String} prop   DOM元素的样式属性
 * getComputedStyle(elem, null) 第二个参数是伪元素 after, before
 * window.getComputedStyle(elem, 'after')['width']
 */
function getStyles(elem, prop) {
    if (window.getComputedStyle) {
        if (prop) {
            return window.getComputedStyle(elem, null)[prop]
        } else {
            return window.getComputedStyle(elem, null)
        }
    } else {
        if (prop) {
            return elem.currentStyle(elem, null)[prop]
        } else {
            return elem.currentStyle(elem. null)
        }
    }
}

/**
 * 注册点击事件
 * @param {DOM元素} el 
 * @param {事件类型} type 
 * @param {处理函数} fn 
 */
function addEvent(el, type, fn) {
    if (el.addEventListener) {
        el.addEventListener(type,fn,false)
    } else if (el.attachEvent){
        el.attachEvent('on'+type, function(){
            fn.call(el)
        })
    } else {
        el['on'+type] = fn
    }
}
/**
 * 取消冒泡
 * @param {event} e 
 */
function cancelBubble(e){
	var e = e || window.event;
  if(e.stopPropagation){
  	e.stopPropagation();
  }else{
  	e.cancelBubble = true;
  }
}