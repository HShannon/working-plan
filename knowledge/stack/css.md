#### dateset
1.  **dateset** HTMLElement.dataset属性允许无论是在读取模式和写入模式下访问在 HTML或 DOM中的元素上设置的所有自定义数据属性(data-*)集

#### querySelectorAll && getElementsBy系列
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

#### 弹性布局
1. flex布局，子元素的float、clear和vertical-align属性会失效

2. 

