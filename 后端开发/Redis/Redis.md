# Redis

## Redis 安装

### Ubuntu 下安装

#### 安装 Redis

在 Ubuntu 系统安装 Redi 可以使用以下命令:

```bash
$sudo apt-get update
$sudo apt-get install redis-server
```

#### 启动 Redis

```bash
$redis-server
```

#### 查看 redis 是否启动？

```bash
$redis-cli
```

以上命令将打开以下终端：

```bash
127.0.0.1:6379>
```

127.0.0.1 是本机 IP，6379 是 redis 服务端口。现在我们输入 PING 命令。
```bash
127.0.0.1:6379> ping
PONG
```

以上说明我们已经成功安装了 redis。
