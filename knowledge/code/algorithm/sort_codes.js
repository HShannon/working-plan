
function swap(arr, i, j){
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

let arr = [4,5,6,1,3,2,11,23,123,32]
/** 
 * 冒泡排序
 * 原地排序
 * 稳定排序算法
 * 最好时间复杂度 o(n^2), 最坏时间复杂度 o(n), 平均时间复杂度 o(n^2)
*/
function bubbleSort(a){
  if(a.length <= 1) return
  for(let i=0;i<a.length;++i){
    let flag = false
    for(let j=0;j<a.length-i-1;++j){
      if(a[j]>a[j+1]){
        swap(a,j,j+1)
        flag = true
      }
    }
    if(!flag) break
  }
}

/**
 * 插入排序
 * 原地排序
 * 稳定排序
 * 最好时间复杂度o(n), 最坏时间复杂度o(n^2), 平均时间复杂度o(n^2)
 */
function insertSort(a){
  if(a.length <=1) return
  for(let i=1;i<a.length;++i){
    let value = a[i]
    let j = i-1
    for(;j>=0;--j){
      if(value<a[j]){
        a[j+1] = a[j]
      }else{
        break
      }
    }
    a[j+1] = value
  }
}

/**
 * 选择排序
 * 原地排序
 * 不稳定排序
 * 最坏、最好、平均情况时间复杂度o(n^2)
 */
function selectSort(a){
  if(a.length <= 1) return
  for(let i=0;i<a.length;++i){
    let min_index=i
    for(let j=i+1;j<a.length;++j){
      if(a[j]<a[min_index]){
        min_index=j
      }
    }
    if(i !== min_index){
      swap(a, i, min_index)
    }
  }
}

/**
 * 归并排序
 * 时间复杂度 o(nlogn)
 * 稳定算法
 * 非原地排序算法
 */
function mergeSort(a){
  if(a.length <= 1) return a
  let middleIndex = Math.floor(a.length/2)
  let left = a.slice(0, middleIndex)
  let right = a.slice(middleIndex)
  return merge(mergeSort(left),mergeSort(right))
}

function merge(left, right){
  let result = []
  while(left.length && right.length){
    if(left[0] < right[0]){
      result.push(left.shift())
    }else{
      result.push(right.shift())
    }
  }
  while(left.length){result.push(left.shift())}
  while(right.length){result.push(right.shift())}
  return result
}

function mergeSort2(arr){
  if(arr.length <=1) return 
  merge_sort_c(arr, 0, arr.length-1)
}

function merge_sort_c(arr, p, r){
  if(p>=r) return
  let mid = parseInt(p + ((r - p) >> 1));
  merge_sort_c(arr, p, mid);
  merge_sort_c(arr, mid+1,r);
  let temp = [];
  let i = 0;
  let p1 = p;
  let p2 = mid+1
  while(p1 <= mid && p2 <= r){
    temp[i++]=arr[p1] < arr[p2] ? arr[p1++] : arr[p2++]
  }
  while(p1 <= mid){
    temp[i++]=arr[p1++]
  }
  while(p2 <= r){
    temp[i++]=arr[p2++]
  }
  for(let i=0;i<temp.length;++i){
    arr[p+i]=temp[i]
  }
}

/**
 * 快速排序 方法一
 */
function quickSort(a, left, right){
  if(a.length <= 1) return a
  var len = a.length,
      partitionIndex,
      left = typeof left !== 'number' ? 0 : left,
      right = typeof right !== 'number' ? len-1 : right;
  if(left<right){
    partitionIndex = partition(a, left, right);
    quickSort(a, left, partitionIndex-1);
    quickSort(a, partitionIndex+1, right)
  }
  return a
}

function partition(a, left, right){
  let pivot = left,
      index = pivot+1;
  for(let i = index;i<=right;++i){
    if(a[i]<a[pivot]){
      swap(a, i, index)
      ++index
    }
  }
  swap(a, pivot, index-1)
  return index-1
}

/**
 * 快速排序 方法二
 */
function quickSort2(arr, low, high){
  if(low<high){
    let pivot = partition2(arr, low, high);
    quickSort(arr, low, pivot-1);
    quickSort(arr, pivot+1, high);
  }
  return arr
}

function partition2(arr, low, high){
  let pivot = arr[low]
  while(low < high){
    while(low<high && arr[high]>pivot){
      --high;
    }
    arr[low] = arr[high];
    while(low<high && arr[low]<=pivot){
      ++low;
    }
    arr[high] = arr[low]
  }
  arr[low] = pivot;
  return low
}

/**
 * ：O(n) 时间复杂度内求无序数组中的第 K 大元素。
 */
function findK(arr, low, high, k){
  if(low<=high){
    let pivotK=partitionK(arr, low, high)
    let cnt = pivotK-low+1;
    if(k===cnt){
      return arr[pivotK];
    }else if(k<cnt){
      return findK(arr, low, pivotK-1, k);
    }else if(k>cnt){
      return findK(arr, pivotK+1, high, k-cnt)
    }
  }
  return 0;
}

function partitionK(arr, low, high){
  let pivot=arr[low];
  while(low<high){
    while(low<high && arr[high]>pivot){
      --high;
    }
    arr[low]=arr[high];
    while(low<high && arr[low]<=pivot){
      ++low;
    }
    arr[high]=arr[low];
  }
  arr[low]=pivot;
  return low;
}
let arrK = [4,2,3,6];
// console.log(findK(arrK,0, arrK.length-1, 4))

/**
 * 计数排序
 */
function countingSort(arr){
  if(arr.length<=1) return;
  // 查找数据中数据的范围 Math.max()
  let max=arr[0];
  for(let i=1;i<arr.length;++i){
    if(arr[i]>max){
      max=arr[i];
    }
  }
  // 初始化数组 Array.prototype.fill(0)
  let c=[];
  for(let i=0;i<=max;++i){
    c[i]=0
  }
  for(let i=0;i<arr.length;++i){
    c[arr[i]]++
  }
  for(let i=1;i<=max;++i){
    c[i]=c[i-1]+c[i];
  }
  let r = []
  for(let i=arr.length-1;i>=0;--i){
    let index=c[arr[i]]-1;
    r[index]=arr[i];
    c[arr[i]]--;
  }
  for(let i=0;i<arr.length;++i){
    arr[i]=r[i]
  }
}
let arrCounting = [2,5,3,0,2,3,0,3];
countingSort(arrCounting);
console.log(arrCounting)
