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

✍️ 语法检测级别


## Prettier 是什么   
👉 [Prettier 官网](https://cn.eslint.org/)  
- 正如英文名所示，让代码更漂亮。
- ESLint 能自动格式化代码, 为什么还需要Prettier？ 
> 两者侧重点不同. ESLint 主要检查代码质量并给出提示, 比如某个变量忘了定义；而 Prettier 在格式化代码方面具有更大优势, 能够统一团队的代码风格

## Prettier 怎么用
1. 引入 Prettier  eslint-config-prettier  eslint-plugin-prettier  
Prettier 的格式化可能会跟 ESLint 配置冲突，需要使用 [eslint-plugin-prettier](https://github.com/prettier/eslint-config-prettier) 关闭可能会引起冲突的规则
```
npm install prettier eslint-config-prettier eslint-plugin-prettier
```
2. 配置 .babelrc.js 文件
```
{
  ···
  plugins: [
    "vue",
    "prettier"
  ],
  "extends": [
    "plugin:prettier/recommended"
  ],
  rules: {
    ...
    "prettier/prettier": "error",
    ...
  }
  ···
}
```

3 在根目录下创建.prettierrc.js 文件(或在package.json文件中配置)     👉 [Prettier 规则](https://prettier.io/docs/en/options.html)  
```
// https://prettier.io/docs/en/configuration.html

module.exports = {
  tabWidth: 4,     //一个tab代表几个空格数，默认为2
  trailingComma: "none",     //是否使用尾逗号，有三个可选值"<none|es5|all>",
  semi: false,     //结尾不加分号
  arrowParens: "always",     //只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
  bracketSpacing: true
}
```
***

## Pre-commit
运用 ESLint 和 ESLint 进行代码静态检测, 主要针对个人行为。考虑到团队使用 Git 作为代码管理工具，在 git commit 行为前，对提交的文件进行检测约束和代码格式化，若不符合规则则阻止提交代码, 因此隆重推出**Git 钩子 Pre-commit**  
👉 [Git 钩子](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)  

1. 如何实现 Pre-commit 约束代码提交
⁉️
- 每次提交对所有的文件进行格式化 和 代码检测, 会造成冲突和不可预知的问题
- 每次都需要执行类似 npm run format 进行代码格式化, 操作累赘  
因此需要借助husky & lint-staged & pre-c
- husky， 辅助使用 git hooks 的第三方库，可以根据package.json文件里定义的钩子和钩子执行的命令将要执行的操作写在对应的钩子脚本里
- lint-staged，对 git提交的代码使用linter的第三方库，其依赖于 husky 使用git hooks。不仅可以利用其调用 linters，还可以调用 prettier 对代码进行格式化。

2. 配置
```
{
  ···
  "scripts": {
    ···
    "lint": "eslint --ext .js,.vue src",
    "precommit-msg": "echo 'Pre-commit checks.........' && exit 0"
  },
  "lint-staged": {
    "**/**.{js,vue}": [
      "prettier --write",
      "eslint --ext .js,.vue --cache",
      "git add"
    ]
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run precommit-msg && lint-staged"
    }
  },
  ···
}
```
***

## 实践(以 exdata-web)
1. eslint 设置语法
![window](http://g.recordit.co/wennlsOdnk.gif "undefined")

2. 自动格式化
![window](http://g.recordit.co/0Z6YXep25I.gif "格式化")

3. *.vue文件检测
![window](http://g.recordit.co/QHqNXYF6oi.gif "格式化")


## 参考
1. [eslint-plugin-vue](https://vuejs.github.io/eslint-plugin-vue/user-guide/#faq)