#### koa-body
1. koa-body版本问题。koa-body v3和v4之前通过ctx.request.body捕获文件。而v3.v4终才是通过ctx.request.files.file进行获取。

2. 
```
router.post('/file', async (ctx, next) => {
  console.log(ctx.request.files.file)
  
  const file = ctx.request.files.file
  const reader = fs.createReadStream(file.path)
  let filePath = path.join(__dirname, '../public/upload/') + `${file.name}`
  const upStream = fs.createWriteStream(filePath)
  reader.pipe(upStream)

  ctx.body = '上传成功!'
})
```