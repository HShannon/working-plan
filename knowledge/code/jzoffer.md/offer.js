function minNumberInRotateArray(rotateArray)
{
    // write code here
    if(rotateArray === null || rotateArray.length <= 0){
      return null
    }
    let p1 = 0;
    let p2 = rotateArray.length -1;
    let mid = null;
    while(p1 < p2){
      if(p1 + 1 === p2){
        mid = p2;
        break;
      }
      mid = (p1 + p2) >> 1;
      if(rotateArray[mid] >= rotateArray[p1]){
        p1 = mid;
      } else if(rotateArray[mid] <= rotateArray[p2]){
        p2 = mid;
      }
    }
    return rotateArray[mid]
}

// 重复率较高的写法
function Fibonacci1(n)
{
    // write code here
    if(n === 0) return 0;
    if(n === 1) return 1;
    if(n === 2) return 1;
    return Fibonacci(n-1) + Fibonacci(n-2)
}

function Fibonacci(n)
{
    // write code here
    if(n === 0) return 0;
    if(n === 1) return 1;
    if(n === 2) return 1;
    let result = [];
    result[0] = 0;
    result[1] = 1;
    result[2] = 1;
    for(let i = 3;i<=n;i++){
      result[i] = result[i-1] + result[i-2] 
    }
    return result[n]
}

function jumpFloor1(number)
{
    // write code here
    if(number === null || number <= 0){
      return 0;
    }
    if(number === 1) return 1;
    if(number === 2) return 2;
    return jumpFloor(number - 1) + jumpFloor(number - 2)
}

function jumpFloor(number)
{
    // write code here
    if(number === null || number <= 0){
      return 0;
    }
    if(number === 1) return 1;
    if(number === 2) return 2;
    let result = [];
    result[0] = 0;
    result[1] = 1;
    result[2] = 2;
    for(let i =3;i<=number;i++){
      result[i] = result[i-1] + result[i-2] 
    }
    return result[number]
}

function jumpFloorII(number)
{
    // write code here
    return Math.pow(2, number-1)
}

function rectCover(number)
{
    // write code here
    if(number === null || number <= 0){
      return 0;
    }
    if(number === 1) return 1;
    if(number === 2) return 2;
    let result = [];
    result[0] = 0;
    result[1] = 1;
    result[2] = 2;
    for(let i =3;i<=number;i++){
      result[i] = result[i-1] + result[i-2] 
    }
    return result[number]
}

// 负数用补码
// 原码，反码（正数的反码为本身, 负数反码为符号位不变，其他位取反），补码（正数补码为本身，负数为反码加1）
// 括号的优先级
function NumberOf11(n)
{
    // write code here
    if(n === null || n === 0){
      return 0;
    }
    let count = 0;
    let flag = 1;
    while(flag !== 0){
      if((flag & n) !== 0){
        count++
      }
      flag = flag << 1
    }
    return count
}

function NumberOf11(n)
{
    // write code here
    if(n === null || n === 0){
      return 0;
    }
    let count = 0;
    let flag = 1;
    while(flag !== 0){
      if((flag & n) !== 0){
        count++
      }
      flag = flag << 1
    }
    return count
}

function Power(base, exponent)
{
    // write code here
    if(base === 0 && exponent < 0){
      return null
    }
    if(exponent === 0){
      return 1;
    }
    let result = PowerCore(base, Math.abs(exponent));
    if(exponent < 0){
      result = 1 / result;
    }
    return result
}

function PowerCore(base, exponent){
  if(exponent === 1){
    return base
  }
  let res = PowerCore(base, exponent >> 1)
  res *= res
  // 若为偶数
  if(exponent & 1 !== 0){
    res = res * base
  }
  return res;
}


function reOrderArray(array)
{
    // write code here
    if(array === null || array.length <=0){
      return [];
    }
    let arr1 = [];
    let arr2 = [];
    array.forEach((item) => {
      if((item & 1) === 0){
        arr1.push(item)
      }else {
        arr2.push(item)
      }
    })
    return arr2.concat(arr1);
}

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindKthToTail(head, k)
{
    // write code here
    if(head === null || k <= 0){
      return null
    }
    let pNode = head;
    let pLength = 0;
    while(pNode !== null){
      pNode = pNode.next;
      pLength++  
    }
    if(k > pLength){
      return null;
    }
    let p1 = head;
    let p2 = head;
    let index = 0;
    while((index < k-1) && (p1.next !== null)){
      p1 = p1.next;
      index++;
    }
    while(p1.next !== null){
      p1 = p1.next;
      p2 = p2.next;
    }
    return p2
}

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(pHead)
{
    // write code here
    if(pHead === null){
      return null;
    }
    let pReverseHead = new ListNode('head');
    let currentNode = pHead;
    let preNode = null;
    while(currentNode !== null){
      let tempNode = currentNode.next
      if(currentNode.next === null){
        pReverseHead = currentNode;
      }
      currentNode.next = preNode;
      preNode = currentNode;
      currentNode = tempNode;
    }
    return pReverseHead;
}

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function Merge1(pHead1, pHead2)
{
    // write code here
    if(pHead1 === null) return pHead2;
    if(pHead2 === null) return pHead1;
    let pHead = null
    if(pHead1.val < pHead2.val){
      pHead = pHead1
      pHead.next = Merge(pHead1.next, pHead2) 
    } else {
      pHead = pHead2
      pHead.next = Merge(pHead1, pHead2.next)
    }
    return pHead
}

