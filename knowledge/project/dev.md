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

3. 如何破解图片防盗
- 第三方代理
- 删除 Header 中的 Referrer

## 浏览器模拟移动端
1. 通过 userAgent 判断浏览器类型
- 移动端
```
Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Mobile Safari/537.36
```
- pc
```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36
```



