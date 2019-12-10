# 浏览器实现远离与 API

## 浏览器到底如何工作
- 浏览器首先使用 HTTP 协议或者 HTTPS 协议, 向服务端请求页面
- 把请求回的 HTML 代码经解析，构建成 DOM 树
- 计算 DOM 树上的 CSS 属性
- 最后根据 CSS 属性对元素逐个进行渲染，得到内存中的位图
- 一个可选的步骤是对位图进行合成，这会极大地增加后续绘制的速度
- 合成之后, 再绘制到界面上

## 浏览器 - 阶段五
- 渲染: 模型变成位图，自元素不会渲染到位图上(二维表格)
- 合成: 性能考虑, 把一部分子元素渲染到合成的位图上面
- 绘制: 把位图最终绘制到屏幕上，变成肉眼可见的图像
    
## 浏览器 - API
1. DOM API（Document Object Module)，用来描述文档，使用对象这种概念来描述 HTML，大致分为 4 部分
- 节点: DOM 树形结构中国呢的节点相关的 API
- 事件: 触发和监听相关 API
- Range: 操作文字范围相关 API
- 遍历: 遍历 DOM 需要的 API

2. 节点   
- 节点类型如下,除了 Document 和 DocumentFragment, 都有与之对应的 HTML 写法:
  - **Element** 元素型节点，跟标签相对应
  - **Document** 文档根节点
  - CharacterData 字符数据
    - **Text** 文本节点
    - Comment 注释
    - ProcessingInstruction 处理信息
  - DocumentFragment 文档片段
  - DocumentType 文档类型
- 
