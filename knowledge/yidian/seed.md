# Seed Project
组内前辈最近创建了一个种子项目，主要为了提高开发效率。该种子项目包括 node 服务以及前端框架，内置uc。种子项目里引入瞩目的是Vue CLI, 一个基于 Vue.js 进行快速开发的完整系统。种子项目的引入方法:
> 通过 npm install ad-fe-template -g 安装, 使用 yd-ad-fe-template 命令初始化项目

![window](../../public/image/seed-project.jpg "seed project")

1. Vuex plugin 插件, 当 mutation 修改 state 时, 控制台打印 log. 仅在开发环境中使用
```
// debug 为 true 开启严格模式; 当为 false, 上线时关闭该模式  
const debug = process.env.NODE_ENV !== 'production'

import createLogger from 'vuex/dist/logger'

const store = new Vuex.Store({
  plugins: [createLogger()]
})
```

2. [@vue/cli](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)  
详情见stack/Vue/vue-cli




