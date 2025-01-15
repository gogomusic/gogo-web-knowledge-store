# husky v4

> 本文仅供参考，如有错误请见谅
> 以下是 husky v4 版本的使用方法，新版本请查看 [husky v9](#husky%20v9)

[🐶 husky](https://typicode.github.io/husky/)

>**husky**可以在项目中植入你设定的 git hooks，在 git 提交代码的前后，你预设的 git hooks 可以得到执行，以对代码、文件等进行预设的检查，一旦检查不通过，就可以阻止当前的代码提交，避免了不规范的代码和 git 提交出现在项目中

## husky 的安装

1. 安装

```bash
npm i -D husky
```

1. 启用 Git hooks

```bash
npx husky install
```

1. 在 packgae. json 中添加 prepare 脚本

```bash
npm pkg set scripts.prepare="husky install"
```

prepare 脚本会在 `npm install`（不带参数）之后自动执行。也就是说当我们执行 npm install 安装完项目依赖后会执行 `husky install` 命令，该命令会创建.husky/目录并指定该目录为 git hooks 所在的目录

## 使用 husky

使用 husky 的时候，我们通常只关注 _提交工作流_ 的几个 hooks，用得最多的一个是 `pre-commit`

### `pre-commit `

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

### `commit-msg`

#### 使用 Husky 启用 [commitlint](commitlint.md)

创建一个 `commit-msg` 的 hook 文件

```bash
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

启用后，以后提交代码时，都会对代码的提交格式进行校验

### `pre-push`

```bash
npx husky add .husky/pre-push "npm run build"
```

以上确保我们只有在代码构建成功的时候才可以将代码推送到远程仓库中

## git hooks 的分类

- 客户端 hooks
    - 提交工作流
        - `pre-commit`
        - `prepare-commit-msg`
        - `commit-msg`
        - `post-commit`
    - email 工作流
        - `applypatch-msg`
        - `pre-applypatch`
        - `post-applypatch`
    - 其它
        - `pre-rebase`
        - `post-rewrite`
        - `post-checkout`
        - `post-merge`
        - `pre-push`
        - `pre-auto-gc`
- 服务器端 hooks
    - `pre-receive`
    - `update`
    - `post-receive`

# husky v9

## 安装

```bash
npm install --save-dev husky
```

## 初始化

`init` 命令简化了项目中的 husky 设置。它会在 `.husky/` 中创建 `pre-commit` 脚本，并更新 `package.json` 中的 `prepare` 脚本。随后可根据你的工作流进行修改。

```bash
npx husky init
```

## 使用

以下是使用示例：

### `pre-commit `

修改 `.husky/pre-commit` 文件内容为：

```bash
npx lint-staged
```

### `commit-msg`

创建一个 `.husky/commit-msg` 的 hook 文件, 修改文件内容为：

```bash
npx --no-install commitlint --edit $1
```

启用后，以后提交代码时，都会对代码的提交格式进行校验

### `pre-push`

创建一个 `.husky/pre-push` 的 hook 文件, 修改文件内容为：

```bash
npm run build
```

以上确保我们只有在代码构建成功的时候才可以将代码推送到远程仓库中

# Tips

## 忽略 hook 执行

客户端 hooks 中，可以通过 `--no-verify` 忽略 git hook 的执行。示例：

```bash
git commit -m "commit message" --no-verify
```

>[!tip]
>
>`--no-verify` 可以简写为 `-n`

## 避免在 CI 服务器或 Docker 中安装 Git 钩子

创建 `.husky/install.mjs`

```js
// 在生产环境或 CI 环境中跳过 Husky 的安装
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0)
}
const husky = (await import('husky')).default
console.log(husky())
```

然后，在 `prepare` 脚本中使用它：

```json
"prepare": "node .husky/install.mjs"
```
