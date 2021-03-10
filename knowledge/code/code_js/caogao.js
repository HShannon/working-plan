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

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
  return constructMaximumBinaryTreeCore(nums, 0, nums.length-1)
};

var constructMaximumBinaryTreeCore = function(arr, l, r){
  // base case
  if(l>=r) return null;
  // 找到数组中的最大值
  let max = arr[l]
  let maxIndex = l;
  for(let i =l+1; i<=r;i++){
    if(arr[i] > max) {
      max = arr[i];
      maxIndex = i;
    }
  }
  // 递归掉用左右子树
  let root = new TreeNode(max);
  root.left = constructMaximumBinaryTreeCore(arr, l, maxIndex-1);
  root.right = constructMaximumBinaryTreeCore(arr, maxIndex+1, r);
  return root; 
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  // base case
  if(preorder.length <= 0 || inorder.length <= 0) return null;
  let root = new TreeNode(preorder[0]);
  // 获取到最大值
  let maxIndex = 0;
  for(let i =0;i<inorder.length;i++){
    if(inorder[i] === preorder[0]){
      maxIndex = i;
    }
  }
  root.left = buildTree(preorder.slice(1, maxIndex+1), inorder.slice(0, maxIndex));
  root.right = buildTree(preorder.slice(maxIndex+1), inorder.slice(maxIndex+1))
  return root;
};

// 根据前序遍历和后序遍历确定
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
  if(inorder.length == 0 || postorder == 0){
    return null;
  }
  let root = new TreeNode(postorder[postorder.length-1]);
  // 获取跟节点在 inorder 中的索引值
  let index = inorder.indexOf(postorder[postorder.length-1]);
  // 重构左右子树
  root.left = buildTree(inorder.slice(0, index), postorder.slice(0, index));
  root.right = buildTree(inorder.slice(index+1), postorder.slice(index, postorder.length-1));
  return root
};


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {
  let l = root;
  let r = root;
  let hl = 0;
  let hr = 0;
  while(l !== null){
    l = l.left;
    hl++;
  }
  while(r !== null){
    r = r.right;
    hr++;
  }
  if(hl === hr){
    return Math.pow(2, hl) -1
  }
  return 1 + countNodes(root.left) + countNodes(root.right)
};

/**
 * @param {number[]} piles
 * @param {number} H
 * @return {number}
 */
var minEatingSpeed = function(piles, H) {
  let l = 1;
  let r = Math.max(...piles);
  let res = 0;
  while(l <= r){
    let mid = parseInt(l + (r - l) / 2);
    if(canFinish(piles, mid, H)){
      res = mid
      r = mid-1;
    }else {
      l = mid+1
    }
  }
  return res
};

function canFinish(piles, mid, H){
  let time = 0;
  for(let i = 0; i < piles.length; i++){
    time += Math.ceil(piles[i] / mid)
  }
  return time <= H
}

// console.log(minEatingSpeed([30,11,23,4,20], 6))


/**
 * @param {number[]} weights
 * @param {number} D
 * @return {number}
 */
var shipWithinDays = function(weights, D) {
  let l = Math.min(...weights);
  let r = getSum(weights);
  // console.log(11, l, r)
  let res = 0;
  while(l <= r){
    let mid = parseInt(l + (r - l) / 2)
    if(canFinishWeight(weights, D, mid)){
      r = mid - 1;
      res = mid
    }else{
      l = mid + 1;
    }
  }
  return res;
};

var getSum = function(weights){
  let sum = 0;
  for(let i =0;i<weights.length;i++){
    sum += weights[i]
  }
  return sum
}

var canFinishWeight = function(weights, D, mid){
  let index = 0
  for(let i = 0;i<D;i++){
    let maxWeight = mid;
    while((maxWeight -= weights[index]) >= 0){
      index++;
      if(index === weights.length){
        return true
      }
    }
  }
  return false
}

// let weights = [1,2,3,4,5,6,7,8,9,10]
// let D = 5
// console.log(shipWithinDays(weights, D))


// 快慢指针法
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  // 环至少要有三个指针
  if (head == null || head.next == null) {
      return false;
  }
  let slow = head;
  let fast = head.next;
  while (fast !== null && fast.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
      if (fast === slow) {
          return true;
      }
  }
  return false;
};

