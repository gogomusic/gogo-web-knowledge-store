- [ ] 笔记复习整理

![](assets/Pasted%20image%2020230728102246.png)

![](assets/Pasted%20image%2020230728102320.png)

如果在代码中复制对象感觉乏味，可以使用 [Immer](https://github.com/immerjs/use-immer) 之类的库来减少重复代码：

按照惯例，事件处理函数 props 应该以 `on` 开头，后跟一个大写字母。

通常可以通过相应 state 变量的第一个字母来命名更新函数的参数：

```
setEnabled(e => !e);setLastName(ln => ln.reverse());setFriendCount(fc => fc * 2);
```

- 设置 state 不会更改现有渲染中的变量，但会请求一次新的渲染。
- React 会在事件处理函数执行完成之后处理 state 更新。这被称为批处理。
- 要在一个事件中多次更新某些 state，你可以使用 `setNumber(n => n + 1)` 更新函数。
>[!note]
>React 允许你覆盖默认行为，可通过向组件传递一个唯一 `key`（如 `<Chat key={email}/>` 来**强制**重置其状态。这会告诉 React，如果收件人不同，应将其作为一个 **不同的** `Chat` 组件，需要使用新数据和 UI（比如输入框）来重新创建它。现在，在接收者之间切换时就会重置输入框——即使渲染的是同一个组件。
- [ ] 进度 [使用 Context 深层传递参数 – React (docschina.org)](https://react.docschina.org/learn/passing-data-deeply-with-context)
- [ ] [immerjs/use-immer: Use immer to drive state with a React hooks (github.com)](https://github.com/immerjs/use-immer)
