# dragon 平台  开发笔记

## 代码整理
1. [dva](https://dvajs.com/guide/)
2. [react-dom](https://zh-hans.reactjs.org/docs/react-dom.html)
3. Object.create(null) 与 {} 的区别主要在于 新创建对象的原型
4. [antd](https://ant.design/components/steps-cn/) 组件库
5. prop-types react 自带的类型判断

## Dva 概念
1. 最流行的社区 React 应用架构方案如下
- React-Router 路由
- Redux 架构
- Redux-sage 异步操作

2. dva 应用最简结构
```
import dva from 'dva';
const App = () => <div>Hello dva</div>;
const app = dva();
app.router(() => <App />);
app.start('#root');
```

3. 核心概念
- State: 一个对象，保存整个应用程序
- View: React 组件构成的视图层
- Action: 一个对象，描述事件
- connect 方法: 一个函数，绑定 State 到 View
- dispatch 方法: 一个函数，发送 Action 到 State
State 是存储数据的地方，收到 Action 以后，会更新数据。 View 是 React 组件构成的 UI 层，从 State 获取数据后，渲染成 HTML 代码。只要 State 有变化，View 就会自动更新
