# ESLint && prettier && pre-commit

## ESLint 是什么
1. 对于 ESLint, 大多数人并不陌生，甚至闻者嫌弃。想要搞清楚大家嫌弃的原因，就得知道 ESLint 是什么？ 引用[ESLint官网](https://cn.eslint.org/)的官方描述

> ESLint最初是由Nicholas C. Zakas 于2013年6月创建的开源项目。它的目标是提供一个插件化的javascript代码检测工具。代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的编码风格

2. ESLint 会根据默认绑定或自定义的规则对代码进行基本语法验证。正是规则的存在，让开发者感到受到掣肘，不能随心所欲，索性关掉。 然而，**存在必有意义**。那ESLint的意义是什么？
- **没有规矩不成方圆**  团队协作中，统一代码风格
- **提高代码质量**  JavaScript 是一个动态的弱类型语言，在开发中比较容易出错

## ESLint 怎么用
**条条大道通罗马**

1. 使用 vue-cli 脚手架创建的项目, 在 webpack 配置中添加ESLint rules
```
rules: [
  {
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src')],
    options: {
      formatter: require('eslint-friendly-formatter'),
      emitWarning: !config.dev.showEslintErrorsInOverlay,
      // 自动修复规则所报告的问题
      fix: true
    }
  },
  ···
]
```
***

2. 在根目录 .eslintrc.js 文件中添加自定义配置(也可在package.json中配置)     👉 [ESLint 官方配置](http://eslint.cn/docs/user-guide/configuring)
```
module.exports = {
  ···
  rules: {
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
  }
}
```
- .babelrc.js 文件中 rules 属性设置自定义规则     👉 [ESLint 规则](http://eslint.cn/docs/rules/)
  - 在配置文件中，使用 "extends": "eslint:recommended" 来启用推荐的规则
  - 命令行 --fix 选项用来自动修复规则所报告的问题({option: true}})

- 每条规则有三种状态: error、 warning、 off
  - "off" 或 0 - 关闭规则
  - "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  - "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

***

3. 使用第三方插件(以 eslint-plugin-vue 为例)     👉 [eslint-plugin-vue 官网](http://eslint.cn/docs/user-guide/configuring)

- 为了支持 ESLint 对 *.vue 文件的检测，首先需要安装第三方插件
```
npm install eslint-plugin-vue
```

- 使用 plugins 关键字来存放插件名字的列表
```
// 插件以eslint-plugin-作为前缀，配置时该前缀可省略
plugins: ["vue"]
```

- .babelrc.js 文件中 extends 属性中添加需要的规则集
```
{
  "extends": [
    "plugin:vue/essential",
    "plugin:vue/recommended",
    "plugin:vue/base",
    "plugin:vue/strongly-recommended"
  ]
}
```

- .babelrc.js 文件中 rules 属性设置自定义规则     👉 [eslint-plugin-vue 规则](https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/README.md) 

**语法检测级别**

***

## Prettier 是什么
👉 [Prettier 官网](https://cn.eslint.org/)  
- 正如英文名所示，让代码更漂亮。
- ESLint 能自动格式化代码, 为什么还需要Prettier？ 
> 两者侧重点不同. ESLint 主要检查代码质量并给出提示, 比如某个变量忘了定义；而 Prettier 在格式化代码方面具有更大优势, 能够统一团队的代码风格

## Prettier 怎么用
1. 引入 Prettier
```
npm install 
```
***

## 参考
