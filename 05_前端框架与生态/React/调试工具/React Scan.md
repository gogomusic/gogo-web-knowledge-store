[React Scan](https://react-scan.com/)

## 在 antd pro 项目中使用

安装

```
npm i react-scan
```

使用：在 `app.tsx` 中

```tsx
import { scan } from 'react-scan';

scan({
  enabled: process.env.NODE_ENV === 'development',
  log: false,
  showToolbar: true,
});
```