function Merge(pHead1, pHead2)
{
  if(pHead1 === null && pHead2 === null){
    return null;
  }
  let pMergeHead = new ListNode('head');
  let pNode = pMergeHead
  let p1 = pHead1;
  let p2 = pHead2;
  while(p1 !== null && p2 !== null){
    if(p1.val < p2.val){
      pNode.next = new ListNode(p1.val);
      p1 = p1.next;
    } else {
      pNode.next = new ListNode(p2.val);
      p2 = p2.next;
    }
    pNode = pNode.next;
  }
  if(p1 !== null) pNode.next = p1;
  if(p2 !== null) pNode.next = p2;
  return pMergeHead.next
}

// {8,8,#,9,#,2,#,5},{8,9,#,2}
/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function HasSubtree(pRoot1, pRoot2)
{
    // write code here
    let result = false;
    if(pRoot1 !== null && pRoot2 !== null){
      if(pRoot1.val === pRoot2.val){
        result = HasSubtreeCore(pRoot1, pRoot2)
      }
      if(!result){
        result = HasSubtree(pRoot1.left, pRoot2);
      }
      if(!result){
        result = HasSubtree(pRoot1.right, pRoot2);
      }
    }
    return result
}

function HasSubtreeCore(pRoot1, pRoot2){
  if(pRoot2 === null){
    return true;
  }
  if(pRoot1 === null){
    return false;
  }
  if(pRoot1.val !== pRoot2.val){
    return false;
  }
  return HasSubtreeCore(pRoot1.left, pRoot2.left) && HasSubtreeCore(pRoot1.right, pRoot2.right)
}

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Mirror(root)
{
    // write code here
    if(root === null){
      return;
    }
    if(root.left === null && root.right === null){
      return;
    }
    let tempNode = root.left;
    root.left = root.right;
    root.right = tempNode;
    if(root.left !== null) Mirror(root.left)
    if(root.right !== null) Mirror(root.right)
}

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Mirror(root)
{
    // write code here
    if(!root){
        return
    }
    if(!root.left  && !root.right){
        return;
    }
    let tempTree = root.right;
    root.right = root.left;
    root.left = tempTree;
    if(root.left){
        Mirror(root.left);
    }
    if(root.right){
        Mirror(root.right);
    }
}

let min_stack = [];
let data_stack = [];
function push(node)
{
    // write code here
    data_stack.push(node);
    if(min_stack.length === 0 || node < min()){
        min_stack.push(node)
    }else{
        min_stack.push(min())
    }
}
function pop()
{
    // write code here
    min_stack.pop()
    data_stack.pop()
}
function top()
{
    // write code here
    return data_stack[data_stack.length-1]
}
function min()
{
    // write code here
    return min_stack[min_stack.length -1]
}

let arr = [5,4,3,2,1]
function bubbleSort(arr){
  if(!arr || arr.length <= 0){
    return []
  }
  for(let i =0;i<arr.length;i++){
    let flag = false;
    for(let j = 0; j < arr.length -1 - i;j++){
      if(arr[j] > arr[j+1]){
        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] =temp;
        flag = true; 
      }
    }
    if(!flag){
      break;
    }
  }
  return arr
}
// console.log(bubbleSort(arr))

function InsertSort(arr){
  if(!arr || arr.length <= 0){
    return [];
  }
  for(let i = 1;i<arr.length;i++){
    let val = arr[i];
    let j = i-1
    for(;j>=0;j--){
      if(val < arr[j]){
        arr[j+1]=arr[j]
      }else {
        break;
      }
    }
    arr[j+1] = val;
  }
  return arr;
}

// console.log(InsertSort(arr))
 
function Convert(pRootOfTree)
{
    // write code here
    if(!pRootOfTree){
      return null;
    }
    ConvertCore(pRootOfTree);
    while(pRootOfTree.left){
      pRootOfTree = pRootOfTree.left
    }
    return pRootOfTree
}
function ConvertCore(node, last){
  if(node.left){
    last = ConvertCore(node.left, last)
  }
  node.left = last;
  if(last){
    last.right = node;
  }
  last = node;
  if(node.right){
    last = ConvertCore(node.right, last)
  }
  return last
}

