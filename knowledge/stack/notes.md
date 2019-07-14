# 杂记


7. 卸载从node官网下载的node
  + **sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*}**



10. web服务器-使用Node.js

11. 权限认证cookie VS token
	+ cookie cookie登录是有状态的，服务端维护一个session客户端维护一个cookie, cookie只保存sessionID服务端要保存并跟踪所有活动的session
	+ token oken 的认证方式是无状态的，服务端不保存登陆状态，也不关心哪些客户端签发了 token ，每个请求都会携带 token 通常在 header 中，也可以出现在 body 和 query




14. 在export default前定义函数 [from project-Site]



16. console.log('Koa server with `koa-body` parser start listening to port %s', port)  **%s**


19. 由 ProcessOn 看到的有意思的东西
	+ [腾讯防水墙](https://007.qq.com/index.html?ADTAG=set.head)
	+ [增加ProcessOn免费文件数](https://github.com/96chh/Upgrade-ProcessOn)













25. 打包

26. console.log()
```
Console.prototype.log = function() {
  this._stdout.write(util.format.apply(this, arguments) + '\n')
}
```








31. MVC MVVC MVP
- MVC
  - View: 用户界面，View传送指令到Controller
  - Controller: 业务逻辑, 完成业务逻辑，要求Model改变状态
  - Model: 数据保存, 将新的数据发送到View，用户得到反馈
互动模式: 通过View接受指令，传递给Controller; 直接通过controller接受指令
- MVP 将controller改名为presenter
  - 各部分之间的通信，双向的
  - View 与 Model不发生联系，都通过Presenter传递
- MVVC  Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致, 唯一的区别是，它采用双向绑定(data-binding), View的变动，自动反映在 ViewModel
[参考](https://www.zhihu.com/question/20148405)









