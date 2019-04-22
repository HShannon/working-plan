#### 创建store
```
import Vuex from 'Vuex'
import Vue from 'Vue'

Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    ...
  },
  strict: true,
})

if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept([
    // ...
  ], () => {
    store.hotUpdate({
      mutations,
      modules
    })
  })
}

```
- 根节点状态rootState
- 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。确保在发布环境环境不启用严格模式
  ```
  const store = new Vuex.Store({
    // ...
    strict: process.env.NODE_ENV !== 'production'
  })
  ```
- [热重载](https://vuex.vuejs.org/zh/guide/hot-reload.html)  
  结合webpack[Hot Module Raplacement](https://webpack.js.org/guides/hot-module-replacement/)
***

#### 注入组件
Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）
```
new Vue({
  router: router(startPath),
  store,
  render: (h) => h(App)
}).$mount('#app')
```

#### 组件绑定的辅助函数
```
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      ... 
    }),
    .... // other computed attribution
  }
}
```
- mapState 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。



