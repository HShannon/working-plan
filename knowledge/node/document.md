#### node
1. node能够做的事情
    + 网站（如express/koa等）
    + im即时聊天(socket.io)
    + api（移动端，pc，h5）
    + http proxy（淘宝首页）
    + 前端构建工具(grunt/gulp/bower/webpack/fis3...)
    + 写操作系统（NodeOS）
    + 跨平台打包工具（以前叫Node-WebKit现在叫nw.js,electron）
    + 命令行工具（比如cordova）
    + 编辑器（atom，vscode）
***

#### module模块
1. 模块在第一次加载后会被缓存，如果想要多次执行一个模块，可以导出一个函数，然后调用该函数。当没有以 '/'、 './' 或 '../' 开头来表示文件时，这个模块必须是一个核心模块或加载自 node_modules 目录。

2. __dirname: 当前模块的目录名，__filename: 当前模块的文件名
```
从 /Users/mjr 运行 node example.js
console.log(__filename);
// 打印: /Users/mjr/example.js
console.log(__dirname);
// 打印: /Users/mjr
```

3. 