var detectCycle = function(head) {
  if (head === null) {
      return null;
  }
  let slow = head, fast = head;
  while (fast !== null) {
      slow = slow.next;
      if (fast.next !== null) {
          fast = fast.next.next;
      } else {
          return null;
      }
      if (fast === slow) {
          let ptr = head;
          while (ptr !== slow) {
              ptr = ptr.next;
              slow = slow.next;
          }
          return ptr;
      }
  }
  return null;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    if(head == null || head.next == null){
      return null;
    }
    let slow = head;
    let quick = head;
    while(quick !== null && quick.next !== null){
      slow = slow.next;
      quick = quick.next.next;
      if(quick == slow){
        break;
      }
    }
    if(quick == null || quick.next == null){
      return null
    }
    slow = head;
    while(slow !== quick){
      slow = slow.next;
      quick = quick.next;
    }
    return slow
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
  let slow = head;
  let quick = head;
  while(quick !== null && quick.next !== null){
    slow = slow.next;
    quick = quick.next.next;
  }
  return slow;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let fast = slow = head;
  while(n-- > 0){
    fast = fast.next;
  }
  if(fast === null){
    return head.next
  }
  while(fast !== null){
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next
  return head;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let dummy = new ListNode(0)
  dummy.next = head
  let first = dummy
  let second = dummy
  for(let i = 1; i <= n + 1; i++){
      first = first.next
  }
  while(first !== null){
      second = second.next
      first = first.next
  }
  second.next = second.next.next
  return dummy.next
};

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
  let l = 0;
  let r = numbers.length - 1;
  while(l < r){
    let sum = numbers[l] + numbers[r]
    if(sum === target){
      return [l+1, r+1]
    } else if(sum < target){
      l++
    }else {
      r--
    }
  }
  return [-1, -1]
};

// 反转数组
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
  let l = 0;
  let r = s.length - 1;
  while(l < r){
    let temp = s[l];
    s[l] = s[r];
    s[r] = temp;

    l++;
    r--;
  }
  return s
};

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  let need = {};
  let window = {};
  let start = 0;
  let len = Number.MAX_SAFE_INTEGER
  let valid = 0
  for(let i = 0;i<t.length;i++){
    if(typeof need[t[i]] == 'undefined'){
      need[t[i]] = 1;
    }else {
      need[t[i]]++
    }
  }
  let left = 0;
  let right = 0;
  while(right < s.length){
    let c = s[right];
    right++;
    if(typeof need[c] == 'number' && need[c] !== 0){
      if(typeof window[c] == 'undefined'){
        window[c] = 1;
      }else{
        window[c]++
      }
      if(window[c] == need[c]){
        valid++;
      }
    }
    while(valid == Object.keys(need).length){
      if(right - left < len){
        start = left;
        len = right - left;
      }
      let d = s[left];
      left++;
      if(typeof need[d] == 'number' && need[d] !== 0){
        if(window[d] == need[d]){
          valid--;
        }
        window[d]--;
      }
    }
  }
  return len == Number.MAX_SAFE_INTEGER ? '' : s.substr(start, len)
};

// let s = "ADOBECODEBANC"
// let t = 'ABC'
// console.log(minWindow(s, t))

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
  let need = {};
  let window = {};
  let valid = 0;
  let left = 0;
  let right = 0;
  for(let i = 0;i<s1.length;i++){
    if(typeof need[s1[i]] == 'undefined'){
      need[s1[i]] = 1
    }else {
      need[s1[i]]++
    }
  }
  // console.log(Object.keys(need).length)
  while(right < s2.length){
    let c = s2[right];
    right++
    if(typeof need[c] == 'number'){
      if(typeof window[c] == 'undefined'){
        window[c] = 1
      }else {
        window[c]++
      }
      if(window[c] == need[c]){
        valid++
      }
    }
    while(right - left >= s1.length){
      if(valid == Object.keys(need).length){
        return true
      }
      let d = s2[left];
      left++;
      if(typeof need[d] == 'number'){
        if(window[d] == need[d]){
          valid--
        }
        window[d]--;
      }
    }
  }
  return false;
};

