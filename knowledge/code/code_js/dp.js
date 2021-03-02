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
  if(head === null) return null;
  let a = b = head;
  for(let i = 0;i<k;i++){
    if(b === null) return head;
    b = b.next;
  }
  let newHead = reverse(a, b);
  a.next = reverseKGroup(b, k);
  return newHead
};

// reverse 函数
function reverse(a, b){
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

// 二叉树的最大深度
var maxDepth = function(root) {
  // base case
  if(root === null) return 0
  let left = maxDepth(root.left);
  let right = maxDepth(root.right);
  return left > right ? left + 1 : right + 1;
};

// 二叉树的节点个数
function count(root){
  if(root === null) return 0;
  return 1 + count(root.left) + count(root.right);
}

// 二叉树的反转
var invertTree = function(root) {
  if(root === null) return null;
  let temp = root.left;
  root.left = root.right;
  root.right = temp;
  invertTree(root.left);
  invertTree(root.right);
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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function(root) {
  let result = [];
  let map = new Map();
  find(root);
  return result;
  function find(root){
      if(root===null){
          return "#"
      }
      let left = find(root.left);
      let right = find(root.right);
      let subTree = left + ',' + right + ',' + root.val;
      if(map.get(subTree)){
          map.set(subTree,map.get(subTree)+1)
      }else{
          map.set(subTree,1)
      }
      if(map.get(subTree)===2){
          result.push(root);
      }
      return subTree;
  }
};

// 寻找第 K 小的元素
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
  let res = 0;
  let rank = 0;
  traverse(root, k);
  return res

  function traverse(root, k){
    if(root === null) return;
    traverse(root.left, k);
    rank++;
    if(rank === k) {
      res = root.val;
      return;
    }
    traverse(root.right, k);
  }
};

var kthSmallest = function(root, k) {
  let res = 0;
  traverse(root);
  return res

  function traverse(root){
    if(root === null) return;
    traverse(root.left);
    k--
    if(k === 0) {
      res = root.val;
      return;
    }
    traverse(root.right);
  }
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
 * @return {TreeNode}
 */
var convertBST = function(root) {
  let sum = 0;
  traverse(root);
  return root
  function traverse(root){
    if(root) return ;
    traverse(root.right);
    sum += root.val;
    root.val = sum;
    traverse(root.left);
  }
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
 * @return {boolean}
 */

var isValidBSTCore = function(root, min, max){
  if(root === null) return true;
  if(min !== null && root.val <= min.val) return false;
  if(max !== null && root.val >= max.val) return false;
  return isValidBSTCore(root.left, min, root) && isValidBSTCore(root.right, root, max)
}

var isValidBST = function(root) {
  return isValidBSTCore(root, null, null)
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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {
    if(root == null){
      return null;
    }
    if(root.val == key){
      if(root.left === null) return root.right;
      if(root.right === null) return root.left;
      let minNode = getMinNode(root.right);
      root.val = minNode.val;
      root.right = deleteNode(root.right, minNode.val)
    } else if(root.val < key){
      root.right = deleteNode(root.right, key)
    } else {
      root.left = deleteNode(root.left, key)
    }

    function getMinNode(node){
      while(node.left !== null){
        node = node.left;
      }
      return node
    }
};


const serialize = (root) => {
  if (root == null) {                  // 遍历到 null 节点
    return 'X';
  }
  const left = serialize(root.left);   // 左子树的序列化结果
  const right = serialize(root.right); // 右子树的序列化结果
  return root.val + ',' + left + ','+ right; // 按  根,左,右  拼接字符串
};

const deserialize = (data) => {
  const list = data.split(',');   // split成数组

  const buildTree = (list) => {   // 基于list构建当前子树
    const rootVal = list.shift(); // 弹出首项，获取它的“数据”
    if (rootVal == "X") {         // 是X，返回null节点
      return null;
    }
    const root = new TreeNode(rootVal); // 不是X，则创建节点
    root.left = buildTree(list);        // 递归构建左子树
    root.right = buildTree(list);       // 递归构建右子树
    return root;                        // 返回当前构建好的root
  };

  return buildTree(list); // 构建的入口
};


/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function(nestedList) {
    
};


/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
    
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
    
};

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
*/

// var NestedIterator = function(nestedList) {
//   var r = [], dfs = (nestedList, i = 0, nestedInteger) => {
//       while(nestedInteger = nestedList[i++]) nestedInteger.isInteger() ? r.push(nestedInteger.getInteger()) : dfs(nestedInteger.getList())
//   }
//   dfs(nestedList), this.r = r, this.i = 0
// };

// NestedIterator.prototype.hasNext = function() {
//   return this.r[this.i] !== undefined
// };

// NestedIterator.prototype.next = function() {
//   return this.r[this.i++]
// };

// var NestedIterator = function(nestedList) {
//   this.list = [];
//   this.resetList(nestedList);
// }; 
// NestedIterator.prototype.resetList = function(arr) {
//   for (let i = 0; i < arr.length; i++) {
//       if (arr[i].isInteger())
//           this.list.push(arr[i].getInteger())
//       else
//           this.resetList(arr[i].getList())
//   }
// }; 
// NestedIterator.prototype.hasNext = function() {
//   return this.list.length > 0;
// }; 
// NestedIterator.prototype.next = function() {
//   return this.list.shift();
// };

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function(nestedList) {
    
};


/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
    
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
    
};

/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
*/