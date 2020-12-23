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