function Permutation(str)
{
    // write code here
    let result = [];
    if(str){
      let queue = str.split('');
      let temp = '';
      let currentStr = '';
      PermutationCore(queue, temp, currentStr, result);
    }
    result.sort();
    result = [...new Set(result)]
    return result
}

function PermutationCore(queue, temp, currentStr, result){
  currentStr += temp;
  if(queue.length === 0){
    result.push(currentStr);
    return;
  }
  for(let i = 0;i < queue.length;i++){
    temp = queue.shift();
    PermutationCore(queue, temp, currentStr, result)
    queue.push(temp)
  }
}

// console.log(Permutation('abc'))

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  let result = [];
  if(nums && nums.length > 0){
    currentArr = [];
    permuteCore(nums,  currentArr, result)
  }
  return result
};

var permuteCore = function(nums, currentArr, result){
  if(currentArr.length === nums.length){
    result.push([...currentArr])
  }
  for(let i =0;i<nums.length;i++){
    if(currentArr.includes(nums[i])) continue
    currentArr.push(nums[i])
    permuteCore(nums, currentArr, result);
    currentArr.pop()
  }
}
// console.log(permute([1,2,3]))


function MoreThanHalfNum_Solution(numbers)
{
    // write code here
    if(numbers === null || numbers.length === 0){
      return 0;
    }
    let time = 1;
    let target = numbers[0];
    for(let index =1; index<numbers.length;index++){
      if(numbers[index] === target){
        time++
      }else {
        time--
        if(time === 0){
          target = numbers[index];
          time = 1;
        }
      }
    }
    let count = 0;
    for(let i =0;i<numbers.length;i++){
      if(target === numbers[i]){
        count++
      }
    }
    if(count <= (numbers.length >> 1)){
      return 0
    } else {
      return target
    }
}
// console.log(MoreThanHalfNum_Solution([1,2,3,2,2,2,5,4,2]))

function GetLeastNumbers_Solution(input, k)
{
    // write code here
    if(input === null || input.length <=0 || k <=0 || k > input.length){
        return [];
    }
    if(input.length === k){
      return input.sort()
    }
    let left = 0;
    let right = input.length-1;
    let partitionIndex = partition(input, left, right);
    let result = []
    while(partitionIndex !== k-1){
        if(partitionIndex < k-1){
            left = partitionIndex + 1;
            partitionIndex = partition(input, left ,right);
        }else {
            right = partitionIndex - 1;
            partitionIndex = partition(input, left ,right);
        }
    }
    for(let i = 0; i <= partitionIndex; i++){
        result.push(input[i])
    }
    result.sort();
    return result
}

function partition(input, left, right){
    let pivot = left;
    let index = pivot + 1;
    for(let i = index; i <= right; i++){
        if(input[i] < input[pivot]){
            swap(input , i, index);
            index++
        }
    }
    swap(input, pivot, index-1);
    return index-1;
}

