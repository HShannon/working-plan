# 链表
1. 缓存      
缓存是一种提高数据读取性能的技术，在硬件设计、软件开发中都有着非常广泛的应用，比如常见的 CPU 缓存、数据库缓存、浏览器缓存等等。缓存大小有限制，常见的策略三种

| 选择器 | 说明 |
| :--: | :--: |
| FIFO (first in, first out)  | 先进先出 |
| LFU (least frequently used) | 最少使用策略 |
| LRU (least recently used) | 最近最少使用策略 |

2. 最常见的链表结构，分别是但链表，双向链表和循环链表。但链表由结点，后继指针 next 组成
```
// 节点
class Node {
  constructor(item) {
    this.data = item
    this.next = null
  }
}

// 链表
class NodeList {
  constructor(item) {
    this.head = new Node('item')
  }

  // 相较于数组查找到元素的时间复杂度o(n)
  find(item) {
    let currentNode = this.head
    while(currentNode && currentNode.data !== item) {
      if(currentNode.next) {
        currentNode = currentNode.next
      } else {
        currentNode = null
      }
    }
    return currentNode
  }

  findLastNode() {
    let currentNode = this.head
    while(currentNode.next) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  findPrev(item) {
    let currentNode = this.head
    while(currentNode && currentNode.next && currentNode.next.data !== item){
      if(currentNode.next){
        currentNode = currentNode.next
      } else {
        currentNode = null
      }
    }
    return currentNode
  }

  // 插入的时间复杂度相较于数组o(1)
  insert(newItem, beforeItem) {
    let newNode = new Node(newItem)
    let beforeNode = this.find(beforeItem)
    if(beforeNode){
      newNode.next = beforeNode.next
      beforeNode.next = newNode
    } else {
      let lastNode =this.findLastNode()
      lastNode.next = newNode
    }
  }

  // 插入的时间复杂度相较于数组o(1)
  remove(removeItem){
    let prevNode = this.findPrev(removeItem)
    if(prevNode && prevNode.next){
      prevNode.next = prevNode.next.next
    } 
  }
}
```

3. 链表和数组的区别, 底层的存储结构，数组需要一块连续的内存空间来存储，链表恰恰相反，不需要一块连续的内存空间。如果申明的数组太小，赠可能出现不够用时，在申请一个更大的

4. 链表的实现
- 理解指针和引用的含义, 存储所指对象的内存地址
- 警惕指针丢失和内存泄漏
```
p -> next = x
x -> next = p -> next
```
- 利用**哨兵**简化实现难度， 针对链表的插入、删除操作，需要对插入第一个结点和删除最后一个结点的情况进行特殊处理。
- 重点留意边界条件处理，一定要多想想，你的代码在运行的时候，可能会遇到哪些边界情况或者异常情况。遇到了应该如何应对，这样写出来的代码才够健壮！

5. 五种常见的链表操作
- 单链表反转   
```
// 这个就是常规操作了，使用一个变量记录前驱pre，一个变量记录后继next.
// 不断更新 current.next=pre 就好了

reverse(headNode){
  if(!headNode || !headNode.next) return head

  let currentNode = headNode
  let prevNode = null
  let nextNode = null
  while(currentNode) {
    nextNode = currentNode.next
    currentNode.next = prevNode
    prevNode = currentNode

    currentNode = nextNode
  }
  return prevNode
}
```
- 链表中环的检测
- 两个有序的链表合并
- 删除链表倒数第 n 个结点
- 求链表的中间结点