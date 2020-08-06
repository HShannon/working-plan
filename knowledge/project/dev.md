# 开发过程成的问题

## 选品平台
### 图片防盗链
1. referer 
- referer 位于哪里: 向服务器请求内容后，提交一个 header , header 中包含浏览器信息、cookie 等, 其中包括 referer
- referer 作用: 用于告知请求的涞源是谁
- **对于图片而言, referer 就是引用图片的这个网页网址**

2. 如何利用 referer 实现图片防盗
- 本网站
- 无 referer 信息，服务器认为从浏览器直接访问的图片 url
- 授权的网址



