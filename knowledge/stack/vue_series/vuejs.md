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

2. 当多个模版使用相同的元素时，但两个元素是完全独立的，不要复用它们，**只需添加一个具有唯一值的key的属性即可**
```
<el-form-item label="时间范围" v-if="formData.cycle === 'day'" key="day">
  <el-date-picker type="daterange" placeholder="选择日期范围" size="small"
    :clearable="false" :editable="false"
    v-model="formData.date" :picker-options="pickerOptions">
  </el-date-picker>
</el-form-item>
<el-form-item label="时间范围" v-if="formData.cycle === 'week'" key="week">
  <el-date-picker v-model="formData.startWeek" type="week" size="small"
    format="yyyy 第 WW 周" placeholder="选择起始周" :picker-options="weekpickerOptions">
  </el-date-picker>
  <span>至</span>
  <el-date-picker v-model="formData.endWeek" type="week" size="small"
    format="yyyy 第 WW 周" placeholder="选择末尾周" :picker-options="weekpickerOptions">
  </el-date-picker>
</el-form-item>
<el-form-item label="时间范围" v-if="formData.cycle === 'month'" key="month">
  <el-date-picker v-model="formData.startMonth" type="month" size="small"
    format="yyyy 第 MM 月" placeholder="选择起始月" :picker-options="weekpickerOptions">
  </el-date-picker>
  <span>至</span>
  <el-date-picker v-model="formData.endMonth" type="month" size="small"
    format="yyyy 第 MM 月" placeholder="选择末尾月" :picker-options="weekpickerOptions">
  </el-date-picker>
</el-form-item>
```
#### v-if vs v-show
1. v-if确保在切换过程中，条件块内的舰艇器和子组件适当地被销毁和重建。惰性，直到条件第一次为真菜开始渲染条件块

2. v-show 不管初始条件如何，元素总是会被渲染，只是简单的css切换

3. v-if有更高的切换开销，v-show有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用v-show较好；如果在运行时条件很少改变，使用v-if较好。
***


#### 列表渲染
1. 用v-for通过一个属性的对象迭代
```
<div v-for="(value, key) in object">
  {{ key }}: {{ value }}
</div>
```
```
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      firstName: 'John',
      lastName: 'Doe',
      age: 30
    }
  }
})
```

2. v-for为了给Vue一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一key属性。理想的key值是每项都有的唯一id。

3. 不要使用对象或数组之类的非原始类型值作为 v-for 的 key。用**字符串或数类型**的值取而代之。

4. Vue不能检测以下变动的数组
    + 当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
    + 当你修改数组的长度时，例如：vm.items.length = newLength
    ```
    // Vue.set
    Vue.set(vm.items, indexOfItem, newValue)
    ```
    ```
    // Array.prototype.splice
    vm.items.splice(indexOfItem, 1, newValue)
    ```
    也可以使用vm.$set
5. Vue 不能动态添加根级别的响应式属性，可以使用 Vue.set(object, key, value) 方法向嵌套对象添加响应式属性。

6. 为已有对象赋予多个新属性，应该用两个对象的属性创建一个新的对象，
```
  vm.userProfile = Object.assign({}, vm.userProfile, {
    age: 27,
    favoriteColor: 'Vue Green'
  })
```
***

#### 组件
1. 组件注册
    + 局部注册
      + 局部注册的组件在其自组建中不可用
      ```
      import ComponentA from './ComponentA.vue'

      export default {
        components: {
          ComponentA
        },
        // ...
      }
        ```
    + 全局注册
2. prop验证
    + 基础类型检测
    + 必填字段检测
    + 默认值检测
    ```
    props: {
      // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
      propA: Number,
      // 多个可能的类型
      propB: [String, Number],
      // 必填的字符串
      propC: {
        type: String,
        required: true
      },
      // 带有默认值的数字
      propD: {
        type: Number,
        default: 100
      },
      // 带有默认值的对象
      propE: {
        type: Object,
        // 对象或数组默认值必须从一个工厂函数获取
        default: function () {
          return { message: 'hello' }
        }
      },
      // 自定义验证函数
      propF: {
        validator: function (value) {
          // 这个值必须匹配下列字符串中的一个
          return ['success', 'warning', 'danger'].indexOf(value) !== -1
        }
      }
    }
    ```

#### 插槽
1. 如果自定义组件内没有包含一个 <slot> 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。

2. 该插槽跟模板的其它地方一样可以访问相同的实例属性 (也就是相同的“作用域”)，而不能访问 <navigation-link> 的作用域。例如 url 是访问不到的
    + **具名插槽**
      + <current-user>组件中
      ```
      <span>
        <slot v-bind:user="user">
          {{ user.lastName }}
        </slot>
      </span>
      ```
    + 
      ```
      <current-user>
        <template v-slot:default="slotProps">
          {{ slotProps.user.firstName }}
        </template>
      </current-user>
      ```

3. **父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。**

4. 有时为一个插槽设置具体的后备 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染。

#### 具名插槽
1. <slot>元素有一个特殊的特性：name，在向具名插槽提供内容的时候，在一个<template>元素上使用c-slot指令，并以 v-slot 的参数的形式提供其名称

2. v-slot:的缩写为字符#
***

#### elementUI 组件

##### mixins Emitter
1. mixins emitter.js 代码 
- vm.$parent: 父组件
- vm.$root： 根组件
- vm.$options: 当前vue实例的初始化选项
[参考](https://juejin.im/post/5b9730546fb9a05d00459387)

##### vdom VNode

##### 内置组件
1. component 动态组件
2. transition 
3. 插槽  
this.$slot 访问静态插槽，每个插槽都是一个VNode数组
```
render: function (createElement) {
  // `<div><slot></slot></div>`
  return createElement('div', this.$slots.default)
}
```
4. 具名插槽  
通过this.$scopedSlots 访问作用域cha cao
```
props: ['message'],
render: function (createElement) {
  // `<div><slot :text="message"></slot></div>`
  return createElement('div', [
    this.$scopedSlots.default({
      text: this.message
    })
  ])
}
```








#### Vue.js技术揭秘

##### 认识Flow
- Flow的工作方式
  - 类型推断: 通过变量的使用上下文来推断出变量的类型，然后根据这些推断来检查类型
  - 类型注释: 事先注释好我们期待的类型，Flow会给予这些注释来判断
类似Flow的工具还有TypeScript

##### Vue.js 源码目录设计
- src
  - compiler(编译相关)
  - core(核心代码)
  - platforms(不同平台的支持)
  - server(服务端渲染)
  - sfc(.vue文件解析)
  - shared(共享代码)

