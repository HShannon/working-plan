# node
node能够做的事情: 网站(如 express/koa 等); im即时聊天(socket.io); api(移动端，pc，h5); http proxy（淘宝首页); 前端构建工具(grunt/gulp/bower/webpack/fis3...); 写操作系统(NodeOS); 跨平台打包工具(以前叫Node-WebKit现在叫nw.js,electron); 命令行工具(比如cordova); 编辑器(atom，vscode)

## module
1. 模块在第一次加载后会被缓存，如果想要多次执行一个模块，可以导出一个函数，然后调用该函数。如何清除require缓存delete require.cache
```
delete require.cache[require.resolve('./server.js')];
app = require('./server.js');
```

2. 当没有以 '/'、 './' 或 '../' 开头来表示文件时，这个模块必须是一个核心模块或加载自 node_modules 目录。

3. __dirname: 当前模块的目录名，__filename: 当前模块的文件名
```
从 /Users/mjr 运行 node example.js
console.log(__filename);
// 打印: /Users/mjr/example.js
console.log(__dirname);
// 打印: /Users/mjr
```

4. require.resolve
```
fs.readFileSync(path.join(__dirname, './assets/some-file.txt))
fs.readFileSync(require.resolve('./assets/some-file.txt))
```

## HTTP
1. HTTP持久连接 与 HTTPClient连接池
+ Keep-Alive: 使用HTTP/1.0的客户端在首部中加上 Connection:Keep-Alive，请求服务端将一条连接保持在打开状态。服务端如果愿意将这条连接保持在打开状态，就会在响应中包含同样的首部。如果响应中没有包含 Connection:Keep-Alive 首部，则客户端会认为服务端不支持 keep-alive，会在发送完响应报文之后关闭掉当前连接。 
+ HTTP/1.1采取持久连接的方式替代了 Keep-Alive。
2. 连接池


## Node util
util 是一个Node.js 核心模块，提供常用函数的集合。例如 util.callbackify, util.inherits,  util.inspect 方法等
1. util.callbackify

2. util.inherits
```
var util = require('util'); 
function Base() { 
    this.name = 'base'; 
    this.base = 1991; 
    this.sayHello = function() { 
    console.log('Hello ' + this.name); 
    }; 
} 
Base.prototype.showName = function() { 
    console.log(this.name);
}; 
function Sub() { 
    this.name = 'sub'; 
}
```
Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属性和 sayHello 函数都没有被 Sub 继承。

3. util.inspect(object[, option])
- 将任意对象转换为字符串
```
var util = require('util'); 
function Person() { 
  this.name = 'byvoid'; 
  this.toString = function() { 
  return this.name; 
  }; 
} 
var obj = new Person(); 
console.log(util.inspect(obj)); 
console.log(util.inspect(obj, true)); 
```
console.log 打印结果:
```
Person { name: 'byvoid', toString: [Function] }
Person {
  name: 'byvoid',
  toString: 
  { [Function]
    [length]: 0,
    [name]: '',
    [arguments]: null,
    [caller]: null,
    [prototype]: { [constructor]: [Circular] } 
  } 
}
```




