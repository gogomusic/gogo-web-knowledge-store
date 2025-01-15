> [Vue Router | Vue.js 的官方路由](https://router.vuejs.org/zh/)

## 介绍

>[!abstract] 介绍
>
>Vue Router 是 [Vue.js](https://vuejs.org/) 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。功能包括：
>
>- [嵌套路由](嵌套路由.md) 映射
>- 动态路由选择
>- 模块化、基于组件的路由配置
>- 路由参数、查询、通配符
>- 展示由 Vue.js 的过渡系统提供的过渡效果
>- 细致的导航控制
>- 自动激活 CSS 类的链接
>- HTML5 history 模式或 hash 模式
>- 可定制的滚动行为
>- URL 的正确编码

## 安装

```bash
npm install vue-router
```

## 入门

### 创建路由器实例

```vue
import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
```

### 注册路由器插件

```ts
createApp(App)
  .use(router)
  .mount('#app')
```

## 关键词

**组件** (也支持 kebab-case 风格)
`<RouterLink></RouterLink>`
`<RouterView/>`

**在组件模版中可直接使用**
`{{ $route }} `
`{{ $router }} `

**在组件 script 中使用**
`const router = useRouter()`
`const route = useRoute()`

[重定向](重定向.md)

**动态路由**

**命名路由**：推荐使用命名路由进行跳转，每个路由的 name 必须是唯一的

**路由组件传参**：允许将路由参数作为组件的 props

## 导航守卫

### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。<font color="#ff0000">（组合式 API：onBeforeRouteLeave）</font>
3. 调用**全局前置守卫** `beforeEach` 
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。<font color="#ff0000">（组合式 API：onBeforeRouteUpdate）</font>
5. 在路由配置里调用**路由独享守卫** `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。<font color="#ff0000">（不能在组合式 API setup 语法糖中使用）</font>
8. 调用**全局解析守卫** `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用**全局后置钩子** `afterEach` 。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。<font color="#ff0000">（不能在组合式 API setup 语法糖中使用）</font>
