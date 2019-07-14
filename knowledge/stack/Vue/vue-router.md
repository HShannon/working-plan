# vue-router

## 创建router
```
import VueRouter from 'vue-router'
import Vue from 'Vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes //  Object {path: path, component: component}
})
```

## 注入组件
1.  [路由器对象属性](https://router.vuejs.org/api/#route-object-properties)
```
new Vue({
  router: router,
  render: (h) => h(App)
}).$mount('#app')

```
2. 通过注入路由器，我们可以访问它this.$router以及this.$route任何组件内部的当前路由
- $route 为当前 router 跳转对象里面可以获取name、path、query、params等
- $router 为 VueRouter实例，想要导航到不同URL，则使用$router.push方法


## history 和 hash 模式
1. hash  
当hash变化时，会触发hashchange事件，不会刷新页面(在页面中点击带有锚点的a标签，不会刷新页面)

2. history  
利用 history.pushState 来完成URL跳转而不需要重新加载页面。一般都需要服务器配置或支持SSR， 否则服务器返回有问题
- 若后台没有正确的配置，当用户直接访问 url 会返回404。解决方案: 在服务端增加一个覆盖所有情况的候选资源，当url匹配不到任何静态资源，则会返回同一个index.html，推荐使用 connect-history-api-fallback

- 对于所有的路径都会返回index.html文件。解决方案: 在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面; 如果你使用 Node.js 服务器，你可以用服务端路由匹配到来的 URL，并在没有匹配到路由的时候返回 404，以实现回退。
```
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})
```
3. connect-history-api-fallback 
Middleware to proxy requests through a specified index page, useful for Single Page Applications that utilise the HTML5 History API. 原作者的插件默认会将所有的请求都指向到index.html, 会导致项目内其他所有路由也被指向到index.html。为了兼容koa, 采用 koa2-connect-history-api-fallback, 具体使用方法示例: 
```
const koa = require('koa')
const app = new koa()

const historyApiFallback = require('koa2-connect-history-api-fallback')

app.use(historyApiFallback({ whiteList: ['/avatar'] }))
```

## 响应路由参数的变化
当使用路由参数时，原来的组件实例会被复用，因为两个路由都渲染同一个组件，比起销毁再创建，复用则显得更加高效，这也意味着组件的生命周期钩子不会再被调用。

1. 复用组件时，**可以简单使用watch检测$route对象**
```
watch: {
  // 如果路由有变化，会再次执行该方法
  '$route' (to, from) {
    // 对路由变化作出响应
  }
}
```

2. 引入 beforeRouteUpdate 导航守卫

## 导航守卫
1. 全局前置守卫 router.beforeEach
- to: Route
- from: Route
- next: Function
  - next()
  - next(false)
  - next('/') 或者 next({path: '/'})
  - next(error)
2. 全局解析守卫 router.beforeResolve
3. 全局后置钩子 router.afterEach
4. 路由独享的守卫 再路由配置上直接定义beforeEnter 守卫
```
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
5.  组件内的守卫  
```
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

## 路由元信息
routes 配置中的每个路由对象为路由记录。一个路由匹配到的所有路由记录会暴露为 $route 对象 (还有在导航守卫中的路由对象) 的 $route.matched 数组。

## 路由懒加载
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。解决方案: 把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件
1. 常用方法
- 将异步组件定义为返回一个 Promise 的工厂函数
```
const Foo = () => Promise.resolve({ /* 组件定义对象 */ })
```
- 在 Webpack 2 中，我们可以使用动态 import 语法来定义代码分块点 (split point)
```
import('./Foo.vue') // 返回 Promise
```
最终结合两者
```
const Foo = () => import('./Foo.vue')
```
2. 结合 webpack 的 require.ensure(). 同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 jsonp 来按需加载。
```
require.ensure(dependencies: String[], callback: function(require), chunkName: String)
// example routes对象
{
  component: r => require.ensure([], () => r(require('../components/common/TabPage')), 'third')
}
```

## 路由对象属性
- $route.path
- $route.params [路由参数](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1%E5%8C%B9%E9%85%8D)
- $route.query URL 查询参数
- $route.hash 当前路由的 hash 值 (带 #, 所以通常需要$route.hash.slice(1))
- $route.fullPath
- $route.matched 