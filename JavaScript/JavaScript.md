# JavaScript

## 简介

完整的 JavaScript 包含以下几个部分：

- 核心（ECMAScript）
- 文档对象模型（DOM）
- 浏览器对象模型（BOM）

### HTML 中的 JavaScript

JavaScript 是通过 `<script>` 元素插入到 HTML 页面中的。这个元素可用于把 JavaScript 代码嵌入到 HTML 页面中，跟其他标记混合在一起，也可用于引入保存在外部文件中的 JavaScript。

- 要包含外部 JavaScript 文件，必须将 src 属性设置为要包含文件的 URL。文件可以跟网页在同一台服务器上，也可以位于完全不同的域。
- 所有 `<script>` 元素会依照它们在网页中出现的次序被解释。在不使用 defer 和 async 属性的情况下，包含在 `<script>` 元素中的代码必须严格按次序解释。
- 对不推迟执行的脚本，浏览器必须解释完位于 `<script>` 元素中的代码，然后才能继续渲染页面的剩余部分。为此，通常应该把 `<script>` 元素放到页面末尾，介于主内容之后及 `</body>` 标签之前。
- 可以使用 defer 属性把脚本推迟到文档渲染完毕后再执行。推迟的脚本原则上按照它们被列出的次序执行。
- 可以使用 async 属性表示脚本不需要等待其他脚本，同时也不阻塞文档渲染，即异步加载。异步脚本不能保证按照它们在页面中出现的次序执行。
- 通过使用 `<noscript>` 元素，可以指定在浏览器不支持脚本时显示的内容。如果浏览器支持并启用脚本，则 `<noscript>` 元素中的任何内容都不会被渲染。

## 语言基础

### 语法

- 区分大小写
- 标识符
	- **首字符**必须是 Unicode 字母（包括汉字）、下划线 `_`、美元符号 `$`
	- **非首字符** 还可以额外包含 Unicode 数字、Unicode 连接符、组合符号等
	- **最佳实践**：使用**驼峰命名法**、尽量不要使用汉字等特殊字符
- 注释
	- 单行注释：`// 单行注释`
	- 多行注释：`/* 多行注释 */`
- 严格模式
	- 在脚本开头使用：在脚本开头加上 `"use strict"`
	- 在函数中使用：在函数体开头加上 `"use strict"`，如：`function fn(){"use strict";console.log("test");}`
- 语句
	- 以分号结尾（推荐）
	- 多条语句可以合并到代码块中，代码块以花括号（`{}`）标识

### 关键字和保留字

不要使用关键字和保留字作为标识符和属性名，以确保兼容过去和未来的 ECMAScript 版本

![](assets/Pasted%20image%2020260513160143.png)

### 变量

- var
	- 声明范围：函数作用域
	- 声明提升 (到函数作用域顶部)
	- 可重复声明
	- 可全局声明（变量会成为 window 对象的属性）：
		- 在全局作用域下声明
		- 在函数中声明时，不加 `var` 直接赋值。当函数执行后，变量会变成全局变量
- let
	- 声明范围：块作用域
	- 暂时性死区（没有声明提升）
	- 不可重复声明
	- 不可全局声明
- const
	- 声明时必须同时初始化变量，且后续不可更改
	- 声明范围：块作用域
	- 暂时性死区（没有声明提升）
	- 不可重复声明
	- 不可全局声明

### 数据类型

#### 数据类型分类

##### **基本数据类型**（原始类型）7 种

基本数据类型存储在**栈内存**中，保存的是**值本身**，且不可变

- **Number**：数字（整数和浮点数），包括 `-Infinity`、`Infinity`、`NaN`（Not a Number）
- **String**：字符串
- **Boolean**：布尔值 `true` / `false`
- **Undefined**：已声明但未赋值的变量，默认值为 `undefined`
- **Null**：空值（表示“无”的对象原型的占位符）
- **Symbol**（ES 6 新增）：表示**唯一**的值，常用于对象属性的键
- **BigInt**（ES 2020 新增）：表示大于 `2^53 - 1` 的整数，末尾加 `n`

##### 引用数据类型

引用数据类型的变量保存的是指向该内存地址的指针（引用）并存储在**栈内存**中，**实际数据**存储在**堆内存**中，。

- **Object**：普通对象 `{}`
- **Array**：数组 `[]`
- **Function**：函数 `function() {}`
- **Date**：日期对象
- **RegExp**：正则表达式
- **Map / Set**（ES6）：键值对集合 / 无重复值集合
- **其他内置对象**：`Error`, `WeakMap`, `Promise` 等

