#### 2019-04-01 —— 2019-04-07
1. 工作
  - [x] 修复数据平台埋点_外部流量结算报表  
    - 问题原因
    ```
    this.$store.dispatch('logDot', {poitId: 7004002, pageId: 7004, type: 'search', data: this.formData})
    ```
    错将 **point** 拼写成 **poit**, 能不能仔细一点
  - 广告数详情分析报表
    - [x] 日期限制
    - [ ] 继续开发
  - [ ] 流量漏斗优化v4.0
  - [ ] 数据平台整体报表优化

2. 学习
  - [x] weChat 后端代码 快速学习的知识点
    在 wxapp 相关材料([小程序资料](https://developers.weixin.qq.com/miniprogram/dev/api-backend/auth.code2Session.html?search-key=sns%2Fjscode2session))
  - [ ] uc (Qiang 不建议看, 看dashboard 登录、权限认证)
  - [x] dashboard 登录和认证
  - [ ] 审核平台 && uc

3. 思考
  - 回顾之前的知识点，不能边走边捡边扔
  - 英语学习请你坚持好吗✊
  - 不明白的东西太多，在学习过程中最好用思维导图**ProcessOn**
  - 组织架构会
    - 说话思路清晰清晰，表达观点1、2、3
***

#### 2019-04-08 —— 2019-04-15
1. 工作
  - 广告数详情分析报表
    - [x] 根据接口文档更新代码
    - [x] DDLIST 的值
    - [ ] 联调
  - [x] 流量漏斗优化v4.0 [wiki文档](http://ydwiki.yidian-inc.com/pages/viewpage.action?pageId=18362689)
    - [x] 正文页位置筛选项 (下载、筛选项)
    - [x] 小需求优化
    - [ ] 联调
  - [ ] 数据平台整体报表优化
    - [ ] 总体流量分析报表优化
    - [ ] 
  - [ ] 客户健康度 cycle 值

2. 学习
  - [ ] 其他平台学习
    - [ ] audit
    - [ ] dashboard
      - [ ] fetch 源码
  - [冒烟测试](https://www.jianshu.com/p/46a2fc4a1d00)
  - vim 插件挺有意思的，从全都要转变为我需要[知乎资料](https://www.zhihu.com/question/23590572)

3. 思考
  - 合理创建utils.js文件
  - 数据平台 离线下载
  - store、dot-prop


#### 2019-04-08 —— 2019-04-15
1. 工作
  - [ ] 数据平台整体报表优化
  - [ ] 客户健康度 cycle 值

2. 学习
  - [ ] 其他平台学习
    - [ ] audit
    - [ ] dashboard
  - splice方法
  - 扁平化
  - reduce

3. 思考
  - 学会使用 debugger, 提高定位问题的能力
  - 写代码，首先逻辑、之后方法。两者会相互影响