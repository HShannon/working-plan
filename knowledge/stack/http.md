# POST 提交数据方式  
1. contentType: the type of request  
+ text/html(默认)
+ text/plain
+ text/js
+ text/css
+ text/javascript
+ application/x-www-form-urlencode: 最常见的POST提交数据的方式, 不设置enctype默认以此提交
+ application/json
+ multipart/form-data: 在表单中进行上传文件时，需要是用这种类型(rfc1867)
+ text/xml

2. dataType: the type of response

# HTTP协议格式
+ 请求报文: 请求头部(请求行 + （请求 + 通用 + 实体）|| 首部字段 + 其他) + 空行 + 报文主体
+ 响应报文: 响应头部(状态行 + （响应 + 通用 + 实体）|| 首部字段 + 其他) + 空行 + 报文主体


# web架构II  
![window](../../public/image/web_structure1.jpg "koa-compose")

+ [反向代理服务](https://cloud.tencent.com/developer/article/1160241)  
	负责接受用户的接入请求
	+ 连接管理	
		分别维护客户端和应用服务器的连接池，管理并关闭已超时的长链接
	+ 攻击检查和安全隔离	
		通常使用轮转（Round Robin）或最少连接数优先等策略完成基于客户请求的负载均衡；也可以使用 SSI 等技术将一个客户请求拆分成若干并行计算部分分别提交到多个应用服务器。
	+ 负载均衡	
		可以将反向代理分组部署在距离热点地区地理位置较近的网络边界上。通过在位于客户较近的位置提供缓冲服务来加速网络应用。这实际上就构成了 CDN 网络。
	+ CDN(分布式的cache加速)
	+ 静态文件伺服  
		收到静态文件请求，直接返回该文件无需将该请求提交至后端应用服务器
	+ 动态响应缓存
	+ 数据压缩传输
	+ 数据加密保护
	+ 容错  
		跟踪后端应用服务器的健康状况，避免将请求调度到发生故障的服务器
	+ 完成用户登录和会话建立
	+ url别名
	+ 应用搭配
	+ 协议转换
	常见的反向代理服务包括：Apache httpd+mod_proxy / IIS+ARR / Squid / Apache Traffic Server / **Nginx** / Cherokee / Lighttpd / HAProxy 以及 Varnish 


