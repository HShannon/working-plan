### dashboard 学习笔记

#### safari浏览器 日期异常
+ 在开发客户度报表时, safari显示日期异常,原因追踪是
  ```
  let firstDay = new Date(dateDetail[0] + '-1' + '-1')
  ```
+ it seems that YYYY-MM-DD is included in the standard, but for some reason, Safari doesn't support it.([资料](https://stackoverflow.com/questions/4310953/invalid-date-in-safari))，因此按照资料应该改成 
  ```
  let firstDay = new Date(dateDetail[0] + '/1' + '/1')
  ```
***

#### 小数点加和的问题
+ 在修复流量漏斗过程中，发现了类似1.1 + 1.21 = 2.3099999999 的现象，查询资料发现计算机的基础的确欠缺的
+ 阿博同学的csdn([浮点数的存储方式](https://blog.csdn.net/weixin_43243484/article/details/88872146))
***

#### 在开发dsp报表优化时的小细节
+ 用 isNaN() 过滤数字字符串、以及数字 
+ Object.keys() 会对属性名进行排序, 数字(数字字符串)优先 ([网上资料](http://jartto.wang/2016/10/25/does-js-guarantee-object-property-order/))。解决方案: Map
***

#### 在线广告详情数 Array.prototype.push
```
let animals = ['pigs', 'goats', 'sheep'];

console.log(animals.push('cows'));
// expected output: 4

console.log(animals);
// expected output: Array ['pigs', 'goats', 'sheep', 'cows']
```
so young so navie 😢
***

#### Login

+ let host = req.headers.host  
```
{ cookie: 'LXDEVICEID=SFX24vPGa15tltK; LXSESSIONID=cf942f05e8d12a3c7ffe87ed0786a84d; JSESSIONID=zRveXGDIM6TTvkRwoMDSHw; LX_SESSION_ID=cf942f05e8d12a3c7ffe87ed0786a84d; _ga=GA1.2.1423384421.1554261663; _gid=GA1.2.1053159346.1554261663; _gat_gtag_UA_136766659_1=1; third-monitor=eyJseFNlc3Npb25JZCI6ImNmOTQyZjA1ZThkMTJhM2M3ZmZlODdlZDA3ODZhODRkIiwidXNlciI6eyJzdGF0dXMiOjAsInVzZXJuYW1lIjoid2FuZ3lhcnVAeWlkaWFuLWluYy5jb20iLCJ1c2VySWQiOjcwMjIxMzcyOCwiZXhwaXJlIjoiMjAxOS0wNC0wMyAxMTo1Mjo1NCIsInRpbWUiOjE1NTQyNjM1NzQ2NDksInRpbWVvdXQiOjE4MDAwMDAsInBob25lIjoiMTgxNDgxNTc4NTYiLCJlbWFpbCI6Indhbmd5YXJ1QHlpZGlhbi1pbmMuY29tIiwic2Vzc2lvbklkIjoiY2Y5NDJmMDVlOGQxMmEzYzdmZmU4N2VkMDc4NmE4NGQiLCJiaW5kUGhvbmUiOnRydWUsImlwIjpudWxsLCJyZWFsTmFtZSI6bnVsbCwiZGVwYXJ0bWVudCI6bnVsbCwiY29va2llIjp7IkpTRVNTSU9OSUQiOiJ6UnZlWEdESU02VFR2a1J3b01EU0h3In0sImNvb2tpZUluZm8iOiJKU0VTU0lPTklEPXpSdmVYR0RJTTZUVHZrUndvTURTSHciLCJ1Y1VybCI6Imh0dHA6Ly9sb2dpbi1hZHMueWlkaWFuLWluYy5jb206OTA2MCJ9fQ==; third-monitor.sig=ME0YlJK8CWPKVfnLgT4DVq9ddYM',
  'accept-language': 'zh-CN,zh;q=0.9',
  'accept-encoding': 'gzip, deflate',
  referer: 'http://data.yidianzixun.com:8080/index2.html',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
  'x-requested-with': 'XMLHttpRequest',
  accept: 'application/json, text/plain, */*',
  connection: 'close',
  host: 'localhost:3008' }
```

+ let refer =  'http://' + host + req.originalUrl
```
http://localhost:3008/api/preview/trend?showType=&productId=&platform=&ifReturnHour=0&dateBegin=2019-03-27&dateEnd=2019-04-02&adsSource=&app=&ifReturnDate=1&_=1554261775625&_ts=1554192804961
```
+ let lxsession = req.cookies.LX_SESSION_ID;
```
lxsession: cf942f05e8d12a3c7ffe87ed0786a84d
```

+ ajax访问登录超时则返回状态数据 url直接访问请求则redirect
  + ajax  
    url = url + req.headers.referer = http://login.yidianzixun.com/login/callback
  + url直接访问  

+ requestify

#### logger
```
log4js.configure({
  appenders: [
    {
      type: 'console',
      category: 'report'
    }
  ]
})

// 线上环境是INFO级别
// 线下环境是TRACE级别
let level = process.env.NODE_ENV === 'development' ? 'TRACE' : 'INFO'

let logger = log4js.getLogger('report')
logger.setLevel(level)
```
#### AUTH_LIST
+ 数据结构
```
{
  id: 3000,
  name: '流量漏斗',
  parentId: 0,
  index: 'funnel',
  path: '',
  serverPath: ['^/api/sys'],
  iconClasses: 'fa fa-sort-amount-desc',
  sort: 20
},
{
  id: 3001,
  name: '开屏广告',
  parentId: 3000,
  index: '/funnel-start',
  path: '/funnel-start',
  serverPath: '^/api/flow_funnel',
  iconClasses: '',
  childs: [
    {
      name: '整体概览',
      index: '/funnel-start'
    },
    {
      name: '分天数据',
      index: '/funnel-start-details'
    }
  ]
},
``` 
![window](../../public/image/Login_Auth.jpg "koa-compose")

