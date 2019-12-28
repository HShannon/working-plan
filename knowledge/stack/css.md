# CSS
## dateset
HTMLElement.dataset 属性允许无论是在读取模式和写入模式下访问在 HTML 或 DOM中的元素上设置的所有自定义数据属性(data-*)集

## querySelectorAll && getElementsBy系列
1. querySelectorAll 返回的是一个 Static Node List，而 getElementsBy 系列的返回的是一个 Live Node List。
```
// Demo 1
var ul = document.querySelectorAll('ul')[0],
    lis = ul.querySelectorAll("li");
for(var i = 0; i < lis.length ; i++){
    ul.appendChild(document.createElement("li"));
}

// Demo 2
var ul = document.getElementsByTagName('ul')[0], 
    lis = ul.getElementsByTagName("li"); 
for(var i = 0; i < lis.length ; i++){
    ul.appendChild(document.createElement("li")); 
}
```

2. NodeList 对象、HTMLCollection 对象 ([相关资料知乎](https://www.zhihu.com/question/24702250))

## 弹性布局
flex布局，子元素的float、clear和vertical-align属性会失效

## postcss
[参考](https://segmentfault.com/a/1190000003909268)

## [SASS用法指南](http://www.ruanyifeng.com/blog/2012/06/sass.html)
@font-face 允许网页开发者为其网页制定在线字体
1. 变量, SASS允许使用变量，所有变量以$开始; 如果变量需要镶嵌在字符串之中，必须写在#{}中

2. 计算功能

3. 嵌套

4. 注释: /* comment */ || //comment // /*! comment */(重要注释)

5. 继承:  @extend

6. Mixin: 使用@mixin命令，定一个代码块。使用@include命令，调用mixin
```
@minxin left {
float: left;
margin-left: 10px
} 

div {
@include left
}

// 此外 @mixin 可以制定参数和缺省值
@mixin left($value: 10px) {
float: left;
margin-left: $value;
}
```

7. 颜色函数

8. 插入文件: @import

9. 条件语句
- @if: 不需要写括号
- @else
- @while
- @for

10. 自定义函数
```
@function double($n) {
  @return $n * 2;
}

11. sidebar {
  width: double(5px);
}
```

## tabindex 
tabindex 属性用于管理键盘焦点，决定元素是否能被选中，以及按下 tab 键过程中被选中的顺序
- tabindex = 0: 如果你想让一个不能获取焦点的元素，比如 <span> 或 <div>，也被包含在 tab 键序列表中，那么设置 tabindex = 0 就可以使这些元素按其在源码中的顺序出现在 tab 键序中。
- tabindex = -1: 可以使一个元素可由代码获取到焦点，但其本身并不在 tab 键序中
- 避免设置 tabindex = 1+
