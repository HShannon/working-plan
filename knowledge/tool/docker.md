# Docker

## 常用指令
- docker ps 
- docker run 
- docker ps | grep 'dashboard'
- docker exec -it 'ad-dashboard-test141' /bin/bash
- docker stop ad-dashboard-normal 
- docker rm ad-dashboard-normal
- docker ps -a 显示所有的容器, 包括未运行的

## docker 日常
1. 部署到测试环境失败, 经排查失败原因, 机器内存不够
```
[INFO] execute cmd "docker pull docker2.yidian.com:5000/publish/ad-dashboard-1151-image" on 10.126.153.140
failed to register layer: devmapper: Thin Pool has 162317 free data blocks which is less than minimum required 163840 free data blocks. Create more free space in thin pool or use dm.min_free_space option to change behavior
```
解决方法, 删除部分项目镜像
```
1. 查看镜像 docker images || docker image ls
2. 清除镜像 docker rmi [image] || docker image rm [image]
```

