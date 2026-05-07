# 学习计划

## 使用说明

| 级别  | 熟练程度    | 星级    | 说明                          |
| :-- | :------ | :---- | :-------------------------- |
| 入门级 | 了解      | ★     | 对技术栈有初步认知，知道用途与场景，但未用于实际项目。|
| 初级  | 有使用经验   | ★★    | 在项目中用过，能完成简单任务，复杂问题仍需较多参考。|
| 中级  | 能独立完成工作 | ★★★   | 可独立交付常规任务，具备基础排障与优化能力。|
| 高级  | 熟悉      | ★★★★  | 对原理、架构、实践较深入，能承担复杂问题与方案设计。|
| 专家级 | 精通      | ★★★★★ | 具备深度分析、优化与创新能力，可主导大型项目技术方向。|

> [!info]
> - 星星总数表示学习目标级别。
> - 实心星星 ★ 表示已达到的级别，空心星星 ☆ 表示距离目标的差距。
> - ❌ 表示暂缓学习。
> - ✔️ 表示已完成。

## 状态看板

### 正在学习

1. 《NestJS 全栈开发解析：快速上手与实践》
2. [Nest. js 学习资源整理](后端开发/NestJS/Nest.%20js%20学习资源整理.md)

## 前端开发路线

> 参考路线图：[roadmap.sh/frontend](https://roadmap.sh/frontend)

### 1. 计算机基础与网络

#### 计算机基础

- 操作系统基础（进程/线程/内存）
- 数据结构与算法（前端常见题型）

#### 计算机网络

> 持有《计算机三级网络技术》证书，做过机房运维（会配置交换机、防火墙等），但太久没做了，知识遗忘较多
- OSI 七层模型
- HTTP ★★☆☆
- HTTPS / TLS
- DNS
- TCP 三次握手、四次挥手
- HTTP 缓存（强缓存/协商缓存）
- HTTP/2 与 HTTP/3（待评估）

### 2. 前端语言与基础能力

- HTML ★★★☆
	- HTML 基础
	- 常用标签与语义化
	- 表单验证
	- 无障碍（Accessibility）
	- SEO 优化
- CSS ★★★☆
  - CSS 基础
  - 常用布局
  - 响应式网页设计
  - 移动端 ★★☆☆
- JavaScript ★★★☆
  - JavaScript 基础
  - ES6 ★★★☆
  - DOM 操作
  - 事件循环（Event Loop）
  - 异步编程（Promise / async-await）
  - 模块化（ESM / CommonJS）
  - Fetch API / Ajax（XHR）
- TypeScript
  - TS 中文文档（已系统学习，跳过少量低频高难内容）★★★☆
  - 装饰器 ★☆☆☆
  - 泛型与高级类型（待评估）
  - 类型体操 ❌

### 3. 浏览器与 Web 平台能力

- 浏览器原理
  - 渲染流程（解析、布局、绘制、合成）
  - 重排与重绘
  - 浏览器存储（Cookie / LocalStorage / SessionStorage / IndexedDB）
  - 跨标签页通信（BroadcastChannel / Storage Event）
- Web API ★★☆☆
  - WebSockets API
  - SSE
  - Service Workers / PWA
  - Clipboard API
  - File System Access API
  - Fullscreen API
  - Geolocation API
  - Notifications
  - Device Orientation
  - Payments
  - Credentials
  - WebGL
  - Web Components

### 4. CSS 与交互视觉

- CSS 进阶
  - Tailwind CSS ★★★☆
  - CSS 预处理器
    - Sass（Scss）★★☆☆
    - Less ★★☆☆
  - CSS-in-JS ★★☆☆
    - CSS Modules ☆☆☆☆
    - styled-components ☆☆☆☆
  - PostCSS ★★☆☆
  - CSS 架构
    - BEM：[BEM Documentation](https://en.bem.info/methodology/quick-start)
  - 设计系统 Token（待评估）
- 动画、特效与 3D
  - Canvas
  - Three.js
  - Anime.js
  - GSAP

### 5. 前端框架与生态

- Vue
  - Vue 2 ★★★☆
    - Vuex ★★☆☆
  - Vue 3 ★★☆☆
    - Vue Router ★★★☆
    - Pinia ★★☆☆
    - Vue i18n ★★★☆
    - VueUse ★☆☆☆
- React ★★★☆
  - React Router ☆☆☆☆
  - Redux ☆☆☆☆
  - ahooks ★★☆☆
- 跨框架能力
  - 状态管理设计（待评估）
  - 组件设计与封装（待评估）
  - 国际化（i18n）方案设计（待评估）

### 5. UI 体系与业务组件

- UI 库/组件库
  - Element UI ★★★☆
  - Element Plus ★★★☆
  - Ant Design ★★★☆
  - Ant Design Pro ★★★☆
  - Pro Components ★★★☆
  - Tailwind UI
  - Bootstrap ★★☆☆
- 常用库与解决方案
  - 动态表单
    - Formily
    - XRender
  - Axios
  - Lodash
  - html2canvas
  - kkFileView
  - Moment / Day.js
  - 数据可视化（ECharts / D3.js）（待评估）
  - 富文本编辑器（待评估）

### 7. 工程化与研发流程

- 技术选型
- 项目架构设计（Monorepo / 分层目录 / BFF）（待评估）
- 版本控制
  - Git
    - GitHub
    - GitLab
    - Gitee
- 包管理
  - npm
  - pnpm
  - yarn
  - nvm
- 构建工具
  - webpack
  - Babel
  - Vite
  - Rollup
  - RollDown
  - Turbopack
  - Gulp
- 代码规范
  - ESLint
  - Prettier
  - Stylelint
  - Husky
  - lint-staged
  - commitlint
  - JSDoc
- 认证策略
	- 基础认证（用户名/密码）
	- 基于会话（服务器记住登录）
	- 基于令牌（如 JWT，一种安全的数字密钥）
	- OAuth（用于第三方访问，如“用谷歌登录”）
	- SSO（单点登录，多个应用只需一次登录）
- 文档体系
  - README 规范（待评估）
  - 组件文档（Storybook）（待评估）
- 测试
  - 单元测试
  - 集成测试
  - 功能测试
  - 端到端测试
  - 用户界面/用户体验（UI/UX）
  - 性能测试
  - 安全性测试
  - 可访问性和兼容性测试
  - 冒烟测试
  - 回归测试
  - 工具
    - Jest
    - Vitest
    - Playwright
- CI/CD
  - Jenkins
  - GitHub Actions（待评估）
- 部署
	- GitHub Pages
	- Vercel
	- Cloudflare
	- CDN
### 8. 性能、稳定性与安全

- 性能优化
  - 代码分割
  - 懒加载
  - 预渲染
  - 性能指标（Core Web Vitals）（待评估）
  - 性能分析工具（Lighthouse / DevTools）（待评估）
- 监控与可观测性
  - 前端埋点
  - 错误监控（Sentry）（待评估）
  - 日志与告警链路（待评估）
- Web 安全
  - CORS
  - HTTPS
  - CSP
  - OWASP
  - XSS / CSRF（待评估）

### 9. 渲染模式与全栈前端

- 渲染模式
  - CSR（客户端渲染）
  - SSR（服务端渲染）
  - SSG（静态站点生成）
  - ISR（增量静态再生）
- 同构框架
  - Next.js（React）
  - Nuxt.js（Vue）
  - VitePress
- Node.js 与 BFF
  - Node.js 基础（待评估）
  - BFF 架构（待评估）
  - API 网关与聚合层（待评估）

### 跨端与新方向

- 移动端与桌面应用
  - 小程序 ☆☆☆☆
  - uni-app ★★☆☆
  - React Native
  - Flutter
  - Electron ★★☆☆
  - Tauri
- 微前端
  - qiankun / Module Federation（待评估）
- 低代码/无代码
- AI 大模型

### 开发工具

- IDE
  - VS Code ★★★☆
- 浏览器插件
  - Vue.js devtools
  - React Developer Tools

## 后端开发路线

### 服务框架与 API 设计

- NestJS
  - Nest 中文网文档（基础部分基本完成）[https://nest.nodejs.cn/](https://nest.nodejs.cn/)
- API 风格
  - Restful API ★ ✔️
  - GraphQL
  - OpenAPI / Swagger（待评估）

### 数据与存储

- 数据库
  - MySQL ★★☆☆
  - ORMs
- Redis
- 搜索引擎
  - Elasticsearch

### 认证与安全

- JWT Auth
- 身份认证策略
  - 用户名/密码
  - Session Auth
  - JWT
  - OAuth
  - SSO
- Web 安全
  - MD5
  - SHA
  - scrypt
  - bcrypt
  - RBAC / ACL（待评估）

### 运行环境与运维

- Linux 基础
- Web Servers
  - Nginx
  - MS IIS
- 容器与编排
  - Docker
  - Kubernetes
- CI/CD
- DevOps

### 工程质量与性能

- 测试
  - 单元测试
  - 功能测试
  - 集成测试
  - 端到端测试
- 缓存策略（待评估）
- 消息队列（RabbitMQ / Kafka）（待评估）
- 可观测性（Logging / Metrics / Tracing）（待评估）

### 通用能力扩展

- Python
- 算法
- 实时数据
  - SSE
  - WebSockets
  - 长轮询
  - 短轮询
- PowerBI

## 学习博客与资料

- [ ] [web 前端面试 - 面试官系列](https://vue3js.cn/interview/)
- [ ] 前端笔记整理
  - [ ] https://notes.fe-mm.com/
  - [ ] https://note.noxussj.top/
  - [ ] https://devtool.tech/fe-logo
  - [ ] https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs
- [ ] LeetCode
