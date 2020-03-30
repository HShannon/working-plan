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


