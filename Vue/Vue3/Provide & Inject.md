详见：[Provide / Inject | Vue.js (vuejs.org)](https://v3.cn.vuejs.org/guide/component-provide-inject.html)

作用：在深度嵌套的组件中，将 prop 沿着组件链逐级传递会很麻烦。使用 Provide/Inject可以直接将父组件的数据传递给子孙组件

## 示例1：提供静态数据并提供默认值
***father.vue***
```vue
<script lang="ts">
import { defineComponent, provide } from 'vue'
import Son from './Son.vue'

export default defineComponent({
  components: { Son },
  setup() {
    //provide 函数允许你通过两个参数定义 property：name (<String> 类型)和 value
    provide('staticData', 'static') //提供无响应性的数据,该值不可以被子组件修改
  },
})
</script>
```

***son.vue***
```vue
<script lang="ts">
import { defineComponent, inject } from 'vue'
export default defineComponent({
  setup() {
    //inject(name,default) 函数有两个参数：要inject 的 property 的 name和默认值 (可选)
    const staticData = inject('staticData','defaultValue')

    return {
      staticData,
    }
  },
})
</script>
```

## 示例2：直接提供响应式数据（不安全）

***father.vue***
```vue
<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import Son from './Son.vue'

export default defineComponent({
  components: { Son },
  setup() {
    const reactivityData = ref('响应式数据')//ref或者reactive都可以
    provide('reactivityData', reactivityData) //提供响应性的数据,该值可以被子组件修改。
  },
})
</script>
```

***son.vue***
```vue
<script lang="ts">
import { defineComponent, inject } from 'vue'
export default defineComponent({
  setup() {
    const reactivityData = inject('reactivityData')
    return {
      reactivityData,
    }
  },
})
</script>
```

## 示例3：使用readonly，使子组件无法直接修改父组件数据（即使是对象下的属性，也不能直接修改），但是可以由父组件provide一个方法以供子组件修改

***father.vue***
```vue
<script lang="ts">
import { defineComponent, provide, ref, readonly } from 'vue'
import Son from './Son.vue'

export default defineComponent({
  components: { Son },
  setup() {
    const reactivityReadonlyData = ref({ name: '张三' })
    provide('reactivityReadonlyData', readonly(reactivityReadonlyData)) //使用readonly，提供响应性的数据,该值可以不可以直接被子组件修改。但是可以再提供一个方法专门用于修改数据
    const changeReactivityReadonlyData = (val: string) => {
      reactivityReadonlyData.value.name = val
    }
    provide('changeReactivityReadonlyData', changeReactivityReadonlyData)
  },
})
</script>
```

***son.vue***
```vue
<script lang="ts">
import { defineComponent, inject } from 'vue'
export default defineComponent({
  setup() {
    const reactivityReadonlyData = inject('reactivityReadonlyData')
    const changeReactivityReadonlyData = inject('changeReactivityReadonlyData')
    return {
      reactivityReadonlyData,
      changeReactivityReadonlyData,
    }
  },
})
</script>
<template>
  <div>子组件{{ reactivityReadonlyData.name }}</div>
  <button @click="changeReactivityReadonlyData('李四')">点击修改</button>
</template>
```

## 示例4：推荐用法（安全，无报错）。最好给inject提供默认值

***father.vue***
```vue
<script lang="ts">
import { defineComponent, provide, Ref, ref, readonly, InjectionKey } from 'vue'
import Son from './Son.vue'

// 用户信息
export type UserInfoType = Ref<{
  userName: string
  userId: number
}>

//修改用户名
export type ChangeUserNameType = (val: string) => void

//Vue 提供了一个 InjectionKey 接口，该接口是扩展了 Symbol 的泛型类型。它可用于在生产者和消费者之间同步 inject 值的类型：
export const UserInfoKey: InjectionKey<UserInfoType> = Symbol()
export const ChangeUserNameKey: InjectionKey<ChangeUserNameType> = Symbol()

export default defineComponent({
  components: { Son },
  setup() {
    const userInfo = ref({
      userName: '静夜聆雨',
      userId: 999,
    })
    const changeUserName = (val: string) => {
      userInfo.value.userName = val
    }
    provide<UserInfoType>(UserInfoKey, readonly(userInfo))
    provide<ChangeUserNameType>(ChangeUserNameKey, changeUserName)
  },
})
</script>

<template>
  父组件
  <Son></Son>
</template>
```

***son.vue***
```vue
<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { UserInfoKey, ChangeUserNameKey } from './Father.vue'

export default defineComponent({
  setup() {
    const userinfo = inject(
      UserInfoKey,
      ref({
        userName: '',
        userId: NaN,
      })
    )
    const changeUserName = inject(ChangeUserNameKey, () => {
      console.log('无法修改父组件的值')
    })

    return {
      userinfo,
      changeUserName,
    }
  },
})
</script>

<template>
  子组件{{ userinfo.userName }}
  <button @click="changeUserName('李四')">点击修改父组件</button>
</template>
```
