#### 杂记
1. git删除远程分支 git push origin :severfix([git官方文档](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF))

2. 切换npm版本
    npm install -g npm@版本号
    npm install npm@latest -g
3. vue init webpack <项目名称>

4. vuejs项目搭建
    + npm install -g vue-cli
    + vue init webpack myProject
    + cd <项目目录>
    + npm run dev

5. performance([performance文档](https://www.cnblogs.com/bldxh/p/6857324.html))

| 属性指      | 描述                                 |
| :--------: | :---------------------------------: |
| mark       | 通过 mark() 方法添加到数组中的对象       |
| measure    | 通过 measure() 方法添加到数组中的对象    |
| resource   | 通过 mark() 所有资源加载时间，用处最多    |
| navigation | 现除chrome和Opera外均不支持，导航相关信息 |
| frame      | 现浏览器均未支持                        |
| server     | 未查到相关资料                          |


6. PerformanceObserver构造函数
		+ PerformanceObserver.observe(),当performance entry被记录并且是制定的entryTypes之一的时候，性能观察者对象的回调函数会被调用
		+ 性能监测回调停止接收 性能条目
		```
    const obs = new PerformanceObserver((items) => {
      _this.xhrSource.push(items.getEntries()[0]);
      // performance.clearMarks();
    });

    obs.observe({ entryTypes: ['measure'] });
		```