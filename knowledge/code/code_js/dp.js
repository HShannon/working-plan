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

// 1 -> 2 -> 3
// 1 <- 2 <- 3
var reverseList = function(head){
  if(head === null) return;
  let pHead = new ListNode('head');
  let preNode = null;
  let currentNode = head;
  while(currentNode){
    // 找到尾节点
    if(!currentNode.next){
      pHead = currentNode;
    }
    let temp = currentNode.next;
    currentNode.next = preNode;
    preNode = currentNode;
    currentNode = temp
  }
  return pHead
}

var reverseList = function(head){
  // base case
  if(head == null || head.next == null) return head;
  // reverse part
  let last = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return last
}

// ListNode successor = null; // 后驱节点

// // 反转以 head 为起点的 n 个节点，返回新的头结点
// ListNode reverseN(ListNode head, int n) {
//     if (n == 1) { 
//         // 记录第 n + 1 个节点
//         successor = head.next;
//         return head;
//     }
//     // 以 head.next 为起点，需要反转前 n - 1 个节点
//     ListNode last = reverseN(head.next, n - 1);

//     head.next.next = head;
//     // 让反转之后的 head 节点和后面的节点连起来
//     head.next = successor;
//     return last;
// }
// 反转链表前 N 个节点
let successor = null;
var reverseN = function(head, n){
  // base case
  if(n == 1) {
    successor = head.next;
    return head;
  }
  let last = reverseN(head.next, n-1);
  head.next.next = head;
  head.next = successor;
  return last;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
  // 用来记住整个链表的头节点位置
  let res = new ListNode(0)
  res.next = head
  // 找到需要反转的位置
  let pre = res
  for(let i = 1; i < m; ++i){
      pre = pre.next
  }
  // 将head指向要反转的链表部分的头部
  head = pre.next
  for(let i = m; i < n; ++i){
      let nxt = head.next
      // nxt 节点要被放到反转部分的头部，所以将head的next指向它的下下个节点
      head.next = head.next.next
      // 将nxt放到头部，pre.next指向的是反转部分的头部节点
      nxt.next = pre.next
      // 重新将pre指向反转部分的头部
      pre.next = nxt
  }
  return res.next
};

var reverseBetween = function(head, m, n) {
  let pre,cur,front
  let p=node=new ListNode()
  p.next=head
  for(let i=1;i<m;i++){
      p=p.next
  }
  front=p//第一刀的左边用front保存起来也是第一段不需要反转的最后一个点
  pre=tail=p.next//那么它的下一个第一刀的右边也就是需要反转的第一个点用tail保存起来，反转之后他将会是第二刀的左边
  cur=pre.next
  for(let i=m;i<n;i++){
      let next=cur.next
      cur.next=pre
      pre=cur
      cur=next
  }
  front.next=pre//重新接上第一刀
  tail.next=cur//重新接上第二刀
  return node.next
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
  let pre, cur, front, tail
  let p = node = new ListNode();
  p.next = head;
  for(let i=1;i<m;i++){
    p = p.next;
  }
  front = p;
  pre = tail = p.next;
  cur = pre.next;
  for(let i = m; i < n;i++){
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  front.next = pre;
  tail.next = cur;
  return node.next
};

// 反转函数 reverse 函数反转一个区间内的元素
function reverse(a){
  let pre, cur, nxt;
  pre = null;
  cur = a;
  nxt = a;
  while(cur !== null){
    nxt = cur.next;
    // zhuge fan
    cur.next = pre;
    // 更新指针位置
    pre = cur;
    cur = nxt;
  }
  return pre;
}

// 反转 a 到 b 之间的大小
function reverseN(a, b){
  let pre, cur, nxt;
  pre = null;
  cur = a;
  nxt = a;
  while(cur !== b){
    nxt = cur.next;
    cur.next = pre;
    pre = cur;
    cur = nxt;
  }
  return pre;
}


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const reverse = (head, tail) => {
  let prev = tail.next;
  let p = head;
  while(prev !== tail){
      let next = p.next;
      p.next = prev;
      prev = p;
      p = next;
  }
  return [tail, head]
}
var reverseKGroup = function(head, k) {
  const hair = new ListNode(0);
  hair.next = head;
  let pre = hair;
  while(head){
      let tail = pre;
      for(let i = 0; i < k; i++){
          tail = tail.next;
          if(!tail){
              return hair.next
          }
      }
      const nex = tail.next;
      [head, tail] = reverse(head, tail);
      pre.next = head;
      tail.next = nex;
      pre = tail;
      head = pre.next
  }
  return hair.next;
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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {

};