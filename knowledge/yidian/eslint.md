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
      // 修复
      fix: true
    }
  },
  ···
]
```
2. 在根目录 .eslintrc.js 文件中添加自定义配置  
👉 [ESLint 官方配置](http://eslint.cn/docs/user-guide/configuring)
```
module.exports = {
  ···
  extends: [
      "standard",
      "plugin:vue/essential",
      "plugin:prettier/recommended",
      "plugin:vue/base",
      "plugin:vue/strongly-recommended",
      "plugin:vue/recommended"
  ],
  // required to lint *.vue files
  plugins: ["vue", "prettier"],
  // add your custom rules here
  rules: {
      // allow paren-less arrow functions
      "arrow-parens": 0,
      // allow async-await
      "generator-star-spacing": 0,
      // allow debugger during development
      "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
      // prettier
      "prettier/prettier": "error",
      // === ==
      eqeqeq: "off",
      //
      "no-useless-escape": "off",
      // This rule is aimed at preventing the use of v-for directives together with v-if directives on the same element.
      // "vue/no-use-v-if-with-v-for": ["error", {
      //   "allowUsingIterationVar": true
      // }]
      "vue/no-use-v-if-with-v-for": "off",
      "no-undef": "error",
      "vue/require-default-prop": "error"
  }
}
```

3. 
***

## 参考
