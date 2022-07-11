# threejs

在浏览器端，`WebGL` 是一个底层的标准，在这些标准被定义之后，Chrome、Firefox之类的浏览器实现了这些标准。然后，就能通过 JavaScript 代码，在网页上实现三维图形的渲染了。`ThreeJS`则是封装了底层的图形接口，更容易来实现`3D`程序。



## 核心

`WebGL` 的渲染是需要 `HTML5 Canvas` 元素的，所以需要在 部分中定义`Canvas` 元素，或者使用 `js` 生成。
一个典型的 T`hree.js` 程序至少要包括**渲染器（Renderer）、场景（Scene）、照相机（Camera）**，以及你在场景中创建的物体。

