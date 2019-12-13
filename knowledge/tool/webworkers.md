# web workers

## web workers 是什么
JavaScript 是单线程, 不适合做复杂且耗时的运算, 
```
// main Thread
let workerThread = new worker()
workerThread.onmessage()
workerThread.postMessage()
workerThread.terminate()

// worker Thread
postMessage()
onmessage()
close()
```

## web workers 限制
1. 同源限制
- 将动态生成的脚本转换成 Blob 对象
- 然后给这个 Blob 对象创建一个 url
- 最后将这个创建好的 url 作为地址传给 worker 的构造函数
```
let script = 'console.log("hello world!");'
let workerBlob = new Blob([script], { type: "text/javascript" });
let url = URL.createObjectURL(workerBlob);
let worker = new Worker(url);
```

2. 访问限制  
Worker子线程所在的全局对象，与主线程不在同一个上下文环境，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象，global对象的指向有变更，window需要改写成self，不能执行alert()方法和confirm()等方法，只能读取部分navigator对象内的数据。另外chrome的console.log()倒是可以使用，也支持debugger断点，增加调试的便利性。

## 在 webpack 构建的工程中使用 web worker
详情见[worker-loader](https://github.com/webpack-contrib/worker-loader)


