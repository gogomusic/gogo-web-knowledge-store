# Nginx 使用

1. 更新系统包 `sudo apt update`
2. 安装 nginx `sudo apt install nginx`
3. 查看防火墙情况 `sudo ufw app list`
4. 允许 nginx 配置 `sudo ufw allow 'Nginx Full'`

    > `sudo ufw allow 'Nginx Full'` 这条命令用于在 Ubuntu 等 Linux 发行版中通过 UFW (Uncomplicated Firewall) 启用对 Nginx Web 服务器的完整访问。具体来说，'Nginx Full' 是 UFW 的一个预定义应用配置，通常会开放以下端口：
    - 80（HTTP）：用于非加密的网页流量。
    - 443（HTTPS）：用于加密的网页流量。

5. 查看 nginx 状态 `sudo systemctl status nginx`
6. 创建 `/var/www/[你的项目名称]/html` 文件夹，设置目录权限后，把你的网页文件放在其中：

    ```bash
    sudo chmod -R 777 /var/www/[你的项目名称]
    ```

7. 在 `/etc/nginx/sites-available` 文件夹中使用编辑器（nano 或 vim）创建网站配置 `sudo nano /etc/nginx/sites-available/[你的配置文件名]`
```nginx
	server {
		listen 80;
		listen [::]:80;
		root /var/www/[你的项目名称]/html;
		index index.html index.htm;
		server_name [你的域名或服务器 IP];  # 使用实际的域名或 IP 地址
		location /            
		{
			try_files $uri $uri/ =404;
		}
	}
```

8. 链接 nginx 配置 `sudo ln -s /etc/nginx/sites-available/[你的配置文件名] /etc/nginx/sites-enabled/`
9. 查看配置是否正确 `sudo nginx -t`
10. 重启 nginx `sudo systemctl restart nginx`
	- `sudo systemctl enable nginx` 开机自启 nginx
	- `sudo systemctl status nginx` 查看 nginx 状态
11. 配置证书

    - 将证书文件（`certificate.crt`）、证书链文件（`ca_bundle.crt`）和私钥文件（`private.key`）分别放在 `/etc/ssl/certs/` 和 `/etc/ssl/private/` 目录下。
    - 修改 nginx 配置 `sudo nano /etc/nginx/sites-available/[你的配置文件名]`

        ```nginx
        # HTTP 配置，重定向到 HTTPS
        server {
            listen 80;
            listen [::]:80;
            
            server_name your_domain.com www.your_domain.com;
            
            # 重定向所有 HTTP 请求到 HTTPS
            return 301 https://$server_name$request_uri;
        }
        
        # HTTPS 配置
        server {
            listen 443 ssl http2;  # 添加 http2 提升性能
            listen [::]:443 ssl http2;
            
            server_name your_domain.com www.your_domain.com;
            
            # SSL 证书配置
            ssl_certificate /etc/ssl/certs/certificate.crt;
            ssl_certificate_key /etc/ssl/private/private.key;
            
            # SSL 安全配置
            ssl_protocols TLSv1.2 TLSv1.3;
            ssl_ciphers HIGH:!aNULL:!MD5;
            ssl_prefer_server_ciphers on;
            
            # 日志配置
            access_log /var/log/nginx/your_domain_access.log;
            error_log /var/log/nginx/your_domain_error.log;
            
            # 网站根目录
            root /var/www/your_project/html;
            index index.html index.htm;
            
            # 路由配置
            location / {
                try_files $uri $uri/ =404;
            }
        }
        ```

12. 生成 Diffie-Hellman 参数（可选）`sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048`
13. 查看配置是否成功 `sudo nginx -t`
14. 重启 nginx `sudo systemctl restart nginx`
