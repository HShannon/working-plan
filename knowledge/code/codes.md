# 深度克隆
1. typeof
```
function clone(obj){
  var newobj = obj.constructor === Array ? [] : {};  // 用 instanceof 判断也可
  if(typeof obj !== 'object'  || obj === null ){
    return obj
  } else {
    for(var i in obj){
      newobj[i] = typeof obj[i] === 'object' ? clone(obj[i]) : obj[i]; 
      // 只考虑 对象和数组， 函数虽然也是引用类型，但直接赋值并不会产生什么副作用，所以函数类型无需深度克隆。
    }
  }
  return newobj;
};
```
在这个地方需要回顾一下typeof方法，
- null => object 
- undefined => undefined
- string => string
- boolean => boolean
- number => number

2. json 序列化
```
let newObj = JSON.parse(JSON.stringify(obj))
```

# slice(0)
slice(0) always returns a new array,  the array returned by slice(0) is identical to the input, which basicallly means it's cheap way to duplicate any array
```
let arr = ['wangyaru', 'tuwanqiong', 'wangdacheng']
let arr1 = arr.slice(0)
let arr2 = arr
arr[0] = 'shannon'

console.log(arr)  // ["shannon", "tuwanqiong", "wangdacheng"]
console.log(arr1) // ["wangyaru", "tuwanqiong", "wangdacheng"]
console.log(arr2) // ["shannon", "tuwanqiong", "wangdacheng"]
```

# [reduce](https://segmentfault.com/a/1190000010731933)  
arr.reduce(callback, [initialValue])
- callback
  - previousValue 上次调用返回的值，或者是提供的初始化值(initialValue)
  - currentValue 数组中当前被处理的元素
  - index 当前元素在数组中的索引
  - array 调用reduce的数组
- initialValue 作为第一次调用 callback 的第一个参数

1. dashboard 捏合三个数组
```
let arr = ['cost', 'viewNum', 'ctr']
let checkedKeys = []
let toUpperCaseFirstChar = world => {
  return world.charAt(0).toUpperCase() + world.slice(1)
}
let lastWeekArr = arr.map(it => 'lastWeek' + toUpperCaseFirstChar(it))
let lastDayArr = arr.map(it => 'lastDay' + toUpperCaseFirstChar(it))

checkedKeys = arr.reduce((preVal, curVal, index, arr) => {
  preVal.push(arr[index])
  if(!!lastWeekArr) preVal.push(lastWeekArr[index])
  if(!!lastDayArr) preVal.push(lastDayArr[index])
  
  return preVal
}, [])
```

2. 利用reduce实现扁平化  
```
let flatten = (arr) => {
  return arr.reduce((preVal, curVal, index, arr) => {
    return preVal.concat(Array.isArray(curVal) ? flatten(curVal) : curVal)
  },[])
}
```

# 数字 money 表示法
```
const commaFormat = (value = 0) => {
  value += '';
  let arr = value.split(',');
  
  return arr[0].replace(/\B(?=(?:\d{3})+$)/g, ',') + (arr[1] ? '.' + arr[1] : '') 
}
```

# 动态规划相关
1. 入门索引
```
function money(n){
    let f = [];
    f[0] = 0
    let cost = null
    for(let i = 1; i <= n; i++){
        cost = Infinity;
        if(i - 1 >= 0) cost = Math.min(cost, f[i - 1] + 1);
        if(i - 5 >= 0) cost = Math.min(cost, f[i - 5] + 1);
        if(i - 11 >= 0) cost = Math.min(cost, f[i - 11] + 1);
        f[i] = cost
        console.log(`f[${i}]: ${f[i]}`)
    }
}
```
