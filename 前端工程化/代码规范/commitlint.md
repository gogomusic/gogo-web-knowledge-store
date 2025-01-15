**commitlint 是什么？**

commitlint 是一个 git commit 校验约束工具。

> 就是当我们运行 `git commmit -m 'xxx'` 时，来检查 `'xxx'` 是不是满足团队约定好的提交规范的工具。

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

默认已经有一组隐藏的标准默认值，我们也可以显式的配置它们。[查看Rules](#Rules)

下面是配置示例：

### [JavaScript](https://commitlint.js.org/#/reference-configuration?id=javascript)

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

### [TypeScript](https://commitlint.js.org/#/reference-configuration?id=typescript)

使用 ts 需要先安装 `@commitlint/types`

```bash
npm i -D @commitlint/types
```

`commitlint.config.ts`

```ts
import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [RuleConfigSeverity.Warning, 'always'],
    'body-max-line-length': [RuleConfigSeverity.Error, 'always', 100],
    'footer-leading-blank': [RuleConfigSeverity.Warning, 'always'],
    'footer-max-line-length': [RuleConfigSeverity.Error, 'always', 100],
    'header-max-length': [RuleConfigSeverity.Error, 'always', 100],
    'scope-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
    'subject-case': [
      RuleConfigSeverity.Error,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
    'subject-empty': [RuleConfigSeverity.Error, 'never'],
    'subject-full-stop': [RuleConfigSeverity.Error, 'never', '.'],
    'type-case': [RuleConfigSeverity.Error, 'always', 'lower-case'], //type必须小写，否则报错
    'type-empty': [RuleConfigSeverity.Error, 'never'], //type不能为空，否则报错
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        'build', //影响构建系统或外部依赖项的更改（示例：gulp、broccoli、npm、webpack）
        'chore', //不修改src或者test的其余修改，例如构建过程或辅助工具的变动
        'ci', //与CI（持续集成服务）有关的改动
        'docs', //只改动了文档相关的内容
        'feat', //增加新功能
        'fix', //修复bug
        'perf', //提升性能的改动
        'refactor', //代码重构
        'revert', //撤销提交（创建一个全新的提交来撤消先前提交所做的更改）
        'style', //不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
        'test' //添加测试或者修改现有测试
      ]
    ]
  },
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint'
}

module.exports = Configuration
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
