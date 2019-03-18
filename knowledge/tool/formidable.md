#### POST
1. Post请求不能直接获取，获取post内容需要通过监听实现
```
var http = require('http');
var querystring = require('querystring');
 
http.createServer(function(req, res){
    // 定义了一个post变量，用于暂存请求体的信息
    var post = '';     
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){    
        post += chunk;
    });
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){    
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3000);
```

2. formidadable的简单使用
    + 创建form对象
    ```
    const form = new formidable.IncomingForm()
    ```
    + 使用form.parse()函数接受数据, fields接受的数据
    ```
    form.parse(req,function(err,fields,files){
      console.log(fields);
    });
    ```

3. 使用post上传文件
```
app.post('/api/images', (req, res, next) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = path.join(__dirname, './upload')
  form.parse(req, (err, fields, files) => {
    if (err) console.log(err)
    console.log(files)
  })
  res.json({
    code: 200,
    msg: ''
  })
})
```
+ 设置form.parse前需设置保存地址
```
form.uploadDir = path.join(__dirname, './upload')
```