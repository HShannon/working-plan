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
### DOM API（Document Object Module)
DoM API 用来描述文档，使用对象这种概念来描述 HTML，大致分为 4 部分
- 节点: DOM 树形结构中国呢的节点相关的 API
- 事件: 触发和监听相关 API
- Range: 操作文字范围相关 API
- 遍历: 遍历 DOM 需要的 API

### 节点   
- 节点类型如下,除了 Document 和 DocumentFragment, 都有与之对应的 HTML 写法:
  - **Element** 元素型节点，跟标签相对应
  - **Document** 文档根节点
  - CharacterData 字符数据
    - **Text** 文本节点
    - Comment 注释
    - ProcessingInstruction 处理信息
  - DocumentFragment 文档片段
  - DocumentType 文档类型
```
Element: <tagname>...</tagname>
Text: text
Comment: <!-- comments -->
DocumentType: <!Doctype html>
ProcessingInstruction: <?a 1?>
```

### Node
定义了 DOM节点在 DOM 树上的操作
1. 在 DOM 树上的操作
- parentNode
- childNode
- firstChild
- lastChild
- nextSibling
- previousSibling

2. 操作 DOM 树的 API, 所有几个修改型的 API, 全都是在父元素上操作的，
- appendChild
- insertBefore
- removeChild
- replaceChild
❓ 没有 insertAfter, 可以利用 insertBefore, appendChild. 主要考虑元素是否有 nextSibling
```
const insertAfter = (newEl, targetEl) => {
  let parentEl = targetEl.parentNode;
  if(parentEl.lastChild == targetEl) {
    parentEl.appendChild(newEl);
  } else {
    parentEl.insertBefore(newEl,targetEl.nextSibling);
  }            
}
```

3. 高级 API
- compareDocumentPosition 比较两个节点中关系的函数
- contains 检查一个节点是否包含另一个节点的函数
- isEqualNode 检查两个节点是否完全相同
- isSameNode 检查两个节点是否是同一个节点
- cloneNode 复制一个节点，传入参数 true 会连同子元素做深拷贝

4. 如何创造节点
```
createElement
creatTextNode
createCDATASection
createcomment
createProcessingInstruction
createDocumentFragment
createDocumentType
```

5. Element && Attribute 把元素的 Attribute 当作字符串来看待: getAttribute, setAttribute, removeAttribute 与 hasAttribute. 还可以使用 attribute 对象, document.body.attributes.class = "a" 等效于 document.body.setAttribute('class', 'a')

6. 查找元素
- querySelector
- querySelectAll
- getElementById
- getElementByName
- getElementByTagName
- getElementByClassName
其中，getElementById, getElementByName, getElementByTagName, getElementByClassName 这几个 API 性能高于 querySelector

## 遍历
DOM API 中还提供了 NodeIterator 和 TreeWalker 来遍历树
- NodeIterator
```
var iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT, null, false);
var node;
while(node = iterator.nextNode())
{
  console.log(node);
}
```
- TreeWalker
```
var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false)
var node;
while(node = walker.nextNode())
{
    if(node.tagName === "p")
        node.nextSibling();
    console.log(node);
}
```

## Range
