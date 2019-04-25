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
2. 使用history， 一般都需要服务器配置或支持SSR， 否则服务器返回
##### 参考
- [vue-router](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E8%AD%A6%E5%91%8A)
***

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