> 注意：`typeof null` 返回 `"object"`，这属于 JavaScript 语言设计的一个历史遗留 Bug，但 `null` 本身是基本数据类型。

#### 精确判断变量类型

| 类型              | `typeof`      | `Object.prototype.toString.call()` | `instanceof`                  | lodash              | 其他方法                                  | 推荐方案                         |
| --------------- | ------------- | ---------------------------------- | ----------------------------- | ------------------- | ------------------------------------- | ---------------------------- |
| **Undefined**   | `"undefined"` | `"[object Undefined]"`             | ❌                             | `_.isUndefined()`   | -                                     | `typeof v === "undefined"`   |
| **Null**        | `"object"` ❌  | `"[object Null]"`                  | ❌                             | `_.isNull()`        | -                                     | `v === null`                 |
| **Boolean**     | `"boolean"`   | `"[object Boolean]"`               | ❌                             | `_.isBoolean()`     | -                                     | `typeof v === "boolean"`     |
| **Number**      | `"number"`    | `"[object Number]"`                | ❌                             | `_.isNumber()`      | `Number.isFinite()`                   | `typeof v === "number"`      |
| **NaN**         | `"number"`    | `"[object Number]"`                | ❌                             | `_.isNaN()`         | `Number.isNaN(v)`                     | `Number.isNaN(v)`            |
| **String**      | `"string"`    | `"[object String]"`                | ❌                             | `_.isString()`      | -                                     | `typeof v === "string"`      |
| **BigInt**      | `"bigint"`    | `"[object BigInt]"`                | ❌                             | ❌ 无                 | `typeof v === "bigint"`               | `typeof v === "bigint"`      |
| **Symbol**      | `"symbol"`    | `"[object Symbol]"`                | ❌                             | `_.isSymbol()`      | -                                     | `typeof v === "symbol"`      |
| **Object**      | `"object"`    | `"[object Object]"`                | ❌                             | `_.isPlainObject()` | `v !== null && typeof v === "object"` | `_.isPlainObject()` 或自实现     |
| **Array**       | `"object"` ❌  | `"[object Array]"`                 | `v instanceof Array` ⚠️       | `_.isArray()`       | `Array.isArray()`                     | `Array.isArray()`            |
| **Function**    | `"function"`  | `"[object Function]"`              | ❌                             | `_.isFunction()`    | -                                     | `typeof v === "function"`    |
| **Date**        | `"object"` ❌  | `"[object Date]"`                  | `v instanceof Date` ⚠️        | `_.isDate()`        | -                                     | `_.isDate()` 或自实现            |
| **RegExp**      | `"object"` ❌  | `"[object RegExp]"`                | `v instanceof RegExp` ⚠️      | `_.isRegExp()`      | -                                     | `_.isRegExp()` 或自实现          |
| **Map**         | `"object"` ❌  | `"[object Map]"`                   | `v instanceof Map` ⚠️         | `_.isMap()`         | -                                     | `_.isMap()` 或自实现             |
| **Set**         | `"object"` ❌  | `"[object Set]"`                   | `v instanceof Set` ⚠️         | `_.isSet()`         | -                                     | `_.isSet()` 或自实现             |
| **WeakMap**     | `"object"` ❌  | `"[object WeakMap]"`               | `v instanceof WeakMap` ⚠️     | ❌ 无                 | -                                     | 自实现                          |
| **WeakSet**     | `"object"` ❌  | `"[object WeakSet]"`               | `v instanceof WeakSet` ⚠️     | ❌ 无                 | -                                     | 自实现                          |
| **Promise**     | `"object"` ❌  | `"[object Promise]"`               | `v instanceof Promise` ⚠️     | ❌ 无                 | -                                     | 自实现                          |
| **Error**       | `"object"` ❌  | `"[object Error]"`                 | `v instanceof Error`          | `_.isError()`       | -                                     | `_.isError()` 或 `instanceof` |
| **ArrayBuffer** | `"object"` ❌  | `"[object ArrayBuffer]"`           | `v instanceof ArrayBuffer` ⚠️ | ❌ 无                 | -                                     | 自实现                          |

> **⚠️ `instanceof` 的局限**：跨 iframe 时失效（不同 iframe 的 Array 互不认识）

**各方法特点**：

