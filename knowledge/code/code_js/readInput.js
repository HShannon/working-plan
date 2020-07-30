/**
 * createReadStream 流
 */
var fs = require("fs");
var data = '';
var readerStream = fs.createReadStream('input.txt');
// 设置编码为 utf8。
readerStream.setEncoding('UTF8');
// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});
readerStream.on('end',function(){
   console.log(data);
});
readerStream.on('error', function(err){
   console.log(err.stack);
});
console.log("程序执行完毕");
/**
 * createWriteStream 流
 */
let writerStream = fs.createWriteStream('output.txt');
let writeData = 'ILY';
writerStream.write(writeData, 'utf8');
writerStream.end();
writerStream.on('finish', function() {
  console.log("写入完成。");
});
writerStream.on('error', function(err){
  console.log(err.stack);
});
console.log("程序执行完毕");
/**
 * 读取文章
 */
fs.readFile('input.txt', function(err, data) {
  if(err){
    return console.error(err);
  }
  console.log("异步读取: " + data.toString());
})
console.info('hello world')