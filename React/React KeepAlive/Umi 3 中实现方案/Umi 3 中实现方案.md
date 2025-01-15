## 在 Umi 3 中实现方案

> 注意：该功能非 react 官方支持，如发现影响正常功能，请不要使用
>
> 参考：[GitHub - lifegit/antd-pro-use-keepalive](https://github.com/lifegit/antd-pro-use-keepalive/tree/master)

#### 使用

1. **安装依赖**

```bash
npm i umi-plugin-keep-alive
```

1. **注册插件**

*/config/config. ts*

```ts
// https://umijs.org/config#plugins
plugins: ['./src/components/PanelTabsKeepAlive/plugin.ts'],
```

1. **补充 layout 样式**

```bash
+ src/app.tsx

import {ProBreadcrumb} from '@ant-design/pro-layout';

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    disableContentMargin: true,
    breadcrumbRender: (routers = []) => [
      {
        path: '/',
        breadcrumbName: '主页',
      },
      ...routers,
    ],
    headerContentRender: () => <ProBreadcrumb />,
  }
}

// 修改属性
+ config/defaultSettings.ts
  layout: 'side',
  fixedHeader: true,

// 增加样式，移动端下为面包屑增加边距
+ src/global.less
@media screen and (max-width: @screen-md) {
  body .ant-pro-global-header-collapsed-button {
    margin-right: 12px;
  }
}
```

1. 面包屑

可以看到此时面包屑是重复的，我们可以修改 `src/pages` 每一个的 `<PageContainer breadcrumbRender={false}>`

#### 额外场景

增加缓存后有许多场景需要我们调整。

##### 不需要缓存的页面

routes. ts 中 hideInPanelTab: true 即可不缓存该页面。例：登录页面

##### 编辑、新增页

当我们在编辑页、新增页完成时：

> 跳转到 Result 结果页则无需关注。

如果销毁页面操作，以往我们使用 `history.goBack()`。

此时会造成缓存依旧存在（因为他和切换标签页没有区别），页面上的标签页仍然存在，点击切换后表单内数据依然存在。

我们需要使用 `closeCurrent()` 解决该问题。

例：

```tsx
import usePanelTab from '@/components/PanelTabsKeepAlive/PanelTabs/PanelTabHook'

const Index: React.FC = () => {
  const { closeCurrent } = usePanelTab()
  const handleFinish = (data: API.Article) => (
     postArticles(data)
      .then(() => {
        message.success('添加成功')
        // history.goBack()
        closeCurrent()
      })
  )
  return (
    <PageContainerBack>
      <ArticleForm onFinish={handleFinish} />
    </PageContainerBack>
  )
}
export default Index
```

##### 列表页

当返回到列表页时，因缓存原因该页面此时数据是旧的，所以此时我们需要刷新数据。

总不能编辑时保存了数据，回过头来查看列表，数据却没变。

```tsx
import { useThrottleEffect } from 'ahooks'
const Index: React.FC<{ activateCount: number }> = (props) => {
  const ref = useRef<ActionType>()
  useThrottleEffect(
  () => {
    ref.current?.reload?.()
  },
  [props.activateCount],
  { wait: 5000 },

  return (
    <PageContainer>
      <ProTable actionRef={ref} />
    </PageContainer>
  )
}
```
