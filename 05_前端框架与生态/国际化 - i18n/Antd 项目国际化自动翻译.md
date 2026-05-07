> 参考：[如何让你的国际化项目研发效能提升1000倍-国际化自动翻译 - 掘金 (juejin.cn)](https://juejin.cn/post/7123945028124147726#comment)

## 前言

项目使用 `auto-command` 中的 `translate` 功能。适用于使用 **Antd Pro** 或 **Pro Components** 的 React 项目

## 功能

根据初始的语言文件自动翻译生成其他语言的文件。链接里已经详细说明了，这里就不赘述了。

## 使用方法

### Step 1 安装到项目

```shell
$ npm i auto-command -D
```

### Step 2 增加配置文件

在根目录增加配置文件 `.autocmd.ts`，[详细配置说明](https://github.com/txp1035/auto-command/blob/master/README%20zh-CN.md)

```ts
import { defineConfig } from 'auto-command/lib';

export default defineConfig({
  translate: {
    // 路径（必填）：locales文件的绝对路径或者相对路径
    outDir: '/xxx/xxx/xxx/src/locales',
    // 是否保持以前的翻译不变（可选），默认开启
    keep: true,
    // 类型（可选）：默认为目录（antd-pro模式）
    type: 'dir',
    // 钩子函数（可选）：自定义输出
    hook: {
      filter: () => {},
      convertContent: { input: () => {}, out: () => {} },
      handleData: () => {},
    },
    // 语言转换（可选）：默认从中文转英文,输出的文件名和这个配置有关
    language: {
      from: 'zh-CN',
      to: ['en-US'],
    },
    // 分隔符号（可选）：默认为-，如果你的文件名不是以-分割的话需要配置
    separator: '-',
    // 配置你的.prettier.js文件路径（绝对路径或者相对路径）翻译后输出文件会安装你的配置进行格式化，避免无用的变更
    prettierPath: '/xxx/.prettierrc.js',
    // 翻译器类型（可选）：默认youdao
    translatorType: 'youdao',
    // google翻译器配置（可选）：默认空
    google: {
      proxy: {
        host: '127.0.0.1',
        port: 7890,
      },
    },
    // youdao翻译器配置（可选）：默认有值，如果翻译失败可能余额不足，请配置
    youdao: {
      key: 'xxx',
      secret: 'xxx',
    },
  },
});
```

### Step 3 使用

运行命令 `npx tcmd`，选择 translate 功能即可

```shell
$ npx tcmd
**** Please select the task to be performed **** (Use arrow keys)
  git 
> translate 
  fastElectron 
```

或者在 package. json 里配置命令，直接使用 translate 功能

```json
{
  "scripts": {
    "trans": "tcmd --type=translate"
  }
}
```
