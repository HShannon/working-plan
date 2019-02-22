#### 模版语法
1. v-once 执行一次性的插值，当数据改变时，插值处的内容不会更新
2. v-html输出真正的HTML
  ```
  <p>Using mustaches: {{ rawHtml }}</p>
  <p>Using v-html directive: <span v-html="rawHtml"></span></p>
  ```
***

#### 计算属性缓存
1. **计算属性**基于他们的依赖进行缓存的，只在相关依赖发生改变时它们才会重新求值。每当触发重新渲染时，调用**方法**总会再次执行函数
2. Date.now() 不是响应式依赖
3. 计算属性默认getter, 当对计算属性进行赋值时，**调用setter函数**
  ```
  computed: {
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  }
  ```
***

#### 侦听器
1. 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
2. _.debounce 通过Lodash限制操作操作频率([_debounce、_.throttle](https://lodash.com/docs#debounce))
***

#### Class与Style绑定
1. 数组语法
  ```
  <div v-bind:class="[activeClass, errorClass]"></div>
  ```
  ```
  data: {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
  ```
2. 当在一个自定义组件上使用 class 属性时，这些类将被添加到该组件的根元素上面。这个元素上已经存在的类**不会被覆盖**。
***

#### v-if
1. 如果想切换多个元素，可以把一个template元素当做不可见的包裹信息，并在上面使用v-if
2. 
