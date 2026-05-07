# commitlint

**commitlint 是什么？**

commitlint 是一个 git commit 校验约束工具。

> 就是当我们运行 `git commmit -m 'xxx'` 时，来检查 `'xxx'` 是不是满足团队约定好的提交规范的工具。
> 官网：[commitlint](https://commitlint.js.org/)
> 中文网：[commitlint 中文网](https://commitlint.nodejs.cn/)

## 提交格式

```text
<type>(<scope>): <subject>

<body>

<footer>
```

## 安装

```bash
npm i -D @commitlint/config-conventional @commitlint/cli
```

## 配置

默认已经有一组隐藏的标准默认值，我们也可以显式的配置它们。[查看Rules](commitlint.md#Rules)

下面是配置示例：

### JS 示例配置

`commitlint.config.js`

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],//type必须小写，否则报错
    'type-empty': [2, 'never'],//type不能为空，否则报错
    'type-enum': [
      2,
      'always',
      [
        'build',//影响构建系统或外部依赖项的更改（示例：gulp、broccoli、npm、webpack）
        'chore',//不修改src或者test的其余修改，例如构建过程或辅助工具的变动
        'ci',//与CI（持续集成服务）有关的改动
        'docs',//只改动了文档相关的内容
        'feat',//增加新功能
        'fix',//修复bug
        'perf',//提升性能的改动
        'refactor',//代码重构
        'revert',//撤销提交（创建一个全新的提交来撤消先前提交所做的更改）
        'style',//不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
        'test',//添加测试或者修改现有测试
      ],
    ],
  },
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint'
};
```

### TS 示例配置

使用 ts 需要先安装 `@commitlint/types`

```bash
npm i -D @commitlint/types
```

`commitlint.config.ts`

```ts
import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 提交正文前必须空一行
    "body-leading-blank": [RuleConfigSeverity.Warning, "always"],
    // 正文每行最大长度为100
    "body-max-line-length": [RuleConfigSeverity.Error, "always", 100],
    // footer前必须空一行
    "footer-leading-blank": [RuleConfigSeverity.Warning, "always"],
    // footer每行最大长度为100
    "footer-max-line-length": [RuleConfigSeverity.Error, "always", 100],
    // header最大长度为100
    "header-max-length": [RuleConfigSeverity.Error, "always", 100],
    // scope必须为小写
    "scope-case": [RuleConfigSeverity.Error, "always", "lower-case"],
    // subject不能为句子首字母大写、每个单词首字母大写、PascalCase或全大写
    "subject-case": [
      RuleConfigSeverity.Error,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    // subject不能为空
    "subject-empty": [RuleConfigSeverity.Error, "never"],
    // subject不能以句号结尾
    "subject-full-stop": [RuleConfigSeverity.Error, "never", "."],
    // type必须为小写
    "type-case": [RuleConfigSeverity.Error, "always", "lower-case"],
    // type不能为空
    "type-empty": [RuleConfigSeverity.Error, "never"],
    // type必须为以下枚举值之一
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "build", // 影响构建系统或外部依赖项的更改（如：gulp、npm、webpack）
        "chore", // 其他不修改src或test的更改，如构建过程或辅助工具、更新依赖等
        "ci", // 与持续集成相关的更改（如：GitHub Actions、Travis等）
        "docs", // 只改动文档相关内容（如：README、API文档）
        "feat", // 新功能（feature）
        "fix", // 修复bug（bug fix）
        "perf", // 性能优化（performance improvement）
        "refactor", // 代码重构（不包括新增功能或修复bug）
        "revert", // 撤销提交（revert previous commit）
        "style", // 代码格式相关更改，不影响代码含义（如：空格、分号等）
        "test", // 添加或修改测试（如：单元测试、集成测试）
      ],
    ],
  },
  helpUrl:
    "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
};

module.exports = Configuration;

```

### Rules

> [Rules](https://commitlint.js.org/#/reference-rules)

规则由规则名称和配置数组构成，配置数组包含：

- **Level** `[0..2]`: `0` 禁用规则. `1` 警告 `2 ` 错误.
- **Applicable** `always|never`: `never` 表示反转规则。（比如规则设置首字母必须大写，则反转后标识首字母必须不能大写）
- **Value**: 规则的值

配置数组可以是数组，返回数组的函数、异步函数甚至 Promise

## 使用

[使用 Husky 启用 commitlint](husky.md#使用%20Husky%20启用%20[commitlint](commitlint.md))
