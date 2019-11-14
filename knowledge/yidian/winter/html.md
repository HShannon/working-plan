# HTML

## 语义
1. ruby 标签: 定义 ruby 注释(中文注音或字符). ruby 元素由一个或多个需要解释/发音的字符和一个提供该信息的 rt 元素组成，还包括可选的 rp 元素，定义当浏览器不支持 "ruby" 元素时显示的内容
```
<ruby>
  王 <rt> wang </rt>
  字 <rp>(</rp><rt>zi</rt><rp>)</rp>
</ruby>
```

2. hgroup 标签
```
<hgroup>
<h1>JavaScript 对象 </h1>
<h2> 我们需要模拟类吗？</h2>
</hgroup>
```
3. section 语义标签

4. 整体结构的语义类标签
```
<body>
  <header>
    <nav>
      ......
    </nav>
  </header>
  <aside>
    <nav>
      ......
    </nav>
  </aside>
  `......
  <section>......</section>
  <section>......</section>
  ......
  <article>
    <header>......</header>
    <section>......</section>
    <section>......</section>
    <footer>......</footer>
  </article>
  <footer>
    <address>......</address>
  </footer>
</body>
```

5. 语义化标签总结

| 标签 | 说明 |
| :--: | :--: |
| blockquote, q, cite | 引述相关 |
| figure, figcaption | 文中图片, 与主文章相关的图片 |
| small | 字体缩小的废弃标签, 表示补充评论 |
| s | 划线, 打折的错误内容 |
| i | 斜体, 读的时候变调 |
| b | 黑体, 关键字 |
| u | 下划线, 避免歧义 |
| data | 类似time, 机器阅读 |
| var | 变量, 机器阅读 |
| sub | 上标 |
| sup | 下标 |
| bdi, bdo | 用于多语言混合时，制定语言或者书写方向. bdo => rtl |
| mark | 高亮 |
| wbr | 单词可换行的地方 |
| dd, dl, dt | 术语定义 |
| main | 页面主要内容, 独特的 div |

## 替换型元素
1. script  
👉  一种直接把脚本代码写到 script 标签之间，另一种把代码放到独立的 js 文件中，用 src 属性引入. script 标签既可以作为替换型标签，又可以不作为替换标签
```
<script type="text/javascript">
console.log("Hello world!");
</script>

<script type="text/javascript" src="my.js"></script>
```

2. img  
👉  script 标签作为非替换标签，必须用 src 属性才有意义
```
<img src='data:image/svg+xml;charset=utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/></svg>'/>
```
- img 标签可以使用 width 和 height 指定宽度和高度
- **alt 属性对于视障用户非常重要**
- srcset, sizes 属性作用于在不同屏幕的大小和特性下，使用不同的图片源
```
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
```

3. picture 元素可以根据屏幕的条件为其中的 img 元素提供不同的源
```
<picture>
  <source srcset="image-wide.png" media="(min-width: 600px)">
  <img src="image-narrow.png">
</picture>

```

4. 此外, video, audio, iframe 标签同样会引入一个外部资源来进入页面，替换掉自身的位置. 引入方式有 src 属性, srcset 属性, source 标签, srcdoc 属性

## data uri
```
// 传统 src &&  
img src="images/image.png"/

