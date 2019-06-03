#### 2019-04-29 —— 2019-05-05
1. 工作
  - [x] 数据平台整体报表优化 测试中
    - bug-list
      - [x] 下载的文件中，现金、返点、赠款，需要保留两位小数
      - [x] 列表无数据显示 --
      - [x] csv乱码  咱不修改
      - [ ] 
  - [x] 广告数详情 联调
  - [ ] 客户数据分析报表增加离线下载   开发
  - [x] 离线下载任务失败可删除 开发
  - [x] 隐藏权限申请   开发

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

#### 2019-05-11 —— 2019-05-18
1. 工作
  - [x] 广告数详情 跟测中
    - [] 
  - [ ] 二级账户来源  开发中
  - [x] 客户数据分析报表增加离线下载   融入数据平台整体优化v5.0
  - [ ] 更新一二级行业列表映射

2. 学习
  - 其他平台学习
    - [ ] audit
    - [ ] dashboard

3. 思考
  - reduce 的高阶用法
    - 
  - CEO 战略会议
    - 首先抛出公司的核心价值，将越来越好的内容，利用越来越好的分发技术，满足不断更新的用户
    - 其次分析公司的定位（巨头，创业公司），充分认识到公司的优劣。
    - 为了更好实现核心价值，结合公司优劣，进行战略部署
      - 主产品做好,下沉(农村包围城市),产品升级(浏览器),轻型产品(结合未来发展趋势)
    - 备注: 坚持走差异化路，这句话听的比较多，个人发展亦是如此, 差异化就是个人的竞争力所在
  - 柯里化
  - 
    ```
    let fn = (a) => {
      let sum = a
      let add = (b) => {
        if(!b) {
          return sum
        }
        sum += b
        return add
      }
      add.valueOf = () => {
        return sum
      }
      add.toString = () => {
        return sum + ''
      }
      return add
    }

    console.log(fn(1)(2))
    ```

#### 2019-05-19 —— 2019-05-26
1. 工作
  - [x] 广告数详情   前端测试通过
  - [x] 流量漏斗、数据平台整体优化   已上线
  - [x] 二级账户来源   提测
  - [ ] 广告数详情打点 

2. 学习
  - 其他平台学习
    - [ ] audit
    - [ ] dashboard

3. 思考
  - [ ] docker
  - [ ] v-chart
  - css追踪用户
    - pv(page view)
    - uv(unique view): IP
  

#### 2019-05-27 —— 2019-06-02
1. 工作
  - [ ] 二级账户来源   跟测
  - [ ] 广告数详情打点 

2. 学习
  - vue源码
  - 极客实践

3. 思考
  - 数据平台消息推送
  - v-chart
  - ELement 组件
    - props validator: Function
    - 没有template, 就应当知道是用render来渲染(遇到这种情况目前为止较少)
    - **每个元素都是一个节点。每段文字也是一个节点。甚至注释也都是节点**
  - addEventListener attachEvent
  - !!config.dev.proxyTable (config.dev.proxyTable typeOf undefined)
  