# HTML 5 脚本编程

## 1. postMessage
- 向包含在当前页面中的 iframe 元素，或者由当前页面弹出的窗口
- postMessage.postMessage(消息，接收消息放来自那个域的字符串)
  - 第二个参数为 '*', 可以把消息发送给来自任意域的文档
- 触发 message 事件后
  - data
  - origin
  - source
```
//获取iframe元素
iFrame = document.getElementById('myframe')
iFrame.onload = function(){
  iFrame.contentWindow.postMessage('MessageFromIndex1','*');
}
```
```
window.addEventListener('message', receiveMessage, false)
function receiveMessage(event){
  console.log( 'receiveMessage', event )
}
```

## 2. 可拖拽
```
<body>
  <div draggable="true" class="odiv"></div>
  <div class="odiv"></div>
</body>
<style>
  .odiv{
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 10px;
  }
</style>
```