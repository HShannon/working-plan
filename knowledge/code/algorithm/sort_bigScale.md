# 如何用快排思想在O(n)内查找第K大元素
## Merge sort
分治思想，将大问题分解成小的问题来解决，分治算法一般都是用递归来实现，分治是解决问题的思想，递归是变成技巧，
```
递推公式: mergeSort(p...r) = merge(mergeSort(p,..q), mergeSort(q+1...r))
终止条件：p >= r 不在分解
```
1. 整体算法
```
const mergeSort = (arrList) => {
  if(arrList.length == 1) return arrList
  let middleIndex = Math.floor(arrList.length / 2)
  let left = mergeSort(arrList.slice(0, middleIndex))
  let right = mergeSort(arrList.slice(middleIndex))
  return merge(left, right)
}

const merge = (left, right) => {
  let result = []
  while(left.length > 0 && right.length > 0){
    if(left[0] <= right[0]){
      result.push(left.shift())
    }else {
      result.push(right.shift())
    }
  }
  return result.concat(left, right)
}
```
2. 归并排序是稳定算法取决于 merge 方法，在上面的算法中，是稳定算法
3. 时间复杂度
- 最好情况: o(nlongn)
- 最坏情况: o(nlongn)
- 平均情况: o(nlongn)
4. 归并排序算法不是原地排序算法，需要借助额外的存储空间，空间复杂度 o(n)

## Quick Sort

