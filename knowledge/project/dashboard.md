### dashboard 学习笔记

#### safari浏览器 日期异常
+ 在开发客户度报表时, safari显示日期异常,原因追踪是
  ```
  let firstDay = new Date(dateDetail[0] + '-1' + '-1')
  ```
+ it seems that YYYY-MM-DD is included in the standard, but for some reason, Safari doesn't support it.([资料](https://stackoverflow.com/questions/4310953/invalid-date-in-safari))，因此按照资料应该改成 
  ```
  let firstDay = new Date(dateDetail[0] + '/1' + '/1')
  ```
***

#### 小数点加和的问题
+ 在修复流量漏斗过程中，发现了类似1.1 + 1.21 = 2.3099999999 的现象，查询资料发现计算机的基础的确欠缺的
+ 阿博同学的csdn([浮点数的存储方式](https://blog.csdn.net/weixin_43243484/article/details/88872146))
***

#### 在开发dsp报表优化时的小细节
+ 用 isNaN() 过滤数字字符串、以及数字 
+ Object.keys() 会对属性名进行排序, 数字(数字字符串)优先 ([网上资料](http://jartto.wang/2016/10/25/does-js-guarantee-object-property-order/))。解决方案: Map
***

#### 在线广告详情数 Array.prototype.push
```
let animals = ['pigs', 'goats', 'sheep'];

console.log(animals.push('cows'));
// expected output: 4

console.log(animals);
// expected output: Array ['pigs', 'goats', 'sheep', 'cows']
```
so young so navie 😢