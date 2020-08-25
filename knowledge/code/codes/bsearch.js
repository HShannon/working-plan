let arr = [8,11,19,23,27,33,45,55,67,98]
let value=19
/**
 * binary
 */
function bsearch(arr, value){
  let low=0;
  let high=arr.length-1;
  while(low<=high){
    // 如果 low 和 high 比较大的话，两者之和就会有可能溢出
    let mid=low+((high-low)>>1)
    if(arr[mid]==value){
      return mid;
    }else if(arr[mid]<value){
      low=mid+1;
    }else{
      high=mid-1;
    }
  }
  return -1;
}
// console.log(bsearch(arr, value))

function bsearch2(arr, value){
  return bsearchInternally(arr, 0, arr.length-1, value)
}

function bsearchInternally(arr, low, high, value){
  if(low>high) return -1;
  let mid=low+((high-low)>>1);
  if(arr[mid]===value){
    return mid;
  }else if(arr[mid]<value){
    return bsearchInternally(arr, mid+1, high, value)
  }else{
    return bsearchInternally(arr, low, mid-1, value)
  }
}
console.log(bsearch2(arr, value))
