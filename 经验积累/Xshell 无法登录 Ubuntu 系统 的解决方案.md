---
tags: [阿里云, Xshell, Ubuntu]
---

# 解决 Xshell 无法登录 Ubuntu 系统，提示“所选的用户秘钥未在远程主机上注册”的问题

#阿里云 #Xshell #Ubuntu

最近遇到了一个问题，在阿里云上新创建的 Ubuntu 24.04 的主机，配置了秘钥登录，使用 Xshell 登录时，提示“所选的用户秘钥未在远程主机上注册”的错误。但是用 putty 就可以登陆。

在网上找了很多方案，最后通过查看日志

```bash
cd /var/log/auth.log
```

发现了错误所在：`userauth_pubkey: signature algorithm ssh-rsa not in PubkeyAcceptedAlgorit hms [preauth]`

![](assets/Pasted%20image%2020250627110901.png)

此问题是因为 OpenSSH 新版本不再支持 ssh-rsa 类型的公钥，导致 SSH 密钥登录失败。随后，参考此文章解决了问题：[ubuntu22.04 服务器 SSH 密钥登录失败_key type ssh-rsa not in pubkeyacceptedalgorithms-CSDN博客](https://blog.csdn.net/ljz0929/article/details/129759705)

## 方案 1

使用受支持的公钥类型，重新生成 OpenSSH 公私钥，比如使用 ed 25519。

使用 ssh-keygen 命令生成 ed 25519 公私钥方法如下：

```bash
$ ssh-keygen -t ed 25519 # 默认生成到~/. ssh/ 目录下，默认文件名为：id_ed 25519 和 id_ed 25519. pub
$ ssh-keygen -t ed 25519 -f test # 生成文件到当前目录，文件名为：test 和 test. pub
```

## 方案 2

修改 sshd 配置文件/etc/ssh/sshd_config，使得 PubkeyAcceptedAlgorithms 支持 ssh-rsa 公钥类型。

修改方法：在/etc/ssh/sshd_config 文件末尾增加一行 PubkeyAcceptedAlgorithms +ssh-rsa

```bash
$ sudo echo "PubkeyAcceptedAlgorithms +ssh-rsa" >> /etc/ssh/sshd_config
$ tail /etc/ssh/sshd_config

# Example of overriding settings on a per-user basis
#Match User anoncvs
#	X11Forwarding no
#	AllowTcpForwarding no
#	PermitTTY no
#	ForceCommand cvs server

PubkeyAcceptedAlgorithms +ssh-rsa
```

修改完 `/etc/ssh/sshd_config` 配置文件后，需要重启 sshd 服务，执行 `sudo systemctl restart ssh`
