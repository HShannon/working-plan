#### reduce
- dashboard 捏合三个数组
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
- 利用reduce实现扁平化
```
let flatten = (arr) => {
  return arr.reduce((preVal, curVal, index, arr) => {
    return preVal.concat(Array.isArray(curVal) ? flatten(curVal) : curVal)
  },[])
}
```