function swap(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// console.log(GetLeastNumbers_Solution([4,5,1,6,2,7,3,8], 4));

function FindGreatestSumOfSubArray(array)
{
    // write code here
    if(array === null || array.length <= 0){
      return null;
    }
    let currentSum = array[0];
    let maxSum = array[0];
    for(let index = 1;index<array.length;index++){
      if(currentSum < 0){
        currentSum = array[index];
      }else {
        currentSum += array[index];
      }
      if(currentSum > maxSum){
        maxSum = currentSum
      }
    }
    return maxSum
}
// console.log(FindGreatestSumOfSubArray([1,-2,3,10,-4,7,2,-5]))

function NumberOf1Between1AndN_Solution(n)
{
    // write code here
    let count = 0;
      let i = 1;
      let high = low = current = level = 0;
      let length = n.toString().length;
      while (i <= length) {
        level = Math.pow(10, i - 1); //第i位数位于什么量级 1 10 100 ...
        high = parseInt(n / (level * 10));
        low = n % level;
        current = parseInt(n / level) % 10;
        if (current === 0) {
          count += (high * level);
        } else if (current === 1) {
          count += (high * level + low + 1);
        } else {
          count += ((high + 1) * level);
        }
        i++;
      }
      return count;
}

function InversePairs(data)
{
    // write code here
    if(data === null || data.length <= 0){
      return 0;
    }
    return mergeSort(data, 0, data.length -1) % 1000000007
}

function mergeSort(data, l, r){
  if(l>=r) return 0;
  let mid = parseInt(l + ((r-l) >> 1))
  let lNum = mergeSort(data, l, mid)
  let rNum = mergeSort(data, mid+1, r)
  let mNum = merge(data, l, mid, r)
  return lNum + rNum + mNum;
}

function merge(data, l, mid, r){
  let temp = [];
  let p1 = mid;
  let p2 = r;
  let i = r-l;
  let count = 0;
  while(p1>=l && p2 >= mid+1){
    if(data[p1]>data[p2]){
      count += p2-mid;
      temp[i--] = data[p1--]
    }else{
      temp[i--] = data[p2--];
    }
  }
  while(p1 >= l){
    temp[i--] = data[p1--]
  }
  while(p2 >= mid+1){
    temp[i--] = data[p2--]
  }
  for(let i = 0;i<temp.length; ++i){
    data[l+i] = temp[i]
  }
  return count
}

function FindFirstCommonNode(pHead1, pHead2)
{
    // write code here
    let nLength1 = getListLength(pHead1);
    let nLength2 = getListLength(pHead2);
    let longListHead = pHead1;
    let shortListHead = pHead2;
    let nLengthDis = nLength1 - nLength2;
    if(nLength2 > nLength1){
      longListHead = pHead2;
      shortListHead = pHead1;
      nLengthDis = nLength2 - nLength1;
    }
    for(let i =0;i<nLengthDis;i++){
      longListHead = longListHead.next
    }
    while(longListHead && shortListHead && longListHead.val !== shortListHead.val){
      longListHead = longListHead.next;
      shortListHead = shortListHead.next;
    }
    let firtcommonNode = longListHead
    return firtcommonNode
}

function getListLength(pHead){
  let nLength = 0;
  let pNode = pHead;
  while(pNode){
    nLength++;
    pNode = pNode.next
  }
  return nLength
}

function TreeDepth(pRoot)
{
    // write code here
    if(pRoot === null){
      return 0;
    }
    let left = TreeDepth(pRoot.left)
    let right = TreeDepth(pRoot.right)
    return left > right ? (left + 1) : (right + 1);
}

function FindNumsAppearOnce(array)
{
    // write code here
    // return list, 比如[a,b]，其中ab是出现一次的两个数字
    if(array === null || array.length < 2){
      return;
    }
    let exclusive = 0;
    for(let i =0;i<array.length;i++){
      exclusive ^= array[i]
    }
    let index = getFitstBite(exclusive)
    let result1 = 0;
    let result2 = 0;
    for(let i =0;i<array.length;i++){
      if(isBite(array[i], index)){
        result1 ^= array[i]
      }else {
        result2 ^= array[i]
      }
    }
    return [result1, result2];
}

function getFitstBite(exclusive){
  let index = 0;
  while(((exclusive & 1) === 0) && (index < 64)){
    exclusive = exclusive >> 1
    index++;
  }
  return index;
}

function isBite(number, index){
  number = number >> index;
  return (number & 1)
}


function FindContinuousSequence(sum)
{
    // write code here
    let start = 1;
    let end = 2;
    let currentSum = 0;
    let result = [];
    while(start < end){
      currentSum = ((start + end) * (end-start+1)) >> 1;
      if(currentSum > sum){
        start++
      }else if(currentSum < sum){
        end++
      }else {
        let res = []
        for(let i =start;i<=end;i++){
          res.push(i)
        }
        result.push(res);
        start++
      }
    }
    return result
}

function FindNumbersWithSum(array, sum)
{
    // write code here
    if(array === null || array.length <= 0){
        return []
    }
    let start = 0;
    let end = array.length - 1;
    let currentSum = 0;
    let result = [];
    let min = null;
    while(start < end){
        currentSum = array[start] + array[end];
        if(currentSum < sum){
            end++
        }else if(currentSum > sum){
            start++
        }else {
            result = [array[start], array[end]]
            break;
        }
    }
    return result
}

function IsContinuous(numbers)
{
    // write code here
    if(numbers === null || numbers.length <= 0){
      return false;
    }
    numbers = numbers.sort()
    let index = numbers.findIndex(item => item !== 0)
    let startIndex = index === -1 ? 0 : index
    let num = index
    if(index > 4) return;
    let p = numbers.length - 1;
    while(p>startIndex && num >= 0){
      let gap = numbers[p] - numbers[p-1]
      // 如果有重复的话
      if(gap === 0){
        return false
      }else if( gap === 1){
        p--
      } else {
        let needGap = gap -1
        if(needGap <= num){
          p--;
          num = num - needGap
        } else {
          return false
        }
      }
    }
    return true
}

function LastRemaining_Solution(n, m)
{
    // write code here
    if(n === null || m === null || m <= 0 || n <= 0){
      return -1;
    }
    if(n === 1){
      return 0
    }
    let array = [];
    for(let i =0;i<n;i++){
      array.push(i)
    }
    while(array.length > 1){
      let deleteIndex = m % array.length;
      console.log(deleteIndex)
      let arr1 = array.slice(0, deleteIndex).reverse();
      let arr2 = array.slice(deleteIndex).reverse();
      array = arr1.concat(arr2)
      array.reverse().pop()
    }
    return array[0]
}

function StrToInt(str)
{
    // write code here
    if(str === null || str.length <= 0){
      return 0
    }
    let first = str[0];
    let result = 0
    if(first >= 0 && first <= 9){
      result = Number(first)
    }else if(first !== '-' && first !== '+'){
      return 0
    }
    for(let i =1;i<str.length;i++){
      if(str[i] >= 0 && str[i]<=9){
        result = result * 10 + Number(str[i])
      } else {
        return 0
      }
    }
    return first == '-' ? (-1 * result) : result
}

function duplicate(numbers, duplication)
{
    // write code here
    //这里要特别注意~找到任意重复的一个值并赋值到duplication[0]
    //函数返回True/False
    if(numbers === null || numbers.length <= 0){
      return false;
    }
    for(let i =0;i<numbers.length;i++){
      if(numbers.lastIndexOf(numbers[i]) !== i){
        duplication[0] = numbers[i]
        return true
      }
    }
    return false
}

function multiply(array)
{
    // write code here
    if(array === null || array.length <= 1){
      return []
    };
    let arr1 = [];
    let arr2 = [];
    arr1[0] = 1;
    arr2[array.length-1] =1;
    for(let i =1;i<array.length;i++){
      arr1[i] = arr1[i-1] * array[i-1]
    }
    for(let i = array.length -2;i>=0;i--){
      arr2[i] = arr2[i+1] * array[i+1];
      result[i] = arr1[i] * arr2[i]
    }
    result[array.length-1] = arr1[array.length-1] * arr2[array.length-1]
    return result
}

// 请实现一个函数用来匹配包括'.'和'*'的正则表达式。模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（包含0次）。 在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但是与"aa.a"和"ab*a"均不匹配
//s, pattern都是字符串
function match(s, pattern)
{
    // write code here
}

//s, pattern都是字符串
// function match(s, pattern)
// {
//     // write code here
//     if(s === null || pattern === null){
//         return false;
//     }
// //     if(s.length = 1 && pattern === '.') return true;
// //     if(s.length >1 && pattern === '.*') return  true;
//     return matchCore(s, pattern, 0,0)
// }

// function matchCore(s, pattern, i, j){
//     if(i === s.length && j === pattern.length){
//         return true;
//     }
//     if(i !== s.length && j === pattern.length){
//         return false;
//     }
//     if(pattern[j +1] === '*'){
//         if(pattern[j] === s[i] || (pattern[j] === '.' && i !== s.length)){
//             return matchCore(s, pattern, i, j+2) || matchCore(s, pattern, i+1, j) || matchCore(s, pattern, i+1, j+2)
//         }else {
//             return matchCore(s, pattern, i, j+2)
//         }
//     }  
//     if(pattern[j] === s[i] || (pattern[j] === '.' && i !== s.length)){
//         return matchCore(s, pattern, i+1, j+1)
//     }
//     return false
// }

function match(s, pattern){
  if(s === null || pattern === null){
    return false;
  }
  return matchCore(s, pattern, 0, 0)
}

function matchCore(s, pattern, i, j){
  if(i == s.length && j == pattern.length){
    return true
  }
  if(i !== s.length && j === pattern.length){
    return false
  }
  if(pattern[j+1] === '*'){
    if(pattern[j] == s[i] || (pattern[j] == '.' && i !== s.length)){
      return matchCore(s, pattern, i, j+2) || matchCore(s, pattern, i+1, j) || matchCore(s, pattern, i+1,j+2)
    }else {
      return matchCore(s, pattern, i, j+2)
    }
  }
  if(pattern[j] === s[i] || (pattern[j] == '.' && i !== s.length)){
    return matchCore(s, pattern, i+1, j+1)
  }
  return false
}

//s字符串
function isNumeric(s)
{
    // write code here
}

function isNumeric(s)
{
    // write code here
    if(s === null){
        return false;
    }
    let index = 0
    let index_ = scanInteger(s, index)
    let isNumber = index_ > index ? true : false;
    index = index_
    if(s[index] === '.'){
        index++;
        index_ = scanUnsignInteger(s, index);
        isNumber = index_ > index  || isNumber
        index = index_
    }
    if(s[index] === 'e' || s[index] === 'E'){
        index++;
        index_ = scanInteger(s, index);
        isNumber = isNumber && index_ > index;
        index = index_
    }
    return isNumber && index === s.length
}

function scanInteger(s, index){
    if(s[index] === '-' || s[index] === '+'){
        index++
    }
    return scanUnsignInteger(s, index)
}

function scanUnsignInteger(s, index){
    // let initialIndex = index;
    while(index < s.length && s[index] >=0 && s[index] <=9){
        index++
    }
    return index
}

function isNumeric(s){
  if(s === null){
    return false;
  }
  let index = 0;
  let index_ = scanInteger(s, index);
  let isNumber = index_ > index ? true : false
  index = index_
  if(s[index] == '.'){
    index++
    index_ = scanInteger(s, index);
    isNumber = index_ > index || isNumber;
    index = index_
  }
  if(s[index] == 'e' || s[index] == 'E'){
    index++;
    index_ = scanInteger(s, index);
    isNumber = index_ > index && isNumber
    index = index_
  }
  return isNumber && index == s.length
}

function scanInteger(s, index){
  if(s[index] === '-' || s[index] === '+'){
    index++
  }
  return scanUnsignInteger(s, index);
}

function scanUnsignInteger(s, index){
  while(index < s.length && s[index] >=0 && s[index] <= 9){
    index++
  }
  return index;
}

//Init module if you need
let hashTable = {}
function Init()
{
    // write code here
    hashTable = {}
}
//Insert one char from stringstream
function Insert(ch)
{
    // write code here
    if(hashTable[ch] === undefined){
        hashTable[ch] = 1
    }else {
        hashTable[ch] = hashTable[ch] +1
    }
}
//return the first appearence once char in current stringstream
function FirstAppearingOnce()
{
    // write code here
    for (let key in hashTable){
        if(hashTable[key] === 1){
            return key
        }
    }
    return '#'
}

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function EntryNodeOfLoop(pHead)
{
    // write code here
    if(pHead === null || pHead.next === null || pHead.next.next === null){
      return null;
    }
    let pNode1 = pHead.next;
    let pNode2 = pHead.next.next;
    while(pNode1 && pNode2){
      if(pNode1 == pNode2){
        break
      }else {
        pNode1 = pNode1.next;
        pNode2 = pNode2.next;
        if(pNode2.next){
          pNode2 = pNode2.next;
        }
      }
    }
    if(pNode1 == null || pNode2 == null){
      return null;
    }
    let pNode1 = pHead;
    while(pNode1 !== pNode2){
      pNode1 = pNode1.next;
      pNode2 = pNode2.next;
    }
    return pNode2
}

function deleteDuplication(pHead)
{
    // write code here
    if(pHead === null || pHead.next === null){
        return pHead;
    }
    let head = new ListNode('head');
    head.next = pHead;
    let preNode = head;
    let curNode = head.next
    while(curNode !== null){
        if(curNode.next !== null && curNode.next.val == curNode.val){
            while(curNode.next && curNode.val === curNode.next.val){
                curNode = curNode.next;
            }
            preNode.next = curNode.next;
            curNode = curNode.next
        }else {
            preNode = preNode.next;
            curNode = curNode.next;
        }
    }
    return head.next
}

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function deleteDuplication(pHead)
{
    // write code here
    if(pHead === null || pHead.next === null){
      return pHead;
    }
    let head = new ListNode('head');
    head.next = pHead;
    let preNode = head;
    let currentNode = head.next;
    while(currentNode){
      if(currentNode.next && currentNode.val === currentNode.next.val){
        while(currentNode.next && currentNode.val === currentNode.next.val){
          currentNode = currentNode.next;
        }
        preNode.next = currentNode.next;
        currentNode = currentNode.next;
      } else {
        preNode = preNode.next; 
        currentNode = currentNode.next;
      }
    }
    return head.next
}

/*function TreeLinkNode(x){
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null;
}*/
function GetNext(pNode)
{
    // write code here
    if(pNode === null){
      return
    }
    let pNext = null;
    if(pNode.right){
      let pRight = pNode.right;
      while(pRight.left){
        pRight = pRight.left
      }
      pNext = pRight
    }else if(pNode.next){
      let currentNode = pNode
      let parentNode = pNode.next;
      while(parentNode !== null && currentNode === parentNode.right){
        currentNode = parentNode;
        parentNode = parentNode.next;
      }
      pNext = parentNode
    }
    return pNext
}

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function isSymmetrical(pRoot)
{
    // write code here
    return isSymmetricalCore(pRoot, pRoot);
}

function isSymmetricalCore(pRoot1, pRoot2){
  if(pRoot1 === null && pRoot2 === null){
    return true;
  }
  if(pRoot1 === null || pRoot2 === null){
    return false;
  }
  if(pRoot1.val !== pRoot2.val){
    return false
  }
  return isSymmetricalCore(pRoot1.left, pRoot2.right) && isSymmetricalCore(pRoot1.right, pRoot2.left)
}

// 之字打印
// {8,6,10,5,7,9,11}
// [[8],[10,6],[5,7,9,11]]

function Print(pRoot)
{
    // write code here
    if(pRoot === null){
      return []
    }
    let stack1 = [];
    let stack2 = [];
    let result = []
    stack1.push(pRoot)
    while(stack1.length || stack2.length){
      let res1 = []
      while(stack1.length !== 0){
        let popNode = stack1.pop();
        res1.push(popNode.val);
        if(popNode.left !== null){
          stack2.push(popNode.left)
        }
        if(popNode.right !== null){
          stack2.push(popNode.right)
        }
      }
      if(res1.length !==0) {result.push(res1)}
      let res2 = []
      while(stack2.length !== 0){
        let popNode = stack2.pop();
        res2.push(popNode.val);
        if(popNode.right !== null){
          stack1.push(popNode.right)
        }
        if(popNode.left !== null){
          stack1.push(popNode.left)
        }
      }
      if(res2.length !==0) {result.push(res2)}
    }
    return result
}

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Print(pRoot)
{
    // write code here
    if(!pRoot){
      return []
    }
    let stack1 = [];
    let stack2 = [];
    let result = [];
    stack1.push(pRoot);
    while(stack1.length || stack2.length){
      let res1 = [];
      while(stack1.length){
        let popNode = stack1.shift();
        res1.push(popNode.val)
        if(popNode.left){
          stack2.push(popNode.left)
        }
        if(popNode.right){
          stack2.push(popNode.right)
        }
      }
      if(res1.length){
        result.push(res1)
      }
      let res2 = []
      while(stack2.length){
        let popNode = stack2.shift();
        res2.push(popNode.val);
        if(popNode.left){
          stack1.push(popNode.left)
        }
        if(popNode.right){
          stack1.push(popNode.right)
        }
      }
      if(res2.length){
        result.push(res2)
      }
    }
    return result
}

let sArr = []
function Serialize(pRoot)
{
    // write code here
    if(pRoot === null){
      sArr.push('#')
      return
    }
    sArr.push(pRoot.val)
    Serialize(pRoot.left);
    Serialize(pRoot.right);
}
function Deserialize(s)
{
    // write code here
    if(sArr.length <= 0) return null;
    let val = sArr.shift();
    let treeNode = null;
    if(typeof val === 'number') {
      treeNode = new TreeNode(val)
      treeNode.left = Deserialize(sArr)
      treeNode.right = Deserialize(sArr)
    }
    return treeNode
}

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
let strArr = []
function Serialize(pRoot)
{
    // write code here
    if(pRoot === null){
      strArr.push('#')
      return
    }
    strArr.push(pRoot.val)
    Serialize(pRoot.left)
    Serialize(pRoot.right)
}
function Deserialize(s)
{
    // write code here
    if(strArr.length <= 0) return null;
    let val = strArr.shift();
    let treeNode = null;
    if(typeof val === 'number'){
      treeNode = new TreeNode(val);
      treeNode.left = Deserialize(strArr)
      treeNode.right = Deserialize(strArr)
    }
    return treeNode
}

/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
// {5,3,7,2,4,6,8},3
// 二叉搜索树通过中序遍历树，从小到大排序
function KthNode(pRoot, k)
{
    // write code here
    if(pRoot === null || k<=0){
      return null
    }
    let arr = [];
    KthNodeCore(pRoot, arr);
    return arr[k-1]
}

function KthNodeCore(pRoot, arr){
  if(!pRoot){
    return;
  }
  KthNodeCore(pRoot.left, arr)
  arr.push(pRoot);
  KthNodeCore(pRoot.right, arr)
}

// function KthNode(pRoot, k)
// {
//     // write code here
//     if(pRoot === null || k <=0){
//       return null
//     }
//     let arr = []
//     KthNodeCore(pRoot, arr);
//     return arr[k-1];
// }

// function KthNodeCore(pRoot, arr){
//   if(pRoot === null) return;
//   KthNodeCore(pRoot.left, arr);
//   arr.push(pRoot);
//   KthNodeCore(pRoot.right, arr);
// }

let arr =[]
function Insert(num)
{
    // write code here
    arr.push(num);
    for(let i = arr.length - 2;arr[i]>num;i--){
      [arr[i], arr[i+1]] = [arr[i+1], arr[i]]
    }
}
function GetMedian(){
  // write code here
  if(arr.length <= 0) return;
  // 奇数
  if((arr.length & 1) == 1){
    return arr[arr.length >> 1]
  }else {
    return (arr[arr.length >> 1] + arr[(arr.length >> 1) - 1]) / 2
  }
}

function maxInWindows(num, size)
{
    // write code here
    if(num === 0 || num.length <= 0 || size <=0){
      return []
    }
    let p1 = 0;
    let p2 = 0;
    let result = [];
    for(let i =0;i<size-1;i++){
      p2++
    }
    while(p2 <= num.length-1){
      result.push(Math.max(...num.slice(p1,p2+1)))
      p1++;
      p2++;
    }
    return result
}
// console.log(maxInWindows([2,3,4,2,6,2,5,1], 3))

// "ABCESFCSADEE",3,4,"ABCCED"
// function hasPath(matrix, rows, cols, path) {
//   const flag = new Array(matrix.length).fill(false);
//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < cols; j++) {
//       if (hasPathCore(matrix, i, j, rows, cols, path, flag, 0)) {
//         return true;
//       }
//     }
//   }
//   return false;
// }

// function hasPathCore(matrix, i, j, rows, cols, path, flag, k) {
//   const index = i * cols + j;
//   if (i < 0 || j < 0 || i >= rows || j >= cols || matrix[index] != path[k] || flag[index]) {
//     return false;
//   }
//   if (k === path.length - 1) {
//     return true;
//   }
//   flag[index] = true;
//   if (hasPathCore(matrix, i + 1, j, rows, cols, path, flag, k + 1) ||
//     hasPathCore(matrix, i - 1, j, rows, cols, path, flag, k + 1) ||
//     hasPathCore(matrix, i, j + 1, rows, cols, path, flag, k + 1) ||
//     hasPathCore(matrix, i, j - 1, rows, cols, path, flag, k + 1)) {
//     return true;
//   }
//   flag[index] = false;
//   return false;
// }

function hasPath(matrix, rows, cols, path){
  const flag = new Array(matrix.length).fill(false);
  for(let i = 0;i<rows;i++){
    for(let j = 0;j<cols;j++){
      if(hasPathCore(matrix, i, j, rows, cols, path, flag, 0)){
        return true
      }
    }
  }
  return false
}

function hasPathCore(matrix, i, j, rows, cols, path, flag, k){
  const index = i * cols + j;
  if(i < 0 || j < 0 || i >= rows || j >= cols || matrix[index] !== path[k] || flag[index]){
    return false;
  }
  if(k === path.length -1){
    return true;
  }
  flag[index] = true;
  if(hasPathCore(matrix, i+1, j, rows, cols, path, flag, k+1) || 
    hasPathCore(matrix, i-1, j, rows, cols, path, flag, k+1) ||
    hasPathCore(matrix, i, j+1, rows, cols, path, flag, k+1) ||
    hasPathCore(matrix, i, j-1, rows, cols, path, flag, k+1)){
      
      return true
  }
  flag[index] = false
  return false;
}

function movingCount(threshold, rows, cols) {
  const flag = createArray(rows, cols);
  let count = 0;
  if (rows > 0 && cols > 0) {
    count = movingCountCore(0, 0, threshold, rows, cols, flag);
  }
  return count;
}

function movingCountCore(i, j, threshold, rows, cols, flag) {
  if (i < 0 || j < 0 || i >= rows || j >= cols) {
    return 0;
  }
  if (flag[i][j] || condition(i, j, threshold)) {
    flag[i][j] = true;
    return 0;
  }
  flag[i][j] = true;
  return 1 + movingCountCore(i - 1, j, threshold, rows, cols, flag) +
    movingCountCore(i + 1, j, threshold, rows, cols, flag) +
    movingCountCore(i, j - 1, threshold, rows, cols, flag) +
    movingCountCore(i, j + 1, threshold, rows, cols, flag);
}

function condition(i, j, threshold) {
  let temp = i + '' + j;
  let sum = 0;
  for (let i = 0; i < temp.length; i++) {
    sum += temp.charAt(i) / 1;
  }
  return sum > threshold;
}

function createArray(rows, cols) {
  const result = [];
  for (let i = 0; i < rows; i++) {
    result[i] = new Array(cols).fill(false);
  }
  return result;
}

function cutRope(number)
{
    // write code here
    if(number < 2){
        return 0
    }
    if(number === 2){
        return 1
    }
    if(number === 3){
        return 2
    }
    let product = [];
    product[0] = 0;
    product[1] = 1;
    product[2] =1;
    // product[3] = 2;
    for(let i =3;i<=number;i++){
      for(let j =1;j<= i/2;j++){
        product[i]  = Math.max(product[i], j * (i - j), j * product[i - j])
      }
    }
    return product[number]
}
console.log(cutRope(18))

var cuttingRope = function (n) {
  // dp 对应绳子为 n 的最优解，dp[0] 无意义
  let dp = new Array(n + 1).fill(1);
  // 自底向上递推
  for (let i = 3; i <= n; i++) {
      for (let j = 1; j < i; j++) {
          dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);
      }
  }
  return dp[n]
};

/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function(pushed, popped) {
  if(pushed.length <= 0){
      return false
  }
  let pushIndex = 0;
  let popIndex = 0;
  let stack = [];
  while(pushIndex < pushed.length){
      stack.push(pushed[pushIndex]);
      while(stack.length && stack[stack.length-1] === popped[popIndex]){
        stack.pop();
        popIndex++;
      }
      pushIndex++
  }
  return stack.length === 0
};