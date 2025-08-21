# this 指向问题

| 场景                    | `this` 指向    |
| --------------------- | ------------ |
| 全局对象                  | `window`     |
| 方法调用                  | 调用它的对象       |
| 箭头函数                  | 外层上下文        |
| 构造函数                  | 新实例          |
| `bind`/`apply`/`call` | 明确指定的对象      |
| 事件监听器                 | 触发事件的 DOM 元素 |

简单来说，**`this` 是函数在运行时自动绑定的上下文对象**，想要理解 this，你可以先记住以下两点：

- **this 永远指向一个对象；**
- **this 的指向完全取决于函数调用的位置；**

## 默认情况下的 `this` 指向

- 在非严格模式下，`this` 指向全局对象（通常是 `window`）。
- 在严格模式下，`this` 指向 `undefined`

## 作为对象的方法被调用时的 `this` 指向

当函数作为对象的方法被调用时，`this` 指向调用它的那个对象。

```javascript
const obj = {
  name: 'Kimi',
  greet: function() {
    console.log(this.name); // 输出 "Kimi"
  }
};
obj.greet();
```

但如果将方法赋值给另一个变量后调用，`this` 会指向全局对象（严格模式下是 `undefined`）。

```javascript
const greet = obj.greet;
greet(); // 输出 undefined（严格模式下）
```

## 箭头函数中的 `this` 指向

箭头函数没有自己的 `this`，它会继承外层的 `this`。

```js
const obj = {
  name: 'Kimi',
  greet: () => {
    console.log(this.name); // this 是 window，严格模式下是 undefined
  }
};
obj.greet();
```

## 定时器中的 `this` 指向

```js
var obj = {
    fun:function(){
        console.log(this);
    }
}
​
setInterval(obj.fun,1000);      // this指向window对象
setInterval('obj.fun()',1000);  // this指向obj对象
```

`setInterval()` 是 window 对象下内置的一个方法，接受两个参数，第一个参数允许是一个函数或者是一段可执行的 JS 代码，第二个参数则是执行前面函数或者代码的时间间隔；

在上面的代码中，`setInterval(obj.fun,1000)` 的第一个参数是 `obj` 对象的 `fun` ，因为 JS 中函数可以被当做值来做引用传递，实际就是将这个函数的地址当做参数传递给了 `setInterval` 方法，换句话说就是 `setInterval` 的第一参数接受了一个函数，那么此时 1000 毫秒后，函数的运行就已经是在 window 对象下了，也就是函数的调用者已经变成了 window 对象，所以其中的 this 则指向的全局 window 对象；

而在 `setInterval('obj.fun()',1000)` 中的第一个参数，实际则是传入的一段可执行的 JS 代码；1000 毫秒后当 JS 引擎来执行这段代码时，则是通过 `obj` 对象来找到 `fun` 函数并调用执行，那么函数的运行环境依然在 对象 `obj` 内，所以函数内部的 this 也就指向了 `obj` 对象；

## 事件绑定、事件监听中的 `this` 指向

事件绑定共有三种方式：**行内绑定**、**动态绑定**、**事件监听**

### 行内绑定中的 this

当事件触发时，属性值就会作为 JS 代码被执行，

- 第一个按钮点击时，当前运行环境下没有 `clickFun` 函数，因此浏览器就需要跳出当前运行环境，在整个环境中寻找一个叫 `clickFun` 的函数并执行这个函数，所以函数内部的 this 就指向了全局对象 window；
- 第二个按钮点击时，不是一个函数调用，直接在当前节点对象环境下使用 this，那么显然 this 就会指向当前节点对象

```html
<input type="button" value="按钮" onclick="clickFun()" />
<script>
  function clickFun() {
	console.log(this); // 此函数的运行环境在全局 window 对象下，因此 this 指向 window;
  }
</script>
    
<!-- 运行环境在节点对象中，因此 this 指向本节点对象 -->​
<input type="button" value="按钮" onclick="console.log(this);" />
```

### 动态绑定、事件监听中的 this

**在事件监听器中，`this` 通常指向触发事件的 DOM 元素。**

因为动态绑定的事件本就是为节点对象的属性 (事件名称前面加 'on') 重新赋值为一个匿名函数，因此函数在执行时就是在节点对象的环境下，this 自然就指向了本节点对象；

事件监听中 this 指向的原理与动态绑定基本一致，所以不再阐述；

```html
<input type="button" value="按钮" id="btn">
<script>
    var btn = document.getElementById('btn');
    btn.onclick = function(){
        this ;  // this指向本节点对象
    }
</script>
```

## 构造函数中的 `this` 指向

当函数作为构造函数被调用（用 `new` 关键字），`this` 指向新创建的实例。

new 一个构造函数并执行函数内部代码的过程就是这个五个步骤，当 JS 引擎指向到第 3 步的时候，会强制的将 this 指向新创建出来的这个对象；基本不需要理解，因为这本就是 JS 中的语法规则，记住就可以了；

```js
function Pro(){
    this.x = '1';
    this.y = function(){};
}
var p = new Pro();
```

![](assets/Pasted%20image%2020250821093011.png)

## `bind` / `apply` / `call` 中的 `this` 指向

这些方法可以显式地强制指定 `this` 的指向

```js
function test() {
  console.log(this);
}
test.call({ name: 'Kimi' }); // 输出 { name: 'Kimi' }
```
