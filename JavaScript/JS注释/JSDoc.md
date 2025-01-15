本文来源：[@param - JSDoc在线手册 (dba.cn)](https://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/PARAM.html)

## 什么是JSDoc

JSDoc是一个根据[javascript](https://www.dba.cn/book/javascript/)文件中注释信息，生成JavaScript应用程序或库、模块的API文档 的工具。你可以使用他记录如：命名空间，类，方法，方法参数等。类似JavaDoc和[PHP](https://www.dba.cn/book/php5/)Doc。现在很多编辑器或IDE中还可以通过JSDoc直接或使用插件生成智能提示。从而使开发者很容易了解整个类和其中的属性和方法，并且快速知道如何使用，从而提高开发效率，降低维护成本。

## 使用JSDoc

JSDoc本质是代码注释，所以使用起来非常方便，但是他有一定的格式和规则，只要了解这些，那么后面的事情，比如生产文档，生成智能提示都可以通过工具来完成。

### JSDoc注释

JSDoc注释一般应该放置在方法或函数声明之前，它必须以`/ **`开始，以便由JSDoc解析器识别。其他任何以`/*`，`/***`或者超过3个星号的注释，都将被JSDoc解析器忽略。

>在VScode中，在方法或函数前使用 `/**`然后按<kbd>Tab</kbd>键即可插入JSDoc注释

## JSDoc 块标签

>我只记录了常用的

### @author

**语法**：`@author <name> [<emailAddress>]`

**作用**：标识作者，后面可以跟尖括号括起来的电子邮件地址

### @class

**语法**：`@class [<type> <name>]`

**作用**：表示函数需要使用"new"关键字调用，即构造函数。

### @constant

**语法**：`@constant [<type> <name>]`

**作用**：指明这个对象是一个常量

### @default

**语法**：`@default [<some value>]`

**作用**：记录标识的赋值（默认值）,使用后JSDoc将从源代码中获取值，自动记录

**示例**：记录一个常量的数值

```js
/**
 *  @constant
 *  @default
 */
const RED = #ff0000;
```

### @description

**语法**：`@description <some description>`

**作用**：提供一般描述，可以包括HTML标签或markdown格式（如果markdown 插件启用的话）

- 如果在注释**开始**的地方添加描述，那么**可省略**`@description`标签。

- 如果通过**使用`@description`**标签添加描述，你可以将描述放置在JSDoc注释的**任何地方**。

**示例**:

```js
/**
 * Add two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
    return a + b;
}
```

### @example

**作用**：提供示例，可以使用多个

**示例**:`@example`标签后面可以添加 标签作为示例的标题。

```js
/**
 * Solves equations of the form a * x = b
 * @example <caption>Example usage of method1.</caption>
 * // returns 2
 * globalNS.method1(5, 10);
 * @example
 * // returns 3
 * globalNS.method(5, 15);
 * @returns {Number} Returns the value of x for the equation.
 */
globalNS.method1 = function (a, b) {
    return b / a;
};
```

### @file

**作用**：提供文件的说明。在**文件开头的JSDoc注释部分使用该标签**。

**示例**:

```js
/**
 * @file Manages the configuration settings for the widget.
 * @author Rowina Sanela <rsanela@example.com>
 */ 
```

### @global

**作用**：标记对象为全局变量

**示例**:

```js
(function() {
    /** @global */
    var foo = 'hello foo';
    this.foo = foo;
}).apply(window);
```

### @param

**作用**：记录传递给一个函数的参数

- `@param`标签提供了对某个函数的参数的各项说明，包括参数名、参数数据类型、描述等。
- `@param`标签要求您指定要描述参数的名称。您还可以包含参数的数据类型，使用大括号括起来，和参数的描述。
- **在描述之前插入一个连字符，可以使JSDoc注释更具可读性。请务必在连字符后加一个空格**

**示例**:

1. 注释**变量名**、**变量类型**和**变量说明**，并描述之前插入一个连字符

   **变量类型**和**变量说明**是可选的

```js
/**
 * @param {string} somebody - Somebody's name.
 */
function sayHello(somebody) {
    alert('Hello ' + somebody);
} 
```

2. 变量是一个对象，带属性

   可以通过`@param`标签提供额外的属性。例如，假如`employee`参数有`name`和`department`属性，您可以按以下方式描述。

```js
/**
 * Assign the project to an employee.
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
Project.prototype.assign = function(employee) {
    // ...
}; 
```

3. 如果假如`employee`参数是一个数组，这个数组中包含`name`和`department`元素，那么可以这么描述

```js
/**
 * Assign the project to a list of employees.
 * @param {Object[]} employees - The employees who are responsible for the project.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
Project.prototype.assign = function(employees) {
    // ...
}; 
```

4. 一个可选参数

   `@param {string=} somebody - Somebody's name`

5. 一个可选参数和默认值：

   `@param {string} [somebody=John Doe] - Somebody's name.`

6. 允许一个类型或另一个类型

   `@param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names`

7. 允许任何类型

   `@param {*} somebody - Whatever you want`

8. 可重复使用

   ```js
   /**
    * Returns the sum of all numbers passed to the function.
    * @param {...number} num - A positive or negative number.
    */
   function sum(num) {
       var i = 0, n = arguments.length, t = 0;
       for (; i &lt; n; i++) {
           t += arguments[i];
       }
       return t;
   } 
   ```

9. 回调函数

   如果参数接受一个回调函数，您可以使用`@callback`标签来定义一个回调类型，然后回调类型包含到`@param`标签中。

   ```js
   /**
    * This callback type is called `requestCallback` and is displayed as a global symbol.
    *
    * @callback requestCallback
    * @param {number} responseCode
    * @param {string} responseMessage
    */
   
   /**
    * Does something asynchronously and executes the callback on completion.
    * @param {requestCallback} cb - The callback that handles the response.
    */
   function doSomethingAsynchronously(cb) {
       // code
   }; 
   ```

### @property

**作用**：记录一个对象的属性。@property标签很容易描述类，命名空间或其它对象的静态属性列表。

通常JSDoc模板将创造一个全新的页面来显示关于命名空间嵌套的每一层级的信息。有时候，你真的想要在同一张页面上列出所有属性，包括嵌套的属性。

请注意，@property标记必须在命名空间或类的文档注释块中使用。该标签适用于静态属性的简单集合，它不允许你为每个属性提供@examples或类似的复杂信息，只包含类型，名称和说明。

**示例**:

在这个例子中，我们有一个名为"config"的命名空间。我们想要所有有关默认属性及嵌套值的信息，输出到与"config"同一个页面上。

例如，描述命名空间的默认属性及嵌套属性：

```js
/**
 * @namespace
 * @property {object}  defaults               - The default values for parties.
 * @property {number}  defaults.players       - The default number of players.
 * @property {string}  defaults.level         - The default level for the party.
 * @property {object}  defaults.treasure      - The default treasure.
 * @property {number}  defaults.treasure.gold - How much gold the party starts with.
 */
var config = {
    defaults: {
        players: 1,
        level:   'beginner',
        treasure: {
            gold: 0
        }
    }
};
```

### @readonly

**作用**：标记一个标识符为只读。jsdoc不会检查某个代码是否真是只读的，

**示例**:

```js
/**
 * A constant.
 * @readonly
 * @const {number}
 */
const FOO = 1; 
```

### @returns

**作用**：述一个函数的返回值。语法和@param类似

**示例**:

```js
/**
 * Returns the sum of a and b
 * @param {Number} a
 * @param {Number} b
 * @param {Boolean} retArr If set to true, the function will return an array
 * @returns {Number|Array} Sum of a and b or an array that contains a, b and the sum of a and b.
 */
function sum(a, b, retArr) {
    if (retArr) {
        return [a, b, a + b];
    }
    return a + b;
} 
```

### @since

**语法**：`@since <versionDescription>`

**作用**：标明一个类，方法，或其它标识符是在哪个特定版本开始添加进来的

**示例**:

```js
/**
 * Provides Access to user information.
 * @since 1.0.1
 */
function UserRecord() {}
```

### @type

**语法**：`@type {typeName}`

**作用**：记录一个对象的类型。@type标签允许你提供一个表达式，用于标识一个标识符可能包含的值的类型，或由函数返回值的类型

**示例**:

```js
/**
 * @type {number}
 * @const
 */
var FOO = 1;
```

### @brief

**作用**：简单描述函数的功能
