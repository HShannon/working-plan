# 排序
## 怎么分析算法性能
1. 最好情况、最坏情况、平均情况时间复杂度
2. 时间复杂度的系数、常数、低阶
3. 比较次数或移动次数
4. 排序算法的内存消耗
5. 排序算法的稳定性，如果待排序的算法的序列中存在值相等的元素，经过排序之后，相等元素之间原有的先后顺序不变，则称为稳定的排序算法，反之，不稳定的排序算法

## Bubble sort
```
const bubbleSort = (arrList, arrLength) => {
  if(arrLength <= 1) return
  for(let i = 0; i < arrLength; i++){
    let isExchange = false
    for(let j = 0; j < arrLength - i - 1 ; j++){
      if(arrList[j] > arrList[j + 1]){
        let temp = arrList[j + 1]
        arrList[j + 1] = arrList[j]
        arrList[j] = temp
        
	isExchange = true
      }
    }
    if(!isExchange) break
  }
}
```
- 原地排序算法，空间复杂度o(1)
- 仅当相邻两个元素相等时，不交换，稳定算法

### 时间复杂度
1. 最好情况: o(n)
2. 最坏的情况: o(n * n)
3. 对于包含 n 个数据的数组，有 n! 种排序方法；有序度是数组中具有有序关系的元素对的个数；完全有序的数组的有序度成为满有序度；逆序度正好于有序度相反；有序度 = 满有序度 - 有序度
> 对于长度为 n 的数组，满有序度为 n * (n-1) / 2
在冒泡算法中，需要交换的次数等于逆序度，即 n * (n -1) / 2 - 最初的有序度

## Insert sort
首先将数组中的数据分为两个区间，已排序区间和为排序区间
```
const InsertSort = (arrList, arrLength) => {
  if(arrLength <= 1) return
  for(let i = 1; i < arrLength; i++){
    let value = arrList[i]
    for(var j = i - 1; j >= 0; j--){
      if(arrList[j] > value) {
        arrList[j + 1] = arrList[j]
      } esle {
        break
      }
    }
    arrList[j + 1] = value
  }
}
```
