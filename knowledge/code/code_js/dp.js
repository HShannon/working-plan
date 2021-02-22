/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  let dp = new Array(amount+1).fill(Number.MAX_SAFE_INTEGER);
  dp[0] = 0;
  for(let i = 1;i<=amount+1;i++){
    for(let j = 0; j < coins.length; j++){
      if(coins[j] <= i) {
        dp[i] = Math.min(dp[i], dp[i-coins[j]] + 1);
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount]
};

// let x = coinChange([1,2,11], 11);
// console.log(x);

// 二叉树的遍历 前序遍历 中序遍历 后序遍历
// 归并排序类似后序遍历
function mergeSort(arr, p, r){
  if(p>=r) return
  let mid = parseInt(p + ((r-p) >> 1));
  mergeSort(arr, p, mid);
  mergeSort(arr, mid + 1, r);
  let temp = [];
  let index =0;
  let p1 = p;
  let p2 = mid+1;
  while(p1 <= mid && p2 <= r){
    temp[index++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
  }
  while(p1 <= mid){
    temp[index++] = arr[p1++]
  }
  while(p2 <= r){
    temp[index++] = arr[p2++]
  }
  for(let i = 0;i<temp.length;i++){
    arr[p+i] = temp[i]
  }
}
let arr = [4,5,6,1,3,2,11,23,123,32]
// mergeSort(arr, 0, arr.length-1);
// console.log(arr)

function partition(arr, l, r) {
  let pivot = l;
  let index = pivot + 1;
  for(let i = index; i <= r;i++){
    if(arr[i] < arr[pivot]){
      let temp = arr[i];
      arr[i] = arr[index];
      arr[index] = temp;
      index++;
    }
  }
  let temp = arr[pivot];
  arr[pivot] = arr[index-1];
  arr[index-1] = temp
  return index-1;
}

// 快速排序
function quickSort(arr, l, r){
  let partitionIndex
  if(l<r){
    partitionIndex = partition(arr, l, r);
    quickSort(arr, l, partitionIndex-1);
    quickSort(arr, partitionIndex+1, r)
  }
}

quickSort(arr, 0, arr.length-1);
console.log(arr)


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
 * @return {TreeNode}
 */
var invertTree = function(root) {
  // base case
  if(root === null){
    return null
  }

  let temp = root.left;
  root.left = root.right;
  root.right = temp;
  invertTree(root.left)
  invertTree(root.right)
  return root
};

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  if(root === null) return null;
  connectCore(root.left, root.right);
  return root
};

function connectCore(node1, node2){
  if(node1 == null || node2 == null){
    return
  }
  node1.next = node2
  connectCore(node1.left, node1.right);
  connectCore(node2.left, node2.right)
  connectCore(node1.right, node2.left)
}

// leetcode 114
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
  if(root === null) return;
  flatten(root.left);
  flatten(root.right);
  let left = root.left;
  let right = root.right;
  root.left = null;
  root.right = left;
  let p = root;
  while(p.right !== null){
      p = p.right;
  }
  p.right = right
};

// 讲递归反转
// ListNode reverse(ListNode head) {
//   if (head.next == null) return head;
//   ListNode last = reverse(head.next);
//   head.next.next = head;
//   head.next = null;
//   return last;
// }

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
var reverseList = function(head) {
  if(head === null){
      return null
  }
  let pHead = new ListNode('head');
  let currentNode = head;
  let preNode = null;
  while(currentNode){
      if(!currentNode.next){
          pHead = currentNode;
      }
      let temp = currentNode.next;
      currentNode.next = preNode;
      preNode = currentNode
      currentNode = temp
  }
  return pHead
};