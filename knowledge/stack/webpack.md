([webpack](http://vuejs-templates.github.io/webpack/))

#### Introduction
```
npm install -g vue-cli
vue init webpack my-project
cd my-project
npm install
npm run dev
```
***

#### Environment Variables

test.env inherits the dev.env and the dev.env inherits the prod.env

#### API Proxying During Development
```
// config/index.js
module.exports = {
  // ...
  dev: {
    proxyTable: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      }
    }
  }
}
```

#### Node.js API
[Node.js API](https://www.webpackjs.com/api/node/#%E5%AE%89%E8%A3%85-installation-)
```
const webpack = require("webpack")

webpack({
  // 配置对象
}, (err, stats) => {
  if (err || stats.hasErrors()) {
    // 在这里处理错误
  }
  // 处理完成
})
```
- Stats
  - 概念
    - 错误和警告
    - 计时信息
    - module 和 chunk 信息
  - 方法 toString [Stats](https://www.webpackjs.com/configuration/stats/)

  





