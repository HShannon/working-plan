# 二分查找
二分查找针对的是一个有序的数组，查找思想有点类似分治思想。每次都通过跟区间的中间元素对比，将待查找的区间缩小为之前的一半，直到找到要查找的元素，或者区间被缩小为 0。假设数据大小为 n, 每次查找数据长度折半

> 被查找区间的大小变化: n, n/2, n/4, n/8, ... , n/2<sup>k</sup>

当 n/2<sup>k</sup> = 1 时，k 的值为总共缩小的次数，因此时间复杂度为 o(logn). o(logn) 为非常高效的时间复杂度，有时甚至比 o(1) 算法还高效

## 二分查找的递归与递归实现
最简单的情况是无重复
1. 非递归实现
```
const binary_search = (arr, searchValue) => {
  let low = 0
  let high = arr.length - 1
  while(low <= high) {
    let middleIndex = Math.floor((low + high) / 2)
    if(arr[middleIndex] === searchValue){
      return middleIndex
    }else if(arr[middleIndex > searchValue]){
      high = middleIndex - 1
    }else{
      low = middleIndex + 1 
    }
  }
}
```

2. 递归实现
```
const binary_search = (arr, searchValue, low, high) => {
  let middleIndex = Math.floor((low + high) / 2)
  if(arr[middleIndex] === searchValue){
    return middleIndex
  }else if(searchValue < arr[middleIndex]){
    return binary_search(arr, searchValue, low, middleIndex - 1)
  }else if(searchValue > arr[middleIndex]){
    return binary_search(arr, searchValue, middleIndex + 1, high)  
  }
}
```

## 算法分析
1. 二分查找依赖的是顺序表结构，简单点说就是数组
2. 二分查找针对的是有序数据
3. 数据量太小不适合二分查找
4. 数据量太大也不适合二分查找

## 算法变体
容易出错的细节有: 终止条件、区间上下界更新方法、返回值选择
1. 二分查找的变体一: 查找第一个值等于给定值的元素
```
const binary_search_first = (arr, searchValue) => {
  let low = 0
  let high = arr.length - 1
  while(low <= high){
    let middleIndex = Math.floor((low + high) / 2)
    if(searchValue < arr[middleIndex]){
      high = middleIndex - 1
    }else if(searchValue > arr[middleIndex]){
      low = middleIndex + 1
    }else{
      if(middleIndex === 0 || arr[middle-1] !== searchValue) return middleIndex
      else high = middleIndex - 1
    }
  }
  return -1
}
```

2. 二分查找的变体二: 查找最后一个值等于给定值的元素
```
const binary_search_last = (arr, searchValue) => {
  let low = 0
  let high = arr.length - 1
  while(low <= high){
    let middleIndex = Math.floor((low + high) / 2)
    if(searchValue < arr[middleIndex]){
      high = middleIndex - 1
    }else if(searchValue > arr[middleIndex]){
      low = middleIndex + 1
    }else{
      if(middleIndex === arr.length - 1 || arr[middleIndex + 1] != searchValue) return middleIndex
      else low = middleIndex + 1
    }
  }
  return -1
}
```

3. 二分查找的变体三: 查找第一个大于等于给定值的元素
```
const binary_search_big_equal = (arr, searchValue) => {
  let low = 0
  let high = arr.length - 1

  while(low <= high){
    let middleIndex = Math.floor((low + high) / 2)
    if(search <= arr[middleIndex]){
      if(middleIndex == 0 || arr[middleIndex - 1] < searchValue) return middleIndex
      return high = middleIndex - 1
    }else{
      low = middleIndex + 1
    }
  }
  return -1
}
```

4. 二分查找的变体四: 查找最后一个小于等于给定值的元素
```
const binary_search_low_equal = (arr, searchValue) => {
  let low = 0
  let high = arr.length - 1

  while(low <= high){
    let middleIndex = Math.floor((low + high) / 2)
    if(search >= arr[middleIndex]){
      if(middleIndex == arr.length - 1 || arr[middleIndex + 1] > search ) return middleIndex
      return low = middleIndex + 1
    }else{
      high = middleIndex - 1
    }
  }
  return -1
}
```

