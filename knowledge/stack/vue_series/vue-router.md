#### 创建store
```
import VueRouter from 'vue-router'
import Vue from 'Vue'

Vue.use(VueRouter)

const store = new VueRouter({
  routes //  Object {path: path, component: component}
})
```
***
  - [路由器对象属性](https://router.vuejs.org/api/#route-object-properties)
    - path
#### 注入组件
```
new Vue({
  router: router,
  render: (h) => h(App)
}).$mount('#app')

```
- 通过注入路由器，我们可以访问它this.$router以及this.$route任何组件内部的当前路由
  - $route 为当前 router 跳转对象里面可以获取name、path、query、params等
  - $router为 VueRouter实例，想要导航到不同URL，则使用$router.push方法
***




