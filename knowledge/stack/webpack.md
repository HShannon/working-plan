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


#### [devtool](https://webpack.docschina.org/configuration/devtool/)

#### Plug
常用的Plug插件
- webpack.BannerPlugin
- HtmlWebpackPlugin 依赖一个简单的index.html模版，生成一个自动引用你打包后的JS 文件的新index.html，


#### webpack 模块
-  ES2015 import语句
- CommonJs require()语句
- AMD define require 语句
- css/sass/less文件中的@import语句
- 样式(url(...))或 HTML 文件(<img src=...>)中的图片链接(image url)

#### [阮一峰](https://github.com/ruanyf/webpack-demos#demo03-babel-loader-source)
1.  you have to use two loaders to transform CSS file. First is CSS-loader to read CSS file, and another one is Style-loader to insert <style> tag into HTML page.  
使用CSS-loader预处理CSS文件时，需要用到两个loader
```
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ]
  }
};
```


2.对于url-loader, 当图片的大小小于设置的大小时，会转换为DataUrl,否则会被转换为normal URL 
- DataUrl 是个什么？在DataUrl协议中，图片被转换成base64编码的字符串形式，并存储在URL中。
- DataUrl 的优点？相较于传统的外部资源引用方式，当访问外部资源很麻烦或受限时，当图片实在服务器端用程序动态生成，每个访问用户显示都不同时， 当图片的体积太小，占用一个HTTP不是很值得
- DataUrl 的缺点？体积大、图片会被浏览器缓存

3. 在css-loader中设置如下
```
module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
             loader: 'css-loader',
             options: {
               modules: true
             }
          }
        ]
      }
    ]
  }
};
```


4. UglifyJs Plugin 压缩文件
  
5. DefinePlugin: You can enable some codes only in development enviroment with environment flags

6. 开发工具总共有三种，分别有:
- webpack watch mode
- webpack-dev-server, 简单的web server，具有live reloading（实时重新加载）功能
```
devServer: {
  contentBase: './dist'
}
```
将dist目录下的文件挂在到loacalhost: 8080下，webpack-dev-server在编译之后不会写入到任何输出文件，而是将bundle文件保留在内存中，然后将它们serve到server中，就好像它们是挂在在server跟路径上的真是文件，如果你的页面希望在其他不同的路径中找到bundle文件，则可以通过在dev server配置中 publicPath 选项进行修改
- webpack-dev-middlemare

7. webpack-dev-server的刷新模式分别为iframe mode 和 inline mode模式，分别的特点为
- iframe mode，在页面中嵌入了一个iframe，将我们自己的应用注入到这个iframe中，在页面头部有一个提示框，用于显式构建过程的状态信息，加载了live.bundle.js 文件，其不但创建了iframe标签，同时包含socket.io的client代码，以和webpack-dev-server进行websocket通讯，从而完成自动编译打包、页面自动刷新的功能。
[参考](https://segmentfault.com/a/1190000014141798)


