# ([webpack](http://vuejs-templates.github.io/webpack/))

## webpack 构建的代码类型
在使用 webpack 构建的典型应用程序或站点中，有三种主要的类型:
- 团队编写的源代码
- 源代码依赖的任何
- webpack 的 runtime 和 manifest, 管理所有代码的交互

1. runtime, 在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码
2. manifest, 当 compiler 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "manifest"，当完成打包并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。无论你选择哪种 模块语法，那些 import 或 require 语句现在都已经转换为 __webpack_require__ 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够检索这些标识符，找出每个标识符背后对应的模块。   

❕如果你决定通过使用浏览器缓存来改善项目的性能，理解这一过程将突然变得极为重要。

## 常用的Plug插件
1. HtmlWebpackPlugin    
依赖一个简单的index.html模版，生成一个自动引用你打包后的JS 文件的新index.html
```
new HtmlWebpackPlugin({
  filename: 'index2.html',
  template: 'index.html',
  inject: true
}),
```

2. DefinePlugin    
生成全局变量，对开发模式和生产模式的构建允许不同的行为非常有用。注意，因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号。通常，有两种方式来达到这个效果，使用 '"production"', 或者使用 JSON.stringify('production')
```
new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify("process.env.NODE_ENV")
}),
``` 

3. CommonsChunkPlugin   
用于创建一个独立文件(又称作 chunk)的功能，通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次便存到缓存中供后续使用

4. UglifyJsPlugin 压缩文件    
- sourceMap(boolean), 在压缩代码时是否启动 source map, 警告是否能够找到对应正确的代码行
- warning(boolean)

5. webpack-dev-server     
能够用于快速开发应用程序

## 使用Source map
为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码
```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
+   devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Development'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

## loader
loader 是导出为一个函数的 node 模块, 该函数在 loader 转换资源的时候使用，给定的函数调用 loader API, 并通过 this 上下文访问

## 代理(API Proxying During Development)
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

## Node.js API
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

## [devtool](https://webpack.docschina.org/configuration/devtool/)
便于开发环境调试

## webpack 模块
模块主要包括一下几种:  
- ES6 import语句
- CommonJs require()语句, 同步
- AMD define require 语句， 同步
- css/sass/less文件中的@import语句
- 样式(url(...))或 HTML 文件(<img src=...>)中的图片链接(image url)
- CommonJs, Node.js 同步加载, require 语句, module.exports = {}

1. CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD规范则是非同步加载模块，允许指定回调函数。由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以CommonJS规范比较适用。但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。

2. CommonJs 与 CommonJs 模块的差异

| # | 说明 |
| :--: | :--: |
| 1 | CommonJs 模块输出的是一个值的拷贝，es6 模块输出的是值的引用 |
| 2 | CommonJs 模块是运行时加载，es6 模块是编译时输出接口 |

## [阮一峰](https://github.com/ruanyf/webpack-demos#demo03-babel-loader-source)
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

2. 对于url-loader, 当图片的大小小于设置的大小时，会转换为DataUrl,否则会被转换为normal URL。DataUrl 是个什么？在DataUrl协议中，图片被转换成base64编码的字符串形式，并存储在URL中。DataUrl 的优点？相较于传统的外部资源引用方式，访问外部资源很麻烦或受限时，图片是在服务器端用程序动态生成，每个访问用户显示都不同; 当图片的体积太小，占用一个HTTP不是很值; DataUrl 的缺点？体积大、图片会被浏览器缓存

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

## 开发工具
开发工具总共有三种，分别有webpack-watch-mode, webpack-dev-server, webpack-dev-middle
1. webpack watch mode

2. webpack-dev-server, 简单的web server，具有live reloading（实时重新加载）功能
```
devServer: {
  contentBase: './dist'
}
```
将dist目录下的文件挂在到loacalhost: 8080下，webpack-dev-server 在编译之后不会写入到任何输出文件，而是将bundle文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂在 server, 跟路径上的真是文件，如果你的页面希望在其他不同的路径中找到bundle文件，则可以通过在dev server配置中 publicPath 选项进行修改。
webpack-dev-server的刷新模式分别为iframe mode 和 inline mode模式，分别的特点为
- iframe mode，在页面中嵌入了一个iframe，将我们自己的应用注入到这个iframe中，在页面头部有一个提示框，用于显式构建过程的状态信息，加载了live.bundle.js 文件，其不但创建了iframe标签，同时包含socket.io的client代码，以和webpack-dev-server进行websocket通讯，从而完成自动编译打包、页面自动刷新的功能。

3. webpack-dev-middlemare
[参考](https://segmentfault.com/a/1190000014141798)

## webpack4.0 splitChunks
Webpack 4.0 引入了 SplitChunksPlugin 插件来替代之前版本的 CommonsChunksPlugin 插件。webpack 总共有三种方法来实现 code splitting, 分别为
- 入口配置
- 抽取公用代码
- 动态加载

1. splitChunks 的默认配置
```
odule.exports = {
  //...
  optimization: {
    splitChunks: {
      // This indicates which chunks will be selected for optimization. When a string is provided, valid values are all, async, and initial. 顾名思义，async针对异步加载的chunk做切割，initial针对初始chunk，all针对所有chunk。
      chunks: 'async',
      // 我们切割完要生成的新chunk要>30kb，否则不生成新chunk
      minSize: 30000,
      maxSize: 0,
      // 共享该module的最小chunk数
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
```

2. 

## bundle && module && chunk
1. 我们编写的任何文件，对于 Webpack 来说，都是一个个模块; Chunk 是Webpack打包过程中，一堆 module 的集合; Chunk是过程中的代码块，Bundle是结果的代码块,一个Chunk是一些模块的封装单元。Chunk在构建完成就呈现为bundle。
> A Chunk is a unit of encapsulation for Modules.
> Chunks are "rendered" into bundles that get emitted when the build completes.

2. 产生 chunk 的三种途径
- entry 入口
- 异步加载模块
- 代码分割 

