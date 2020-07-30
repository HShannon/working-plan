/**
 * js 类的继承大法
 */
function Animal(){
  this.name = 'animal';
}
Animal.prototype.sayName=function(){
  console.log(this.name)
}
function Person(){}
Person.prototype = Animal.prototype
Person.prototype.constructor = Person

/**
 * 属性复制大法
 */
function Animal(){
  this.name = 'animal';
}
Animal.prototype.sayName=function(){
  console.log(this.name)
}
function Person(){}
for(prop in Animal.prototype){
  Person.prototype[prop] = Animal.prototype[prop]
}
Person.prototype.constructor=Person

/**
 * 构造器应用法
 */
function Animal(){
  this.name = 'animal';
}
Animal.prototype.sayName=function(){
  console.log(this.name)
}
function Person(){
  Animal.call(this);
}

/**
 * 设计模式, 分别为 工厂
 */
function Person(){ this.name="airu"}
function Animal(){ this.name="maomao"}
function Factory(){}
Factory.prototype.getInstance=function(className){
  return eval('new' + className + '()');
}




