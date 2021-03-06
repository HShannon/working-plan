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
| E[attr \|= val] | 匹配所有 attr 属性具有多个空格分割的值，其中一个值以 val 开头的元素 | 

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

> 优先级
- id 选择器优先级最高 100
- class, 属性， 伪类权值 10
- 标签权值为 1
- 权值较大的优先级越高
- 权值相同的，后定义的优先级较高
- 样式值含有 !important 优先级最高

#### 请解释一下 flexbox, 以及适用场景，写出 3 点和 4 点的布局方式
1. 3 点
```
// html 结构
<div class="container">
  <div class="item1"></div>
  <div class="item2"></div>
  <div class="item3"></div>
</div>
 
 // 样式
  <style>
    .container{
      display: flex;
      flex-direction: column;
      width: 150px;
    }
    .item1{
      background: #409EFF;
      width: 50px;
      height: 50px;
      border-radius: 25px;
      align-self: flex-end
    }
    .item2{
      background: #67C23A;
      width: 50px;
      height: 50px;
      border-radius: 25px;
      align-self: center
    }
    .item3{
      background: #E6A23C;
      width: 50px;
      height: 50px;
      border-radius: 25px;
    }
  </style>
```

2. 4 点
```
 // html 结构
  <div class="container">
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
    <div class="item"></div>
  </div>

  // 样式
  <style>
    .container{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 140px;
      height: 200px;
      justify-content: space-around;
    }
    .item{
      width: 50px;
      height: 50px;
      background: #909399;
      border-radius: 25px;
    }
     
  </style>
```

#### BFC 的概念和触发条件（设置独立容器解决边距重叠等）
- BFC（blockubg formatting contexts）可以看作是隔离的独立容器，容器里面的元素不会在布局上影响外面的元素
- body 根元素、浮动元素、绝对定位元素、display、overflow元素
- 设置独立容器解决重叠
```
// 样式
  <div class="container">
    <div class="item1"></div>
  </div>
  <div class="container">
    <div class="item2"></div>
  </div>

// html
    .container{
      overflow: hidden;
    }
    .item1{
      width: 50px;
      height: 50px;
      background: #909399;
      border-radius: 25px;
      margin-bottom: 100px;
    }
    .item2{
      width: 50px;
      height: 50px;
      background: #909399;
      border-radius: 25px;
      margin-top: 100px
    }
```

#### 纯 CSS 做个滑块选择器(开关)
1. outline 和 border 的区别
- border 占用空间，outline 不占用空间, 不会影响元素的尺寸和位置
- border 可应用于几乎所有有形的 html 元素，而 outline 是针对链接、表单控件和 imageMap 等元素设计

