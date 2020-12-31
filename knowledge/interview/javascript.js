// 手写 new
function myNew(fn, ...args){
  let instance = Object.create(fn.prototype);
  let result = fn.call(instance, ...args);
  return typeof result === 'object' ? result : instance;
}

function myNewSencond(){
  const obj = new Object();
  Constructor = Array.prototype.shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  let ret = Constructor.apply(obj,arguments); // 判断构造函数是否存在返回值
  return typeof ret === 'object'? ret : obj;
}

function Student(name, age){
  this.name = name;
  this.age = age;
}

// 手写 instanceof
function myInstanceof(left, right){
  let proto = Object.getPrototypeOf(left);
  while(proto){
    if(proto === right.prototype){
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

// 手写 call
Function.prototype.myCall = function(context, ...arguments){
  context = context || window;
 let key = Symbol();
 context[key] =this;
 let result = context[key](...arguments);
 delete context[key];
 return result;
}

// 手写 apply
Function.prototype.myApply = function(context, arugments){
 context = context || window;
 let key = Symbol();
 context[key] = this;
 let result = context[key](...arugments);
 delete context[key];
 return result;
}

Function.prototype.myBind = function(context){
 if(typeof this !== 'function'){
   throw new Error(
     "Function.prototype.bind - what is trying to be bound is not callable"
   );
 }
 let self = this;
 let args = Array.prototype.slice.call(arguments, 1);
 return function(){
   let innerArgs = Array.prototype.slice.call(arguments);
   return self.apply(context, args.concat(innerArgs))
 }
}

// 面经题
function Counter(){
  var start = Date.now();
  this.num = 0;
  this.timer1 = setInterval(function(){
    this.num++
    var gap = Date.now() - start;
    console.log('timer1', this.num, gap);
  }, 996)
  JSON.parse('{"desc":"..."}')
  this.timer2 = setTimeout(() => {
    this.num++;
    var gap = Date.now() - start;
    console.log('timer2', this.num, gap);
  }, 0)
}

// JSONP: 函数还有一些需要优化的地方 https://juejin.cn/post/6844904151369908232#heading-39
function jsonp({
  url,
  params = {},
  callbackKey = 'cb',
  callback
}){
  const callbackName = 'JsonpCallback'
  params[callbackKey] = callbackName;
  window[callbackName] = callback;
  const paramstring = Object.keys(params).keys.map(item => {
    `${item}=${encodeURIComponent(params[item])}`
  }).join('&')
  const oScript = document.createElement('script');
  oScript.setAttribute('type', 'text/javascript');
  oScript.setAttribute('src', `${url}?${paramstring}`);
  document.body.appendChild(oScript);
}

// 立即执行函数
// console.log(module.paths)

let promiseArr = [1, 2, 4];
function aysncPrint(promiseArr) {
  promiseArr.reduce((pre, cur) => {
    return pre.then(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(console.log(cur)), 1000)
      })
    })
  }, Promise.resolve())
}

// 获取 cookie
function getCookie(name){
  let match = document.cookie.match(new RegExp('(^| )' + name + '([^;]*)'));
  if(match) return unescape(match[2]);
}
