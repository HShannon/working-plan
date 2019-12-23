# 数据结构与算法之美

## 时间复杂度分析
只关注循环次数最多的一段代码，通常会忽略掉常量，低阶，系数；总的时间复杂度等于量级最大的那段代码的时间复杂度；嵌套代码的复杂度等于嵌套内外代码复杂度的成绩

## 数组：为什么很多编程语言中数组都从0开始编号？
1. 数组（Array）是一种线性表数据结构。它用一组连续的内存空间，来存储一组具有相同类型的数据。
- 线性，线性表就是数据排成像一条线一样的结构。每个线性表上的数据最多只有前和后两个方向。其实除了数组，链表、队列、栈等也是线性表结构。
- 连续的内存空间和相同类型的数据，要想在数组中删除、插入一个数据，为了保证连续性，就需要做大量的数据搬移工作。数组支持随机访问，根据下标随机访问的时间复杂度为 O(1)
```
a[i]_address = base_address + i * data_type_size
```
- 低效的“插入”和“删除”    
如果数组中的数据是有序的，我们在某个位置插入一个新的元素时，就必须按照刚才的方法搬移 k 之后的数据。但是，如果数组中存储的数据并没有任何规律，数组只是被当作一个存储数据的集合。在这种情况下，如果要将某个数据插入到第 k 个位置，为了避免大规模的数据搬移，我们还有一个简单的办法就是，直接将第 k 位的数据搬移到数组元素的最后，把新的元素直接放入第 k 个位置。

2. 警惕数组的访问越界问题
```
int main(int argc, char* argv[]){ 
  int i = 0; 
  int arr[3] = {0}; 
  for(; i<=3; i++){ 
    arr[i] = 0; 
    printf("hello world\n"); 
  } 
  return 0;}
```

3. 容器能否完全替代数组？    
在 JavaScript 中，Array 最大的优势可以将很多数组的操作细节封装起来，支持动态扩容。不过，这里需要注意一点，因为扩容操作涉及内存申请和数据搬移，是比较耗时的。所以，如果事先能确定需要存储的数据大小，最好在创建 ArrayList 的时候事先指定数据大小。

## 链表
1. 缓存      
缓存是一种提高数据读取性能的技术，在硬件设计、软件开发中都有着非常广泛的应用，比如常见的 CPU 缓存、数据库缓存、浏览器缓存等等。缓存大小有限制，常见的策略三种

| 选择器 | 说明 |
| :--: | :--: |
| FIFO (first in, first out)  | 先进先出 |
| LFU (least frequently used) | 最少使用策略 |
| LRU (least recently used) | 最近最少使用策略 |

2. 最常见的链表结构，分别是但链表，双向链表和循环链表。但链表由结点，后继指针 next 组成
```
function Node(element) {
  this.element = element
  this.next = null
}

function NodeList (){
  this.head = new Node('head')
  this.find = find
  this.insert = insert
  this.remove = remove
  this.findPrev = findPrev
  this.display = display
}

// 相较于数组查找到元素的时间复杂度o(n)
const find = (element) => {
  let currentNode = this.head
  while(currentNode.element != element) {
    currentNode = currentNode.next
  }
  return currentNode
}

// 插入的时间复杂度相较于数组o(1)
const insert = (newElement, item) => {
  let newNode = new Node(newElement)
  let insertNode = this.find(item)
  newNode.next = insertNode.next
  insertNode.next = newNode
}

// findprev 找到元素的前一个
const findprev = (item) => {
  let currentNode = this.head
  while(currentNode.next.element != item && currentNode.next != null) {
    currentNode = currentNode.next
  }
  return currentNode
}

//
const remove = (item) => {
  let removeNode = this.find(item)
  let preRemoveNode = this.findPrev(item)
  preRemoveNode.next = removeNode.next
}

// 
const display = () => {
  let currentNode = this.head
  while(currentNode.next != null){
    console.log(currentNode.element)
    currentNode = currentNode.next
  }
}
```

3. 链表和数组的区别     
- 底层的存储结构，数组需要一块连续的内存空间来存储，链表恰恰相反，不需要一块连续的内存空间。如果申明的数组太小，赠可能出现不够用时，在申请一个更大的
