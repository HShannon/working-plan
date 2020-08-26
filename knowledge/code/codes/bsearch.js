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
// console.log(bsearch2(arr, value))

/**
 * 查找第一个值等于给定值的元素
 */
function bsearch_first(arr, value){
  let low=0;
  let high=arr.length-1;
  while(low<=high){
    let mid=low+((high-low)>>1);
    if(arr[mid]<value){
      low=mid+1;
    }else if(arr[mid>value]){
      high=mid-1;
    }else{
      if(mid==0 || arr[mid-1]!==value){
        return mid
      }else{
        high=mid-1;
      }
    }
  }
  return -1;
}
// let arr_first=[1,3,4,5,6,8,8,8,11,18];
// let value_first=8
// console.log(bsearch_first(arr_first, value_first));

function bsearch_last(arr, value){
  let low=0;
  let high=arr.length-1;
  while(low<=high){
    let mid=low+((high-low)>>1);
    if(arr[mid]<value){
      low=mid+1;
    }else if(arr[mid]>value){
      high=mid-1;
    }else{
      if(mid==arr.length-1 || arr[mid+1]!==value){
        return mid
      }else{
        low=mid+1;
      }
    }
  }
  return -1;
}
// let arr_last=[1,3,4,5,6,8,8,8,11,18];
// let value_last=11
// console.log(bsearch_last(arr_last, value_last));

function bsearch_first_over_equal(arr, value){
  let low=0;
  let high=arr.length-1;
  while(low<=high){
    let mid=low+((high-low)>>1);
    if(arr[mid]>=value){
      if(mid==0 || arr[mid-1]<value){
        return mid
      }else{
        high=mid-1;
      }
    } else {
      low=mid+1;
    }
  }
  return -1;
}
// let arr_over_equal=[3,4,6,7,10];
// let value_over_equal=5
// console.log(bsearch_first_over_equal(arr_over_equal, value_over_equal));

function bsearch_last_above_equal(arr, value){
  let low=0;
  let high=arr.length-1;
  while(low<=high){
    let mid=low+((high-low)>>1);
    if(arr[mid]<=value){
      if(mid==arr.length-1 || arr[mid+1]>value){
        return mid;
      }else{
        low=mid+1;
      }
    }else{
      high=mid-1
    }
  }
  return -1
}
// let arr_above_equal=[3,4,6,7,10];
// let value_above_equal=5
// console.log(bsearch_last_above_equal(arr_above_equal, value_above_equal));
