# Pinia

https://pinia.vuejs.org/zh

>以下只记录组合式 API 的用法

## 定义 store

`store/counter`

```ts
import { defineStore } from 'pinia'
// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`) 
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

## 使用 store

```vue
<template>
    <div>{{store.count}}</div>
    <div>{{store.doubleCount}}</div>
    <div>
      <el-button @click="store.increment">加1</el-button>
    </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useCounterStore()
</script>
```

## store 解构

为了保持响应性，可以使用计算属性

```js
// 💡 当然你也可以直接使用 `store.doubleCount` 
const doubleValue = computed(() => store.doubleCount)
```

如果使用解构语法，同时保留响应性，需要使用 `storeToRefs()

```ts
<script setup>
import { storeToRefs } from 'pinia'
const store = useCounterStore()

// `name` 和 `doubleCount` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { name, doubleCount } = storeToRefs(store)

// 作为 action 的 increment 可以直接解构
const { increment } = store
</script>
```

>[!warning] 注意
> `storeToRefs` 只能用于在解构响应式属性时使用，不能用于 action，action 可以直接被解构

## 在 Vue 组件外使用

如果你不做任何 SSR(服务器端渲染)，在用 `app.use(pinia)` 安装 pinia 插件后，对 `useStore()` 的任何调用都会正常执行。也就是说，在组件里怎么用，就可以在 js 里怎么用。但是需要保证 pinia 实例被激活。最简单的方法就是将 `useStore()` 的调用放在 pinia 安装后才会执行的函数中。

示例：

```ts
import { useCounterStore } from '../stores';
export function add() {
  const counter = useCounterStore();
  counter.count = 99;
}
```

- 上面的例子中，将 `useStore()` 的调用放在函数体内，调用函数时，pinia 实例已经被被激活，就可以调用成功。
- 如果放在函数体外，就会报错
