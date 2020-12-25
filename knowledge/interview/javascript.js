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