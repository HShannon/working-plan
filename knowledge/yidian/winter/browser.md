# 浏览器实现远离与 API

## 浏览器到底如何工作
- 浏览器首先使用 HTTP 协议或者 HTTPS 协议, 向服务端请求页面
- 把请求回的 HTML 代码经解析，构建成 DOM 树
- 计算 DOM 树上的 CSS 属性
- 最后根据 CSS 属性对元素逐个进行渲染，得到内存中的位图
- 一个可选的步骤是对位图进行合成，这会极大地增加后续绘制的速度
- 合成之后, 再绘制到界面上
从 HTTP 请求回来的, 就产生了流式的数据, 流式处理

## HTTP 协议
### HTTP 协议格式
1. request
  - request line
    - method, 请求方式
    - path， 请求路径
    - version, 版本
  - head
  - body
2. response
  - response line
    - version, 状态
    - status code, 状态码
    - status text, 状态文本
  - head
  - body

### HTTP Method 方法

| 名称 | 说明 |
| :--: | :--: |
| GET | 浏览器通过地址栏访问页面 |
| POST | 表单提交 |
| PUT | 添加资源 |
| DELETE | 删除资源 |
| CONNECT | 多用于 HTTPS 的 WebSocket |
| OPTIONS | 调试, 线上服务不支持 |
| TRACE | 调试, 线上服务不支持 |

### HTTP Status code （状态码） 和 Status text (状态文本)
1. 1xx: 临时回应, 表示客户端请继续
2. 2xx: 请求成功
  - 200: 请求成功
3. 3xx: 表示请求的目标有变化，喜欢客户端进一步处理
  - 301&302: 永久性与临时性跳转
  - 304: 客户端缓存没有更新
4. 4xx: 客户端请求错误
  - 403: 无权限
  - 404: Not Found
  - 418: teapot
5. 5xx: 服务端请求错误
  - 500: 服务端错误
  - 503: 服务端暂时性错误

👉 304 状态产生的前提, 客户端本地已经有缓存的版本, 并且在 Request 中告诉了服务器(If Modified Since), 当服务端通过时间或者 tag, 发现没有更新的时候, 就会返回一个不含 body 的 304 状态

### HTTP Head
我们可以自由定义 HTTP 头和值, 不过在 HTTP 规范中，规定了一些特殊的 HTTP 头

1. Request Header

| 名称 | 说明 | 具体取值 |
| :--: | :--: | :--: |
| Accept | 浏览器端接受的格式 |  |
| Accept-Encoding | 浏览器端接收的编码方式 |  |
| Accept-Language | 浏览器端接受的语言, 用于服务端判断多语言 |  |
| Cache-Control | 控制缓存的有效性 |  |
| Connection | 连接方式 | keep-alive, 且服务端支持, 则会复用连接; close 表明客户端或服务器想要关闭该网络连接 |
| Host | HTTP 访问使用的域名 |  |
| If-Modified-Since | 上次访问时的更改时间, 如果服务器认为此时间后自己没有更新, 则会给出 304 响应 |  |
| If-None-Match | 首次访问时使用 E-Tag, 通常是页面的信息摘要, 这个比更改时间更准确一点 |  |
| User-Agent | 客户端识别 |  |
| Cookie | 客户端存储的 cookie 字符串 |  |

2. Response Header

| 名称 | 说明 |
| :--: | :--: |
| Cache-Control | 缓存控制, 用于通知各级缓存保存的时间 |
| Connection | 连接方式, Keep-Alive 表示复用连接 |
| Content-Encoding | 内容编码方式, 通常是gzip |
| Content-Length | 内容的长度，有利于浏览器判断内容是否已经结束 |
| Content-Type | 内容类型, 所有请求网页的都是text/html |
| Date | 当前的服务器日期 |
| ETag | 页面的信息摘要, 用于半段下次请求是否需要到服务端取回页面 |
| Expires | 过期时间, 用于判断下次请求是否需要到服务端取回页面 |
| Keep-Alive | 保持连接连接不断时需要的一些信息 |
| Last-Modified | 页面上次修改的时间 |
| Server | 服务端软件的类型 |
| Set-Cookie | 设置 cookie, 可以存在多个 |
| Via | 服务端的请求链路, 对一些调试场景至关重要的一个头 |