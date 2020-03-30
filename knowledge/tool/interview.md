# Interview

## 一. css
#### 隐藏一个元素的方法， visibility: hidden 和 display: none 的区别
1. 是否占据空间    
- visibility: hidden 会在文档中占据空间
- display: none 会彻底在文档中去除元素，不占据任何空间
2. 是否是继承属性    
- visibility: hidden 的子元素设置为 visibility: visible，仍可见
- display: none 所有的子元素不可见
3. 修改其属性，是否会重新渲染, visibility: hidden 不渲染, display: none 渲染

#### 宽度是 100% 高度是宽度的一半如何实现
> padding 和 margin 相对于父元素的宽度来计算
1. 基础
```
<div class="half-of-width"></div>

<style>
  .half-of-width{
    width: 100%;
    height: 0;
    padding-bottom: 50%
  }
</style>
```

2. 优化一，元素内部的子元素无法正常设置高度
```
<div class="half-of-width">
  <div class="child"></div>
</div>

<style>
  .half-of-width{
    width: 100%;
    padding-bottom: 50%;
    height: 0;
    position: relative;
  }
  .child{
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>
```

3. 优化二, 
```
<div class="parent">
  <div class="myself">
    <div class="child" ></div>
  </div>
</div>

<style>
  .parent{
    width: 80%
  }
  .myself{
    width: 100%;
    padding-bottom: 56.25%;
    height: 0;
    position: relative;
  }
  .item{
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
```

#### 三栏布局的几种方式
三栏布局是指，左右两边宽度固定，中间宽度随浏览器自适应
1. 流体布局

