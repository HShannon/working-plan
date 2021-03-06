# [全局配置](https://cli.vuejs.org/zh/config/#lintonsave)
## 配置示例
```
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const resolve = (dir) => path.join(__dirname, dir) 
module.exports = {
  // 生产打包时不输出map文件，增加打包速度
  productionSourceMap: false,
  // 当运行 vue-cli-service-build 时生成的生产环境构建文件的目标
  outputDir: path.resolve(__dirname, 'public/static'),
  devServer: {
    // 端口号
    port: 8099,
    disableHostCheck: true
  },
  // 链式操作
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@scss', resolve('src/assets/scss'))
      .set('@components', resolve('src/components'))

    config.plugin('html').tap(args => {
      args[0].template = path.resolve(__dirname, 'index.html')
      return args
    })
    
    if (process.env.NODE_ENV === 'production') {
      config.plugin('vendorDll')
        .use(webpack.DllReferencePlugin, [{
          context: __dirname,
          manifest: require(path.resolve(__dirname, './dll/vendor-manifest.json'))
        }])
      config.plugin('addAssetHtml')
        .use(AddAssetHtmlPlugin, [
          [
            {
              filepath: require.resolve(path.resolve(__dirname, './dll/vendor.dll.js')),
              outputPath: 'js',
              publicPath: 'js'
            },
          ]
        ])
        .after('html')
    }
  },
  // 调整 webpack 配置
  configureWebpack: config => {
    config.module.noParse = /^(vue|vue-router|vuex|axios|element-ui|vue-awesome)$/
    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks.cacheGroups = {
        // 打包两个页面的公共代码
        vendors: { 
          // 表示默认拆分node_modules中的模块
          test: /[\\/]node_modules[\\/]/, 
          // 分离包的名字
          name: 'vendors', 
          chunks: 'all'
        },
      };
      config.optimization.minimizer.push(new ParallelUglifyPlugin({ // 多进程压缩
        cacheDir: '.cache/',
        uglifyJS: {
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            warnings: false,
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        }
      }));
    }
  },
  // css modules
  css: {
    //extract 为 true, 则css无法热更新， 所以要分环境变量处理
    extract: process.env.NODE_ENV === 'production'
  },
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件， 如果想要通过 babel 显式转义一个依赖，可以在这个选项中列举出来
  transpileDependencies: [
    /\bvue-awesome\b/
  ],
  // eslint
  lintOnSave: false
}
```

## configWbpack
字段类型为 object 或 function。调整 webpack 配置最简单的方法就是在vue.config.js 中的 configureWebpack 选项提供一个对象，对象将会被 webpack-merge 合并入最终的 webpack 配置。如果想基于环境有条件地配置行为，或者想要直接修改配置，则换成一个函数
```
// vue.config.js
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
}
```

## webpack-chain
Vue CLI 内部的 webpack 配置是通过 webpack 原始配置的上层抽象。允许我们更细粒度地控制其内部配置
