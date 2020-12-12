# CSS 面试

## 1. 盒子模型
## 2. BFC

## 3. CSS 选择器

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

## 参考资料
- [10分钟学习BFC](https://zhuanlan.zhihu.com/p/25321647)