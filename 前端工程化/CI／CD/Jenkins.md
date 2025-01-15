## [Jenkins](https://www.jenkins.io/zh/)

![](assets/Pasted%20image%2020220219213011.png)

**Jenkins**是一个独立的开源软件项目，是基于 [Java](https://www.w3cschool.cn/java/) 开发的一种持续集成工具，用于监控持续重复的工作，旨在提供一个开放易用的软件平台，使软件的持续集成变成可能。前身是 Hudson 是一个可扩展的持续集成引擎。可用于自动化各种任务，如构建，测试和部署软件。Jenkins 可以通过本机系统包 [Docker安装](https://www.w3cschool.cn/docker/)，甚至可以通过安装 Java Runtime Environment 的任何机器独立运行。

**主要用于：**

1. 持续、自动地构建/测试软件项目，如 CruiseControl 与 DamageControl。
2. 监控一些定时执行的任务。

## 示例

>[!warning] 警告
>下面的示例未经过验证，经供参考

### Jenkins 配置

1. 点击**新建任务**
2. 输入项目名称，进行配置
3. General：![](assets/Pasted%20image%2020230914134602.png)
4. 源码管理：输入仓库 URL、服务器认证信息（Credentials）、指定拉取的分支
5. 构建触发器：注意记录 webhook 的地址 ![](assets/Pasted%20image%2020230914134930.png) ^8by6c8
6. 构建环境：![](assets/Pasted%20image%2020230914135024.png)
7. 构建：编写 shell 命令，以打包构建项目
	```bash
    echo $PATH
    node -v
    npm -v
    npm config set registry http://registry.npm.taobao.org
    npm config get registry
    npm install
    npm run build
    tar -zcvf dist.tar.gz ./dist
	```

	以上命令打包项目并压缩为 `dist.tar.gz` 文件

8. 构建后操作：将打包产物发送到服务器并解压到指定目录：选择 SSH 服务器，源文件（打包的压缩文件）、远程目录，输入传输完成后需要执行的命令
    ![](assets/Pasted%20image%2020230914143024.png)
	```bash
	cd /www/wwwroot
	rm -f dist.tar.gz.bak
	tar -zcvf dist.tar.gz.bak ./dist
	rm -rf /www/wwwroot/dist
	tar -zxvf dist.tar.gz
	rm -f dist.tar.gz
    ```

    删除原备份文件，重新生成新备份。然后删除 web 目录，使用新资源覆盖。最后删除压缩包

### Gitlab 配置

jenkins 中配置完成后，还需要在项目中配置 webhooks

打开 Gitlab,进入项目，点击设置 -Webhooks，输入 [上面第5步](#^8by6c8) 的 hook 地址，选择触发来源为**推送事件**，通配符样式设置为 dev。标识只推送 dev 分支的 **push** 事件。最后点击添加 webhook 即可
