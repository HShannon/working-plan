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
1. HTTP 协议格式
- request
  - request line
    - method, 请求方式
    - path， 请求路径
    - version, 版本
  - head
  - body
- response
  - version, 状态
  - status code, 状态码
  - status text, 状态文本

2. HTTP Method 方法 
| 名称 | 说明 |
| :--: | :--: |
| GET | 浏览器通过地址栏访问页面 |
| POST | 表单提交 |
| PUT | 添加资源 |
| DELETE | 删除资源 |
| CONNECT | 多用于 HTTPS 的 WebSocket |
| OPTIONS | 调试, 线上服务不支持 |
| TRACE | 调试, 线上服务不支持 |

3. HTTP Status code （状态码） 和 Status text (状态文本)
- 1xx: 临时回应, 表示客户端请继续
- 2xx: 请求成功
  - 200: 请求成功
- 3xx: 表示请求的目标有变化，喜欢客户端进一步处理
  - 301&302: 永久性与临时性跳转
  - 304: 客户端缓存没有更新
- 4xx: 客户端请求错误
  - 403: 无权限
  - 404: Not Found
  - 418: teapot
- 5xx: 服务端请求错误
  - 500: 服务端错误
  - 503: 服务端暂时性错误
