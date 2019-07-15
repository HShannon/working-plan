# [VueCLI](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)

## VueCLI 常见指令
1. 创建新项目
```
vue create
```
2. 使用图形化界面
```
vue ui
```
3. 拉取 2.x 模版
```
npm install -g @vue/cli-init
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```
4. 每个 CLI 插件都会包含一个 (用来创建文件的) 生成器和一个 (用来调整 webpack 核心配置和注入命令的) 运行时插件。在已经创建好的项目中安装一个插件
```
vue add @vue/eslint
```

## DllPlugin && DllReferencePlugin
在项目中, 引入了较多的第三方库, 导致项目大, 而每次修改，都不会去修改到这些库, 构建却都要再打包这些库, 浪费了不少时间。所以把这些不常变动的第三方库都提取出来，下次打包时不再构建这些库，这样既可大大缩短构建时间。可以利用 webpack 插件 DllPlugin 和 DllReferencePlugin 来实现，配合使用AddAssetHtmlPlugin。DllPlugin 可以把我们需要打包的第三方库打包成一个 js 文件和一个 json 文件，这个 json 文件中会映射每个打包的模块地址和 id, DllReferencePlugin 通过读取这个json文件来使用打包的这些模块
1. 在根目录中新建webpack.dll.config.js, 配置如下
```
const path = require("path"
const webpack = require("webpack") 
module.exports = {
  entry: {
    vendor: [
      'vue',
      "vue-router",
      "vuex",
      "axios",
      "element-ui",
      // "vue-awesome"
    ]
  },
  output: {
    path: path.join(__dirname, "./dll"),
    filename: "[name].dll.js",
    // vendor.dll.js中暴露出的全局变量名
    library: '[name]_library' 
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "dll", "[name]-manifest.json"),
      name: '[name]_library',
      context: __dirname
    })
  ]
};
```
2. 在package.json 中配置npm script
```
"scripts": {
  "build:dll": "webpack -p --progress --config ./webpack.dll.conf.js"
}
```
3. 执行 npm run build.dll 命令生成 vendor.dll.js 和 vendor-manifest.json
4. 在 vue.config.js 中通过 DllReferencePlugin 来使用 DllPlugin 生成的 DllBundle
```
module.exports = {
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
```
存在的问题，当把太多的第三方依赖打包到vendor.dll.js 中去，该文件太大也影响首屏加载时间，不要一味把所有的第三方都打包到文件中  
👉 [参考](https://zhuanlan.zhihu.com/p/26174425)
