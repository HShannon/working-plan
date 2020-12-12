// 1
var a = {x:1}
var b = a
a.x = a = {n:1} // a指向了一个新地址
console.log(a)  // {n:1}
console.log(b)//{x:{n:1}}

// 2
Function.prototype.a=()=>alert(1)//加到函数上
Object.prototype.b=()=>alert(2)//加到对象上
function A(){} // A.prototype.__proto__ = Object
const a = new A() //a.__proto__ = A.prototype
a.a() // 直接报错
a.b() // 2

// 3
let a =0
console.log(a) // 0 
console.log(b) //报错 b is not defined
let b = 0
console.log(c)
function c() {}

//4
var x = 10
function a(y) {
var x = 20;
return b(y)
}
function b(y) {
return x+y
}
a(20) // 30
// 看当前函数是在哪个作用域下定义的，那么它的上级作用域就是谁
// 和函数在哪执行没有任何关系

// 5

console.log(1)
setTimeout(()=>{
  console.log(2)
})
process.nextTick(()=>{
  console.log(3)
})
setImmediate(()=>{
  console.log(4)
})
new Promise(resolve=>{
  console.log(5)
  resolve()
  console.log(6)
}).then(()=>{
  console.log(7)
})
Promise.resolve().then(()=>{
  console.log(8);
process.nextTick(()=>{
  console.log(9)
})
})

// 6
[1,2,3,4,5].map(parseInt)
//[1,NaN,NaN,NaN,NaN] 第二个参数代表 几进制


// 7
typeof typeof typeof []  // 'string'
// typeof 对于原始类型来说，除了 null 都可以显示正确的类型
// typeof 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型

// 8、css颜色
{/* <style>
div {color:red}
#title {color:yellow}
div.title {color:blue}
</style>
<div>class="title" id="title">abc</div> */}

// 9、考察css 优先级

// 一万个class也不如一个id权值高）
// 内联样式表的权值为 1000
// ID 选择器的权值为 100
// Class 类选择器的权值为 10
// HTML 标签选择器的权值为 1
// 　四个级别分别为：行内选择符、ID选择符、类别选择符、元素选择符。

// 　　优先级的算法：

// 　　每个规则对应一个初始"四位数"：0、0、0、0

// 　　若是 行内选择符，则加1、0、0、0

// 　　若是 ID选择符，则加0、1、0、0

// 　　若是 类选择符/属性选择符/伪类选择符，则分别加0、0、1、0

// 　　若是 元素选择符/伪元素选择符，则分别加0、0、0、1
{/* <style> 
        .classa.classb （中间没有空格）
        { 
            background:green; 
            border: 1px solid blue ; 
        }
        .classa {
            background:red;
        }
        .classb {
            background: greenyellow;
        }
        .classa .classb 
        { 
        background:yellow; 
        border: 1px solid black ; 
        } 
        </style> 

 // .classa.classb 作用于这个 
 <input type="text" class="classa classb"/> 
 // .classa .classb作用于这个
 <div class="classa"> 
    <input type="text" class="classb"/> 
 </div>  */}

//  10 请解释一下什么是BFC IFC FFC

// 11、display:none和visibility:hidden的区别

// display:none 元素会消失 不再占据空间 即使给子元素设置display:block也不会出现 既回流 又重绘
// visibility:hidden 元素只是看不见 但不会消失 仍占据空间 影响布局 给子元素设置 visibility:visible能出现 只重绘 不回流
//  重绘：当某一个DOM元素样式更改（位置没变只是样式更改，例如：颜色变为红色...）浏览器会重新渲染这个元素
//  *   box.style.color='red'
//  *   //...还有一些其它代码
//  *   box.style.fontSize='16px'
//  *
//  *   上面的操作触发了两次重绘，性能上有所消耗，真实项目中为了优化这个性能，我们最好一次性把需要修改的样式搞定，例如：
//  *   .xxx{
//  *      color:'red',
//  *      fontSize:'16px'
//  *   }
//  *   box.className='xxx'
// * 回流：当DOM元素的结构或者位置发生改变（删除、增加、改变位置、改变大小...）都会引发回流，所谓回流，就是浏览器抛弃原有计算的结构和样式，从新进行DOM TREE或者RENDER TREE，非常非常非常...消耗性能
// 14、css中常见的长度单位有哪些 都有哪些区别
// A)绝对长度单位 彼此固定 不会因为其他元素的尺寸变化而变化 主要有cm mm pt(点 1.33px) px pc(16px) in(英尺 96px)
// B)相对长度 % em (一个字符的大小 浏览器默认16px) rem vh(1vh 相当于高度的1%) vw(1vw 相当于宽度的1%)

// 15、img的alt和title有什么不同
// alt是图片无法显示的时候 对无法显示的对象起描述作用 图片显示时不表现
// title 是图片的标题主题 只要img标签存在 不管是否显示图片 鼠标停滞在此处时都会浮现 

// 16 、你如何理解ally.js 这是一个js库 自己查一下


