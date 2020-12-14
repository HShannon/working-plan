# CSS 面试

## 1. 盒子模型
## 2. BFC

## 3. CSS 选择器
- 浮动元素后面的元素用 clear: left | right | both | none, 消除浮动
```
<style>
  .topDiv {
      width: 500px;
      border: 2px solid black;
      /* overflow: hidden; */
  }
  .floatDiv {
      width: 100px;
      height: 100px;
      border: 2px dotted red;
      color: red;
      margin: 4px;
      float: left;
  }
  .bottomDiv {
      width: 500px;
      height: 100px;
      margin: 5px 0;
      border: 2px dotted black;
  }
  .textDiv {
      color: blue;
      border: 2px solid blue;
      clear: both; // 两侧都不能有浮动元素
      /* overflow: hidden; */ // 左右排列
  }
</style>

<body>
 <div class="topDiv">
    <div class="floatDiv">float left</div>
    <div class="textDiv">...</div>
 </div>
 <div class="bottomDiv">...</div>
</body>
```
- 利用伪元素清除浮动
浮动元素的容器用 ::after 创建一个块级子元素，消除浮动对容器带来的影响

- 利用 overflow: hidden
浮动元素的容器用 overflow: hidden 消除浮动

## 4. 布局
- 块级元素垂直居中

```
<body>
  <div class="odiv"></div>
</body>
<style>
.odiv{
  margin: 0 auto;
}
</style>
```

- 块级元素垂直水平居中

```
<body>
  <div class="div1">
    <div class="div2"></div>
  </div>
</body>
<style>
  .div1{
    position: relative;
  }
  .div2{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
</style>
```

- 文本水平垂直居中
  - 利用 text-align 和 line-height
  ```
  <body>
    <div class="odiv">middle-center</div>
  </body>
  <style>
    .odiv{
      width: 100px;
      line-height: 100px; // 垂直居中
      text-align: center // 水平居中
    }
  <style>
  ```
  - 利用 text-align 和 vertical-align 和 display: table-cell
  ```
  <body>
    <div class="odiv">middle-center</div>
  </body>
  <style>
    .odiv{
      display: table-cell;
      text-align: center; // 水平居中
      vertical-align: middle; // 垂直居中
    }
  <style>
  ```

## 5. dispaly
- 内联元素，块级元素的区别
  - 内联元素不可设置 width, height, 上下内边距, 上下外边距; 块级元素可设置 width, height, 上下内边距, 上下外边距。
  - 内联元素的内不可嵌套块级元素，只可嵌套文本或者其他内联元素；块级元素
  - 块级元素独占一行
- 

## 参考资料
- [10分钟学习BFC](https://zhuanlan.zhihu.com/p/25321647)