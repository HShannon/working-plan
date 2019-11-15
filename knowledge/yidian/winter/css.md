# CSS

## at-rule && qualified rule
CSS 的顶层样式表由两种规则组成的规则列表构成, 一种被称为 at-rule, 另一种是 qualified rule 
- at-rule: 关键字和后续的区块组成，分号结束
- qualified rule: 普通 CSS 规则

1. at-rule

| 规则 | 说明 |
| :--: | :--: |
| @charset | 提示 CSS 文件使用的字符编码方式, 如果使用必须在最前面 |
| @import | 引入 CSS 文件 |
| @media | 对设备类型做判断 |
| @page | 分页媒体 |
| <mark>@counter-style</mark> | 产生一种数据, 用于定义列表项的表现 |
| @key-frames | 定义动画关键帧 |
| <mark>@fontface</mark> | 定义一种字体 |
| @support | 检查环境的特性 |
| @namespace | 表示内部的 CSS 选择器全都带上特定命名空间 |
| @viewport | 设置视口的一些特性，多数被 HTML 的 meta 代替 |

除此之外，还有 @color-profile, @document, @font-feature-values

2. Qualified rule
- [选择器](https://www.w3.org/TR/selectors-4/)
- 声明列表
  - 属性
  - 值
    - 值的类型
    - 函数

## CSS 选择器
1. 类型选择器  
  根据一个元素的标签名来选中元素
2. 全体选择器
3. id 选择器 ‘#’ + id 名
4. class 选择器 ‘.’ + class 名
5. 属性选择器

| 选择器 | 说明 |
| :--: | :--: |
| [att] | 带有指定属性的元素 |
| [att = val] | 用于选取带有特定属性和值的元素 |
| [att ~= val] | 多种匹配, 检查一个元素的值是否是若干值之一, 适用于由空格分隔的属性值 |
| [att |= val] | 用于选取带有以特定值开头的属性值的元素, 该值必须是整个单词 |
| [att ~= val] | 匹配属性值以指定值**开头**的每个元素 |
| [attr $= value]| 匹配属性值以指定值**结尾**的每个元素 |
| [attr *= value] | 匹配属性值中**包含**指定值的每个元素 div[class *= "test"]|

6. 伪类选择器  
通常以冒号开头, 可以分为普通类型和函数类型两种

- **树结构关系伪类选择器**

| 选择器 | 说明 |
| :--: | :--: |
| :root | 树的根结点 |
| :empty | 伪类表示没有子节点的元素, 除了子节点为空白文本节点的情况 |
| :nth-child(even| odd）| 选中偶数节点 |
| :nth-child | 从前往后 |
| :nth-last-child | 从后往前 |
| :first-child | 第一个元素 |
| :last-child | 最后一个元素 |
| :only-child | 唯一一个子元素 |

- **链接与行为伪类选择器**

| 选择器 | 说明 |
| :--: | :--: |
| :any-link | 任意链接, 包括 a, area, link |
| :link | 未访问过的链接 |
| :visited | 访问过的链接 |
| :hover | 悬停 |
| :active | 用户正在**激活**这个元素，用户按下按钮，鼠标未抬起来, 这个按钮就在激活状态 |
| :focus | 焦点 |
| :target | 浏览器 URL 的 hash 部分所指示的元素 |

- **逻辑伪类选择器**

| 选择器 | 说明 |
| :--: | :--: |
| :not(X) | 一个简单的以选择器X为参数的功能性标记函数 |

## 选择器的机制

1. 选择器的组合
- First: 无连接符号
- Second: 空格, "~", "+", ">", "||"
- Third: ","

| 选择器 | 说明 |
| :--: | :--: |
| 空格 | 后代 |
| > | 子代 |
| ~ | 后继, 后继节点跟当前节点具有同一个父元素，并出现在他之后的节点 |
| + | 直接后继， nextSilbling |

2. 选择器的优先级
- 行内属性的优先级高于CSS规则, 浏览器提供了在选择器前加上 “!import”
- 同一优先级的选择器遵循“后面的覆盖前面的”原则

3. 伪元素  
伪元素的语法与伪类相似, 但是实际产生的效果是把不存在的元素硬选出来, 这一点和伪类不太一样. 两个伪元素所在的 CSS 规则必须指定 content 属性才会生效
- ::first-line
- ::first-letter 元素的第一个字母
- ::before
- ::after
```
<p class="special">I'm real element</p>

p.special::before {
  display: block;
  content: "pseudo! ";
}
```
Tip: 伪元素清除浮动

## CSS排版
正常流的行为: 依次排列, 排不下了换行。
1. float 使得盒子占据了正常流需要的空间, vertical-align 相关规则规定了如何在垂直方向对齐盒。
top => text-top => middle => baseline => text-bottom => bottom

2. margin: 一个元素规定了自身周围至少需要的空间

3. 正常流的原理   
在 CSS 标准中， 规定了如何拍不每一个文字或者盒的算法, 这个算法依赖一个排版的“当前状态”, CSS 把这个当前状态成为“格式上下文(formatting context)”

> 格式化上下文 + 盒 / 文字 = 位置

👉 行内元素和块级元素的区别
- 行内元素水平排列，块级元素垂直排列
- 行内元素不能包含块级元素，只能包含文本或者其他行内元素，块级元素可以包含行内元素和块级元素
- 行内元素设置 width 无效, 行内元素设置 width 无效, height 无效(可以设置line-height), margin 上下无效，padding 上下无效

👉 overflow 当一个元素的内容太大而无法适应块级格式上下文时
- visible
- hidden
- scroll
- auto

👉 会在期内部创建新的块级格式化上下文
- 浮动元素(float 不为 none)
- 绝对定位元素(position 为 absolute 或 fixed)
- 非块级但仍能包含块级元素的容器(inline-blocks, tbale-cells, table-captions)
- 块级元素能包含块级元素的容器, 且属性 overflow 不为 visible

4. 等分布局问题
```
<div class="outer">
	<div class="inner"></div>
	<div class="inner"></div>
	<div class="inner"></div>
</div>
.inner {
	width:33.33%;
	height:300px;
	display:inline-block;
	outline:solid 1px blue;
}
```
效果预期: 每个 div 并非紧挨, 中间有空白, 解决办法是改变 outer 中的字号为 0
```
.inner {
    width:33.33%;
    height:300px;
    display:inline-block;
    outline:solid 1px blue;
    font-size:30px;
}
.outer {
    font-size:0;
}
```

5. 自适应宽
```
<div class="outer">
	<div class="fixed"></div>
	<div class="auto"></div>
</div>

.fixed {
	display:inline-block;
	vertical-align:top;
}
.auto {
	margin-left:-200px;
	padding-left:200px;
	box-sizing:border-box;
	width:100%;
	display:inline-block;
	vertical-align:top;
}
```

## FLEX
CSS 三大经典问题： 垂直剧中、凌烈登高问题，自适应宽问题

## CSS 动画与交互
css 中跟动画相关的属性包括: animation 和 transition

1. animation

| 名称 | 说明 |
| :--: | :--: |
| animation-name | 动画的名称 |
| animation-duration| 动画时长 |
| animation-timing-function | 动画的时间曲线 |
| animation-delay | 动画开始前的延迟 |
| animation-iteration-count | 动画的播放次数 |
| animation-direction | 动画的方向 |

2. transition

| 名称 | 说明 |
| :--: | :--: |
| transition-property | 要更换的属性 |
| transition-duration | 变换的时长 |
| transition-timing-function | 时间曲线 |
| transition-delay | 延迟 |

## CSS 渲染: CSS 是如何绘制颜色的
1. RGB - 红黄蓝, 0——255
2. CMYK — 品红,黄,青
3. HSL - 色相(H),纯度(S),明度(L)
4. RGBA — red, green, blue, alpha
css 内置了大量的140种颜色名称
5. 渐变 line-gradient

## 用代码挖掘 CSS
```
Object.keys(document.body.style)
// 在 chrome 浏览器中去掉 webkit 前缀
Object.keys(document.body.style).filter(e => !e.match(/^webkit/))
```

## ARIA
ARIA 全称 Accessible Rich Internet Applications， ARIA 角色
- [Widget](https://time.geekbang.org/column/article/93777)
- Structure
- Window