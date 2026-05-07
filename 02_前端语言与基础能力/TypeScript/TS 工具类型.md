# TS 工具类型

## TS 工具类型

| 工具类型                                  | 功能                                                                                                                               |
| :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------- |
| `Awaited<Type>`                       | 对 `async` 函数中的 `await` 或 `Promise` 中的 `.then()` 方法等操作进行建模 - 具体来说，其会递归地解开 `Promise`                                               |
| `Partial<Type>`                       | 构造一个将 `Type` 的所有属性设置为可选的类型                                                                                                       |
| `Required<Type>`                      | 构造一个由设置为 required 的 `Type` 的所有属性组成的类型。与 `Partial` 相反                                                                             |
| `Readonly<Type>`                      | 构造一个将 `Type` 的所有属性设置为 `readonly` 的类型                                                                                             |
| `Record<Keys, Type>`                  | 构造一个对象类型，其属性键为 `Keys`，其属性值为 `Type`                                                                                               |
| `Pick<Type, Keys>`                    | 通过从 `Type` 中选取一组属性 `Keys`（字符串字面或字符串字面的并集）来构造一个类型                                                                                 |
| `Omit<Type, Keys>`                    | 通过从 `Type` 中选择所有属性然后删除 `Keys`（字符串字面或字符串字面的并集）来构造一个类型。与 `Pick` 相反                                                                 |
| `Exclude<UnionType, ExcludedMembers>` | 通过从 `UnionType` 中排除所有可分配给 `ExcludedMembers` 的联合成员来构造一个类型                                                                         |
| `Extract<Type, Union>`                | 通过从 `Type` 中提取所有可分配给 `Union` 的联合成员来构造一个类型                                                                                        |
| `NonNullable<Type>`                   | 通过从 `Type` 中排除 `null` 和 `undefined` 来构造一个类型                                                                                      |
| `Parameters<Type>`                    | 从函数类型 `Type` 的参数中使用的类型构造元组类型                                                                                                     |
| `ConstructorParameters<Type>`         | 从构造函数的类型构造元组或数组类型                                                                                                                |
| `ReturnType<Type>`                    | 构造一个由函数 `Type` 的返回类型组成的类型                                                                                                        |
| `InstanceType<Type>`                  | 构造一个由 `Type` 中的构造函数的实例类型组成的类型                                                                                                    |
| `NoInfer<Type>`                       | 阻止对所包含类型的推断。除了阻止推断之外，`NoInfer<Type>` 与 `Type` 相同                                                                                 |
| `ThisParameterType<Type>`             | 提取函数类型的 `this` 参数的类型，如果函数类型没有 `this` 参数，则提取 `unknown`                                                                            |
| `OmitThisParameter<Type>`             | 从 `Type` 中删除 `this` 参数。如果 `Type` 没有显式声明的 `this` 参数，则结果只是 `Type`。否则，将从 `Type` 创建一个没有 `this` 参数的新函数类型。泛型被删除，只有最后一个重载签名被传播到新的函数类型中。|
| `ThisType<Type>`                      | (暂未学习)                                                                                                                           |

## 内在字符串操作类型

为了帮助围绕模板字符串字面进行字符串操作，TypeScript 包含一组可用于类型系统内的字符串操作的类型。

| 内在字符串操作类型                  | 功能                    |
| :------------------------- | :-------------------- |
| `Uppercase<StringType>`    | 将字符串中的每个字符转换为大写版本     |
| `Lowercase<StringType>`    | 将字符串中的每个字符转换为等效的小写字母  |
| `Capitalize<StringType>`   | 将字符串中的第一个字符转换为等效的大写字母 |
| `Uncapitalize<StringType>` | 将字符串中的第一个字符转换为等效的小写字母 |
