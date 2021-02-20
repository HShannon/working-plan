// function New(fnc){
//   let res = {};
//   if(fnc.prototype !== null){
//     res.__proto__ = fnc.prototype;
//   }
//   let ret = fnc.apply(res, Array.prototype.slice.call(arguments, 1))
//   if(ret !== null && (typeof ret === 'object' || typeof ret === 'function')){
//     return ret;
//   }
//   return res
// }

function Person(name, age, sex){
  this.name = name;
  this.age = age;
  this.sex = sex;
}

// let person1 = new Person('shannon', 12, 'female')
// let person2 = New(Person, 'shannon', 12, 'female')
// console.log(person2)

function jsonStringify(obj){
  let type = typeof obj;
  if(type !== 'object'){
    if(/string|undefined|function/.test(type)){
      obj = '"' + obj + '"'
    }
    return String(obj)
  }else{
    let json = [];
    let isArr = Array.isArray(obj)
    for(let k in obj){
      let v = obj[k];
      let type = typeof v;
      if(/string|undefined|function/.test(type)){
        v = '"' + v + '"'
      }else if(type === 'object'){
        v = jsonStringify(v)
      }
      json.push((isArr ? "" : '"' + k + '":') + String(v))
    }
    return (isArr ? "[" : '{') + String(json) + (isArr ? "]" : "}")
  }
}

// console.log(jsonStringify({x : 54, y: 2}))
// console.log(JSON.stringify('dafadsfa'))

// 手写 call2
Function.prototype.call2 = function(context = window){
  let key = Symbol();
  context[key] = this;
  let args = [...arguments].slice(1);
  let result = context[key](...args);
  delete context[key];
  return result
}

// 手写 apply
Function.prototype.apply2 = function(context = window){
  let key = Symbol();
  context[key] = this;
  let result;
  if(arguments[1]){
    result = context[key](...arguments[1])
  }else{
    result = context[key]()
  }
  delete context[key]
  return result
}

// bind 函数
Function.prototype.bind2 = function(context){
  if(typeof this !== 'function'){
    throw Error("not a function")
  }
  let fn = this;
  let args = Array.prototype.slice.call(arguments, 1);
  return function(){
    let innerArgs = Array.prototype.slice.call(arguments);
    return fn.apply(context, args.concat(innerArgs))
  }
}

// 继承 寄生组合式继承
function SuperType(name){
  this.name = name;
  this.color = ['red', 'blue', 'orange'];
}

function subType(name, age){
  SuperType.call(this, name);
  this.age = age
}

subType.prototype = inheritPrototype(SuperType.prototype)
function inheritPrototype(proto){
  function F(){}
  F.prototype = proto;
  return new F();
}

function Person(name, age, sex){
  this.name = name;
  this.age = age;
  this.sex = sex;
}

// function New(func){
//   let res = {};
//   if(func.prototype !== null){
//     res.__proto__ = func.prototype
//   }
//   let ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
//   if((ret !== null) && (typeof ret === 'object' || typeof ret === 'function')){
//     return ret
//   }
//   return res
// }

function New(func){
  let res = {};
  if(func.proto !== null){
    res.__proto__ = func.prototype
  }
  let ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
  if((ret !== null) && (typeof ret === 'object' || typeof ret === 'function')){
    return ret
  }
  return res
}

Function.prototype.call3 = function(context = window){
  let key = Symbol();
  context[key] = this;
  let args = arguments.slice(1)
  let result = context[key](...arguments)
  delete context[key]
  return result
}

Function.prototype.apply3 = function(context = window){
  // 避免与原属性冲突
  let key = Symbol();
  context[key] = this;
  let result;
  if(arguments[1]){
    result = context[key](...arguments[1])
  }else {
    result = context[key]()
  }
  delete context[key]
  return result
}

// 检测是李是函数 是: 下一步; 不是: 抛出错误
Function.prototype.bind3 = function(context){
  if(typeof this !== 'function'){
    throw Error("not a function")
  }
  let fn = this;
  let args = Array.prototype.slice.call(arguments, 1);
  return function(){
    let innerArgs = Array.prototype.slice.call(arguments);
    return fn.apply(context, args.concat(innerArgs));
  }
}

// 继承大法 简单版本的柯里化
function curry1(fn){
  let args = Array.prototype.slice.call(arguments,1);
  return function(){
    let newArgs = Array.prototype.slice.call(arguments);
    return fn.apply(this, args.concat(newArgs))
  }
}

// function add(a, b){
//   return a + b;
// }

// let curryAdd = curry(add);
// console.log(curryAdd(1,2))

function curry(fn, args){
  var length = fn.length;
  var args = args || [];
  return function(){
    newArgs = args.concat(Array.prototype.slice.call(arguments));
    if(newArgs.length < length){
      return curry.call(this, fn, newArgs)
    }else{
      return fn.apply(this, newArgs)
    }
  }
}

function add(a, b, c){
  return a + b + c
}
let addCurry = curry(add);
console.log(addCurry(2)(3)(4))






