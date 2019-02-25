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

#### 列表渲染