<img src='data:image/svg+xml;charset=utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/></svg>'/>
```

## HTML 链接
链接主要分为, 超链接型标签, 外部资源链接

1. link 标签  
link 标签可生成超链接或外部资源链接。超链接不会像 a 标签那样现实在网页中。对于大多数浏览器 link 标签不起作用, 但是 link 标签能够被搜索引擎和一些浏览器插件识别. 作为外部资源链接可以将外部的资源链接到文档中. 常见的用 link 标签引入样式表
```
<link rel="XX">
```
- 超链接 link: 

| 属性 | 说明 |
| :--: | :--: |
| canonical | 提示搜索引擎保留哪个 URL |
| alternate | 当前网页内容的不同格式、不同语言或者不同的设备设计的版本 |
| pre, next | 序列 |
| author | 作者 |
| help | 帮助页 |
| license | 版权信息页 |
| search | 搜索页面 |

- 外部资源类 link: 

| 类型 | 说明 |
| :--: | :--: |
| icon | 页面的 icon 型 link, 只有 icon 型 link 有有效的 size 属性, HTML 标准允许一个页面出现多个 icon 型 link, 并且用 size 指定它适合的 icon 尺寸 |
| dns-prefetch, preconnect, prefetch, preload, prerender | 预处理类型 |
| modulepreload | 预先家在一个 JavaScript 模块， 可以保证 Js 模块不必等到执行时才加载 |
| stylesheet | <link rel="stylesheet" href="xxx.css" type="text/css"> type 属性可以没有, 如果有, 必须是“text/css”才会生效 |
| pingback | 表示本网页被引用时，应该使用 pingback 地址 |

2. a 标签  
a 标签其实同时充当了链接和目标地的角色, 当 a 标签有 href 属性时, 它是链接. 当它有 name 时, 它是链接的目的地. rel 属性主要包括: 
- alternate 当前网页内容的不同格式、不同语言或者不同的设备设计的版本
- author 作者
- help 帮助页
- license 版权信息
- next, prev 序列
- search 搜索页面
- tag 本网页所属的标签
- bookmark 到上级张杰的链接
- nofollow 词链接不会被搜索引擎检索
- noopener 此链接打开的网页无法使用 opener 来获取当前页面的窗口
- noreferrer 此链接打开的网页无法使用 referrer 来获取当前页面的 url
- opener 打开的网页可以使用 window.opener 来访问当前页面的 window 对象, 这是 a 标签的默认行为

3. area 标签  
如果想再图片的某个区域产生超级链接，那么就要用到另一种标签 —— area 标签。 area 支持三种热区, 分别为
- 圆形: circle(circ), x,y and r
- 矩形: rect(rectangle, 对角顶点 x1, y2 and x2, y2)
- 多边形: poly（polygon), 至少包括6个值

## HTML 元信息类标签
元信息是指描述自身的信息,元信息类标签, 就是HTML用来描述文档自身的一类标签, 通常在 head 标签中; 元信息多数是给浏览器、搜索引擎等机器阅读的

| 标签 | 说明 |
| :--: | :--: |
| head | html 标签中的第一个标签, 他的内容必须包含一个title, 最多只能包含一个 base |
| title | 文档标题 |
| base | 给页面上所有的 URL 提供一个基础 |
| meta | 键值对, 由 name 和 content, name 表示元信息的名, content 则用于表示元信息的值 | 

1. 具有 charset 属性的 meta, 描述文档自身的编码形式
```
<meta charset="UTF-8" >
```

2. 具有 http-equiv 描述的 meta, 表示执行一个命令
```
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
```
- content-language 指定内容
- default-style 指定默认样式表
- refresh 刷新
- set-cookie 模拟 http 头 set-cookie, 设置 cookie
- x-ua-compatible 模拟 http 头 x-ua-compatible, 指定网页的兼容性模式设置
```
<meta http-equiv="X-UA-Compatible" content="IE=edge">  
// 以上代码告诉IE浏览器，IE8/9及以后的版本都会以最高版本IE来渲染页面。
```
- content-security-policy 模拟 http 头 content-security-policy, 声明内容安全策略

3. name 为 viewport 的 meta. 没有在 HTML 标准中定义, 却是移动端开发的事实标准. content 是个复杂结构, 使用逗号分隔键值对(key = value)
```
<meta name="viewport" content="width=500, initial-scale=1">
```
- width: 页面宽度(device-width, 与页面同宽)
- height: 页面高度(device-height, 与页面同高)
- initial-scale: 初始缩放比例
- minimum-scale: 最小缩放比例
- maxinum-scale: 最大缩放比例
- user-scalable: 是否允许用户缩放

已经做好了移动端适配的网页, 应该把用户缩放功能禁止掉, 宽度设为设备宽度
```
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```

4. base 标签
```
<head>
<base href="http://www.w3school.com.cn/i/" />
<base target="_blank" />
</head>
```
- href: 规定页面中所有相对连接的基准URL
- target: 在何处打开网页中所有的链接

5. title 标签
```
<head>
  <title>XHTML Tag Reference</title>
</head>
```

## HTML 语言: DTD
历史的 DTD 有三种, 分别为: 严格模式、过度模式和 frameset 模式, 但是复杂的 DTD 写法并没有实际作用，浏览器根本不会用 SGML 引擎解析它们. hTML5 简化后规定了一个简单的 DTD
```
<! DOCTYPE html>
```
