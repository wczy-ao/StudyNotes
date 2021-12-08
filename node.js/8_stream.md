# Stream

## 认识Stream

什么是流呢？

- 程序中的流类似于水的含义，当我们从一个文件中读取数据时，文件的二进制（字节）数据会**源源不断**的被读取到我们程序中；这些源源不断的字节就是程序中的留

- 流应该是可读的，也是可写的；

## 流的作用

在之前的fs的学习中，我们可以直接通过 `readFile`或者 `writeFile`方式读写文件，但是这种方法有一个问题：我只想读这个文件中的一部分，那么在之前的方法中是做不到的；但是流可以做到

- 流可以读到某个位置后，暂停读取，某个时刻恢复读取等等；
- 从什么位置开始读、读到什么位置、一次性读取多少个字节；

## 流的类型

Node.js中有[四种](https://nodejs.org/dist/latest-v15.x/docs/api/stream.html)基本流类型：

-  `Writable`：可以向其写入数据的流（例如 `fs.createWriteStream()`）。

-  `Readable`：可以从中读取数据的流（例如 `fs.createReadStream()`）。
-  `Duplex`：同时为Readable和的流Writable（例如 `net.Socket`）。
-  `Transform：Duplex`可以在写入和读取数据时修改或转换数据的流（例如`zlib.createDeflate()`）。

## 流的`api`

### 读

```js
const reader = fs.createReadStream("./foo.txt", {
  start: 3,
  end: 10,
  highWaterMark: 2,
});
```

如何获取数据呢？

```js
// 数据读取的过程
reader.on("data", (data) => {
  console.log(data);
  // 暂停读的操作
  reader.pause();

  setTimeout(() => {
    reader.resume();
  }, 1000);
});
// 监听文件被打开
reader.on('open', () => {
  console.log("文件被打开");
})
// 监听文件被关闭
reader.on('close', () => {
  console.log("文件被关闭");
})

```

### 写

```js
const writer = fs.createWriteStream('./bar.txt', {
  flags: "r+",
  start: 4
});

writer.write("你好啊", (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("写入成功");
});
writer.on("close", () => {
  console.log("文件被关闭");
});
// 写入流在打开后是不会自动关闭的；这个close事件是监听不到的
writer.on("close", () => {
  console.log("文件被关闭");
});
```

写入的关闭必须手动关闭，并且会发出一个 finish 事件的；

```js
writer.close();
writer.on("finish", () => {
  console.log("文件被关闭");
});
```

### pipe方法

正常情况下，我们可以将读取到的 输入流，手动的放到 输出流中进行写入：

```js
const reader = fs.createReadStream("./foo.txt");
const writer = fs.createWriteStream('./foz.txt');

reader.pipe(writer);
writer.close();
```