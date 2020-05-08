# vue resourceCode
## Array
- push
- pop
- shift
- unshift
- splice
- sort
- reverse

# [渲染器](http://hcysun.me/vue-design/zh/essence-of-comp.html)

# [生命周期](https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)
beforeCreate, created, beforeMount, mounted, beforeUpdate, updated, beforeDestroy, destroyed
1. new Vue() 新建 Vue 实例
2. 初始化事件(event/watcher) 和生命周期
> beforeCreate
3. 初始化注入和校验, 完成数据观测，属性和方法的运算，watch/event 事件回调
> created
4. 是否指定 el 选项。未指定 'el' 选项，当调用 vm.$mount(el) 函数时往下执行, 若指定往下
5. 是否指定 template 选项
  - 指定，将 template 编译到 render 函数中
  - 未指定，将 el 外部的 HTML 作为 template 编译
> beforeMount
6. 创建 vm.$el 并用其替换 'el'
> mounted
7. 挂载完毕
  - 当数据修改
  - beforeUpdate
  - 虚拟 DOM 重新渲染，并应用更新
> beforeDestroy
8. 接触绑定，销毁子组间，事件监听器
9. 销毁完毕
> destroyed

# MVVM 模型 && Vue.js
Model, View, ViewModel
1. Observe，数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，内部采用 Object.defineProperty 的 getter 和 setter 来实现

2. Compile，指令解析器，对每个元素节点的指令进行扫描和解析，根据指令模版替换数据，已经绑定相应的更新函数

3. Watcher 订阅着， 作为连接 Observer 和 Compile 的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数

4. Dep 消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），数据变动触发notify 函数，再调用订阅者的 update
方法
3. Watcher 订阅这

