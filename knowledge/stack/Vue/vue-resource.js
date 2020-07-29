/**
 *  Observe，数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，
 *  内部采用 Object.defineProperty 的 getter 和 setter 来实现
 */
Object.defineProperty(obj, 'a', {
  configurable: true,
  enumerable: true,
  get () {
    // getCount++
    return val
  },
  set (v) { val = v }
})

/**
 * 如何实现 observe
 */
var data = { name: 'yck' }
observe(data)
let name = data.name // -> get value
data.name = 'yyy' // -> change value

function observe(obj) {
  // 判断类型
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function defineReactive(obj, key, val) {
  // 递归子属性
  observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      console.log('get value')
      return val
    },
    set: function reactiveSetter(newVal) {
      console.log('change value')
      val = newVal
    }
  })
}
