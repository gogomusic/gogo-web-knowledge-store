# TS 类型体操

可前往此仓库进行练习：[type-challenges/type-challenges: Collection of TypeScript type challenges with online judge](https://github.com/type-challenges/type-challenges)

## 笔记

- 如果 `type T = any[]`, `T[number]` 可以获取数组中所有属性的联合类型
- TS 内置类型：`type PropertyKey = string | number | symbol`，表示对象的键的类型
- 分布式条件类型：当 `T` 是联合类型（如 `number | string`）时，会触发分布式条件类型，条件类型会进行分布式展开。如果需要避免这种情况，需要用方括号包裹 `[T]`
