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
    console.log("=>", currentArr)
    currentArr.pop()
  }
}
// console.log(permute([1,2,3]))



