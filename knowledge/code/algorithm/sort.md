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
1. 原地排序算法，空间复杂度o(1)
2. 仅当相邻两个元素相等时，不交换，稳定算法
3. 时间复杂度
- 最好情况: o(n)
- 最坏的情况: o(n<sup>2</sup>)
- 对于包含 n 个数据的数组，有 n! 种排序方法；有序度是数组中具有有序关系的元素对的个数；完全有序的数组的有序度成为满有序度；逆序度正好于有序度相反；有序度 = 满有序度 - 有序度
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
1. 插入排序是原地排序算法
2. 插入排序是稳定的排序算法
3. 时间复杂度
- 最好情况: o(n)
- 最坏的情况: o(n<sup>2</sup>)
- 平均时间复杂度: o(n<sup>2</sup>)

## Selection sort
从未排序区间挑选最小的元素，将其放到已排期间末尾
```
const SelectionSort = (arrList, arrLength) => {
  if(arrLength <= 1) return
  for(let i = 0; i < arrLength; i++) {
    let min = arrList[i]
    let minIndex = i
    for(var j = i + 1; j < arrLength; j++) {
      if(arrList[j] <  min){
	min = arrList[j]
      }
    }
    let temp = arrList[i]
    arrList[i] = min
    arrList[minIndex] = temp
  }
}
```
1. 选择排序是原地排序算法
2. 选择排序不是稳定的排序方法
3. 时间复杂度
- 最好情况: o(n<sup>2</sup>)
- 最坏情况: o(n<sup>2</sup>)
- 平均时间复杂度: o(n<sup>2</sup>)

## 资料中插入排序比冒泡排序受欢迎
冒泡排序与插入排序都是原地排序算法 时间复杂度都为o(n<sup>2</sup>)，元素交换的次数和移动的次数都为原始数据的逆序度，但冒泡排序的数据交换要比插入排序的数据移动要复杂，冒泡排序需要 3 个赋值操作，而插入排序只需要 1 个。插入排序有种优化方案希尔排序


