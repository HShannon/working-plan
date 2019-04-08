### weChat-server 学习笔记

#### log4js
+ 日志分级, 级别由低到高
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
  
+ 日志分类 Logger 实例的类型，区分日志的维度, **getLogger()的参数**

+ 日志落盘 Appender, 默认打印到控制台
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

+ DateFile 注意log4js.config()的配置数据格式，详情见官网([官网](https://github.com/log4js-node/log4js-node))
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
+ Layout
	+ messagePassThrough: 仅仅输出日志的内容
	+ basic: 在日志的内容前面会加上时间、日志的级别和类别，通常日志的默认 layout
	+ colored/coloured: 在 basic 的基础上给日志加上颜色，appender Console 默认使用的就是这个 layout
	+ pattern: 这是一种特殊类型,可以通过它来定义任何你想要的格式
***

