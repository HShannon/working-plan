# node 面试总结

## Node 的特点 [详解 Nodejs 特点](https://zhuanlan.zhihu.com/p/110993972)
- 异步 I/O（非阻塞I/O）【事件循环】
- 单线程
- 事件循环和回调函数
- 跨平台

## 什么是回调地狱 [知名的第三方类库](https://github.com/jimuyouyou/node-interview-questions#常用知名第三方类库async-express等)
回调函数中嵌套回调函数，不便于维护代码
- promise
- co 中间的副产品
- async/await async 函数返回一个 promise 对象
- Async 库
  - 串行 async.series()
  - 并行 async.paralle()
  - 需要上一步返回的结果作为下一步的参数 async.waterfall()


## 什么是事件循环
