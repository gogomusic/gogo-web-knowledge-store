# Node. js

> [!info] 参考资料
> - [Node | 大前端 - 前端高级进阶](https://front-end.toimc.com:12004/notes-page/basic/node/#%E4%BB%80%E4%B9%88%E6%98%AF-node-js)

## 什么是 Node.js

**Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.**

`Node.js` `是` 一个基于 Chrome V8 引擎的 `JavaScript` `运行环境`。

通俗的理解：Node.js 为 JavaScript 代码的正常运行，提供的必要的环境。

官网：[Node.js — 在任何地方运行 JavaScript](https://nodejs.org/zh-cn)

中文文档：[Node.js 中文网](https://nodejs.cn/)

> [!warning] 注意
> - Node.js 是 JavaScript 的 `后端` 运行环境。（正常情况下，Nodejs 要安装到服务器上）
> - Node.js 中无法调用 DOM 和 BOM 等 浏览器内置 API

## 安装 Node. js

1. 官网下载直接安装 https://nodejs.org/zh-cn
2. 使用 `nvm` 安装（**推荐**），nvm 是一款 node 版本管理工具，可以方便地切换 Node 版本。Windows 系统下载地址：[Releases · coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

## 包管理器

### npm、yarn、pnpm

- **npm**：npm 是 Node.js 的官方包管理器，使用 `npm install` 命令安装包，会将所有依赖包安装到项目根目录下的 `node_modules` 文件夹中，每个包及其依赖都会被单独安装，可能会导致 `node_modules` 文件夹体积庞大且存在重复依赖的情况。且存在幽灵依赖的问题。
- **yarn**：由 Facebook 推出，旨在解决 npm 在性能、安全性和一致性方面的一些问题。使用 `yarn add` 命令安装包，yarn 的安装速度比 npm 更快，因为它采用了并行安装的方式，同时下载多个包，并且会缓存每个安装过的包，后续安装时无需再次下载。通过 `yarn.lock` 文件确保依赖版本的一致性，但在处理大型项目时，磁盘空间占用仍然较大。
- **pnpm**：pnpm 的核心设计理念是“硬链接”和“内容可寻址存储”，旨在解决 npm 和 yarn 在磁盘空间占用和安装效率方面的问题。pnpm 会将所有安装的包存储在一个全局存储中，并通过硬链接的方式将项目中的依赖包链接到全局存储中的相应位置，避免了重复安装相同的包，大大节省了磁盘空间。在磁盘空间占用和安装效率方面表现最佳，但在一些特殊场景下，硬链接机制可能会导致一些兼容性问题。使用 `pnpm add` 命令安装包，安装后的包会被存储在全局存储中，并通过硬链接的方式链接到项目的 `node_modules` 文件夹中。pnpm 同样会生成一个 `pnpm-lock.yaml` 文件

> [!note]
> 个人建议新项目在条件允许的情况下，优先使用 `pnpm`，如果遇到兼容性问题，再尝试使用 `yarn` , 还是不行再使用 `npm`
>
> 旧项目就不要改了，避免出现问题

### 修改 npm 源

npm 源下载官方地址是：https://registry.npmjs.org/，此地址在国外，下载速度通常比较慢，我们一般需要指定国内的镜像地址来加速 npm 下载。

一般使用淘宝的 npm 镜像：http://registry.npmmirror.com

#### 配置全局 npm 源

```bash
#查询当前使用的镜像源
npm get registry

#设置为淘宝镜像源 
npm config set registry https://registry.npmmirror.com

#还原为官方源
npm config set registry https://registry.npmjs.org
```
****

#### 配置项目内使用的 npm 源

由于项目下的 `.npmrc` 优先级最高，并且配置文件只对此项目有效，不会影响其他项目。可以在项目根目录下面新建一个 `.npmrc` 文件指定安装源。

```txt
registry=https://registry.npmmirror.com
```

#### 查询可用的 npm 源

可以安装一个 `nrm`

```bash
npm i -g nrm
```

安装完成后，使用 `nrm ls` 可以查看可用的 npm 源
![](assets/image%203.png)
## Node.js REPL(交互式解释器)

Node.js 提供了一个内置的 REPL（Read-Eval-Print Loop），这是一个交互式编程环境，可以在终端中运行 JavaScript 代码。

REPL 的名称来源于它的主要操作：读取（Read）、执行（Eval）、打印（Print）和循环（Loop）。

Node 自带了交互式解释器，可以执行以下任务：

- **读取（Read）** - 读取用户输入，解析输入的 Javascript 数据结构并存储在内存中。
- **执行（Eval）** - 执行输入的数据结构
- **打印（Print）** - 输出结果
- **循环（Loop）** - 循环操作以上步骤直到用户两次按下 **ctrl-c** 按钮退出。

REPL 可以直接输入并立即执行 JavaScript 代码，快速验证代码片段。

REPL 适合测试简单逻辑和调试以及尝试新语法或 Node.js API。
