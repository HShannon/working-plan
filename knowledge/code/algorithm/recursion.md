# 递归
## 递归需要满足三个条件
1. 一个问题的解可以分解为几个子问题的解
2. 这个问题与分解之后的子问题，除了数据规模不同，求解思想完全一样
3. 存在递归终止条件

## 如何编写递归代码
1. 关键: 写出递推公式，找到终止条件
2. Key: 编写递归代码的关键是，只要遇到递归，我们就把它抽象成一个递推公式，不用想一层层的调用关系，不要试图用人脑去分解递归的每个步骤。
3. 警惕:
- 堆栈溢出
- 重复计算

## 怎么将递归代码改写为非递归代码
递归代码的优点与缺点:
- 代码表达力很强，写起来非常简洁
- 空间复杂度、有堆栈溢出的风险、存在重复计算、过多的函数调用会耗时较多等问题

## Example
1. 爬楼梯，10曾楼梯，每次都可以走一步或者两步
```
const count = n => {
  if(n == 1) return 1
  if(n == 2) return 2
  return count(n - 1) + count(n - 2)
}
```
- 去重复
```
public int f(int n) {
  if (n == 1) return 1;
  if (n == 2) return 2;
  
  // hasSolvedList可以理解成一个Map，key是n，value是f(n)
  if (hasSolvedList.containsKey(n)) {
    return hasSolvedList.get(n);
  }
  
  int ret = f(n-1) + f(n-2);
  hasSolvedList.put(n, ret);
  return ret;
}
```
- 改为非递归
```
int f(int n){
  if(n == 1) return 1
  if(n == 2) return 2
  
  int ret = 0
  int pre = 2
  int prepre = 1
  for(int i = 3; i <= n; ++i){
    ret = pre + prepre
    prepre = pre
    pre = ret
  }
  return ret
}
```

## 练习
1. 编程实现斐波那契数列求值 f(n) = f(n-1) + f(n-2)
```
const fibonacci = (n) => {
  if(n === 1 || n === 2) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}
```
2. 编程实现求阶乘 n!
```
const factorial = n => {
  if(n === 1) return 1
  return n * factorial(n - 1)
}
```
3. 编程实现一组数据集合的全排列
```
```
