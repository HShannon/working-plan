### auth 学习笔记

#### tracer
[tracer](https://github.com/baryon/tracer)
```
const tracer = require('tracer');
const logger = tracer.colorConsole({
  level: 'error',
  format: '{{timestamp}} <{{title}}> {{file}}(#{{line}}): {{message}}',
  file: 'error.log',
  path: __dirname
});
```
- Customize output format
  - timestamp: current time
  - title: method name, 默认'log', 'trace', 'debug', 'info', 'warn', 'error','fatal'
  - level: method level, default is 'log':0, 'trace':1, 'debug':2, 'info':3, 'warn':4, 'error':5, 'fatal':6
  - message: printf message, support %s string, %d number, %j JSON and auto inspect
  - file: file name
  - line: line number
  - pos: position
  - path: file's path
  - folder: file's parent folder
  - method: method name of caller
  - stack: call stack message
***




#### 浏览器缓存
- HTTP1.0: Expires 配合 Last-Modefied
  - 相关字段
    - Date: 服务器响应的时间
    - Expires: 资源过期时间
    - Last-Modified: 资源最后修改时间
    - If-Modefied-Since: 用来验证资源是否过期

- HTTP1.1: Cache-control 配合 
  - 相关字段
    - ETag: 文档的Hash值
    - If-None-Match: 用来验证资源是否过期，即文档Hash值是否变化
    - Cache-Control: 用来控制浏览器的缓存行为
      - no-cache: 浏览器缓存
      - no-store: 浏览器不缓存
      - max-age: 缓存有效时间段
***

##### 参考
1. [vue-router](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E8%AD%A6%E5%91%8A)
2. [浅谈web中前后端模版引擎的使用](https://github.com/lessfish/underscore-analysis/issues/25)
  - [MVC模式](http://www.ruanyifeng.com/blog/2007/11/mvc.html)
3. [koa2文件上传](https://github.com/lin-xin/blog/issues/25)
4. [fs相关的方法](https://itbilu.com/nodejs/core/4JGAlesbl.html)
  - fs.statSync() 返回[fs.Stats类](http://nodejs.cn/api/fs.html#fs_class_fs_stats)
  - fs.extname() 返回path 的扩展名
5. [HTTP缓存](http://shaolianbo.github.io/web/2016/01/22/http-cache)







##### Question

#### Q1
```
if (ctx.lxsession) {}
  lxsession = ctx.lxsession;
} else {
  if (cookies.get) {
    lxsession = cookies.get('LX_SESSION_ID');
  }
}
```

#### Q2
```
if (whiteList.includes(params.platform)) {
  delete params.platform
  // const time = 1546591200000
  const time = new Date().getTime()
  const appId = '9ce325fc52137034be85de02ec932742'
  const appSecret = '73d7ec0ee85134e173e39e2e565ae4b3'
  let hmac = crypto.createHmac('sha1', appSecret)

  hmac.write(appId+appSecret+time);
  hmac.end();
  let hash = hmac.read().toString('hex');
  // console.log(111111, hash)
  token = Buffer.from(appId+","+time+","+hash).toString('base64')
  headers = {
    LX_TOKEN: token
  }
  console.log("11111", hash, token);
}
```

