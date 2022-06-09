[TOC]

# Vue技术点

## vue的性能优化

- v-for设置key值：主要是diff算法中的patch方法
- 封装复用的模块（http请求）、组件（ui库）
- 路由懒加载：component：() => import('./xxx.vue')（点击了才会加载，要不然首屏很慢）
- keep-alive 缓存不活跃组件
- 插件CDN方式引入，减小项目体积（插件可以放置在自己的资源服务器上，以免挂掉）
- 图片使用CDN地址，图片懒加载
- 启用gzip压缩，打包体积更小



## 事件代理在vue中的实现

问题不难，但是需要注意细节，我们监听的事件不能让所有元素都具有；详细代码如下

```vue
<template>
   <div @click="btnClick">
      <Btn v-for="(item,index) of subject" :key="index" :item="item" :curIdx="curIdx" 
     :index="index"/>
  </div>
</template>
<script>
import Btn from "./Btn";
export default {
  components: {
    Btn,
  },
  props: {
    subject: Array,
  },
  data() {
      return {
          curIdx:0
      }
  },
  methods: {
      btnClick(e){
        let tar=e.target, // 获取事件源
            className=tar.className
 // 注意这里的className，我们在Btn中给定一个class，那么这里就可以略过div了
        if(className==='button'){
           this.curIdx=Number(tar.dataset.index)

        }
      }
  }
};
</script>
```

`Btn`

```vue
 <template>
   <button :class="['button',{active:index===curIdx}]" :data-index='index'>{{item}}</button>
</template>

<script>
export default {
 props: {
     item:String,
     index:Number,
     curIdx:Number
 }
}
</script>

<style scoped>
.active {
    color: pink;
}
</style>
```

------

## 组件库按需注册的实现思路

按需注册的实现：[Vue.use](https://cn.vuejs.org/v2/guide/plugins.html#%E4%BD%BF%E7%94%A8%E6%8F%92%E4%BB%B6)

我们在项目中按需引入组件会去使用Vue.use；如：

```js
import { Button, Select, Carousel, CarouselItem, Progress } from 'element-ui'
import * as echarts from 'echarts'
Vue.use(Select)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Progress)
```

但是具体的实现是什么呢？

- 在`node_modules\element-ui\src\index.js`中可以看到`install`方法里面是循环调用element中的组件，然后循环注册成全局组件

```vue
const components = [
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown
];

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};
```

那么，我们也可以通过这种思路来封装自己的全局组件

我们设置一个`modules`文件夹当自己的组件库，并且在main.js中注册它：

`main.js`

```js'
Vue.use(MyUI, {
  components: [
    'MyButton',
    'MyInput'
  ]
});
```

`modules\my-ui\index.js`

```js
import Button from './Button';
import Input from './Input';

const MyUI = {};
const MyButton = {};
const MyInput = {};

const COMPONENTS = [
  Button,
  Input
];
export {
  MyButton,
  MyInput
}

MyUI.install = function (Vue, options) {
    // 这个option就是use方法中的第二个参数
  if (options && options.components) {
    const components = options.components;

    components.forEach((componentName) => {
      COMPONENTS.forEach((component) => {
        if (componentName === component.name) {
          Vue.component(component.name, component);
        }
      })
    })
  } else {
    COMPONENTS.forEach((component) => {
      Vue.component(component.name, component);
    })
  }
}

export default MyUI;
```

