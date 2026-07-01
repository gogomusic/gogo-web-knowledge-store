# NestJS

> 详细教程请参照官网，这里仅记录了自己的使用经验
>
> 本文基于 `NestJS v11` 编写

- 设计模式
	- MVC 架构（模型 - 视图 - 控制器）
	- AOP - 面向切面编程
		- Middleware - 中间件
		- Guard - 守卫
		- Interceptor - 拦截器
		- Pipe - 管道
		- 过滤器
- Nest 核心概念
	- 装饰器
		- 类装饰器：@Controller、@Injectable、@Module、@UseInterceptors
		- 方法装饰器：@Get、@Post、@Put、@Patch、@Options、@Head 等所有标准 HTTP 方法、@UseInterceptors
		- 属性装饰器：@IsNotEmpty、@IsString、@IsNumber
		- 参数装饰器：@Body、@Param、@Query
		- 访问器装饰器

## 介绍

- [NestJS 官网](https://docs.nestjs.com/)
- [NestJS 中文网](https://nest.nodejs.cn/)

## 安装

需要环境 **Node. js >= 20**

**1. 安装 Nest Cli 到全局**

```bash
npm i -g @nestjs/cli
```

**2. 创建项目**

包管理器使用 `pnpm`，使用 `TypeScript`

```bash
nest new project-name -p pnpm --strict
```

**3. 启动项目**

> 更改 `start:dev` 脚本为：`"start:dev": "nest start --watch -b swc --type-check"`，
>> 1. `--watch`：此命令将监视你的文件，自动重新编译并重新加载服务器。
>> 2. `-b swc`：使用 [SWC 构建器](https://nest.nodejs.cn/recipes/swc) 提升构建速度
>> 3. `--type-check`：使用 `SWC` 构建器时将不执行任何类型检查，需要加上此选项打开 `TSC` 以执行异步类型检查
```bash
cd project-name
pnpm start:dev
```

> [!tip]
> 1. 启用 `--type-check` 选项后 ` express ` 模块需要显式安装，否则 TS 会报错，我将其安装到开发依赖避免打包进生产构建：`pnpm add -D express`

## 概述

- **控制器（Controller）**：负责处理传入的请求并将响应发送回客户端。可使用 `nest g controller [name]` 来创建控制器
- **异常过滤器（Exception filters）**：负责处理应用程序中所有未处理的异常。当异常未被应用程序代码处理时，该层会捕获该异常，并自动发送一个用户友好的响应。
- 拦截器
