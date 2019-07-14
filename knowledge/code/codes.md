
# 遍历对象
1. 
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
***

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

## example
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