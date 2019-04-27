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

#### history 和 hash 模式
1. 使用hash的方式，当hash变化时，会触发hashchange事件，不会刷新页面(在页面中点击带有锚点的a标签，不会刷新页面)

2. 使用history， 利用history.pushState 来完成URL跳转而不需要重新加载页面。一般都需要服务器配置或支持SSR， 否则服务器返回  
  - 若后台没有正确的配置，当用户直接访问url会返回404  
  **解决方案: 在服务端增加一个覆盖所有情况的候选资源，当url匹配不到人和静态资源，则会返回同一个index.html**(推荐使用connect-history-apo-fallback)
  - 对于所有的路径都会返回index.html文件
  **解决方案: 在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面;如果你使用 Node.js 服务器，你可以用服务端路由匹配到来的 URL，并在没有匹配到路由的时候返回 404，以实现回退。**
  ```
  const router = new VueRouter({
  mode: 'history',
  routes: [
      { path: '*', component: NotFoundComponent }
    ]
  })
  ```
##### 参考
- [vue-router](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E8%AD%A6%E5%91%8A)
***


#### connect-history-apo-fallback 
connect-history-apo-fallback  
  - Middleware to proxy requests through a specified index page, useful for Single Page Applications that utilise the HTML5 History API.
  - 解决的问题: 原作者的插件默认会将所有的请求都指向到index.html, 会导致项目内其他所有路由也被指向到index.html
  - 使用方法
  ```
  const koa = require('koa')
  const app = new koa()

  const historyApiFallback = require('koa2-connect-history-api-fallback')

  app.use(historyApiFallback({ whiteList: ['/avatar'] }))
  ```



















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

