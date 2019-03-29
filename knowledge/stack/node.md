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
***

#### HTTP
1. HTTP持久连接 与 HTTPClient连接池
    + Keep-Alive: 使用HTTP/1.0的客户端在首部中加上”Connection:Keep-Alive”，请求服务端将一条连接保持在打开状态。服务端如果愿意将这条连接保持在打开状态，就会在响应中包含同样的首部。如果响应中没有包含”Connection:Keep-Alive”首部，则客户端会认为服务端不支持keep-alive，会在发送完响应报文之后关闭掉当前连接。 
		+ HTTP/1.1采取持久连接的方式替代了Keep-Alive。
2. 连接池
***

#### Express
1. Express托管静态文件([express.static](http://www.expressjs.com.cn/4x/api.html))
```
函数	express.static(root, [options])，
app.use(express.static('public'))
app.use('/static', express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))
```
2. Response methods

| Method           | Description                        |  
| :--------------: | :--------------------------------: |
| res.download()   | Prompt a file to be downloaded.    |
| res.end()        | End the response process.          |
| res.json()       | Send a JSON response.              |
| res.redirect()   | Redirect a request.                |
| res.render()     | Render a view template.            |
| res.send()       | Send a response of various types.  | 
| res.sendStatus() | Set the response status code       |
| res.sendFile()   | 	Send a file as an octet stream.   |

3. express.Router
create a router file named birds.js in the app directory
```
var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

//  const TimeLog = (req, res, next) => {
//   console.log('Time: ', new Date())
//   next()
// }

// router.use(TimeLog)

// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
```
load the router module in the app
```
var birds = require('./birds')

// ...

app.use('/birds', birds)
```

4. To load the middleware function, call app.use()
```
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)
```
***

##### 使用模版引擎
> Define: A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. 

> Popular template engines: Pug, Mustache, EJS, Jade
```
app.set('view engine', 'jsx')

app.set('views', [
  path.join(__dirname, './views')
])
```
模版引擎 通过模版引擎函数把数据塞入
常用的模版引擎([资料](https://segmentfault.com/a/1190000000502743))

#### Application
1. app.locals: Once set, **the value of app.locals properties persist throughout the life of the application**, in contrast with res.locals properties that are valid only for the lifetime of the request. **As well as application-level data. Local variables are available in middleware via req.app.locals**

2. app.mountpath
```
var admin = express();

admin.get('/', function (req, res) {
  console.log(admin.mountpath); // [ '/adm*n', '/manager' ]
  res.send('Admin Homepage');
});

var secret = express();
secret.get('/', function (req, res) {
  console.log(secret.mountpath); // /secr*t
  res.send('Admin Secret');
});

admin.use('/secr*t', secret); // load the 'secret' router on '/secr*t', on the 'admin' sub app
app.use(['/adm*n', '/manager'], admin); // load the 'admin' router on '/adm*n' and '/manager', on the parent app
```

3. app.on('mount', callback(parent))  **parent**
```
var admin = express();

admin.on('mount', function (parent) {
  console.log('Admin Mounted');
  console.log(parent); // refers to the parent app
});

admin.get('/', function (req, res) {
  res.send('Admin Homepage');
});

app.use('/admin', admin);
```

4. app.engine
***

##### app settings table

1. case sensitive routing

2. env ([相关文档](https://juejin.im/post/5a4ed5306fb9a01cbc6e2ee2))

3. ETag
		+ 服务器使用ETag HTTP标头传递验证令牌
		+ 验证令牌可实现高效的资源更新检查：资源未发生变化时不会传送任何数据。
![window](./../public/image/etag.jpg "etag流程图")

4. jsonp callback name

5. trust proxy 涉及 X-Forwarded-Proto ([相关文档](http://www.expressjs.com.cn/4x/api.html#app.settings.table))
		+ req.hostname
		+ req.ip
***

##### Request
1. If you follow the pattern in which you create a module that just exports a middleware function and require() it in your main file, **then the middleware can access the Express instance via req.app**

2. req.body
```
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
```

3. req.cookie
```
var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())
```
**Example**
```
var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

app.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
})

app.listen(8080)
```

4. req.path req.originalUrl req.path
```
app.use('/admin', function(req, res, next) {  // GET 'http://www.example.com/admin/new'
  console.log(req.originalUrl); // '/admin/new'
  console.log(req.baseUrl); // '/admin'
  console.log(req.path); // '/new'
  next();
});
```

5. req.xhr **X-Requested-With** header fields is 'XMLHttpRequest'

**HTTP Header**

6. req.accepts()
		+ MIME type string
		+ an extension name
		+ a commma-delimited list
		+ an array
***

##### Response
1. res.cookie(name, value [, options])

2. res.format(object) **Content-Type**
```
res.format({
  text: function(){
    res.send('hey');
  },

  html: function(){
    res.send('<p>hey</p>');
  },

  json: function(){
    res.send({ message: 'hey' });
  }
});
```

2. res.redirect([status,] path)
```
res.redirect(`${_config.loginUrl}/logout?callback=${_config.callbackUrl}`)
```
3. res.send([body]) 
    + The body parameter can be a Buffer object, a String, an object, or an Array.

4. res.sendFile(path [, options] [, fn])
    + res.sendFile(path.join(__dirname, '../public/index2.html'))
***

##### Node util
util 是一个Node.js 核心模块，提供常用函数的集合

+ util.callbackify

+ util.inherits
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
Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。

+ util.inspect(object[, option])
    将任意对象转换为字符串
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
     [prototype]: { [constructor]: [Circular] } } }
```




