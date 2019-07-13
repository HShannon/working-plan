# 百川业务数据平台  开发笔记

## vue-resource VS axios  
最近在做百川业务数据平台的开发准备, 调研了现有的数据平台、灵犀平台和审核平台。其中注意到, 在浏览器端发送请求方面, 数据平台用 vue-resource, 灵犀平台用 axios。为什么不用 axios呢，网上有两点
- 大佬加持推荐, Vue尤
- vue-resource 不更新了
***

## Seed Poject
组内前辈最近创建了一个种子项目，主要为了提高开发效率。该种子项目包括 node 服务以及前端框架，内置uc。种子项目里引入瞩目的是Vue CLI, 一个基于 Vue.js 进行快速开发的完整系统。种子项目的引入方法:
> 通过 npm install ad-fe-template -g 安装, 使用 yd-ad-fe-template 命令初始化项目

## [VueCLI](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)  
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
4. 