# MVC MVVC MVP

## MVC
- View: 用户界面，View传送指令到Controller
- Controller: 业务逻辑, 完成业务逻辑，要求Model改变状态
- Model: 数据保存, 将新的数据发送到View，用户得到反馈
互动模式: 通过View接受指令，传递给Controller; 直接通过controller接受指令

## MVP 
将controller改名为presenter  
- 各部分之间的通信，双向的
- View 与 Model不发生联系，都通过Presenter传递

## MVVC  
Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致, 唯一的区别是，它采用双向绑定(data-binding), View的变动，自动反映在 ViewModel  

## 参考
[参考](https://www.zhihu.com/question/20148405)