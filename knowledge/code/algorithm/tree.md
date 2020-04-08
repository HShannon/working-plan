# 二叉树
## 二叉树的遍历方式
1. 构造二叉树
```
class Node {
  constructor(data, left, right){
    this.data = data
    this.left = left
    this.right = right
  }
}

class BST {
  constructor(){
    this.root = null
    this.insert = insert
  }
}

function insert(data){
  let node = new Node(data, null, null)
  if (this.root === null) {
    this.root = node
  } else {
    let current = this.root
    while(true){
      if(current.data > data){
        if(current.left === null) {
          current.left = node
          break
        }
        current = current.left
      } else {
        if(current.right === null){
          current.right = node
          break
        }
        current = current.right
      }
    }
  }
}

function find(data){
  let current = this.root
  while(current !== null){
    if(current.data > data) current = current.left
    eles if(current.data < data) current = current.right
    else return current
  }
  return null
}

function preOrder()
```

2. 若完全二叉树的节点为 n, 计算书的高度是多少
>  数的层数 = 数的高度 + 1

n > 2<sup>0</sup> + 2<sup>1</sup> + 2<sup>2</sup> + ... + 2<sup>L - 2</sup> + 1

n < 2<sup>0</sup> + 2<sup>1</sup> + 2<sup>2</sup> + ... + 2<sup>L - 2</sup> + 2<sup>L - 1</sup>

log<sub>2</sub>(n + 1) < L < log<sub>2</sub>n + 1

// 高度

完全二叉树的高度小于等于 log<sub>2</sub>n




