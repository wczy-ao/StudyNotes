# 滚动距离与高度，IE兼容

## 滚动距离

**常规**

- `window.pageXOffset/pageYOffset`

- IE9/IE8及以下不支持，支持以下两种之一
  - `document.body.scrollLest/scrollTop`
  - `document.documentElement.scrollLeft/scrollTop`
  - **上面两种只有一种会生效，另一种的值就是0**



**滚动距离封装**

```js
function getScrollOffset(){
	if(window.pageXOffset){
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
```



## 标准模式和怪异模式

- 默认向后兼容

- 兼容w3c规范的是标准模式，否则是怪异模式

```js
<!DOCTYPE html> // 标准模式
  
document.compatMode // 标准模式 -> CSS1Compat // 怪异模式 -> BackCompat
```



## **浏览器可视区域的尺寸（窗口的宽高）**

- 常规： `window.innerWidth, innerHeight`

- IE9.IE8及以下

  - 标准模式：`document.documentElement.clientWidth/clientHeight`

  - 怪异： `document.body.clientWidth/clientHeight`

```js
function getViewportSize(){
  if(window.innerWidth){
  	return {
    	width: window.innerWidht,
      height: window.innerHeight
    }
  } else {
  	if(document.compat === 'BackCompat'){
  		return {
      	width: document.body.clientWidth,
        height: document.body.clientHeight
      }
  	}else{
    	return {
      	width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
}
```



## 页面高度

`scrollHeight,scrollWidth`

> 页面的高度（包括看不见的内容）

- `document.body/document.documentElement`
- `window.innerWidth + window.pageXOffset`

```js
function getScrollSize(){
	if(document.body.scrollWidth){
  	return {
    	widht: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  }else{
  	return {
    	wigth: document.documentElement.scrollWidth,
      height: docuemnt.documentElement.scrollHeight
    }
  }
}
```

## `offsetParent`

> 获取带有定位的父级，父级有定位找距父级距离，没定位找可视距离位置

```js
function getElemDocPosition(el){
	var parent = el.offsetParent,
      offsetLeft = el.offsetLeft,
      offsetTop = el.offsetTop;
  while(parent){
  	offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return {
  	left: offsetLeft,
    top: offsetTop
  }
}
```

