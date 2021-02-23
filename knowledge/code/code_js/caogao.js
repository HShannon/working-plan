// 快速排序
function quickSort(arr, left, right){
  // base case
  if(left >= right) return;
  let partition;
  partition = getPartition(arr, left, right);
  quickSort(arr, left, partition-1);
  quickSort(arr, partition+1, right);
}

function getPartition(arr, left, right){
  let pivot = left;
  let index = pivot +1;
  for(let i = index; i <= right; i++){
    if(arr[i] < arr[pivot]){
      let temp = arr[i];
      arr[i] = arr[index];
      arr[index] = temp;
      index++;
    }
  }
  let temp = arr[pivot];
  arr[pivot] = arr[index-1]
  arr[index-1] = temp;
  return index-1;
}
let arr = [4,5,6,1,3,2,11,23,123,32]

// quickSort(arr, 0, arr.length-1)
// console.log(arr);


function mergeSort(arr, left, right){
  // base case 
  if(left >= right) return;
  let middle = parseInt(left + ((right - left) >> 1));
  mergeSort(arr, left, middle);
  mergeSort(arr, middle+1, right);
  let temp = [];
  let p1 = left;
  let p2 = middle+1;
  let index = 0;
  while(p1 <= middle && p2 <= right){
    temp[index++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
  }
  if(p1 <= middle){
    temp[index++] = arr[p1++];
  }
  if(p2 <= right){
    temp[index++] = arr[p2++];
  }
  for(let i = 0; i<temp.length;i++){
    arr[left+i] = temp[i]
  }
}
// mergeSort(arr, 0, arr.length-1);
// console.log(arr);


