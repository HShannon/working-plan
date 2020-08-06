# 跳表 (Skip list)
跳表是一种各方面性能都比较优秀的动态数据结构，可以支持快速的插入、删除、查找操作，写起来也不复杂，甚至可以替代红黑树（Red-black tree), 每一级索引都最多只需要遍历 3 个结点。空间换时间的设计思路.
1. 第 k 级索引的结点个数是第 k-1 级索引的结点个数的 1/2，那第 k级索引结点的个数就是 n/(2k)。
2. 在跳表中查询某个数据的时候，每一层都要遍历 m 个结点，在跳表中查询一个数据的时间复杂度为 o(m * logn)。若每隔 2 个元素拉取出来，m 则为 3

> 跳表是一种动态数据结构，支持快速的插入、删除、查找操作，时间复杂度均为 o(logn), 跳表的空间复杂度为 o(n)