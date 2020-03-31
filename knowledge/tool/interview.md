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
- flex 容器
```
.container {
  display: flex | inline-flex
}
```

- 设置在容器上的六种属性
  - flex-direction: row | row-reverse | column | column-reverse 决定主轴的方向
  - flex-wrap: nowrap | wrap | wrap-reverse 决定容器内项目是否可换行
  - flex=flow: <flex-direction> || <flex-wrap>
  - justify-conten: flex-start | flex-end | center | space-between | space-around 定义了项目在主轴的对其方式
  - align-items: flex-start | flex-end | center | baseline | stretch 定义项目在交叉轴上的对其方式
  - align-content: flex-start | flex-end | center | space-between | space-around  定义了多根轴线的对其方式，如果项目只有一根轴线，那么该属性将不起作用

- 运用在 item 项目上的属性
  - order: <integer> 项目在容器中的排列顺序，数值越小，排列越靠前， 默认值为 0
  - flex-basis: <length> | auto 定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间
  - flex-grow: <number> 定义项目的放大比例
  - flex-shrink: <number> 定义了项目的缩小比例
  - flex: none | [ <'flex-grow'> <'flex-shrink'> ? ] || <'flex-basis'>
  - align-self: auto | flex-start | flex-end | center | baseline | stretch 允许单个项目有与其他项目不一样的对齐方式

6. table 布局

7. 绝对定位布局

[参考](https://zhuanlan.zhihu.com/p/25070186)

#### 常用选择器以及优先级，常用组合方式
1. 基础选择器
- 通用选择器
```
*{font-size: 16px}
```
- 标签选择器
```
p{font-size: 16px}
```
- class 选择器
```
.className{font-weight: bold}
```
- id 选择器
```
#idName{font-size: 16px}
```

2. 组合选择器

| 选择器 | 含义 |
| :--: | :--: |
| E,F | 多元素选择器，同时匹配所有 E 元素和 F 元素 |
| E F | 后代选择器，匹配所有属于 E 元素的后代 F 元素 |
| E > F | 子元素选择器，匹配所有 E 元素的子元素 F，只能匹配直接后代，不能匹配孙子辈 |
| E + F | 紧随 E 元素之后的同级元素 F |

3. 属性选择器

| 选择器 | 含义 |
| :--: | :--: |
| E[attr] | 匹配所有具有 attr 属性的元素 |
| E[attr = val] | 匹配所有属性 attr 属性等于 "val" 的 E 元素 |
| E[attr ~= val] | 匹配所有 attr 属性具有多个空格分割的值，其中一个值等于 val 的元素 |
| E[attr |= val] | 匹配所有 attr 属性具有多个空格分割的值，其中一个值以 val 开头的元素 | 

4. 伪类选择器

| 选择器 | 含义 |
| :--: | :--: |
| E:first-child | 匹配父元素 E 下的第一个子元素 |
| E:link | 匹配所有未被点击的链接 |
| E:visited | 匹配所有已被点击的链接 |
| E:active | 匹配鼠标已经按下、还没有释放的元素 E |
| E:hover | 匹配鼠标悬停的 E 元素 |
| E:focus | 匹配获得当前焦点的 E 元素 |
| E:lang(c) | 匹配 lang 属性等于 c 的 E 元素 |

5. 伪元素
- E:first-line 匹配 E 元素的第一行
- E:first-letter 匹配 E 元素的第一个字母
- E:before 在 E 元素之前插入生成的内容
```
.className{
  content: '';
  display: block;
  width: 100px;
  height: 200px;
}
```
- E:after 在 E 元素之后插入生成的内容

