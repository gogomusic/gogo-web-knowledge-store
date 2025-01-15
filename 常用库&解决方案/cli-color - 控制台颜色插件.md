#### 效果

较为方便地修改控制台输出文本的样式（颜色、背景颜色、字体样式等）

![](assets/image.png)

#### 安装

```bash
npm install cli-color
npm install -D @types/cli-color
```

#### 使用

详见：[cli-color - npm](https://www.npmjs.com/package/cli-color)

```ts
import clc from 'cli-color';

console.log(clc.red.bold('警告'));
```
