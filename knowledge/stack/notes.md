#### 杂记
1. git删除分支
	+ 远程分支: git push origin :severfix [git官方文档](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF)
	+ 本地分支: git branch -d <BranchName>

2. 切换npm版本
	+ npm install -g npm@版本号
	+ npm install npm@latest -g

3. vue init webpack <项目名称>

4. vuejs项目搭建
	+ npm install -g vue-cli
	+ vue init webpack myProject
	+ cd <项目目录>
	+ npm run dev

5. performance [performance文档](https://www.cnblogs.com/bldxh/p/6857324.html)

| 属性指      | 描述                                 |
| :--------: | :---------------------------------:  |
| mark       | 通过 mark() 方法添加到数组中的对象       |
| measure    | 通过 measure() 方法添加到数组中的对象    |
| resource   | 通过 mark() 所有资源加载时间，用处最多    |
| navigation | 现除chrome和Opera外均不支持，导航相关信息 |
| frame      | 现浏览器均未支持                        |
| server     | 未查到相关资料                         |


6. PerformanceObserver构造函数
	+ PerformanceObserver.observe(),当performance entry被记录并且是制定的entryTypes之一的时候，性能观察者对象的回调函数会被调用
	+ 性能监测回调停止接收 性能条目
	```
	const obs = new PerformanceObserver((items) => {
		_this.xhrSource.push(items.getEntries()[0]);
		// performance.clearMarks();
	});

	obs.observe({ entryTypes: ['measure'] });
	```

7. 卸载从node官网下载的node
  + **sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}**

8. 去掉eslint检测，在webpack.base.config文件中
	```
	...(config.dev.useEslint ? [createLintingRule()] : []),x
	```
9. intro.js的实践方法
	+ [GitHub](https://github.com/usablica/intro.js/)
	> import 'element-ui/lib/theme-chalk/index.css'
	+ vue-introjs

10. web服务器-使用Node.js

11. 权限认证cookie VS token
	+ cookie cookie登录是有状态的，服务端维护一个session客户端维护一个cookie, cookie只保存sessionID服务端要保存并跟踪所有活动的session
	+ token oken 的认证方式是无状态的，服务端不保存登陆状态，也不关心哪些客户端签发了 token ，每个请求都会携带 token 通常在 header 中，也可以出现在 body 和 query

12. 删除远程分支 
	+ git push origin :serverfix 
	+ [相关](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF))

13. 删除本地分支
	+ git branch -d <BranchName>

14. 在export default前定义函数 [from project-Site]

15. gitLab密码修改
  + git config --global credential.helper store

16. console.log('Koa server with `koa-body` parser start listening to port %s', port)  **%s**


17. slice()
	+ slice(0) always returns a new array,  the array returned by slice(0) is identical to the input, which basicallly means it's cheap way to duplicate any array
	```
	let arr = ['wangyaru', 'tuwanqiong', 'wangdacheng']
	let arr1 = arr.slice(0)
	let arr2 = arr
	arr[0] = 'shannon'

	console.log(arr)  // ["shannon", "tuwanqiong", "wangdacheng"]
	console.log(arr1) // ["wangyaru", "tuwanqiong", "wangdacheng"]
	console.log(arr2) // ["shannon", "tuwanqiong", "wangdacheng"]
	```

18. the usage of qs
```
var qs = require('qs')
var assert = require('assert')

var obj = qs.parse('a=c')
assert.deepEqual(obj, { a: 'c' })

var str = qs.stringify(obj)
assert.equal(str, 'a=c')
```

19. 由 ProcessOn 看到的有意思的东西
	+ [腾讯防水墙](https://007.qq.com/index.html?ADTAG=set.head)
	+ [增加ProcessOn免费文件数](https://github.com/96chh/Upgrade-ProcessOn)

20. web架构I
![window](../../public/image/web_structure.jpg "koa-compose")
	
+ DNS域名解析器  
+ 负载均衡  
	垂直. 水平
+ web应用服务器  
	user's brower <----> web app server <----> 后端基础设备
	+ 应用服务器的实现(Node.js)
	+ 后端语言MVC框架(koa、express)
+ 数据库服务器
+ cache 缓存  
	**redis**, Memcache
+ CDN 内容分发网络

21. web架构II
![window](../../public/image/web_structure1.jpg "koa-compose")

+ [反向代理服务](https://cloud.tencent.com/developer/article/1160241)  
	负责接受用户的接入请求
	+ 连接管理
	+ 攻击检查和安全隔离
	+ 负载均衡
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

22. 







