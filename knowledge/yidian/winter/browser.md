# 浏览器实现与 API

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

// 优化代码
const insertAfter = (newEl, targetEl) => {
  let parentEl = targetEl.parentNode;
  if(parentEl.lastChild == targetEl) {
    parentEl.insertBefore(newEl, null);
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

# CSSOM
CSSOM 是 CSS 的对象模型, 包含两个部分: 表述样式表和规则等 CSS 的模型部分(CSSOM) 和 CSSOM view。 

## CSSOM
创建样式表也都是使用 HTML 标签来做, 用 style 标签 和 link 标签创建
```
<style title="Hello">
a {
  color:red;
}
</style>
<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D">
```
- document.styleSheets 表示文档中所有的样式表，只读列表

## CSSOM View
CSSOM view 这部分的 API, 可以视为 DOM API 的拓展, 在原本的 Element 接口上, 
1. 窗口 API  
- moveTo(x, y) 窗口移动到屏幕的特定坐标
- moveBy(x, y) 窗口移动特定距离
- resizeTo(x, y) 改变窗口大小到特定尺寸
- resizeBy(x, y) 改变窗口大小特别定尺寸

2. 视口滚动 API  
- scrollX 视口的属性, 表示 X 方向上的当前滚动距离, 有别名 pageXOffset
- scrollY 视口的属性, 表示 Y 方向上的当前滚动距离, 有别名 pageYOffset
- scroll(x,y) 使得页面滚动到特定的位置, scrollTo
- scrollBy(x,y) 使得页面滚动特定的距离

3. 元素滚动的 API
- scrollTop 元素的属性, 表示 Y 方向上的当前滚动距离
- scrollLeft 元素的属性, 表示 X 方向上的当前滚动距离
- scrollWidth 元素的属性, 表示元素内部的滚动内容的宽度
- scrollHeight 元素的属性, 表示元素内部的滚动内容的高度
- scroll(x,y) 使得元素滚动到特定的位置, scrollTo
- scrollBy(x,y) 使得元素滚动特定的距离

4. 全局尺寸信息， window.innerHeight, window.innerWidth 这两个属性表示视口的大小。 window.outerWidth, window.outerHeight 这两个属性表示浏览器窗口占据的大小，很多浏览器都没有实现

# 浏览器事件

1. 事件来自输入设备, 输入设备有三种: 键盘, 鼠标, 触摸屏。触摸屏和鼠标都是 pointer 设备, 是指它的输入最终会被抽象成屏幕上面的一个点。在一个事件发生时，捕获过程跟冒泡过程是先后发生的。默认使用冒泡模式，当开发组件时，遇到需要父元素控制子元素的行为，可以使用捕获机制。
```
document.body.addEventListener(eventName, handleFunction, optionObject)
// eventName 事件名称

// handleFunction 事件处理， 函数，或者是具有handleEvent 
let o = {
  handleEvent: event => console.log(event)
}

//  optionObject
{
  // 只执行一次
  once,
  // 承诺此事件监听不会调用 preventDefault
  passive,
  // 是否捕获（是否冒泡）
  useCapture
}
```

2. 浏览器 API 还提供了 API 来操作焦点
- document.body.focus
- document.body.blur


