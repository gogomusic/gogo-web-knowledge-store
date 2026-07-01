# 使用 pm2 部署 Next.js 项目

1、**在 Next.js 项目中使用 PM2 进行部署，首先确保你已经全局安装了 PM2。如果尚未安装，可以通过以下命令安装：**

`npm install pm2 -g`

2、**接下来，在你的 Next.js 项目目录下，运行以下命令来启动你的应用：**

`pm2 start npm --name "your-app-name" --time -- run start`

这里的 --name "your-app-name" 是给你的应用实例命名，方便在 PM2 管理的时候进行区分。使用 `--time` 指令可在日志中显示时间

3、**如果你想要 PM2 在后台运行，并且在你的服务器重启后能自动重启你的应用，可以使用以下命令：**

```bash
pm2 startup
pm2 save
```

- `pm2 startup` 命令会生成一个命令，用于设置服务器启动时自动启动 PM2 和你的应用，你需要登录到服务器上执行这个生成的命令。
- `pm2 save` 命令则是将当前运行的应用列表保存到 PM2 的配置文件中，确保在服务器重启后能够自动重启你的应用。

4、**如果你需要停止你的应用，可以使用以下命令：**

`pm2 stop "your-app-name"`

5、**如果你需要重新加载应用（热重载），可以使用以下命令：**

`pm2 reload "your-app-name"`

6、**删除应用**

`pm2 delete "your-app-name"`

或者，如果知道应用程序的 ID（例如 ID 为 0），可以使用以下命令：

`pm2 delete 0`

这些基本命令足以让你在 PM2 上管理你的 Next.js 应用。
