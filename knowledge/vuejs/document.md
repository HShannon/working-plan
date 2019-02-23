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

