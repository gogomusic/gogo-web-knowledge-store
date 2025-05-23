## 可选链操作符 `?.`

**可选链运算符**（**`?.`**）前面的引用为 null 或者 undefined 时，直接返回 undefined。可用于对象、数组和函数

语法

```js
obj.val?.prop
obj.val?.[expr]
obj.func?.(args)
```

## 空值合并运算符

**空值合并运算符**（**`??`**）是一个逻辑运算符，当左侧的操作数为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 时，返回其右侧操作数，否则返回左侧操作数。

空值合并运算符与 [逻辑或运算符（`||`）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_OR) 不同

- 逻辑或运算符会在左侧操作数为 [假值](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)（`0`， `''`， `NaN`， `null`， `undefined`）时返回右侧操作数。
- 空值合并运算符可以避免这种陷阱，其只在第一个操作数为 `null` 或 `undefined` 时（而不是其他假值）返回第二个操作数

>[!warning]
>由于空值合并运算符和其他逻辑运算符之间的运算优先级/运算顺序是未定义的，将 `??` 直接与 AND（`&&`）和 OR（`||`）运算符组合使用是不可取的,**需要使用括号来显式表明运算优先级**

配合 [可选链操作符 ?.](#可选链操作符%20`?.`) 可以设置默认值

```js
let customer = {
  name: "Carl",
  details: { age: 82 },
};
let customerCity = customer?.city ?? "暗之城";
console.log(customerCity); // “暗之城”
```
