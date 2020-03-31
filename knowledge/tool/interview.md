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
```
<div class="container">
  <div class="left"></div>
  <div class="right"></div>
  <div class="main"></div>
</div>
```
左右两个 div 分别设置左右浮动，main div 通过设置 margin 值使得中间模块宽度自适应。

> 浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。由于浮动框不在文档的普通流中，所以文档的普通流中的块框表现得就像浮动框不存在一样

2. BFC（Blocking Formatting Contexts）

> 具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性

- 只要元素满足任一条件即可触发 BFC
  - body 根元素
  - 浮动元素: float 除 none 以外的值
  - 绝对定位元素: position(absolute, fixed)
  - display: inline-block | table-cells | flex
  - overflow 除了 visible 以外的值（hidden，auto, scroll）

- BFC 特性及应用
  - 同一个 BFC 下外边距会发生折叠，如果想要避免外边距的重叠，可以将其放在不同的容器中
  - BFC 可以包含浮动的元素，清除浮动

```
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
	.left {
	    float: left;
	    height: 200px;
	    width: 100px;
	    margin-right: 20px;
	    background-color: red;
	}
	.right {
	    width: 200px;
	    height: 200px;
	    float: right;
	    margin-left: 20px;
	    background-color: blue;
	}	
	.main {
	    height: 200px;
	    overflow: hidden;
	    background-color: green;
	}
    </style>
</head>
<body>
    <div class="container">
        <div class="left"></div>
        <div class="right"></div>
        <div class="main"></div>
    </div>
</body>
</html>
```

3. 双飞翼布局 —— margin 负值
4. 圣杯布局
5. Flex, 参考文档[flex](https://zhuanlan.zhihu.com/p/25303493)
 
