# [JavaScript](https://time.geekbang.org/column/article/78884)

## JavaScript 类型
1. 类型
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

2. 类型转换

|  |  Null | Undefined | Boolean(true) | Boolean(false) | Number | String | Symbol | Object |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| Boolean | false | false | - | - | 0/NaN ~ false | '' ~ false | true | true | 
| Number | 0 | NaN | 1 | 0 | - | StringToNumer | TypeError | **拆箱转换** |
| String | ‘null' | 'undefined' | 'true' | 'false' | NumberToString | - | TypeError | **拆箱转换** |
| Object | **TypeError** | **TypeError** | **装箱转换** | **装箱转换** | **装箱转换** | **装箱转换** | **装箱转换** | - |

- 装箱转换  
每一种基本类型 Number、String、Boolean、Symbol 在对象中都有对应的类. 把基本类型转换为对应的类
```
// 全局的Symbol 无法使用 new 来调用
var symbolObject = (function(){ return this}).call(Symbol('a'))

console.log(typeOf symbolObject)   // Object
console.log(symbolObject instanceOf Symbol)   //true
console.log(symbolObject.constructor == Symbol)   // true
```
- 拆箱转换  
把对象类型转换到基本类型, 把对象变成基本类型, 再从基本类型转换成对应的 String 或者 Number。拆箱转换会尝试调用 valueOf 和 toString 来获得拆箱后的基本类型，如果valueOf 和 toString 都不存在, 或者没有返回基本类型, 则会产生类型错误
***

3. typeof

| example | typeof | 运行时类型 |
| :--: | :--: | :--: |
| null | object | null |
| {} | object | object |
| function(){}| function | object |
| void 0 | undefined | undefined |
| 'shannon' | string | string |
| 12 | number | number |
| true | boolean | boolean |
| symbol('a') | symbol | symbol |

## [什么是面向对象](https://time.geekbang.org/column/article/79319)
1. JavaScript 对象的特性
  - 对象具有唯一标识: 内存
  - 对象有状态: 属性
  - 对象具有行为: 方法
***

2. 属性区分为 数据属性 和 访问器属性
-  数据属性(property)具有4个特性(attr)
  - value
  - writable
  - enumberable
  - configurable
- 访问器(getter / setter)属性
  - getter: undefined / function
  - setter: undefined / function
  - enumerable
  - configurable
通过 Object.getOwnPropertyDescripter(obj, prop) 获取属性的特性，可通过 Object.defineProperty(obj, prop, option: object) 改变属性的特征, 或者定义访问器属性  

**在创建对象时，也可以使用 get 和 set 关键字来创建访访问器属性**
```
var o = { get a() { return 1 } }
console.log(o.a)    // 1
```
👉  summary: JavaScript 对象运行时是一个"属性的集合", 属性以字符串或Symbol 为key, 以数据属性(property) 或 访问器属性特征值为value
***

