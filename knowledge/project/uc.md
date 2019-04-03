### uc 学习笔记

#### uc 结构图

***

#### serve-favicon
+ What

+ How
```
var express = require('express')
var favicon = require('serve-favicon')
var path = require('path')
 
var app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
 
// Add your routes here, etc.
 
app.listen(3000)
```
+ Why

#### cors(Cross-Origin Resource Sharing 跨域资源管理)
+ CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
  + 跨域问题 [资料](https://segmentfault.com/a/1190000015597029)
    + 同源概念  
        两个页面的协议、端口和主机都相同，则两个页面具有相同的源， 保护用户信息的安全，防止恶意的网站窃取数据。三种跨域行为被限制  
        + cookie、LocalStorage、IndexDB
        + DOM 无法获取
          ```
          // HTML
          <iframe name="yinhang" src="www.yinhang.com"></iframe>
          // JS
          // 由于没有同源策略的限制，钓鱼网站可以直接拿到别的网站的Dom
          const iframe = window.frames['yinhang']
          const node = iframe.document.getElementById('你输入账号密码的Input')
          console.log(`拿到了这个${node}，我还拿不到你刚刚输入的账号密码吗`)
          ```
        + AJAX 请求不能发送
    + 跨域问题的方法
      + Cookie  
        设置相同的document.domain, 服务器在设置Cookie时，制定Cookie所属域名为一级域名
      + iframe
      + Ajax  
        + JSONP, 服务器收到这个请求以后，会讲数据放到回调函数的参数位置返回
        ```
        function addScriptTag(src) {
          var script = document.createElement('script');
          script.setAttribute("type","text/javascript");
          script.src = src;
          document.body.appendChild(script);
        }

        window.onload = function () {
          addScriptTag('http://example.com/ip?callback=foo');
        }

        function foo(data) {
          console.log('Your public IP address is: ' + data.ip);
        };
        ```
        + CORS
        + WebSocket, 相比JSONP只能发GET请求，CORS允许任何类型的请求。

#### webpack
```
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackDevConfig = require('./webpack.dev.config.js');
var webpackHotMiddleware = require('webpack-hot-middleware');
var compiler = webpack(webpackDevConfig);
app.use(webpackMiddleware(compiler, {
  publicPath: webpackDevConfig.output.publicPath,
  stats: {
    colors: true
  }
}));
app.use(webpackHotMiddleware(compiler));
```

#### [Cookie](http://expressjs.com/en/4x/api.html#res.cookie)
res.cookie(name, value[, options])


#### Question
- [ ] devicedId
- [ ] loadConfig
- [ ] app.js 中的 express.static, public/lib 和 public/static
- [ ] 为什么会有跨域
