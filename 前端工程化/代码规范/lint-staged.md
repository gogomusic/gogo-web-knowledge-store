随着项目体量的增大，全量跑一次 lint 的时间越来越长。如果在一次提交的时候，只对这一部分代码做规范化，那将大大缩短 developer 提交代码的速度，于是就诞生了一个工具：`lint-staged。`

当 `lint-staged` 配合 git hooks 使用时，可以在 git 提交前的 hook 中加入 `lint-staged` 命令，这样就能在提交代码之前，对即将提交的代码进行格式化，成功之后就会提交代码

```bash
npm i -D lint-staged
```

在 package.json 中配置 lint-staged

```json
"lint-staged": {
  "src/**/*.{js,jsx,ts,tsx,json,css,scss,md,vue}": [
    "eslint --fix --max-warnings=0"
  ]
}

```

也可以在配置文件中配置，这里就略过了

添加预提交钩子

[pre-commit ](husky.md#`pre-commit%20`)
