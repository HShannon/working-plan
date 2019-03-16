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