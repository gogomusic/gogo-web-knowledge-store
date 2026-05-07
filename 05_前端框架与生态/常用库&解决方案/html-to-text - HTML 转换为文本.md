### html-to-text - HTML 转换为文本

#### Features

解析 HTML 并返回精美文本的高级转换器

#### Installation

```bash
npm install html-to-text
```

#### Usage

基本的使用方法

```javascript
const { convert } = require('html-to-text');
// There is also an alias to `convert` called `htmlToText`.

const options = {
  wordwrap: 130,
  // ...
};
const html = '<div>Hello World</div>';
const text = convert(html, options);
console.log(text); // Hello World
```