// 17、请解释node中垃圾回收算法主要有哪些，分别使用在什么场景
// Node通过JavaScript使用内存的话会有限制，而且Node无法直接操作大内存对象。64位系统下约为1.4GB，而32位系统下约为0.7GB。原因是Node基于V8构建，它的内存分配和管理都是由V8来控制，虽然在浏览器下这种分配机制没有问题，但是在Node中却是有问题的。
// 我们试想一下假如有1.5GB的垃圾需要等待回收，而V8的垃圾回收机制运行一次需要每50毫秒以上，在这段时间内，程序会无法运行
// 假如说我非要打开这个限制也不是不行，我们可以在Node的启动时候更改一下参数即可：
// node --max-old-space-size=1700   xxx.js    //单位是MB
// node --max-new-space-size=1024  xxx.js    //单位是KB

// 上面代码的意思就是新生代和老生代空间的更改
// 在V8中，我们知道内存空间可以分为新生代和老生代。新生代空间主要是保存一些存活时间较短的对象，而老生代空间主要存储一些存活时间较长的对象
// 之前说过64位系统只能使用约1.4GB，32位只能使用0.7GB的空间。这空间是包含新生代和老生代空间，且老生代的空间比新生代要多。
// 主要有类算法，第一是Scavenge算法，第二是Mark-Sweep & Mark-Compact。新老生代的特点如下：
// 新生代：存活对象较少
// 老生代：存活对象较多
// ①Scavenge算法
// 把新生代空间一分为二，为From空间和To空间
// 内存先分配到From空间，垃圾回收会检查From空间存活情况
// 把From空间的存活对象移到To空间，释放From空间
// 把From和To空间对换
// 这就完成了垃圾回收的一次清理过程。
// ②Mark-Sweep算法（标记清除）
// 遍历堆中的所有对象，标记存活的对象
// 清除没有被标记的对象
// ③Mark-Compact算法（标记整理）
// 我们看到上面这种算法回收一次过后**产生了零碎的内存空间，假如这时候进来一个比较大的内存对象就无法完成分配，提前触发新一轮的垃圾回收机制。所以基于这个问题，在原来算法的基础上，采用压缩**的办法，在标记活对象的过程中，对象会往一边移动。然后标记完成之后直接清除边界的内存。
// // 新生代和老生代之间的转换
// 1. 经历过一次Scavenge回收的；2.在复制过程中，To空间已经使用超过25%；
// 至于为什么是25%，在复制结束后，To空间变为From空间，这个空间要继续承担内存分配，如果占比过高会影响后续的内存使用

// 增量标记：：----- 早期V8在垃圾回收阶段，采用全停顿，也就是垃圾回收时程序运行会暂停；这在前端使用js时还没有缺点显现，但是在node中，内存使用高，在老生代的垃圾回收中，标记时间很容易超过100ms，全停顿导致程序卡滞很明显，于是v8引入了增量标记，将标记动作分成若干个步骤，每运行一段时间标记动作，就停下运行一段时间程序，如此交替，程序运行流畅了很多

// 3种算法比较
// 回收算法 Mark-Sweep Mark-Compact Scavenge
// 速度 中等 最慢 最快
// 空间开销 少，有碎片 少 无碎片 双倍空间 无碎片
// 是否移动对象 否 是 是
// 老生代的中存放的数据垃圾回收主要采用标记清除(Mark-Sweep)和标记整理(Mark-Compact)。这两种方式并非互相替代关系，而是配合关系，在不同情况下，选择不同方式，交替配合以提高回收效率。


// 17、什么是死锁 以及死锁产生的必要条件
// 所谓死锁，是指多个进程在运行过程中因争夺资源而造成的一种僵局，当进程处于这种僵持状态时，若无外力作用，它们都将无法再向前推进。
// 产生死锁的必要条件：
// 互斥条件：进程要求对所分配的资源进行排它性控制，即在一段时间内某资源仅为一进程所占用。
// 请求和保持条件：当进程因请求资源而阻塞时，对已获得的资源保持不放。
// 不剥夺条件：进程已获得的资源在未使用完之前，不能剥夺，只能在使用完时由自己释放。
// 环路等待条件：在发生死锁时，必然存在一个进程--资源的环形链。

// 预防死锁：
// 资源一次性分配：一次性分配所有资源，这样就不会再有请求了：（破坏请求条件）
// 只要有一个资源得不到分配，也不给这个进程分配其他的资源：（破坏请保持条件）
// 可剥夺资源：即当某进程获得了部分资源，但得不到其它资源，则释放已占有的资源（破坏不可剥夺条件）
// 资源有序分配法：系统给每类资源赋予一个编号，每一个进程按编号递增的顺序请求资源，释放则相反（破坏环路等待条件）

// 18、实现一个算法，要求每个数组出现在每个位置概率是平均的
// （数组乱序）

// 19、补充代码
function add() {

}

function one() {

}

function two() {

}

console.log(one(add(two())))
//3
console.log(two(add(one())))
// 3
// 20、请实现一个cacheRequest方法，保证当使用ajax请求相同资源时，真实网络层中，实际只发出一次请求
// （假设已经存在request方法用于ajax请求，调用格式为：request(url,successCallback,failCallback)）

// 比如调用方代码如下
//a.js
cacheReuest('/user',data=>{
  console.log('我是从A中请求的user,数据为'+ data);
})

//b.js
cacheReuest('/user',data=>{
  console.log('我是从B中请求的user,数据为'+ data);
})