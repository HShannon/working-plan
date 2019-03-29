### uc 学习笔记

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