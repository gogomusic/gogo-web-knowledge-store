>[Prettier中文网](https://prettier.nodejs.cn/docs/en/install.html)

## 安装

首先，在本地安装 Prettier：

```bash
npm install --save-dev --save-exact prettier
```

```bash
yarn add --dev --exact prettier
```

```bash
pnpm add --save-dev --save-exact prettier
```

然后，创建一个空的配置文件，让编辑器和其他工具知道你正在使用 Prettier：

```bash
echo {}> .prettierrc.json
```

以下规则仅供参考：

`.prettierrc.ts`

```ts
module.exports = {
  // 一行最多多少个字符
  printWidth: 80,
  // 指定每个缩进级别的空格数
  tabWidth: 2,
  // 使用制表符而不是空格缩进行
  useTabs: true,
  // 在语句末尾打印分号
  semi: true,
  // 使用单引号而不是双引号
  singleQuote: true,
  // 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
  quoteProps: 'as-needed',
  // 在JSX中使用单引号而不是双引号
  jsxSingleQuote: false,
  // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
  trailingComma: 'es5',
  // 在对象文字中的括号之间打印空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: true,
  // 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
  arrowParens: 'avoid',
  // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
  rangeStart: 0,
  rangeEnd: Infinity,
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准 always\never\preserve
  proseWrap: 'never',
  // 指定HTML文件的全局空格敏感度 css\strict\ignore
  htmlWhitespaceSensitivity: 'css',
  // Vue文件脚本和样式标签缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  endOfLine: 'lf',
};
```

`.prettierrc.json`

```json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "arrowParens": "avoid",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": true,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": true,
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "never",
  "htmlWhitespaceSensitivity": "strict",
  "vueIndentScriptAndStyle": false,
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto"
}
```

接下来，创建一个 [.prettierignore](https://prettier.nodejs.cn/docs/en/ignore.html) 文件，让 Prettier CLI 和编辑器知道哪些文件不要格式化。这是一个例子：

```text
# Ignore artifacts:
build
coverage
```

> 提示！将你的 .prettierignore 基于 .gitignore 和 .eslintignore（如果你有的话）。

> 另一个提示！如果你的项目还没有准备好格式化，比如 HTML 文件，请添加 `*.html`。

现在，使用 Prettier 格式化所有文件：

```bash
npx prettier . --write
```

> `npx` 是什么东西？`npx` 随 `npm` 一起提供，并允许你运行本地安装的工具。为了简洁起见，我们将在本文件的其余部分省略 `npx` 部分！
>
> 注意：如果忘记先安装 Prettier，`npx` 会临时下载最新版本。这在使用 Prettier 时不是一个好主意，因为我们会在每个版本中更改代码的格式！在你的 `package.json` 中安装 Prettier 的锁定版本很重要。而且速度也更快。

```bash
yarn prettier . --write
```

> `yarn` 一开始在做什么？`yarn prettier` 运行本地安装的 Prettier 版本。为了简洁起见，我们将在本文件的其余部分省略 `yarn` 部分！

```bash
pnpm exec prettier . --write
```

> `pnpm` 一开始在做什么？`pnpm prettier` 运行本地安装的 Prettier 版本。为了简洁起见，我们将在本文件的其余部分省略 `pnpm` 部分！

`prettier --write .` 非常适合格式化所有内容，但对于大型项目可能需要一些时间。你可以运行 `prettier --write app/` 来格式化某个目录，或者运行 `prettier --write app/components/Button.js` 来格式化某个文件。或者使用像 `prettier --write "app/**/*.test.js"` 这样的 glob 来格式化目录中的所有测试（有关支持的 glob 语法，请参阅 [fast-glob](https://github.com/mrmlnc/fast-glob#pattern-syntax)）。

如果你有 CI 设置，请运行以下命令作为其中的一部分，以确保每个人都运行 Prettier。这避免了合并冲突和其他协作问题！

```bash
npx prettier . --check
```

`--check` 与 `--write` 类似，但只检查文件是否已格式化，而不是覆盖它们。`prettier --write` 和 `prettier --check` 是运行 Prettier 最常见的方式。

## 设置你的编辑器

从命令行格式化是开始的好方法，但你可以通过从编辑器运行它来充分利用 Prettier，无论是通过键盘快捷键还是在你保存文件时自动运行。当一行在编码时变得太长以至于无法适应你的屏幕时，只需按下一个键，它就会神奇地被封装成多行！或者，当你粘贴一些代码并且缩进全部弄乱时，让 Prettier 为你修复它而无需离开你的编辑器。

有关如何设置编辑器的信息，请参阅 [编辑器集成](https://prettier.nodejs.cn/docs/en/editors.html)。如果你的编辑器不支持 Prettier，你可以用 [使用文件监视器运行 Prettier](https://prettier.nodejs.cn/docs/en/watching-files.html) 代替。

> **Note:** 不要跳过常规的本地安装！编辑器插件将选择你本地版本的 Prettier，确保你在每个项目中使用正确的版本。（你不希望你的编辑器意外地导致大量更改，因为它使用的 Prettier 版本比你的项目更新！）
>
> 并且能够从命令行运行 Prettier 仍然是一个很好的后备方案，并且是 CI 设置所必需的。

## ESLint（和其他代码检查器）

如果你使用 ESLint，请安装 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#installation) 以使 ESLint 和 Prettier 相互配合。它会关闭所有不必要的或可能与 Prettier 冲突的 ESLint 规则。Stylelint 有一个类似的配置：[stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier)

（请参阅 [Prettier 与 Linter](https://prettier.nodejs.cn/docs/en/comparison.html) 了解有关格式化与 linting 的更多信息，[与 Linters 集成](https://prettier.nodejs.cn/docs/en/integrating-with-linters.html) 了解有关配置 linters 的更多深入信息，如果需要，请参阅 [相关项目](https://prettier.nodejs.cn/docs/en/related-projects.html) 了解更多集成可能性。）

## Git 钩子

除了从命令行 (`prettier --write`) 运行 Prettier、在 CI 中检查格式以及从编辑器运行 Prettier 之外，许多人还喜欢将 Prettier 作为预提交钩子运行。这可确保你的所有提交都已格式化，而无需等待 CI 构建完成。

例如，你可以执行以下操作以在每次提交之前运行 Prettier：

1. 安装 [husky](https://github.com/typicode/husky) 和 [lint-staged](https://github.com/okonet/lint-staged)：

```bash
npm install --save-dev husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```

```bash
yarn add --dev husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```

> 如果你使用 Yarn 2，请参阅 [https://typicode.github.io/husky/#/?id=yarn-2](https://typicode.github.io/husky/#/?id=yarn-2)

```bash
pnpm add --save-dev husky lint-staged
pnpm exec husky install
npm pkg set scripts.prepare="husky install"
pnpm exec husky add .husky/pre-commit "pnpm exec lint-staged"
```

1. 将以下内容添加到你的 `package.json`：

```json
{
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  }
}
```

> 注意：如果你使用 ESLint，确保 lint-staged 在 Prettier 之前运行它，而不是之后。

有关详细信息，请参阅 [预提交钩子](https://prettier.nodejs.cn/docs/en/precommit.html)。

## 概括

总而言之，我们学会了：

- 在你的项目中本地安装精确版本的 Prettier。这确保项目中的每个人都获得完全相同版本的 Prettier。即使是 Prettier 的补丁版本也会导致格式略有不同，因此你不希望不同的团队成员使用不同的版本并来回格式化彼此的更改。
- 添加 `.prettierrc.json` 以让你的编辑器知道你正在使用 Prettier。
- 添加一个 `.prettierignore` 让你的编辑器知道哪些文件不要触及，以及能够运行 `prettier --write .` 来格式化整个项目（不会破坏你不想要的文件，或阻塞生成的文件）。
- 在 CI 中运行 `prettier --check .` 以确保你的项目保持格式化。
- 从你的编辑器运行 Prettier 以获得最佳体验。
- 使用 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) 让 Prettier 和 ESLint 一起玩得很好。
- 设置预提交钩子以确保每次提交都已格式化。
