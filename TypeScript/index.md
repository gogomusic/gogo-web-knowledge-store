# TypeScript

TypeScript 是具有类型语法的 JavaScript，TypeScript 是一种基于 JavaScript 构建的强类型编程语言

- 官网：[TypeScript: JavaScript With Syntax For Types.](https://www.typescriptlang.org/)
- 中文网：[TypeScript 中文网](https://ts.nodejs.cn/)

TS 属于结构类型系统，在结构类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型。

> 本文参考：[TypeScript 中文网](https://ts.nodejs.cn/)

## 类型

### `string`, `number`, `boolean`, `bigint`, `symbol`

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

### 数组

示例：`number[] 或 Array<number>`

### 对象

对象类型定义时使用 , 或 ; 分割属性均可。

详见 [对象类型](#对象类型)

### `object`

特殊类型 `object` 指的是任何非基础值（`string`、`number`、`bigint`、`boolean`、`symbol`、`null` 或 `undefined`）。这与空对象类型 `{ }` 不同，也与全局类型 `Object` 不同。你很可能永远不会使用 `Object`

函数类型在 TypeScript 中也被视为 `object`（在 JavaScript 中，函数值是对象）

具体来说，`object` 包括以下类型：

```ts
let obj: object;

obj = {};           	// ✅ 普通对象：使用字面 `{}` 或 `new Object()` 创建的对象。
obj = [];           	// ✅ 数组
obj = () => {};    		// ✅ 函数
obj = new Person(); 	// ✅ 类实例
obj = /abc/; 			// ✅ 内置对象，如 `Date`, `RegExp`, `Map`, `Set`, `Error`, `Promise` 等
obj = new Number(123);  // ✅ 特殊对象类型，如包装对象

obj = "hello";      	// ❌（string 不是 object）
obj = 123;          	// ❌（number 不是 object）
obj = null;         	// ❌（null 不是 object）
```

如果需要更严格的类型检查，可以使用 `Record<string, unknown>` 或 `Record<PropertyKey, unknown>` 来确保对象必须有键值对结构。

>  `PropertyKey` 是 TS 的原生类型，`type PropertyKey = string | number | symbol`

### `any`

TypeScript 也有一个特殊的类型，`any`，当你不希望某个特定的值导致类型检查错误时，你可以使用它。

> **请勿使用 `any` 类型！**
> 编译器有效地将 ` any ` 视为 “请关闭这个东西的类型检查”。它类似于在变量的每个用法周围放置 ` @ts-ignore ` 注释

#### `noImplicitAny`

当你没有指定类型，并且 TypeScript 不能从上下文推断它时，编译器通常会默认为 `any`。

不过，你通常希望避免这种情况，因为 `any` 没有经过类型检查。使用编译器标志 [`noImplicitAny`](https://ts.nodejs.cn/tsconfig#noImplicitAny) 将任何隐式 `any` 标记为错误。

### `unknown`

当不知道想要接受什么类型，或者想接受任何东西因为你会盲目地传递它而不与之交互时，可以使用 `unknown` 类型

`unknown` 类型代表任何值。这类似于 `any` 类型，但更安全，因为使用 `unknown` 值做任何事情都是不合法的：

用 `unknown` 代替 `any`，可以让你**既接受任意类型的值**，又**强制你在使用前做类型检查**，从而避免运行时错误，提升代码安全性。

### `void`

`void` 表示不返回值的函数的返回值。只要函数没有任何 `return` 语句，或者没有从这些返回语句返回任何显式值，它就是推断类型。

在 JavaScript 中，不返回任何值的函数将隐式返回值 `undefined`。但是，`void` 和 `undefined` 在 TypeScript 中不是一回事

### `never `

`never` 类型表示从未观察到的值。在返回类型中，这意味着函数抛出异常或终止程序的执行。当 TypeScript 确定联合中没有任何内容时，`never` 也会出现。

### `Function`

全局类型 `Function` 描述了 `bind`、`call`、`apply` 等属性，以及 JavaScript 中所有函数值上的其他属性。它还具有 `Function` 类型的值始终可以被调用的特殊属性；这些调用返回 `any`：

```ts
function doSomething(f: Function) {
  return f(1, 2, 3);
}
```

这是一个无类型的函数调用，通常最好避免，因为不安全的 `any` 返回类型。

如果你需要接受任意函数但不打算调用它，则类型 `() => void` 通常更安全。

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

## 函数

### 泛型函数

通常会编写一个函数，其中输入的类型与输出的类型相关，或者两个输入的类型以某种方式相关。

```ts
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

通过向该函数添加类型参数 `T` 并在两个地方使用它，我们在函数的输入（数组）和输出（返回值）之间创建了一个链接。现在当我们调用它时，会出现一个更具体的类型

```ts
const n = firstElement([1, 2, 3]);// n is of type 'number'
```

>  如果一个类型参数只出现在一个位置，强烈重新考虑是否真的需要它

#### 推断

请注意，我们不必在此示例中指定 `T`。类型通过 TypeScript 被自动**推断**

#### 约束条件

我们想关联两个值，但只能对某个值的子集进行操作。在这种情况下，我们可以使用约束来限制类型参数可以接受的类型种类

编写一个返回两个值中较长者的函数。为此，我们需要一个 `length` 属性，它是一个数字。我们通过编写 `extends` 子句将类型参数限制为该类型：

```ts
function longest<T extends { length: number }>(a: T, b: T) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
 
const longerArray = longest([1, 2], [1, 2, 3]);// longerArray is of type 'number[]'
const longerString = longest("alice", "bob");// longerString is of type 'alice' | 'bob'
const notOK = longest(10, 100);// Error! `number` 类型没有 `.length` 属性
```

如果可能，使用类型参数本身而不是约束它

```ts
function firstElement1<T>(arr: T[]) {
  return arr[0];
}
 
function firstElement2<T extends any[]>(arr: T) {
  return arr[0];
}
 
```

乍一看，这些似乎相同，但 `firstElement1` 是编写此函数的更好方法。它推断的返回类型是 `Type`，但 `firstElement2` 的推断返回类型是 `any`，因为 TypeScript 必须使用约束类型来解析 `arr[0]` 表达式，而不是 “等待” 在调用期间解析元素。

#### 指定类型参数

TypeScript 通常可以在泛型调用中**推断**出预期的类型参数，但并非总是如此。例如，假设你编写了一个函数来组合两个数组：

```ts
function combine<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.concat(arr2);
}
```

通常使用不匹配的数组调用此函数会出错：

```ts
const arr = combine([1, 2, 3], ["hello"]); // Type 'string' is not assignable to type 'number'.
```

但是，如果你打算这样做，你可以手动指定 `Type`：

```ts
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```

> 应始终使用尽可能少的类型参数

### 可选参数

通过使用 `?` 将参数标记为可选

```ts
function f(x?: number) {
  // ...
}
```

尽管参数被指定为 `number` 类型，但 `x` 参数实际上将具有 `number | undefined` 类型

还可以提供参数默认值：

```ts
function f(x = 10) {
  // ...
}
```

此时，`x` 将具有 `number` 类型，但调用者始终可以传递 `undefined`，因为这只是模拟 “missing” 参数

> 为回调编写函数类型时，**切勿编写可选​​参数**，除非你打算在不传递该参数的情况下调用该函数

### 函数重载

可查看：[TS 函数重载](TS%20函数重载.md)

**尽可能使用联合类型的参数而不是重载**，例如：
```ts
function len(s: string): number; 	//重载签名
function len(arr: any[]): number;	//重载签名
function len(x: any) {				//实现签名
  return x.length;
}
```

因为两个重载具有相同的参数计数和相同的返回类型，我们可以改为编写函数的非重载版本：

```ts
function len(x: any[] | string) {
  return x.length;
}
```

### 在函数中声明 `this`

暂未学习

### 剩余形参和剩余实参

剩余参数出现在所有其他参数之后，并使用 `...` 语法：

```ts
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
const a = multiply(10, 1, 2, 3, 4);
```

在 TypeScript 中，这些参数上的类型注释隐式为 `any[]` 而不是 `any`，并且给出的任何类型注释必须采用 `Array<T>` 或 `T[]` 形式，或者元组类型

### 参数解构

```ts
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```

## 对象类型

### 可选性（?）与可变性 (readonly) 修饰符

属性名称后添加 ? 指定属性为可选属性<font color="#ff0000"> (tip: 试图从可选属性中读取数据时，需要检查其是否是 undefined)</font>

示例：

```
function printCoord(pt: { x: number; y?: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

对象的属性可以标记为 `readonly`，虽然它不会在运行时改变任何行为，但在类型检查期间无法写入标记为 `readonly` 的属性 (但其内部内容可以更改)。另外，TypeScript 在检查两种类型是否兼容时不会考虑这两种类型的属性是否为 `readonly`

```ts
interface SomeType {
  readonly prop: string;
}

```

可以使用 [映射修饰符](#映射修饰符) 移除或添加这些修饰符

### 索引签名

可以使用索引签名来描述可能值的类型，索引签名属性只允许使用某些类型：`string`、`number`、`symbol`、模板字符串模式以及仅由这些组成的联合类型。当使用 `number` 类型进行索引时，JavaScript 在索引到对象之前实际上会将其转换为 `string`

```ts
interface StringArray {
  [index: number]: string;
}
```

如果使用了索引签名，则会强制所有属性与其返回类型匹配：

```ts
interface NumberDictionary {
  [index: string]: number;
 
  length: number; // ok
  name: string;// name的类型和字符串索引的类型不匹配
}
```

如果索引签名是属性类型的联合，则可以接受不同类型的属性：

```ts
interface NumberOrStringDictionary {
  [index: string]: number | string;
  
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}
```

### 溢出属性检查

下面示例中（请注意，`createSquare` 的给定参数拼写为 `colour`），函数参数 `{ colour: "red", width: 100 }` 和 `SquareConfig` 接口时明明是兼容的（由于它们有公共对象属性，且 `SquareConfig` 中所有属性都是可选的，故兼容），但 TS 仍会报错，这是因为 TS 在将对象字面分配给其他变量或将它们作为参数传递时会得到特殊处理并进行额外的属性检查，即**溢出属性检查**。

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}
 
function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
 
let mySquare = createSquare({ colour: "red", width: 100 });
```

**解决方案 1 使用类型断言**
```ts
let mySquare = createSquare({ colour: "red", width: 100 } as SquareConfig);
```

**解决方案 2 添加字符串索引签名**
```ts
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: unknown;
}
```

此时，`SquareConfig` 除了可以具有上述类型的 `color` 和 `width` 属性，也可以具有任意数量的其他属性

**解决方案 3 将对象字面分配给另一个变量**
```ts
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```

此时，TS 不会进行溢出属性检查，因此编译器不会给你错误

### 扩展类型（extends）

`interface` 上的 `extends` 关键字允许我们有效地从其他命名类型复制成员，并添加我们想要的任何新成员。

```ts
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
 
interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

**`interface` 还可以从多种类型扩展**

```ts
interface Colorful {
  color: string;
}
 
interface Circle {
  radius: number;
}
 
interface ColorfulCircle extends Colorful, Circle {}
```

### 交叉类型（&）

交叉类型用于组合现有的对象类型

```ts
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}
 
type ColorfulCircle = Colorful & Circle;
```

### 接口扩展与交叉的区别

两者之间的主要区别在于冲突的处理方式：

- **接口扩展**：如果接口使用相同的名称定义，则 TypeScript 将尝试在属性兼容的情况下合并它们。如果属性不兼容（即，它们具有相同的属性名称但类型不同），TypeScript 将引发错误
- **交叉类型**：在交叉类型的情况下，具有不同类型的属性将自动合并（下方有详细解释）。当稍后使用该类型时，TypeScript 将期望该属性同时满足两种类型，这可能会产生意外结果。

> **交叉类型的自动合并**：**交叉类型的“合并”不是简单的覆盖，而是按类型结构递归地取交集：兼容的部分保留，冲突的部分变为 `never`，对象嵌套继续合并，函数变成重载。**
> - 原始类型、字面量类型、函数类型在不兼容的情况下——变成 never
> - 对象类型——递归合并
> - 函数签名——变成重载，后写的类型优先级更高
> - 联合类型——变成交集

### 泛型对象类型

泛型对象类型通常是某种容器类型，它们独立于它们所包含的元素类型工作。数据结构以这种方式工作是理想的，这样它们就可以在不同的数据类型中重用。

```ts
interface Box<Type> {
  contents: Type;
}
// 或
type Box<Type> = {
  contents: Type;
}
```

#### `Array`、`ReadonlyArray`、`元组`、`readonly 元组`

| 泛型对象示例          | 使用方法                         | 简写 (推荐写法)           | 备注                                                                                                                                  |
| :-------------- | :--------------------------- | :------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `Array`         | `Array<number>`              | `number[]`          |                                                                                                                                     |
| `ReadonlyArray` | `ReadonlyArray<string>`      | `readonly string[]` | `ReadonlyArray` 的值不能赋给常规 `Array`<br>任何会改变 `ReadonlyArray` 数组本身的数组方法，以及修改数组内部元素都会报 TS 错误，但如果数组元素是对象，则可以更改对象内部的值                      |
| 元组              | `[string, number];`          |                     | 元组类型是另一种 `Array` 类型，它确切地知道它包含多少个元素，以及它在特定位置包含哪些类型                                                                                   |
| `readonly` 元组   | `readonly [string, number];` |                     | 推荐在创建元组时就将其设置为 `readonly`，因为带有 `const` 断言的数组字面将使用 `readonly` 元组类型来推断 (例如：`let point = [3, 4] as const;`，`point` 将被断言为 `readonly` 元组) |

##### 更多关于元组

###### 元组的可选属性

元素可以通过写出问号来来具有可选属性，可选的元组元素只能放在最后，会影响 `length` 的类型。

```ts
type Either2dOr3d = [number, number, number?]
```

例子中，类型 `Either2dOr3d` 的第三个元素的类型将变成：`number | undefined`，元组的 `length` 属性的类型为：` 2 | 3 `

###### 元组的剩余元素

```ts
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];
```

具有剩余元素的元组的 `length` 属性的类型为 `number`

## 类型操作

### 泛型

**TypeScript 泛型是一种创建可复用代码组件的工具，它允许你定义**函数、接口或类**时使用**类型占位符（类型变量）**。这些占位符会在**使用时被具体的类型所替换，**从而在保持类型安全的前提下，提供代码的灵活性和复用性。**

**示例**：
```ts
function identity<T>(arg: T): T {
  return arg;
}
// 或
const identity: <T>(arg: T) => T = (arg) => arg;

// 使用方式1：将所有参数（包括类型参数）传递给函数
let output = identity<string>("myString");

// 使用方式2：不传递类型参数，由编译器自动推断
let output = identity("myString");
```

推荐仅当编译器无法推断类型时使用方式 1

除了**泛型接口**，我们还可以创建**泛型类**。请注意，**无法创建泛型枚举和命名空间**

#### 泛型接口

> 泛型接口就是给接口增加灵活性，它能让我们在定义接口时不用提前把所有细节都死死锁定，而是在使用时根据实际需求定制更具体的类型。

**泛型类型可以改写为对象字面量类型的调用签名**

```ts
function identity<T>(arg: T): T {
  return arg;
}
 
let myIdentity: { <T>(arg: T): T } = identity; // 函数属于对象类型，所以这样写是没错的
```

进而，可以将对象字面量移动到接口：

```ts
interface GenericIdentityFn {
	<T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

还可以将泛型参数移动为整个接口的参数：

```ts
interface GenericIdentityFn<T> {
  (arg: T): T;
}
 
function identity<T>(arg: T): T {
  return arg;
}
 
let myIdentity: GenericIdentityFn<number> = identity;
```

#### 泛型类

泛型类具有与泛型接口相似的形状。泛型类在类名称后面的尖括号 (`<>`) 中有一个泛型类型参数列表。就像接口一样，将类型参数放在类本身可以让我们确保类的所有属性都使用相同的类型。

```ts
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
} 
 
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

> 类的类型有两个方面：静态端和实例端。**泛型类仅在其实例方面是泛型的**，静态成员不能使用类的类型参数。

#### 泛型约束

如下示例，泛型变量 `T` 使用 `extends` 关键字扩展了接口 ` Lengthwise `, 从而将此函数限制为使用时参数类型必须要有 ` length ` 属性。因为泛型函数现在受到约束，它将不再适用于任何和所有类型：

```ts
interface Lengthwise {
  length: number;
}
 
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); 
  return arg;
}
```

#### 在泛型约束中使用类型参数

你可以声明**受另一个类型参数约束的类型参数**。例如，在这里我们想从对象中获取一个属性。我想确保我们不会意外获取该对象上不存在的属性，因此我们将在两种类型之间放置约束：

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
 
let x = { a: 1, b: 2, c: 3, d: 4 };
 
getProperty(x, "a");
getProperty(x, "m"); // Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```

#### 在泛型中使用类类型

略。暂未学习，可参考：[TypeScript 中文网: 文档 - 泛型#在泛型中使用类类型](https://ts.nodejs.cn/docs/handbook/2/generics.html#%E5%9C%A8%E6%B3%9B%E5%9E%8B%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%B1%BB%E7%B1%BB%E5%9E%8B)

#### 泛型参数默认值

```ts
declare function create<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]>(
  element?: T,
  children?: U
): Container<T, U>;
```

泛型参数默认值遵循以下规则：

- 如果一个类型参数有一个默认值，它就被认为是可选的。
- 必需的类型参数不能跟在可选的类型参数之后。
- 类型参数的默认类型必须满足类型参数的约束（如果存在）。
- 指定类型参数时，只需为需要的类型参数指定类型参数即可。未指定的类型参数将解析为其默认类型。
- 如果指定了默认类型并且推断无法选择候选者，则推断默认类型。
- 与现有类或接口声明合并的类或接口声明可能会为现有类型参数引入默认值。
- 与现有类或接口声明合并的类或接口声明可以引入新的类型参数，只要它指定默认值即可。

### `keyof` 类型运算符

`keyof` 运算符用于生成对象类型键的字符串或数字字面的联合类型。

```ts
type Point = { x: number; y: number };
type P = keyof Point;
```

示例中，`P` 的类型将为：` 'x' | 'y' `

| 对象类型                                        | 使用 `keyof`                 | 结果               |
| ------------------------------------------- | -------------------------- | ---------------- |
| `type Point = { x: number; y: number };`    | `type P = keyof Point;`    | 'x' \| 'y'       |
| `type Arrayish = { [n: number]: unknown };` | `type A = keyof Arrayish;` | number           |
| `type Mapish = { [k: string]: boolean };`   | `type M = keyof Mapish;`   | string \| number |
请注意，在上面例子中，`M` 是 `string | number` - 这是因为 JavaScript 对象键总是被强制转换为字符串，所以 `obj[0]` 总是与 `obj["0"]` 相同

### `typeof` 类型运算符

 `typeof` 运算符用于在类型上下文中使用它来引用变量或属性的类型

示例 1：

```ts
let s = "hello";
let n: typeof s; // 获取s的类型，结果为'string';
```

示例 2：

```ts
function f() {
  return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;
```

`ReturnType<T>` 是 TS 的预定义类型，它接受一个函数类型并产生它的返回类型。如果尝试在函数名上使用 `ReturnType`，即 `ReturnType<f>`，将会报错（值和类型不是一回事），此时需要引用 `f` 所具有的类型，即使用 `ReturnType<typeof f>`

### 索引访问类型

我们可以使用索引访问类型来**查找另一种类型的特定属性**：

```ts
type Person = { age: number; name: string; alive: boolean };

type Age = Person["age"];			// type Age = number
type I1 = Person["age" | "name"]; 	// type I1 = string | number
type I2 = Person[keyof Person];		// type I2 = string | number | boolean

```

可以使用 `number` 来**获取数组元素的类型**，并可以将它与 `typeof` 结合起来，以方便地捕获数组字面量的元素类型

```ts
const myArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type Person = typeof myArray[number];
type Age = typeof MyArray[number]["age"];
```

### 条件类型

条件类型的形式看起来有点像 JavaScript 中的条件表达式 (`condition ? trueExpression : falseExpression`)：

```ts
SomeType extends OtherType ? TrueType : FalseType;
```

当 `extends` 左边的类型可以赋值给右边的类型时，就会得到第一个分支（`true` 分支）的类型；否则，你将在后一个分支（`false` 分支）中获得类型。

#### 条件类型常用于简化函数重载

```ts
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;
  
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
	throw "unimplemented";
}
```

示例中，如果不使用条件类型，则需要写大量的重载代码

#### 条件类型约束

```ts
type MessageOf<T extends { message: unknown }> = T["message"];
```

在上面示例中，`MessageOf` 用于获取 `T` 中 `message` 属性的类型，并使用条件约束确保 `T` 中含有 `message` 属性。如果我们希望 `MessageOf` 采用任何类型，并且在 `message` 属性不可用时默认为类似 `never` 的东西怎么办？我们可以通过移出约束并引入条件类型来做到这一点：

```ts
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;
```

#### 在条件类型中推断

```ts
type Flatten<T> = T extends any[] ? T[number] : T;
```

在上面的例子中，我们使用了条件类型来应用约束，然后使用索引访问类型提取类型。条件类型也为我们提供了一种使用 `infer` 关键字从我们在 true 分支中比较的类型进行推断的方法

```ts
type Flatten<T> = T extends Array<infer Item> ? Item : T;
```

我们可以使用 `infer` 关键字编写一些有用的辅助类型别名。例如，对于简单的情况，我们可以从函数类型中提取返回类型：

```ts
type GetReturnType<T> = T extends (...args: never[]) => infer Return ? Return : never;
```

> 在这个例子中，`never[]` 被用作函数参数的类型，主要是为了 **通用匹配任何函数类型，而不关心具体的参数**，这样做的目的是 **强制忽略参数类型**

#### 分布式条件类型

当条件类型作用于泛型类型时，它们在给定联合类型时变得可分配。例如，采取以下措施：

```ts
type ToArray<T> = T extends any ? T[] : never;
```

如果我们将联合类型插入 `ToArray`，那么条件类型将应用于该联合的每个成员。

```ts
type ToArray<T> = T extends any ? T[] : never;
type StrArrOrNumArr = ToArray<string | number>; // type StrArrOrNumArr = string[] | number[]
```

由于**分配性**，此时 `type StrArrOrNumArr = string[] | number[]`，若要避免这种行为，需要使用方括号将 `extends` 关键字的每一侧括起来：

```ts
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type ArrOfStrOrNum = ToArrayNonDist<string | number>; // type ArrOfStrOrNum = (string | number)[]
```

### 映射类型

**映射类型**允许你基于现有类型创建新类型，通过 " 映射 " 现有类型的属性来生成新的类型结构。语法为：`{ [K in Keys]: Type }`
- `Keys` 是一个联合类型，表示要迭代的键集合
- `K` 是每次迭代中当前的键

```ts
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};
 
type FeatureOptions = OptionsFlags<Features>;
```

在此示例中，`OptionsFlags` 将获取 `Type` 类型的所有属性并将其值更改为布尔值。

#### 映射修饰符

在映射期间可以应用两个额外的修饰符：`readonly` 和 `?` 分别影响可变性和可选性。还可以通过添加前缀 `-` 或 `+` 来移除或添加这些修饰符。如果你不添加前缀，则假定为 `+`

TypeScript 提供了一些内置的映射类型：

**`Partial<T>` 将所有属性变为可选**

```ts
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

**`Required<T>` 将所有属性变为必需**

```ts
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

**`Readonly<T>` 将所有属性变为只读**

```ts
type Readonly<T> = {
    readonly [P in keyof T]?: T[P];
};
```

#### 通过 `as` 重建映射键

在 TypeScript 4.1 及更高版本中，你可以使用映射类型中的 `as` 子句重新映射映射类型中的键：

```ts
type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as NewKeyType]: Type[Properties]
}
```

你可以利用 [模板字面类型](https://ts.nodejs.cn/docs/handbook/2/template-literal-types.html) 等功能从以前的属性名称中创建新的属性名称：

```ts
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
```

你可以通过条件类型生成 `never` 来过滤掉键：

```ts
// 'kind'属性将被移除
type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};
```

你可以映射任意联合，不仅是 `string | number | symbol` 的联合，还可以映射任何类型的联合：

```ts
type EventConfig<Events extends { kind: string }> = {
	[E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>
// type Config = { square: (event: SquareEvent) => void; 
//					circle: (event: CircleEvent) => void; 
//				}
```

### 模版字面类型

模板字面类型具有与 JavaScript 中的模板字面字符串相同的语法，但用于类型位置。

```ts
type World = "world";
 
type Greeting = `hello ${World}`; // type Greeting = "hello world"
```

当在插值位置使用联合时，类型是可以由每个联合成员表示的每个可能的字符串字面的集合：

```ts
type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
 
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
// type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
```

#### 类型中的字符串联合

```ts
type PropEventSource<T> = {
    on<K extends string & keyof T>
        (eventName: `${K}Changed`, callback: (newValue: T[K]) => void): void;
};

declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
});

person.on("firstNameChanged", newName => {                          
	(parameter) newName: string
    console.log(`new name is ${newName.toUpperCase()}`);
});

person.on("ageChanged", newAge => {                   
    if (newAge < 0) {
        console.warn("warning! negative age");
    }
})
```

> 代码中的 `string & keyof Type` 是一种**类型筛选技术**，它确保只处理字符串类型的属性名

#### 使用模版字面进行推断

上例中，当用户使用字符串 `"firstNameChanged"` 调用时，TypeScript 将尝试推断 `K` 的正确类型。为此，它会将 `K` 与 `"Changed"` 之前的内容进行匹配，并推断出字符串 `"firstName"`。一旦 TypeScript 确定了这一点，`on` 方法就可以在原始对象上获取 `firstName` 的类型，在本例中为 `string`。同样，当使用 `"ageChanged"` 调用时，TypeScript 会找到属性 `age` 的类型，即 `number`。

#### 内在字符串操作类型

为了帮助进行字符串操作，TypeScript 包含一组可用于字符串操作的类型。这些类型内置在编译器中以提高性能，在 TypeScript 附带的 `.d.ts` 文件中找不到。

| 内在字符串操作类型                  | 功能                    |
| :------------------------- | :-------------------- |
| `Uppercase<StringType>`    | 将字符串中的每个字符转换为大写版本     |
| `Lowercase<StringType>`    | 将字符串中的每个字符转换为等效的小写字母  |
| `Capitalize<StringType>`   | 将字符串中的第一个字符转换为等效的大写字母 |
| `Uncapitalize<StringType>` | 将字符串中的第一个字符转换为等效的小写字母 |

## 类

### 字段

```ts
class Point {
  name: string; 	// 字段声明：在类上创建公共可写属性。如果未指定，则为隐式 `any`
  x: number = 0; 	// 字段也可以有初始化器；将在实例化类时自动运行。类属性的初始化器将用于推断其类型
  y = 0; 			// 简写，类型将自动推断
  age!: number; 	// 使用赋值断言运算符(感叹号)，可以在声明时不初始化属性，但仍然告诉 TypeScript 该属性将被初始化
  readonly z: number = 0; 	// 使用 `readonly` 修饰符，表示该属性只能在类的构造函数中被赋值一次

  constructor(z?: number) {
    this.name = 'hello';
    if (z) this.z = z; 		// 在构造函数中初始化只读属性
  }
}

const pt = new Point()
```

>  `--strictPropertyInitialization` 设置控制类字段是否需要在构造函数中初始化

### 构造器

类构造函数与函数非常相似。你可以添加带有类型注释、默认值和重载的参数。但也有一些区别：

- 构造函数不能有类型参数
- 构造函数不能有返回类型注释，因为始终返回类实例类型

```ts
class Point {
  x: number = 0;
  y: number = 0;

  // Constructor overloads
  constructor(x: number, y: number);
  constructor(xy: string);
  constructor(x: string | number, y: number = 0) {
    // Code logic here
  }
}
```

### 方法

类上的函数属性称为方法。方法可以使用所有与函数和构造函数相同的类型注释，方法体内，仍然必须通过 `this.` 访问字段和其他方法

```ts
class Point {
  x = 10;
  y = 10;

  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}
```

### 获取器/设置器（getter/setter）

> 如果不需要在 get/set 操作期间添加其他逻辑，则没必要设置获取器或设置器

```ts
class C {
  _length = 0;
  get length() {
    return this._length;
  }
  set length(value) {
    this._length = value;
  }
}
```

TypeScript 对访问器有一些特殊的推断规则：

- 如果 `get` 存在但没有 `set`，则属性自动为 `readonly`
- 如果不指定 setter 参数的类型，则从 getter 的返回类型推断

### 索引签名

```ts
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);
 
  check(s: string) {
    return this[s] as boolean;
  }
}
```

### 类继承

#### `implements` 从句（实现）

可以使用 `implements` 子句来检查一个类是否满足特定的 `interface`。如果一个类未能正确实现它，则会触发错误。

```ts
interface Pingable {
  ping(): void;
}
 
class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}
```

类也可以实现多个接口，例如 `class C implements A, B {}`

 > 注意 `implements` 子句只是检查类可以被视为接口类型。它根本不会改变类的类型或其方法

#### `extends` 从句

类可能来自基类。派生类具有其基类的所有属性和方法，还可以定义额外的成员。

```ts
class Animal {
  move() {
    console.log("Moving along!");
  }
}
 
class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}
 
const d = new Dog();
// Base class method
d.move();
// Derived class method
d.woof(3);
```

##### 覆盖方法

派生类可以覆盖基类字段或属性，但需遵循其基类契约（类型要兼容）。

派生类可以使用 `super.` 语法来访问基类方法。

```ts
class Base {
  greet() {
    console.log("Hello, world!");
  }
}
 
class Derived extends Base {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}
 
const d = new Derived();
d.greet();
d.greet("reader");
```

##### 类的初始化顺序

JavaScript 定义的类初始化顺序是：

1. 基类字段被初始化
2. 基类构造函数运行
3. 派生类字段被初始化
4. 派生类构造函数运行

```ts
class Base {
  name = "base";
  constructor() {
    console.log("My name is " + this.name);
  }
}
 
class Derived extends Base {
  name = "derived";
}
 
// Prints "base", not "derived"
const d = new Derived();
```

运行结果：

```ts
My name is base
Derived { name: 'derived' }
```

### 成员可见性

可以使用 TypeScript 来控制类的某些方法或属性是否对类外部的代码可见。可见性修饰符有以下三种：

- `public`：可以在任何地方访问（默认值）
- `protected`：可以在定义它的类及其派生类中访问，但不能在类的外部访问
- `private`：只能在定义它的类内部访问

> **注意：以上修饰符是 TS 的语法，仅在类型检查期间强制执行**。转译为 js 后，被 `private` 和 `protected` 修饰的字段将可以直接访问
> 当 TypeScript 代码被编译成 JavaScript 时，`private` 和 `protected` 修饰符不会直接转换为 JavaScript 的私有字段或方法。TypeScript 通过一些机制（如命名约定和运行时检查）来模拟这些访问控制，但最终生成的 JavaScript 代码中不会包含 `private` 或 `protected` 关键字。
>
>**JavaScript** 从 ES2022 开始支持私有字段和方法，通过在字段和方法前面加 `#` 表示
>
> 如果确实需要保护类中的值免受恶意行为者的侵害，你应该使用提供硬运行时隐私的机制，例如闭包、WeakMaps 或私有字段。请注意，这些在运行时添加的隐私检查可能会影响性能。

#### `public`

**类成员的默认可见性为 `public`**, 此可以省略不写。`public` 成员可以在任何地方访问：

```ts
class Greeter {
  public greet() {
    console.log("hi!");
  }
}
const g = new Greeter();
g.greet();
```

#### `protected`

`protected` 成员仅对声明它们的类及其子类可见

```ts
class Greeter {
  protected getName() {
    return 'hi';
  }
  public greet() {
    console.log('Hello, ' + this.getName()); // 在当前类可用
  }
}

class SpecialGreeter extends Greeter {
  public howdy() {
    console.log('Howdy, ' + this.getName()); // 在子类中可用
  }
}
const g = new SpecialGreeter();
g.greet(); 		// OK，public 成员可以在任何地方调用
g.getName(); 	// Error，protected 成员只能在同一类或子类中调用
```

##### 导出 `protected` 成员

示例中，子类通过使用 `public` 修饰符（默认省略）覆盖了基类中的 `protected` 成员 `m`，从而暴露了 `m` 使其能在子类外使用

```ts
class Base {
  protected m = 10;
}
class Derived extends Base {
  // No modifier, so default is 'public'
  m = 15;
}
const d = new Derived();
console.log(d.m); // OK
```

#### `private`

`private` 只能在定义它的类内部访问

```ts
class Base {
  private x = 0;
}
class Derived extends Base {
  x = 1; 			// Error，子类不能访问基类的`private`成员
}

const s = new Base();
console.log(s.x);	// Error，从外部也不能访问
console.log(s['x']);// OK，奇怪的是，TS不会对此种访问方式报错
```

##### 跨实例 `private` 访问

TypeScript 允许跨实例 `private` 访问

```ts
class A {
  private x = 10;
 
  public sameAs(other: A) {
    return other.x === this.x;// No error
  }
}
```

### 静态成员 (`static`)

类可能有 `static` 个成员。这些成员不与类的特定实例相关联。它们可以通过类构造函数对象本身访问，另外：

- 静态成员也可以使用相同的 `public`、`protected` 和 `private` 可见性修饰符
- 静态成员会被继承
- 由于类本质就是可以用 `new` 调用的**函数**，所以 `name`、`length` 和 `call` 等函数属性无法定义为 `static` 成员

```ts
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}
console.log(MyClass.x);
MyClass.printX();
```

#### `static` 类中的块

静态块允许你编写具有自己作用域的语句序列，这些语句可以访问包含类中的私有字段。这意味着我们可以编写具有编写语句的所有功能的初始化代码，不会泄漏变量，并且可以完全访问我们类的内部结构。

```ts
class Foo {
    static #count = 0;
 
    get count() {
        return Foo.#count;
    }
 
    static {
        try {
            const lastInstances = loadLastInstances();
            Foo.#count += lastInstances.length;
        }
        catch {}
    }
}
```

### 泛型类

类很像接口，可以是泛型的。类可以像接口一样使用泛型约束和默认值。但要注意， `static` 成员永远不能引用类的类型参数

```ts
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}
 
const b = new Box("hello!");
```

### 类运行时的 `this`

默认情况下，函数中 `this` 的值取决于函数的调用方式。在下面的例子中，因为函数是通过 `obj` 引用调用的，所以它的 `this` 的值是 `obj` 而不是类实例。

```ts
class MyClass {
  name = "MyClass";
  getName() {
    return this.name;
  }
}
const c = new MyClass();
const obj = {
  name: "obj",
  getName: c.getName,
};
 
// Prints "obj", not "MyClass"
console.log(obj.getName());
```

可以用以下两种方式解决此问题

#### 箭头函数

将上面例子中的 `getName` 函数替换为箭头函数

```ts
class MyClass {
  name = "MyClass";
  getName = () => {
    return this.name;
  };
}
const c = new MyClass();
const g = c.getName;
// Prints "MyClass" instead of crashing
console.log(g());
```

此时，

- 箭头函数不会创建自己的 this，它会捕获定义时外层（即类实例）的 this。无论如何调用 getName，this 都始终指向 MyClass 的实例
- 箭头函数会为每个实例都创建一个新函数，会增加内存占用。而普通方法则共享同一个原型方法
	- **箭头函数是在实例化时作为实例属性创建的**，而不是定义在类的原型上
	- **普通方法作为原型方法，所有实例共享同一个函数**

#### `this` 参数

可以为 `this` 参数添加类型定义，此参数在编译期间会被删除

```ts
// TypeScript input with 'this' parameter
function fn(this: SomeType, x: number) {
  /* ... */
}
```

```js
// JavaScript output
function fn(x) {
  /* ... */
}
```

在方法定义中添加一个 `this` 参数，TypeScript 检查是否使用正确的上下文调用带有 `this` 参数的函数，以静态强制方法被正确调用：

```ts
class MyClass {
  name = "MyClass";
  getName(this: MyClass) {
    return this.name;
  }
}
const c = new MyClass();

c.getName(); // OK
 
const g = c.getName;
console.log(g()); // Error 类型为“void”的 "this" 上下文不能分配给类型为“MyClass”的方法的 "this"。
```

### `this` 类型

**在类中，一种称为 `this` 的特殊类型动态地引用当前类的类型**

```ts
class Box {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}
class DerivedBox extends Box {
  otherContent: string = "?";
}
const base = new Box();
const derived = new DerivedBox();
console.log(derived.sameAs(base)); // Error: 类型“Box”的参数不能赋给类型“DerivedBox”的参数
```

以上示例中，`sameAs` 的参数类型被定义为 `this` 而不是 `Box`，

- 如果定义为 `Box`，最后一句代码 `derived.sameAs(base)` 的参数接收 `DerivedBox` 类型的实例，由于 `DerivedBox` 是 `Box` 的子类型，导致 `Box` 类型的实例的参数能也能被接收
- 如果定义为 `this`，表示该参数必须与当前类的实例类型完全一致，此时 `derived.sameAs(base)` 的参数只能接收 `DerivedBox` 类型的实例

在 TypeScript 中，`this` 类型用在类的方法参数中，如 `other: this`，表示该参数必须与当前类的实例类型完全一致。这在继承场景中尤为重要，能确保子类调用该方法时，传入的参数与子类实例类型匹配，避免类型不兼容的问题。简而言之，`this` 类型为方法参数提供了更严格的类型约束，增强了代码在扩展和维护时的类型安全性

#### `this` 型防护

你可以在类和接口中的方法的返回位置使用 `this is Type`。当与类型缩小（例如 `if` 语句）混合时，目标对象的类型将缩小到指定的 `Type`

```ts
class Box<T> {
  value?: T;

  hasValue(): this is { value: T } {
    return this.value !== undefined;
  }
}

const box = new Box<string>();
box.value; // (property) Box<string>.value?: string

if (box.hasValue()) {
  console.log(box.value); // (property) value: string
}
```

示例中，当 `hasValue` 被验证为真时，`box.value` 的类型会被缩小为 `string`, `undefined` 被删除

### 参数属性

TypeScript 提供了特殊的语法，用于将构造函数参数转换为具有相同名称和值的类属性。这些称为参数属性，是通过在构造函数参数前加上可见性修饰符 `public`、`private`、`protected` 或 `readonly` 之一来创建的。结果字段获取这些修饰符：

```ts
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
const a = new Params(1, 2, 3);
```

等效于：

```ts
class Params {
  public readonly x: number;
  protected y: number;
  private z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
const a = new Params(1, 2, 3);

```

### 类表达式

类表达式与类声明非常相似。唯一真正的区别是类表达式不需要名称，尽管我们可以通过它们最终绑定到的任何标识符来引用它们：

```ts
const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};
 
const m = new someClass("Hello, world");
```

### 构造函数签名

 `InstanceType<Type>` 工具类型用于从一个类的构造函数中提取出实例的类型

```ts
class Circle {
  radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }
}

function createInstance<T>(
  Clazz: new (...args: any[]) => T
): InstanceType<typeof Clazz> {
  return new Clazz();
}

const circleInstance = createInstance(Circle);
```

适合在需要动态操作类类型、结合泛型编程等场景中使用

### `abstract` 抽象类和成员

TypeScript 中的类、方法和字段可能是抽象的。

抽象方法或抽象字段是尚未提供实现的方法。这些成员必须存在于抽象类中，不能直接实例化。

抽象类的作用是作为实现所有抽象成员的子类的基类。当一个类没有任何抽象成员时，就说它是具体的。

创建一个抽象类：

```ts
abstract class Base {
  abstract getName(): string;
 
  printName() {
    console.log("Hello, " + this.getName());
  }
}
 
const b = new Base();  //Error：无法创建抽象类的实例
```

上面的例子中，`Base` 是一个抽象类，不能被实例化，相反，我们需要创建一个派生类并实现抽象成员：

```ts
class Derived extends Base {
  getName() {
    return "world";
  }
}
 
const d = new Derived();
d.printName();
```

#### 抽象构造签名

有时你想接受一些类构造函数，它产生一个派生自某个抽象类的类的实例

```ts
function greet(ctor: typeof Base) {
  const instance = new ctor(); //错误，无法创建抽象类的实例
}
```

这样写是不行的，你需要编写一个接受带有构造签名的东西的函数：

```ts
function greet(ctor: new () => Base) {
  const instance = new ctor();
}
```

### 类之间的关系

在大多数情况下，TypeScript 中的类在结构上进行比较

```ts
class Point1 { x = 0; y = 0;}
class Point1 { x = 0; y = 0;}
 
const p: Point1 = new Point2(); // OK
```

同样，**即使没有显式继承，类之间的子类型关系也存在**：

```ts
class Person {
  name: string;
  age: number;
}
 
class Employee {
  name: string;
  age: number;
  salary: number;
}
 
// OK
const p: Person = new Employee();
```

空类没有成员。在结构类型系统中，没有成员的类型通常是其他任何东西的超类型 [^1]。所以如果你写一个空类（不要！），任何东西都可以用来代替它：

```ts
class Empty {}
 
function fn(x: Empty) {
  // can't do anything with 'x', so I won't
}
 
// All OK!
fn(window);
fn({});
fn(fn);
```

### 类的实例类型、类的构造函数类型、`InstanceType<Type>` 的区别

```ts
class Point {
  x: number;
  constructor(x: number) {
    this.x = x;
  }
}

const pointCtor = Point; // TypeScript 允许这样赋值！
const pointInstance = new pointCtor(0); // 看样子，typeof Point 的确是指向类本身。
```

1. **`Point`** 是类的实例类型，直接表示这个类的「实例」的类型。
2. **`typeof Point`** 是类自身（构造函数）的类型，也就是用来表示「如何创建这个类的实例」。
3. **`InstanceType<typeof Point>`** 是一种组合操作，用来从类的构造函数（`typeof Point`）中提取出类的实例类型（`Point`）。`InstanceType<typeof Point>` 是在泛型场景中动态获取实例类型的一种方式。

[^1]: “超类型”是一个广泛的概念，主要指被继承、实现或匹配的源类型
