
## 遍历对象
1. 
```
function clone(obj){
  var newobj = obj.constructor === Array ? [] : {};  // 用 instanceof 判断也可
  if(typeof obj !== 'object'  || obj === null ){
    return obj
  } else {
    for(var i in obj){
      newobj[i] = typeof obj[i] === 'object' ? clone(obj[i]) : obj[i]; 
      // 只考虑 对象和数组， 函数虽然也是引用类型，但直接赋值并不会产生什么副作用，所以函数类型无需深度克隆。
    }
  }
  return newobj;
};
```
在这个地方需要回顾一下typeof方法，
- null => object 
- undefined => undefined
- string => string
- boolean => boolean
- number => number
***

2. json 序列化
```
let newObj = JSON.parse(JSON.stringify(obj))
```