// let s1 = "ab";
// let s2 = "eidbaooo";
// console.log(checkInclusion(s1, s2))

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
  let need = {};
  let window = {};
  let left = 0;
  let right = 0;
  let valid = 0;
  let res = [];
  for(let i = 0;i<p.length;i++){
    if(typeof need[p[i]] == 'undefined'){
      need[p[i]] = 1;
    }else {
      need[p[i]]++;
    }
  }
  while(right < s.length){
    let c = s[right];
    right++
    if(typeof need[c] == 'number'){
      if(typeof window[c] == 'undefined'){
        window[c] = 1
      }else {
        window[c]++
      }
      if(window[c] == need[c]){
        valid++
      }
    }

    while(right - left >= p.length){
      if(valid == Object.keys(need).length){
        res.push(left);
      }
      let d = s[left];
      left++
      if(typeof need[d] == 'number'){
        if(window[d] == need[d]){
          valid--
        }
        window[d]--;
      }
    }
  }
  return res;
};
// let s = "cbaebabacd";
// let p = "abc"
// console.log(findAnagrams(s, p))

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let left = 0;
  let right = 0;
  let res = 0;
  let window = {}
  while(right < s.length){
    let c = s[right];
    right++;
    if(typeof window[c] == 'undefined'){
      window[c] = 1;
    }else {
      window[c]++
    }
    while(window[c] > 1){
      let d = s[left];
      left++;
      window[d]--
    }
    res = Math.max(res, right - left)
  }
  return res
};
// let s = 'pwwkew'
// console.log(lengthOfLongestSubstring(s))

/**
 * Initialize your data structure here.
 */
var RandomizedSet = function() {
  this.valToIndex = {};
  this.nums = [];
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
  if(this.valToIndex[val] !== undefined){
    return false;
  }
  this.valToIndex[val] = this.nums.length;
  this.nums.push(val);
  return true;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
  if(this.valToIndex[val] == undefined){
    return false;
  }
  // step 1: get the index of the val adn erase the index of element
  let index = this.valToIndex[val];
  // step 2: this 
  this.valToIndex[this.nums[this.nums.length -1]] = index;
  delete this.valToIndex[val]
  let temp = this.nums[this.nums.length-1];
  this.nums[this.nums.length-1] = val;
  this.nums[index] = temp;
  this.nums.pop();
  return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
  return this.nums[Math.random() * this.nums.length]
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

var RandomizedSet = function() {
  this.h = {}, this.a = []
};

RandomizedSet.prototype.insert = function(val) {
  return this.h[val] === undefined && (this.a.push(val), this.h[val] = this.a.length - 1, true)
};

RandomizedSet.prototype.remove = function(val) {
  return this.h[val] !== undefined && (
    [this.a[this.h[val]], this.a[this.a.length - 1]] = [this.a[this.a.length - 1], this.a[this.h[val]]], 
    this.h[this.a[this.h[val]]] = this.h[val], 
    this.a.pop(), delete(this.h[val]), true)
};

RandomizedSet.prototype.getRandom = function() {
  return this.a[Math.random() * this.a.length | 0]
};

// var removeDuplicateLetters = function(s) {
//   const vis = new Array(26).fill(0);
//   const num = _.countBy(s);
  
//   const sb = new Array();
//   for (let i = 0; i < s.length; i++) {
//       const ch = s[i];
//       if (!vis[ch.charCodeAt() - 'a'.charCodeAt()]) {
//           while (sb.length > 0 && sb[sb.length - 1] > ch) {
//               if (num[sb[sb.length - 1]] > 0) {
//                   vis[sb[sb.length - 1].charCodeAt() - 'a'.charCodeAt()] = 0;
//                   sb.pop();
//               } else {
//                   break;
//               }
//           }
//           vis[ch.charCodeAt() - 'a'.charCodeAt()] = 1;
//           sb.push(ch);
//       }
//       num[ch]--;
//   }
//   return sb.join('');
// };

/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function(s) {
  let inStack = new Array(256).fill(0);
  let count = new Array(256).fill(0);
  for(let i =0;i<s.length;i++){
    count[s[i].charCodeAt()]++
  }
  let sb = new Array();
  for(let i = 0;i<s.length;i++){
    count[s[i].charCodeAt()]--
    if(inStack[s[i].charCodeAt()]){
      continue
    }
    while(sb.length > 0 && sb[sb.length-1] > s[i]){
      if(count[sb[sb.length-1].charCodeAt()] == 0){
        break
      }
      inStack[sb.pop().charCodeAt()] = 0;
    }
    sb.push(s[i]);
    inStack[s[i].charCodeAt()] = 1
  }
  return sb.join('');
};
// let s = "cbacdcbc";
// console.log(removeDuplicateLetters(s));

/**
 * @param {string} s
 * @return {string}
 */
var smallestSubsequence = function(s) {
  let inStack = new Array(256).fill(0);
  let count = new Array(256).fill(0);
  for(let i = 0;i<s.length;i++){
    count[s[i].charCodeAt()]++
  };
  let sb = new Array();
  for(let i = 0;i<s.length;i++){
    count[s[i].charCodeAt()]--;
    if(inStack[s[i].charCodeAt()]){
      continue;
    }
    while(sb.length > 0 && sb[sb.length - 1] > s[i]){
      if(count[sb[sb.length -1].charCodeAt()] == 0){
        break
      }
      inStack[sb.pop().charCodeAt()] = 0;
    }
    sb.push(s[i]);
    inStack[s[i].charCodeAt()] = 1
  }
  return sb.join('')
};
// let s = "cbacdcbc";
// console.log(smallestSubsequence(s))

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if(nums.length <= 0){
    return 0
  }
  let slow = 0;
  let fast = 0;
  while(fast < nums.length){
    if(nums[fast] != nums[slow]){
      slow++;
      nums[slow] = nums[fast]
    }
    fast++
  }
  return slow+1
};
// let nums = [0,0,1,1,1,2,2,3,3,4]
// console.log(removeDuplicates(nums))

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  let slow = head;
  let fast = head;
  while(fast !== null){
    if(fast.val !== slow.val){
      slow.next = fast;
      slow = slow.next;
    }
    fast = fast.next;
  }
  slow.next = null;
  return head;
};

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  let slow = 0;
  let fast = 0;
  while(fast < nums.length){
    if(nums[fast] != val){
      nums[slow] = nums[fast];
      slow++;
    }
    fast++
  }
  return slow
};
// let nums =[3,2,2,3];
// console.log(removeElement(nums,3))

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let index = moveElement(nums, 0);
  for(;index < nums.length;index++){
    nums[index] = 0
  }
  return nums
};

