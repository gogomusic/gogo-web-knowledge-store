# TypeScript

TypeScript 是具有类型语法的 JavaScript，TypeScript 是一种基于 JavaScript 构建的强类型编程语言

- 官网：[TypeScript: JavaScript With Syntax For Types.](https://www.typescriptlang.org/)
- 中文网：[TypeScript 中文网](https://ts.nodejs.cn/)

TS 属于结构类型系统，在结构类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型。

## 类型

### 基础类型：`string`, `number`, `boolean`

### 数组

示例：`number[] 或 Array<number>`

### 对象

- 对象类型定义时使用 , 或 ; 分割属性均可。
- 属性名称后添加 ? 指定属性为可选属性<font color="#ff0000"> (tip: 试图从可选属性中读取数据时，需要检查其是否是 undefined)</font>

示例：

```
function printCoord(pt: { x: number; y?: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

### `null` 和 `undefined`

需要在对该值使用方法或属性之前测试这些值（类型缩小）

```ts
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

### `any`

TypeScript 也有一个特殊的类型，`any`，当你不希望某个特定的值导致类型检查错误时，你可以使用它。

#### `noImplicitAny`

当你没有指定类型，并且 TypeScript 不能从上下文推断它时，编译器通常会默认为 `any`。

不过，你通常希望避免这种情况，因为 `any` 没有经过类型检查。使用编译器标志 [`noImplicitAny`](https://ts.nodejs.cn/tsconfig#noImplicitAny) 将任何隐式 `any` 标记为错误。

### unknown

### never

### 字面类型

定义类型时引用特定的字符串和数字

- `const x: "hello" = "hello";`
- `function printText(s: string, alignment: "left" | "right" | "center") {// ...}`

### 字面推断

```ts
declare function handleRequest(url: string, method: "GET" | "POST"): void;
 
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
```

此时，`req.method` 被推断为 `string`，TS 会报错。解决方法：

1. 使用类型断言：`req.method as "GET"`
2. 使用 `as const` 将整个对象转换为类型字面：`const req = { url: "https://example.com" , method: "GET" } as const;`

### 联合类型

声明一个类型可以是多种类型之一，例如：`type MyBool = true | false;`

联合成员的分隔符允许放在第一个元素之前，因此也可以这样写：

```ts
function printTextOrNumberOrBool(
  textOrNumberOrBool:
    | string
    | number
    | boolean
) {
  console.log(textOrNumberOrBool);
}
```

TypeScript 只有在对联合的每个成员都有效的情况下才允许操作。解决方案是用代码缩小联合。通常在 if 语句中使用 typeof 或 Array.isArray 对参数进行判断

### type 和 interface

#### 类型别名 type

用于为任何类型命名

示例：

```ts
type Point = {
  x: number;
  y: number;
};
```

#### 接口 interface

用于命名对象类型

#### type 和 interface 的区别

1. interface 的几乎所有功能都在 type 中可用
2. interface 可以通过 extends 扩展接口，type 可以通过交叉 (&) 扩展类型
3. interface 可以向接口添加新字段（声明合并），而 type 在类型创建后不能更改
4. interface 只能用于声明对象的形状，不能用于其他类型

### 类型注释

#### 变量的类型注释

> 变量的类型注释有时可以不写，TS 会根据赋给变量的值**自动推断**变量的类型

示例：

```ts
let myName: string = "Alice";
```

#### 函数的类型注释

##### 参数类型注解

```ts
function greet(name: string) {
  console.log("Hello, " + name);
}
```

##### 返回类型注解

> 返回类型注解通常可以不写，TS 会根据 return 语句**自动推断**返回值的类型

```ts
function getFavoriteNumber(): number {
  return 26;
}
```

返回 Promise：

```ts
async function getFavoriteNumber(): Promise<number> {
  return 26;
}
```

#### 匿名函数

当一个函数出现在 TypeScript 可以确定如何调用它的地方时，该函数的参数会自动被赋予类型。比如示例中的参数 s 没有类型注释，TypeScript 还是使用 forEach 函数的类型以及推断的数组类型来确定 s 将具有的类型，这个过程称为上下文类型

```ts
const names = ["Alice", "Bob", "Eve"];

names.forEach(function (s) {
  console.log(s.toUpperCase());
});
```

### 类型断言

类型断言有两种语法，两种语法是等效的，但是尖括号语法在 .tsx 文件中不可用

- `const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;`
- `const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");`

TypeScript 只允许类型断言转换为更具体或更不具体的类型版本，如果需要更复杂的转换，可以使用两个断言来**强制转换**

```ts
const a = expr as any as T; 或 
const a = expr as unknown as T; 
```

### 非空断言

在任何表达式之后写 `!` 实际上是一个类型断言，断言该值不是 null 或 undefined：

### 枚举

枚举代码会被添加到 js 运行时，所以不能在 d.ts 文件中赋值（但可声明）

## 类型缩小

### 类型缩小方法

- **`typeof` 类型保护**
	- 可以判断 `string` `number` `bigint` `boolean` `symbol` `undefined` `object` `function`
	- 无法判断 `null`，需要使用真值缩小
- **真值缩小**
	- 条件、`while`、`&&`、`||`、`if` 语句、布尔否定 (`!`)
- **相等性缩小**
	- `switch` 语句和 ` === `、`!== `、` == ` 和 `!= `
- **`in` 运算符缩小**
- **`instanceof` 缩小**
- **赋值**：当我们为任何变量赋值时，TypeScript 会查看赋值的右侧并适当地缩小左侧
- 使用**类型谓词**：（见下）
- **断言函数**（略）
- **判别联合**：（见下）
- **never 类型**：（见下）

### 类型谓词

要定义用户定义的类型保护，我们只需要定义一个返回类型为类型谓词的函数：

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

通用类型保护函数

```ts
// 通过泛型定义通用类型保护函数
const isOfType = <T extends object>(target: unknown, prop: keyof T): target is T =>
  typeof target === 'object' && target !== null && prop in target;

// 类型保护
if (isOfType<interfaceA>(target, "age")) {
  console.log(target.age);
} 
if (isOfType<interfaceB>(target, "phone")) {
  console.log(target.phone);
}
```

### 判别联合

```ts
interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square;
```

此种情况，可以使用 `switch(shape.kind)` 的方式来进行类型缩小，类型系统能够做 “正确的” 的事情并找出我们 switch 语句的每个分支中的类型

### never 类型

缩小类型时，你可以将联合的选项减少到你已消除所有可能性并且一无所有的程度。在这些情况下，TypeScript 将使用 `never` 类型来表示不应该存在的状态

`never` 类型可分配给每个类型；但是，没有类型可分配给 `never`（`never` 本身除外）。这意味着你可以使用缩小范围并依靠出现的 `never` 在 `switch` 语句中进行详尽检查

#### 使用示例 1：穷举检查

```ts
/**
 * 穷举检查（exhaustive check）
 *
 * 用于 TypeScript 的 switch 语句中确保所有情况都被处理。
 * 用法：
 *   switch (value) {
 *     case 'a': ...
 *     case 'b': ...
 *     default: exhaustiveCheck(value);
 *   }
 */
export function exhaustiveCheck(param: never): never {
  throw new Error(`未处理的情况: ${JSON.stringify(param)}`);
}
```

我们可以使用这样的函数来确保穷举 switch 和 if-else 语句中的匹配：使用它作为默认（匹配）情况，我们可以确保覆盖所有情况，因为剩下的必须是 never 类型。如果我们不小心遗漏了一个可能的匹配，我们会得到一个类型错误

```ts
function unknownColor(x: never): never {
    throw new Error('unknown color');
}

type Color = 'red' | 'green' | 'blue';

function getColorName(c: Color): string {
    switch (c) {
        case 'red':
            return 'is red';
        case 'green':
            return 'is green';
        default:
            return unknownColor(c); // Argument of type 'string' is not assignable to parameter of type 'never'
    }
}
```

#### 使用示例 2：部分禁用结构类型

假设我们有一个函数，它接受 `VariantA` 或 `VariantB` 类型的参数。但是，用户不能传递包含两种类型中所有属性的类型，即两种类型的 [子类型(subtype)](https://link.juejin.cn?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSubtyping "https://en.wikipedia.org/wiki/Subtyping")。

我们可以将联合类型 `VariantA | VariantB` 用于参数。但是，由于 TypeScript 中的类型兼容性基于 [结构子类型(structural subtyping)](https://link.juejin.cn?target=https%3A%2F%2Fwww.typescriptlang.org%2Fdocs%2Fhandbook%2Ftype-compatibility.html%23handbook-content "https://www.typescriptlang.org/docs/handbook/type-compatibility.html#handbook-content")，因此允许将属性多于参数类型的对象类型传递给函数（除非传递对象字面值）：

```ts
type VariantA = {
    a: string;
};

type VariantB = {
    b: number;
};

declare function fn(arg: VariantA | VariantB): void;

const input = { a: 'foo', b: 123 };
fn(input); 
```

上面的代码片段没有给我们提示 TypeScript 中的类型错误。

但是通过使用 `never`，我们可以部分禁用结构类型，并防止用户传递包含以下两个属性的对象值：

```ts
type VariantA = {
    a: string;
    b?: never;
};

type VariantB = {
    b: number;
    a?: never;
};

declare function fn(arg: VariantA | VariantB): void;

const input = { a: 'foo', b: 123 };
fn(input); // ❌ Types of property 'a' are incompatible
```

> 作者：SmallWolf
> 链接：https://juejin.cn/post/7201048368389914682
> 来源：稀土掘金
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 泛型

为类型提供变量，示例：`type StringArray = Array<string>;`

## 重载

[TS 函数重载](TS%20函数重载.md)
