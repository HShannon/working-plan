# [webpack](http://vuejs-templates.github.io/webpack/)

## webpack 构建的代码类型
在使用 webpack 构建的典型应用程序或站点中，有三种主要的类型:
- 团队编写的源代码
- 源代码依赖的任何
- webpack 的 runtime 和 manifest, 管理所有代码的交互

1. runtime, 在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码
2. manifest, 当 compiler 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "manifest"，当完成打包并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。无论你选择哪种 模块语法，那些 import 或 require 语句现在都已经转换为 __webpack_require__ 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够检索这些标识符，找出每个标识符背后对应的模块。   

❕如果你决定通过使用浏览器缓存来改善项目的性能，理解这一过程将突然变得极为重要。

## 常用的Plug插件
### 1. HtmlWebpackPlugin    
如果更改了一个入口起点的名称，甚至添加一个新的入口，会在构建时重新命名生成的 bundle，但是 index.html 文件仍然沿用旧的名称，需要用到 HtmlWebpackPlugin 来解决。 依赖一个简单的index.html模版，生成一个自动引用你打包后的JS 文件的新index.html
```
new HtmlWebpackPlugin({
  filename: 'index2.html',
  template: 'index.html',
  inject: true
}),
```
[配置详情](https://github.com/jantimon/html-webpack-plugin#options)

### 2. DefinePlugin    
生成全局变量，对开发模式和生产模式的构建允许不同的行为非常有用。注意，因为这个插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号。通常，有两种方式来达到这个效果，使用 '"production"', 或者使用 JSON.stringify('production')
```
new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify("process.env.NODE_ENV")
}),
``` 

### 3. CommonsChunkPlugin   
用于创建一个独立文件(又称作 chunk)的功能，通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次便存到缓存中供后续使用

### 4. UglifyJsPlugin 压缩文件    
- sourceMap(boolean), 在压缩代码时是否启动 source map, 警告是否能够找到对应正确的代码行
- warning(boolean)

### 5. webpack-dev-server     
能够用于快速开发应用程序

### 6. cleaWebpackPlugin
在每次构建清理 /dist 文件夹，这样只会生成用到的文件。在练习中发现了一个有意思的问题，报错
```
TypeError: CleanwebpackPlugin is not a constructor
```
解决方案
```
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
plugins: [
  new CleanWebpackPlugin()
]
```

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
1. 加载 images 图像，处理图像使用 file-loader, 压缩和优化图像，需要使用 image-webpack-loader 和 url-loader，可以增强加载处理图像功能
2. 加载 fonts 字体，处理字体资源，使用 file-loader 和 url-loader 可以接收并加载任何文件

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

### 1 CommonJs 与 CommonJs 模块的差异
- CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。
- AMD规范则是非同步加载模 块，允许指定回调函数。
由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以CommonJS规范比较适用。但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。

| # | 说明 |
| :--: | :--: |
| 1 | CommonJs 模块输出的是一个值的拷贝，es6 模块输出的是值的引用 |
| 2 | CommonJs 模块是运行时加载，es6 模块是编译时输出接口 |

### 3 模块方法
1. import && export ，通过静态的方式，倒入另一个通过 export 导出的模块
```
import myModule from './my-module.js'
import { nameExport } from './other-module.js'

export const count = 5
export multiply = (a, b) => {
  return a * b
}

export default = {
 // data ...
}
```  

2. import(), 动态加载模块，被请求的模块和它饮用的所有子模块，会分离到一个单独的 chunk 中
3. 如果想正常解析 es2015 特性，确保在 webpack load 系统中使用了 babel 或 buble 的 transpiler

 
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

## 选择一个开发工具
webpack 提供集中可选方式，帮助开发者在代码发生变化后自动编译代码
1. watch mode 观察模式，指示 webpack "watch" 依赖图中所有文件的更改，如果其中一个文件被更改，如果其中一个文件被更新，代码将重新编译。配置 npm script
```
"script": {
  "watch": "webpack --watch"
}
```
但缺点是需要手动刷新浏览器，若想浏览器能够自动刷新，需要使用 webpack-dev-server 实现此功能

2. webpack-dev-server 提供简单的 web server，并且具有 live reloading 实时重新加载的功能，[详细配置](https://webpack.docschina.org/configuration/dev-server)

3. webpack-dev-middleware，可以把 webpack 处理过的文件发送到一个 server. webpack-dev-middleware 可自定义服务
```
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const express = require('express');
const app = express();

const config = require('./webpack.config.js');
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  pulicPathL config.output.publicPath
}));

app.listen(3000, function(){
  console.log('Example app listening on port 30000!')
})
```

## 模块热替换
模块热替换(hot module replacement) 不适用于生产环境。如果在技术选型中使用了 webpack-dev-middleware，则使用 webpack-hot-middleware 包，使用了 webpack-dev-server，只需更新 webpack-dev-server 配置。如果已经通过 HotModuleReplacementPlugin 启用了 HMR，接口将暴露在 module.hot 属性下，通常，用户要先检查这个接口是否可访问，然后在开始使用
```
if(module.hot) {
  module.hot.accept(
    // 可以是一个字符串或字符串数组
    dependencies,
    // 用于在模块更新后触发的函数
    callback
  )
}
```

### 1. 通过 Node.js API  
在 Node.js API 中使用 webpack dev server 时，不要将 dev server 选项放在 webpack 配置对象中，而是，在创建时，将其作为第二个参数传递
```
new webpackDevServer(compiler, options)
```

### 2. HMR记载样式
借助于 style-loader, 使用模块热替换加载 css 实际上方便。此 loader 在幕后使用了 module.hot.accept， 在 css 依赖模块更新之后，会将其 patch 到标签中

## tree shaking
通常用于描述移除 JavaScript 上下文中的未引用的代码

## 生产环境
development 和 production 构建目标存在巨大差异
- 开发环境，需要强大的 source map 和有着 live reloading 和 hot module replacement 能力的 local server
- 压缩 bundle, 更轻量的 source map, 资源优化等方式，改善加载时间。由于需要分割逻辑，需要为每个环境编写独立的 webpack 配置
理论上: 保留基本的配置，无需在特定环境中编写配置重复的代码

1. 指定 mode, 从 webpack V4 开始，指定 mode 会自动地配置 DefinePlugin. 使用 process.env.NODE_ENV

## 代码分离
常用的代码分离有三种方法
- 入口起点：使用 entry 配置手动地分离代码
- 防止重复：使用 SplitChunksPlugin 去重和分离 chunk
- 动态导入： 通过模块中的内联函数调用分离代码

### 入口起点(entry points)
非常直观的、简单的代码分离。但存在一些问题：
- 重复的模块被引入到各个 bundle 中
- 方法不灵活，不能够动态地将核心应用程序逻辑中的代码拆分出来

### 防止重复
```
optimization: {
  splitChunks: [
    chunks: 'all'
  ]
}
```

### 动态导入
webpack 提供了两种方案
- import() 方法引入
- require.ensure()引入 

## 混存
1. ERROR: Cannot use [chunkhash] or [contenthash] for chunk in '[name].[contenthash].js' (use [hash] instead) ，解决方法
```
output: {
  // filename: '[name].[contenthash].js'
  // =>
  filename: '[name].[hash].js'
}
``` 

2. 模块标识符
- main，bundle 会随着自身的新增内容的修改，而发生变化
- vendor，bundle 会随着自身的 module.id 的变化而变化
- manifest， bundle 会因为现在包含一个新的模块的引用而变化
第一个和最后一个符合预期，使用 HashedModuleIdsPlugin, NamedModulesPlugin
 