3. JavaScript 原型的方法
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
// useage of create
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
```
***

4. new 运算
- 以构造器的prototype属性为原型，创造新对象
- 将 this 和调用参数传给构造器，执行
- 如果构造器返回的是对象，则返回，否则返回第一步创建的对象
提供了两种方法，一是在构造器中添加属性，而是在构造器的 prototype 属性上添加属性
***

5. es6 类 Tip  
定义类的方法时，前面不需要加上function 关键字。constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认添加; 在箭头函数中，由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号; 箭头函数体内的 this 对象，始终指向定义时所在对象，而不是使用时所在的对象;

## 对象分类
JavaScript中的对象分类为**宿主对象**和**内置对象**  

1. 宿主对象
JavaScript 宿主环境提供的对象  
例如浏览器环境中的全局对象是 window, window 上又有很多其他的属性，如 document
***

2. 内置对象分为固有对象, 原生对象、普通对象
  - 固有对象: 由标准生成，随着 JavaScript 运行时创建而自动创建的对象
  - 原生对象: 能够通过语言本身的构造器创建的对象称作原生对象
  - 普通对象: 由 {} 语法、 Object 构造器或者 class 关键字定义类创造的对象
***

3. 函数对象 和 构造函数对象  
> 函数对象是指具有 call 私有字段的对象, 构造函数对象是指具有私有字段 construct 的对象。任何对象只需要实现 call, 它就是一个函数对象，可以作为函数被调用, 如果它能够实现 construct， 他就是一个构造器对象，可以作为构造器被调用 
```
function Fn(){
  this.a = 100
  return {
    getValue: () => this.a
  }
}
let o = new Fn()
o.getValue() // a = 100, a 是私有的
```
***

4. 不使用 new 运算符，尽可能找到获得对象的方法  
```
// 利用字面量
var a = [], b = {}, c = /abc/g
// 利用dom api (宿主对象)
var d = document.createElement('p')
// 利用JavaScript内置对象的api
var e = Object.create(null)
var f = Object.assign({k1:3, k2:8}, {k3: 9})
var g = JSON.parse('{}')
// 利用装箱转换
var h = Object(undefined), i = Object(null), k = Object(1), l = Object('abc'), m = Object(true)
```

## JavaScript 执行
1. Js 运行机制

> 宿主是指 js 的运行环境, 目前主流的 js 的主流运行环境有浏览器、 Node。每个宏观任务中又包含一个微观任务队列, Promise 永远在队列尾部添加微观任务. setTimeOut 等宿主API, 会添加宏观任务  

异步执行的顺序:
  - 首先分析有多少个宏任务
  - 在每个宏任务中，分析有多少个微任务
  - 根据调用次序，确定宏任务中的微任务执行次序
  - 根据宏任务的触发规则和调用次序，确定宏任务的执行次序
  - 确定整个顺序
```
function sleep(duration) {
  return new Promise(function(resolve, reject) {
    console.log("b")
    setTimeout(resolve,duration)
  })
}
console.log("a")
sleep(5000).then(()=>console.log("c"))
```

2. promise && 新特性 async/await  
async 函数必定返回 Promise, 把所有返回 Promise 的函数都可以认为是异步函数
```
function sleep(duration) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve,duration);
  })
}
async function foo(name){
  await sleep(2000)
  console.log(name)
}
async function foo2(){
  await foo("a")
  await foo("b")
}
foo2()
```

3. 练习题 - 循环点亮一个方块，3秒绿灯、1秒黄灯、2秒红灯
```
let odiv = document.getElementById("traffic-light")
// odiv.style.background = 'red'

function sleep(duration) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, duration)
    })
}

async function changeColor(color, duration) {
  odiv.style.background = color
  await sleep(duration)
}

async function cycle(){
  while(true){
    await changeColor('green', 3000)
    await changeColor('yellow', 1000)
    await changeColor('red', 2000)
  }
}

cycle()
```

## 闭包和执行上下文到底是什么
1. 闭包  
闭包是指绑定了绑定了执行环境的函数。闭包的由两部分组成，分别为环境部分和表达式部分
- 环境部分
  - 环境, 函数的词法环境（执行上下文的一部分）
  - 标识符列表, 函数中用到的未声明的变量
- 表达式部分， 函数体


2. 执行上下文, Js 执行的运行环境, 运行环境主要包括三类，分别包括:
- 全局执行上下文/作用域：js代码的默认执行环境（只有一个）
- 函数执行上下文/作用域：每个函数对应的执行环境（无限多个）
- eval代码执行上下文：使用eval执行的脚步的执行环境  
全局作用域中的方法、变量，可以被其它任何函数作用域所访问，函数作用域中的方法变量，在子函数作用域中可以访问，外部无法直接访问  
**通过函数返回的子函数去访问函数作用域的私有变量，也就形成了闭包**

## 函数
1. es2018 中, 函数有普通函数, 箭头函数, 在 class 中定义的函数, 生成器函数, 普通函数、箭头函数和生成器函数上 async 关键字。用 class 定义的类，实际上也是函数
```
// 普通函数
function fn() {
  // code
}

// 箭头函数
const foo = () => {

}

// 在 class 中定义的函数
clss class(){
  foo(){

  }
}

// 生成器函数
function *foo(){

}

// 
```
2. this 关键字的行为  
this 是执行上下文中重要的一个组成部分，同一个函数调用方式不同，得到的this值也不同。普通函数的this值是由“调用它所使用的引用”决定。Reference 类型由两部分组成，一个对象和属性。针对如下的例子，Reference 中的对象是 o, 属性是showThis. 调用函数时使用的引用，决定了函数执行时刻的 this 值。
```
function showThis(){ console.log(this) }
let o = {showThis: showThis}

showThis() // global
o.showThis() // o
```
在箭头函数中, 不论用什么引用来调用它，都不影响它的 this 值。在类中情况又不一样, 不难验证出, 生成器函数】异步生成器函数和异步普通函数跟普通函数行为一致，异步箭头函数跟箭头函数行为一致
```
class C {
    showThis() {
        console.log(this);
    }
}
var o = new C();
var showThis = o.showThis;

showThis(); // undefined
o.showThis(); // o
```

3. this 关键字的机制
在 js 标准中, 为函数规定了用来保存定义时上下文的私有属性为[[Environment]]

#### HTML

#### CSS

#### 前端工程实践