2. [参考](https://github.com/caistrong/Blog/issues/66)

3. [纯 css 的滑块开关按钮](https://www.cnblogs.com/xinxinxiangrong7/p/9545349.html)    
原理: 使用 checkbox 的 checked 属性改变 css 样式，一定要使用 -webkit-appearance: none; 先清除 checkbox 默认样式，否则写其他的样式不起作用
```
<input type="checkbox" class="checked"></input>

<style>
    .checked{
      position: relative;
      -webkit-appearance: none;
      width: 90px;
      height: 44px;
      background: #eee;
      border-radius: 30px;
      line-height: 44px;
      outline: none
    }
    .checked:before{
      position: absolute;
      left: 0;
      background: #DCDFE6;
      content: '';
      width: 44px;
      height: 44px;
      border-radius: 50%;
      box-shadow: 0px 0px 5px #ddd;
      transition: all 0.2s linear;
    }
    .checked:checked{
      background: #909399;
    }
    .checked:checked:before{
      left: 46px;
      transition: all 0.2s linear;
    }
</style>
```

#### 清除浮动的几种方法
1. 父级 div 定义 height
2. 最后一个浮动元素后面加空 div 标签 并添加样式 clear: both
3. 最后一个浮动元素后面通过伪元素 :after 清除浮动
4. 浮动元素的父标签添加样式 overflow 为 hidden 或 auto
5. 父级 div 定义 zoom
当元素设置浮动后，该元素的 display 值默认变为
```
display: block
```
#### png jpg gif webp
1. png(portable network graphics) 便携式网络图形 支持无损压缩d的位图图形格式
2. jpg() 失真压缩 破坏性压缩 在色调及颜色平滑b变化做的不错
3. gif(Graphics interchange format) 位图文件格式 支持动图效果 

#### css sprite


#### 纯 CSS 做个顶端页面滚动指示器(偏脑筋急转弯)
线性渐变
```
body {
    background-image: linear-gradient(to right top, #ffcc00 50%, #eee 50%);
    background-repeat: no-repeat;
    background-size: 100% calc(100% - 100vh)
}

body::after {
    content: "";
    position: fixed;
    top: 5px;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: -1;
}
```

## 二. js
#### 引用类型和值类型的区别
1. 值类型主要包括: 字符串(string), 数值(number), 字符串(string), 布尔值(boolean), undefined, null, symbol。引用类型主要包括 Object, Array, Function
2. 基本类型不可变，引用类型可变
3. 基本类型按值访问，引用类型按引用访问。基本类型的比较是值的比较，引用类型的比较引用的比较

#### 说明“==”和“===”之间的区别,两个对象怎么判断相等
== 会先进行类型转换，然后在用严格相等。两个对象指向同一个内存块，则相等

#### 创建对象的几种方式，实现继承
1. 字面量

2. 工厂模式
```
function createCar(){
  var oTemp = new Object();
  oTemp.name = arguments[0];
  oTemp.age = arguments[1];
  oTemp.showName = function(){
    console.log(this.name)
  }
  return oTemp
}

var myHonda = createCar('shannon', 5)
myHonda.showName()
```

3. 构造函数法
```
function Person(name, age, sex){
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.getName = function(){
    return this.name
  }
}
let person = new Person('shannon', 18, 'female')
personName = person.getName()
console.log(personName)
```
有优化点，构造函数添加方法应当避免重复构造函数对象
```
function Person(name, age, sex){
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.getName = getName
}
 function getName(){
  return this.name
}
let person = new Person('shannon', 18, 'female')
personName = person.getName()
console.log(personName)
```
工厂模式和构造函数的不同，构造函数创造出的对象 constructor 属性指向该构造函数，工厂模式的 constructor 指向 new 

4. 原型模式
```
function Car(){} 
//用空构造函数设置类名
Car.prototype.color = "blue";//每个对象都共享相同属性
Car.prototype.doors = 3;
Car.prototype.drivers = new Array("Mike","John");
Car.prototype.showColor = function(){        
  alert(this.color);
};//每个对象共享一个方法版本，省内存。
//构造函数的原型属性可以通过字面量来设置，别忘了通过 Object.defineProperty()设置 constructor 为该构造函数
function Car(){} 
Car.prototype = {
  color:"blue",
  doors:3,
  showColor:function(){        
    alert(this.color);
  }
}
Object.defineProperty(Car.prototype, "constructor", { enumerable:false, value:Car })
//(不设置 constructor 会导致 constructor 不指向构造函数，直接设置 constructor 会导致 constructor 可枚举)
```

5. Object.create(), 传入要创建对象实例的原型对象
```
function object(o){
  function F(){};
  F.prototype = o;
  return new F()
}
```

6. 混合模式
7. class 方式

#### 继承的方式
- 1. 原型链，实例的原型对象是另一组的实例对象
```
function Super(){
  this.val = 1;
  this.arr = [1];
}
function Sub(){
  // ...
}
Sub.prototype = new Super(); 
```

- 2.组合继承模式
```
function Super(value){
  // 只在此处声明基本属性和引用属性
  this.val = value;
  this.arr = [1];
}
//  在此处声明函数
Super.prototype.fun1 = function(){};
Super.prototype.fun2 = function(){};
//Super.prototype.fun3...
function Sub(value){
  Super.call(this,value);   // 核心
  // ...
}
Sub.prototype = new Super();    // 核心
```

- 3.
```
  // 只在此处声明基本属性和引用属性
  this.val = value;
  this.arr = [1];
}
//  在此处声明函数
Super.prototype.fun1 = function(){};
Super.prototype.fun2 = function(){};
//Super.prototype.fun3...
function Sub(value){
  Super.call(this,value);   // 核心
  // ...
}
Sub.prototype = Object.create(Super.prototype);

// Object.create() 给原型链上添加一环，否则 Sub 和 Super 的原型就重叠了。
Sub.prototype.constructor = Sub;
// 不加这句 Sub.constructor 就等于 Super 了
```

#### 变量提升
进行编译阶段然后才是执行阶段
- 函数提升: 函数声明在编译阶段会添加到词法环境中，当引擎碰到函数时，会从词法环境中找到函数并执行。函数表达式声明并不会产生变量提升
- var 变量的提升
```
var i = 1
=> var i 声明变量
=> i = 1 赋值
```
第一阶段会进行变量提升，赋值不会
- let const 不会进行变量提升

## XMLHttpRequest 对象
```
function createXHR(){
  if(typeof XMLHttpRequest !== 'undefined'){
    return new XMLHttpRequest()
  } else {
    if(typeof ActiveXObject !== 'undefined){
      // ....
    }
    return new ActiveXObject(arguments.callee)
  }
}
let xhr = createXHR()
xhr.open('get', 'example.text', false);
xhr.send();
xhr.onreadystatechange = function(){
  if(xhr.readystate === 4) {
    if((xhr.status >= 200 && shr.status <=300) || xhr.status === 304){
      console.log(xhr.responseText);
    } else {
      console.log('error')
    }
  }
}
```
1. 毒瘤 IE 浏览器, XMLHttpRequest 对象， ActiveXObject 对象