#### 杂记
1. git删除分支
		+ 远程分支: git push origin :severfix([git官方文档](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF))
		+ 本地分支: git branch -d <BranchName>

2. 切换npm版本
    npm install -g npm@版本号
    npm install npm@latest -g

3. vue init webpack <项目名称>

4. vuejs项目搭建
    + npm install -g vue-cli
    + vue init webpack myProject
    + cd <项目目录>
    + npm run dev

5. performance([performance文档](https://www.cnblogs.com/bldxh/p/6857324.html))

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
    **sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}**

8. 去掉eslint检测，在webpack.base.config文件中
    ```
    ...(config.dev.useEslint ? [createLintingRule()] : []),x
    ```
9. intro.js的实践方法
+ ([GitHub](https://github.com/usablica/intro.js/))
> import 'element-ui/lib/theme-chalk/index.css'
+ vue-introjs

10. web服务器-使用Node.js

11. 权限认证cookie VS token
+ cookie cookie登录是有状态的，服务端维护一个session客户端维护一个cookie, cookie只保存sessionID服务端要保存并跟踪所有活动的session
+ token oken 的认证方式是无状态的，服务端不保存登陆状态，也不关心哪些客户端签发了 token ，每个请求都会携带 token 通常在 header 中，也可以出现在 body 和 query

12. 删除远程分支 
		+ git push origin :serverfix 
		+ ([相关](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF))

13. 删除本地分支
		git branch -d <BranchName>

14. 在export default前定义函数 [from project-Site]

15. gitLab密码修改
    git config --global credential.helper store

16. console.log('Koa server with `koa-body` parser start listening to port %s', port)  **%s**

17. 在开发dsp报表优化时的小细节
		+ 用 isNaN() 过滤数字字符串、以及数字 
		+ Object.keys() 会对属性名进行排序, 数字(数字字符串)优先 ([网上资料](http://jartto.wang/2016/10/25/does-js-guarantee-object-property-order/))
				解决方案: Map

18. slice(0) always returns a new array,  the array returned by slice(0) is identical to the input, which basicallly means it's cheap way to duplicate any array
```
let arr = ['wangyaru', 'tuwanqiong', 'wangdacheng']
let arr1 = arr.slice(0)
let arr2 = arr
arr[0] = 'shannon'

console.log(arr)  // ["shannon", "tuwanqiong", "wangdacheng"]
console.log(arr1) // ["wangyaru", "tuwanqiong", "wangdacheng"]
console.log(arr2) // ["shannon", "tuwanqiong", "wangdacheng"]
```

19. weChat-server 的学习笔记


20. the usage of qs
```
var qs = require('qs')
var assert = require('assert')

var obj = qs.parse('a=c')
assert.deepEqual(obj, { a: 'c' })

var str = qs.stringify(obj)
assert.equal(str, 'a=c')
```

21. log4js
- 日志分级, 级别由低到高
```
{
	ALL: new Level(Number.MIN_VALUE, "ALL"),
	TRACE: new Level(5000, "TRACE"),
	DEBUG: new Level(10000, "DEBUG"),
	INFO: new Level(20000, "INFO"),
	WARN: new Level(30000, "WARN"),
	ERROR: new Level(40000, "ERROR"),
	FATAL: new Level(50000, "FATAL"),
	MARK: new Level(9007199254740992, "MARK"), // 2^53
	OFF: new Level(Number.MAX_VALUE, "OFF")
}
```
- 日志分类 Logger 实例的类型，区分日志的维度, **getLogger()的参数**

- 日志落盘 Appender, 默认打印到控制台
```
let log4js = require('log4js');
log4js.configure({
	appenders: [{
		type: 'file',
		filename: 'default.log'
	}]
})
let logger = log4js.getLogger('custom-appender')
logger.debug("Time:", new Date())
```
提供的其他的appender: DateFile、 STMP、 MailGun、levelFilter(通过level过滤)
		+ DateFile 注意log4js.config()的配置数据格式，详情见官网(['官网'](https://github.com/log4js-node/log4js-node))
		```
		const log4js = require('log4js')
		log4js.configure({
			appenders: {
				DateFile: {type: 'DateFile', filename: 'shannon', pattern: '-yyyy-MM-dd.log'},
				console: {type: 'console'}
			},
			categories: {
				DateFile: {appenders: ['DateFile'], level: 'info'},
				default: {appenders: ['console'], level: 'info'}
			}
		})
		var logger = log4js.getLogger('DateFile')
		logger.info('this is datefile')
		```

- Layout
		+ messagePassThrough: 仅仅输出日志的内容
		+ basic: 在日志的内容前面会加上时间、日志的级别和类别，通常日志的默认 layout
		+ colored/coloured: 在 basic 的基础上给日志加上颜色，appender Console 默认使用的就是这个 layout
		+ pattern: 这是一种特殊类型,可以通过它来定义任何你想要的格式

22. safari 浏览器 
		在开发客户度报表时, safari显示日期异常,原因追踪是
		```
		let firstDay = new Date(dateDetail[0] + '-1' + '-1')
		```
		it seems that YYYY-MM-DD is included in the standard, but for some reason, Safari doesn't support it.([资料](https://stackoverflow.com/questions/4310953/invalid-date-in-safari))
		因此按照资料应该改成 let firstDay = new Date(dateDetail[0] + '/1' + '/1')

23. 小数点加和的问题
		






