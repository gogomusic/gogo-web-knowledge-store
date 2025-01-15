## 一、项目环境

- [Visual Studio Code](https://code.visualstudio.com/)
- VSCode 扩展：[Volar 扩展](https://marketplace.visualstudio.com/items?itemName=Vue.volar)、Prettier、ESLint、[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- Node 16.0 +

## 二、创建项目

> 参见：[快速上手 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application)

使用**脚手架**创建项目：

```bash
npm create vue@latest
```

按照自己的需求输入项目名称和需要的功能：

```bash
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.  
```

创建完成后，进入项目目录，安装依赖

```bash
cd <your-project-name>
#推荐使用pnpm（npm i -g pnpm）安装依赖，当然，主要看自己的喜好
pnpm i
#npm i 
#yarn
```

运行项目

```bash
pnpm run dev
```

## 三、项目规范

### Prettier

Prettier 在我们创建项目的时候已经自动安装好并且有了默认配置 `.prettierrc.json`，可以按照自己的需求进行更改。

可以创建一个 `.prettierignore` 文件以忽略不需要格式化的文件

### ESLint

ESlint 在我们创建项目的时候已经自动安装好并且有了默认配置 `.eslintrc.cjs`，可以按照自己的需求进行更改。

启用 ESLint IDE 插件，比如 [ESLint for VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)，然后你就可以在开发时获得规范检查器的反馈。这同时也避免了启动开发服务器时不必要的规范检查

### lint-staged

随着项目体量的增大，全量跑一次 lint 的时间越来越长。如果在一次提交的时候，只对这一部分代码做规范化，那将大大缩短 developer 提交代码的速度，于是就诞生了一个工具：`lint-staged。`

当 `lint-staged` 配合 git hooks 使用时，可以在 git 提交前的 hook 中加入 `lint-staged` 命令，这样就能在提交代码之前，对即将提交的代码进行格式化，成功之后就会提交代码

#### 引入 lint-staged

```bash
pnpm i -D lint-staged
```

在 package. json 中配置 lint-staged

```json
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,json,css,vue}": [
      "eslint",
      "prettier --write"
    ]
  }

```

### commitlint

commitlint 是一个 git commit 校验约束工具。

> 就是当我们运行 `git commmit -m 'xxx'` 时，来检查 `'xxx'` 是不是满足团队约定好的提交规范的工具。

安装

```bash
pnpm i -D @commitlint/config-conventional @commitlint/cli @commitlint/types
```

配置 `commitlint.config.ts`

### husky

**husky**可以在项目中植入你设定的 git hooks，在 git 提交代码的前后，你预设的 git hooks 可以得到执行，以对代码、文件等进行预设的检查，一旦检查不通过，就可以阻止当前的代码提交，避免了不规范的代码和 git 提交出现在项目中

1. 安装

```bash
pnpm i -D husky
```

1. 启用 Git hooks

```bash
npx husky install
```

1. 在 packgae. json 中添加 prepare 脚本

```bash
npm pkg set scripts.prepare="husky install"
```

prepare 脚本会在 `npm install`（不带参数）之后自动执行。也就是说当我们执行 npm install 安装完项目依赖后会执行 `husky install` 命令，该命令会创建. husky/目录并指定该目录为 git hooks 所在的目录

1. 添加 hooks

```bash
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
npx husky add .husky/pre-push "npm run build"
```

以上添加的 hooks 会在提交时对代码错误和样式进行检查，对提交信息的格式进行检查，通过后才能提交。在推送到远程前进行打包，成功后才会推送到远程
