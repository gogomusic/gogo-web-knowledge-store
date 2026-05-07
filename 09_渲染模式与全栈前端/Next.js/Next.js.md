
[Next.js - React 应用开发框架 | Next.js中文网](https://www.nextjs.cn/)

## 创建项目

```bash
npx create-next-app@latest
```

## 预渲染

Next.js 具有两种形式的预渲染： **静态生成（Static Generation）** 和 **服务器端渲染（Server-side Rendering）**。这两种方式的不同之处在于为 page（页面）生成 HTML 页面的 **时机** 。

- [**静态生成 （推荐）**](https://www.nextjs.cn/docs/basic-features/pages#static-generation-recommended)：HTML 在 **构建时** 生成，并在每次页面请求（request）时重用。
- [**服务器端渲染**](https://www.nextjs.cn/docs/basic-features/pages#server-side-rendering)：在 **每次页面请求（request）时** 重新生成 HTML。

## 字体和图像优化

- [Image Optimization Docs 图像优化文档](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Font Optimization Docs 字体优化文档](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Improving Web Performance with Images (MDN)  
    使用图像 （MDN） 提高 Web 性能](https://developer.mozilla.org/en-US/docs/Learn/Performance/Multimedia)
- [Web Fonts (MDN) Web 字体 （MDN）](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Web_fonts)
