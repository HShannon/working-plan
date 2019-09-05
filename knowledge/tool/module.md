# module

## node 模块 
require 导出的是 module.exports 指向的内存块内容
```
exports = module.exports = {}
```

## export && export default
1. export 与 export default 可用于导出常量、函数等
2. 在文件或模块中，export、import可以有多个，export default仅有一个
3. 模块中通过 export  导出的属性或者方法可以修改，通过 export default 导出的不可以修改
3. 通过export方式导出，在导入时要加{ }，export default则不需要