var moveElement = function(nums, val){
  let slow = 0;
  let fast = 0;
  while(fast < nums.length){
    if(nums[fast] != val){
      nums[slow] = nums[fast];
      slow++;
    }
    fast++
  }
  return slow;
}
// let nums = [0,1,0,3,12]
// console.log(moveZeroes(nums))

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  let hashTable = {};
  for(let i = 0;i<nums.length;i++){
    hashTable[nums[i]] = i;
  }
  for(let i =0;i<nums.length;i++){
    let other = target - nums[i];
    if(hashTable[other] !== undefined && hashTable[other] != i){
      return [i, hashTable[other]]
    }
  }
  return [-1, -1];
};
// let nums = [2,7,11,15]; let target = 9;
// console.log(twoSum(nums, target))
let res = [];
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  // 记录路径（已做的选择）
  let track = []
  premuteCore(nums, track)
  return res 
};

var premuteCore = function(nums, track){
  // 结束条件
  if(track.length === nums.length){
    res.push([...track]);
    return;
  }
  // 选择列表
  for(let i = 0;i < nums.length;i++){
    // 已存在不添加
    if(track.includes(nums[i])){
      continue
    }
    // 不存在路径中 则添加
    track.push(nums[i])
    // 进入下一层决策树
    premuteCore(nums, track)
    // 取消选择
    track.pop();
  }
}
// console.log(permute([1,2,3]))

// N 皇后
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  let res = []
  let board = new Array(n)
  for(let i =0;i<n;i++){
    board[i] = new Array(n).fill('.');
  }
  solveNQueensCore(board, 0, res)
  return res;
};

var solveNQueensCore = function(board, row, res){
  // 触发结束条件
  if(row === board.length){
    res.push(board);
    return;
  }
  let n = board[row].length;
  for(let col = 0;col<n;col++){
    if(!isValid(board, row, col)){
      continue
    }
    // 做选择
    board[row][col] = 'Q';
    // 进入下一层决策
    solveNQueensCore(board, row+1, res);
    board[row][col] = '.'
  }
}

var isValid = function(board, row, col){
  let n = board.length;
  // 检查列是否有皇后互相冲突
  for(let i = 0;i<n;i++){
    if(board[i][col] == 'Q'){
      return false;
    }
  }
  // 检查右上方是否有皇后互相冲突
  for(let i = row -1, j = col+1; i >= 0 && j < n; i-- ,j++){
    if(board[row][col] == 'Q'){
      return false
    }
  }
  // 检查左上方是否有皇后互相冲突
  for(let i = row - 1,j = col - 1;i>= 0 && j >= 0 ;i--,j--){
    if(board[row][col] == 'Q'){
      return false
    }
  }
  return true;
}
console.log(solveNQueens(4))