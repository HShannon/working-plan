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
  root.left = buildTree(preorder.slice(1, maxIndex), inorder.slice(0, maxIndex));
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