| 方法                                   | 优点                      | 缺点                       | 适用场景           |
| ------------------------------------ | ----------------------- | ------------------------ | -------------- |
| **typeof**                           | 速度快、内置、无依赖              | 无法区分对象类型（都返回 `"object"`）| 原始类型判断         |
| **Object.prototype.toString.call()** | 精确、覆盖所有内置类型、跨 iframe 有效 | 性能略低（方法调用开销）| **通用方案**（本文推荐）|
| **instanceof**                       | 支持原型链继承检查               | 跨 iframe 失效、性能中等         | 自定义类实例检查       |
| **lodash**                           | API 统一、维护良好、常用函数丰富      | 需外部依赖、不支持 BigInt/Promise | 大型项目、已用 lodash |
| **Array.isArray()**                  | 专为数组优化、跨 iframe 有效      | 仅限数组                     | **数组判断首选**     |
| **Number.isNaN()**                   | 精确判断 NaN                | 仅限 NaN                   | NaN 检查         |

### 操作符

#### 一元操作符

- 递增/递减操作符：`i++`、`++i`、`--i`、`i--`
- 一元加和减：`+i`、`-i`

#### 位操作符

- 按位非：`~`
- 按位与：`&`
- 按位或：`|`
- 按位异或：`^`
- 左移：`<<`
- 右移：`>>`
- 无符号右移：`>>>`

#### 布尔操作符

- 逻辑非：`!`
- 逻辑与：`&&`
- 逻辑或：`||`

#### 乘性操作符

- 乘法操作符：`*`
- 除法操作符：`/`
- 取模操作符：`%`

#### 指数操作符

- `**`：相当于 `Math.pow()`

#### 加性操作符

- 加法操作符：`+` **优先进行字符串拼接，否则进行数值加法**
- 减法操作符：`-` **始终进行数值减法，永远不进行字符串操作**

#### 关系操作符

- 小于：`<`
- 大于：`>`
- 小于等于：`<=`
- 大于等于：`>=`
- 核心规则：
	- **任一操作数是对象**：比较原始值
	- **两个操作数都是字符串**：按**字典顺序**（Unicode 码点）比较
	- **其他情况**：将两个操作数都转为**数字**，然后比较
- 特殊规则
	- `NaN` 参与的比较永远返回 `false`

#### 相等操作符

- 等于：`=`
- 不等于：`!=`
- 全等：`==`
- 不全等：`!==`

#### 条件操作符（三元运算符）

- **语法：** `条件 ? 表达式1 : 表达式2`

#### 赋值操作符

- 将 `=` 右边的值赋给左边的变量
- 可进行复合赋值，比如：`+=`、`*=`

#### 逗号操作符

- 可用于一条语句中执行多个操作，比如：`let a=1,b=2;`

### 语句

- `if else`
- `do-while`：是一种后测试循环语句，循环体内的代码至少执行一次
- `while`：是一种先测试循环语句，会先检测退出条件，循环体内的代码可能不会执行
- `for`：是一种先测试循环语句，相比 `while`，增加了进入循环之前的初始化代码，以及循环执行后要执行的表达式
- `for-in`：用于遍历对象可枚举的字符串键属性（包括继承的可枚举属性），不能保证返回对象属性的顺序
- `for-of`：用于遍历可迭代对象的元素
- 标签语句：语法 `标签名: 语句`，为代码块或循环命名，后面可使用 `break` 或 `continue` 语句引用，主要用于跳出多层嵌套循环或提前终止特定代码块
- `break`：用于立即退出循环或代码块（注意：要跳出代码块，`break` 必须带标签）
- `continue`：用于跳过循环当前迭代并继续下一次循环
- `switch` 语句

### 函数

- 普通函数：`function functionName(arg0, arg1, arg2,...,argN){statements}`
- 箭头函数：`(arg0, arg1, arg2,...,argN)=>{statements}`

## 执行上下文与作用域

- 每个上下文都有一个关联的**变量对象**，这个上下文中所有关联的变量和函数都存在于这个对象上。虽然无法通过代码访问变量对象，但后台处理数据时会用到它
- 全局上下文是最外层的上下文。浏览器中，全局上下文是 `window` 对象

### 垃圾回收

- 标记清理
- 引用计数（**无法处理循环引用**）

## 基本引用类型

- Date
- RegExp
	- 常用实例方法：`exec`、`test`
- 原始值包装类型：Boolean、Number、String
- 单例内置对象：Global（无法直接访问）、Math

## 集合引用类型

- Object
- Array
