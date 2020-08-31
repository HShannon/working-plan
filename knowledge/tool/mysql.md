## mysql
- 下载安装: brew install mysql
- 设置密码: mysql_secure_installation(**提示:**your password should add special character !)
- 密码认证模块: 8.0之前的mysql默认用mysql_native_password, 之后的用caching_sha2_password. 然而node.js 还没支持caching_sha2_password, 需要手动把mysql的认证插件改回mysql_native_password
  - [参考](https://stackoverflow.com/questions/29866133/cant-connect-to-mysql-with-sequelize)
- 常见的操作命令
  - [参考](https://www.jianshu.com/p/92d47d986a4e)
  - 本地root登陆: mysql -u root -p   [参考](https://blog.csdn.net/helloxiaozhe/article/details/76229074)
  - 查看用户: SELECT DISTINCT CONCAT('User: ''',user,'''@''',host,''';') AS query FROM mysql.user;
  - 查看配置参数: show variables like '%skip_networking%'
  - 查看所有库: show databases
  - 查看所有表: show tables

## mysql 的苦逼之路
由于外部数据平台开发 8月31号上一周大量接触 mysql 相关. 发现无法通过 rooter 用户链接 localhost， 后通过楼下的金阳同学 解决了问题。常见的语法
1. select user , host, authentication_string , plugin from user; // 查看 user host authentication_string， plugin 相关字段
2. update user set authentication_string = '' where user = 'root'; // 更新账号 root 的 authentication_string
3. show create table user ;
4. set global validate_password.policy=LOW; // 降低 mysql 密码等级
5. show global variables like 'validate_pass%' // 展示能够匹配 validate_pass% 的全局变量
6. alter user 'root'@'localhost' identified with mysql_native_password by '12345678'; // 更新全局密码
7. mysql -uroot -p