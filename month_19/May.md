#### 2019-04-29 —— 2019-05-05
1. 工作
  - [ ] 数据平台整体报表优化 测试中
    - bug-list
      - [x] 下载的文件中，现金、返点、赠款，需要保留两位小数
      - [x] 列表无数据显示 --
      - [x] csv乱码  咱不修改
      - [ ] 
  - [ ] 广告数详情 联调
  - [ ] 客户数据分析报表增加离线下载   开发
  - [x] 离线下载任务失败可删除 开发
  - [ ] 隐藏权限申请   开发

2. 学习
  - [ ] 其他平台学习
    - [ ] audit
    - [ ] dashboard
      - [x] 离线下载

3. 思考
  - csv文件打开乱码的问题, 转化格式
  - process.env.NODE_ENV
  ```
  "script": {
    "dev": "export NODE_ENV=development; node build/dev-server.js",
  }
  ```