# [flex 布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 基本概念
1. main axis and cross axis
2. main start, main end and cross start, cross end

## 容器属性
1. flex-direction(主轴方向)) => row | row-reverse | column | column-reverse
2. flex-wrap(换行情况) => nowrap(不换行) | wrap | wrap-reverse
3. justify-content(项目在主轴上的对齐方式) => flex-start(左对齐) | flex-end(右对齐) | center(居中) | space-between(两端对齐) | space-around(每个项目两侧的间隔相等)
4. align-items(项目在交叉轴上的对齐方式) => flex-start | flex-end | center | baseline | stretch
5. align-content(多根轴线的对齐方式) => flex-start | flex-end | center | space-between | space-around | stretch

## 项目属性
| 项目属性 | 说明 |
| :--: | :--: |
| order: integer |定义项目的排列顺序, 数值越小, 排列越靠前, 默认为0 |
| flex-grow: number | 项目的放大比例 |
| flex-shrink: number| 缩小比例 |
| flex-basis: </length/>, auto | 分配多余空间之前，项目占据的主轴空间(main size) |
| flex | flex-grow, flex-shrink 和 flex-basis的简写 |
| align-self: auto, flex-start, flex-end, center, baseline, stretch | 分配多余空间之前，项目占据的主轴空间(main size) |


