# expo搭建项目

由于RN的原生环境搭建对纯前端非常麻烦，经常会因为解决一个错而发现更多的错，于是便有了expo

## 简介

> Expo是一组工具、库和服务，可以通过编写`JavaScript`来构建本地的`iOS`和`android`应用程序。说人话，就是在`React Native`的基础上再封装了一层，让我们的开发更方便，更快速。
>



## 说在前面

**我用的电脑是mac，windows上搭建不清楚！**



## 全局安装

```bash
yarn add global expo
```

## 启动项目

```bash
# 初始化项目，选第二个，第一个已经被废弃掉了
npx expo init myproject
npx create-expo-app myproject

# 会提供两个模版让你选择创建rn项目

# 进入根目录 启动项目
npx expo start
```



![image-20240306150536588](https://p.ipic.vip/i2izbc.png)



出现上图即代表启动成功，我们可以选择在浏览器，安卓模拟器或者expo go 中打开，这里主要提一下expo go



### expo go

在应用商店下载 Expo Go，安卓的就用app扫描一下，**ios的就用原生相机扫描上面图片的二维码**，**我手头没有安卓机，暂未测试过**
