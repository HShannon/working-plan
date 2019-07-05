#### [JavaScript](https://time.geekbang.org/column/article/78884)

##### 类型
- Undefined
  JavaScript 的代码 undefined 是一个变量, 而非一个数值， 为了避免无意中篡改，建议使用void 0 来获取undefined 的值
- Null
- Boolean
- Number
  浮点数运算的静笃问题会导致 0.1 + 0.2 != 0.3, 比较浮点数要采用最小精度的比较方法
  ```
  console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON)
  ```
- Symbol
- String
  String 的意义并非“字符串”，而是字符串的 UTF16 编码, 操作chartAt、charCodeAt、length 等方法针对的都是UTF16编码。JavaScript把每个UTF16单元当作一个字符处理
- Object
  - 对象的定义是“属性的集合”， 属性分为数据属性和访问器属性
  - .运算符提供了装箱操作，根据基础类型构造一个临时对象，使得能在基础类型上调用对应对象的方法
***

##### 类型转换
- 装箱转换
```
var symbolObject = (function(){ return this}).call(Symbol('a'))

console.log(typeOf symbolObject)   // Object
console.log(symbolObject instanceOf Symbol)   //true
console.log(symbolObject.constructor == Symbol)   // true
```

- 拆箱转换
对象到String 和 Number 的转换都遵循"先拆箱再转换"的规则, 把对象编程基本类型，再从基本类型转换为对应的String 或者 Number，拆箱转换会尝试调用 valueOf 和 toString 来获得拆箱后的基本类型，如果valueOf 和 toString 都不存在, 或者没有返回基本类型, 则会产生类型错误
***

##### [什么是面向对象](https://time.geekbang.org/column/article/79319)
- JavaScript 对象的特性
  - 对象具有唯一标识: 内存
  - 对象有状态: 属性
  - 对象具有行为: 属性
- 数据属性(property)具有4个特性(attr)
  - value
  - writable
  - enumberable
  - configurable
- 访问器(getter / setter)属性
  - getter: undefined / function
  - setter: undefined / function
  - enumerable
  - configurable
可通过Object.getOwnPropertyDescripter获取属性的特性，可通过Object.defineProperty改变属性的特征, 或者定义访问器属性  
**在创建对象时，也可以使用 get 和 set 关键字来创建访访问器属性**
```
var o = { get a() { return 1 } }
console.log(o.a)    // 1
```
**summary:**  JavaScript 对象运行时是一个"属性的集合", 属性以字符串或Symbol 为key, 以数据属性(property) 或 访问器属性特征值为value
***

##### JavaScript 的原型
- Object.create 根据指定的原型创建新对象，原型可以是 null
- Object.getPrototypeOf 获得一个对象的原型
- Object.setPrototypeOf 设置一个对象的原型
```
var cat = {
    say(){
        console.log("meow~");
    },
    jump(){
        console.log("jump");
    }
}

var tiger = Object.create(cat,  {
    say:{
        writable:true,
        configurable:true,
        enumerable:true,
        value:function(){
            console.log("roar!");
        }
    }
})


var anotherCat = Object.create(cat);

anotherCat.say()

var anotherTiger = Object.create(tiger)

anotherTiger.say()
```
***


##### new运算
- 以构造器的prototype属性为原型，创造新对象
- 将this 和调用参数传给构造器，执行
- 如果构造器返回的是对象，则返回，否则返回第一步创建的对象
提供了两种方法，一是在构造器中添加属性，而是在构造器的prototype属性上添加属性
***


##### es6 类
定义类的方法时，前面不需要加上function 关键字，**直接把函数定义放进去，方法之间不需要逗号分割**
1. constructor 方法  
constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加
2. 由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号。函数体内的this对象，定义时所在对象，而不是使用时所在的对象
3. super
***

#### 经典js 继承

#### JavaScript中的对象分类
- 宿主对象
  - 固有的 window
  - 用户可创建的 document.createElement

- 内置对象
  - 固有对象
  - 原生对象
  - 普通对象
***

#### JavaScript中的对象分类
- 函数对象的定义是: 具有 [[call]] 私有字段的对象。
- 构造器对象的定义是:具有私有字段 [[construct]]的对象

es6 => 箭头函数创建的函数仅仅阐述，无法作为构造器使用
***

#### 对象的深度克隆
- 遍历对象
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

- json 序列化
```
let newObj = JSON.parse(JSON.stringify(obj))
```
***

#### 异步执行顺序
- 首先分析有多少个宏任务
- 在每个宏任务中，分析有多少个微任务
- 根据调用次序，确定宏任务中的微任务执行次序
- 根据宏任务的触发规则和调用次序，确定宏任务的执行次序
- 确定整个顺序
***


#### sleep 新特性async/await
```
function sleep(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}
async function foo(){
    console.log("a")
    await sleep(2000)
    console.log("b")
}

foo()
```
***

#### HTML

#### CSS

#### 前端工程实践


