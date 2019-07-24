# [Git](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E8%BF%9C%E7%A8%8B%E5%88%86%E6%94%AF)

1. 常用指令
+ 删除远程分支: git push origin :severfix 
+ 删除本地分支: git branch -d <BranchName>
+ 修改email: git config --global user.email <email> 
+ 修改username: git config --global user.name

2. create project on gitlab
```
cd existing_folder
git init
git remote add origin git@git.yidian-inc.com:ad/dmp-data-interface.git
git add .
git commit -m "Initial commit"
git push -u origin maste
```
👉 
- 提交所有文件到本次仓库时，需要注意comment格式，按照公司流程走
- 连接到远程仓库地址时采用http
- 当出现 “failed to push some refs to ...” error时，需要执行一下命令将文件拉到本地后重新输入最后一步
```
git pull --rebase origin master 
```

3. 工作区 => 暂存区 => 版本库 => 远程仓库
👉  [Mr.Li 参考](https://github.com/huanqingli/life-note/blob/master/%E7%A7%AF%E7%B4%AF%E4%B8%8E%E6%94%B6%E8%97%8F/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%B8%B8%E8%AF%86/git.md)