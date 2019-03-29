### POST 提交数据方式
1. contentType: the type of request
    + text/html(默认)
    + text/plain
    + text/js
    + text/css
    + text/javascript
    + **application/x-www-form-urlencode**
        最常见的POST提交数据的方式, 不设置enctype默认以此提交
    + **application/json**
    + **multipart/form-data**  
        在表单中进行上传文件时，需要是用这种类型(rfc1867)
    + **text/xml**

2. dataType: the type of response
***

### HTTP协议格式
+ 请求报文: 请求头部(请求行 + （请求 + 通用 + 实体）|| 首部字段 + 其他) + 空行 + 报文主体
+ 响应报文: 响应头部(状态行 + （响应 + 通用 + 实体）|| 首部字段 + 其他) + 空行 + 报文主体


### Koa-body
1. co-body
    Parse request bodies with generators inspired by Raynos/body.

2. formidable
    A Node.js module for parsing form data especially file uploads
  



