# CSS 常用样式

## WEB 端常用样式

#### 盒子阴影设计 (Box Shadows)

[Box Shadows (box-shadow.dev)](https://box-shadow.dev/)

#### 单行文本溢出省略号

>容器需要设置宽度

```css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

#### 多行文本溢出省略号

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

#### 禁止元素被选中

```css
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
```

#### 网页置灰

```css
html {
    filter: grayscale(85%) saturate(80%);
    -webkit-filter: grayscale(85%) saturate(80%);
    -moz-filter: grayscale(85%) saturate(80%);
    -ms-filter: grayscale(85%) saturate(80%);
    -o-filter: grayscale(85%) saturate(80%);
    filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale");
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=.85);
    -webkit-filter: grayscale(.85) saturate(.8);
}
```

#### 小于 12 px 的字体

<style module>
      .font-sm {
        display: block;
        font-size: 12px;
        transform-origin: 0 0;
        white-space: nowrap;
      }

      .font-1 {
        transform: scale(0.083, 0.083);
      }
      .font-2 {
        transform: scale(0.167, 0.167);
      }
      .font-3 {
        transform: scale(0.25, 0.25);
      }
      .font-4 {
        transform: scale(0.333, 0.333);
      }
      .font-5 {
        transform: scale(0.417, 0.417);
      }
      .font-6 {
        transform: scale(0.5, 0.5);
      }
      .font-7 {
        transform: scale(0.583, 0.583);
      }
      .font-8 {
        transform: scale(0.667, 0.667);
      }
      .font-9 {
        transform: scale(0.75, 0.75);
      }
      .font-10 {
        transform: scale(0.833, 0.833);
      }
      .font-11 {
        transform: scale(0.17, 0.17);
      }
    </style>
<div class="font-sm font-1">1px</div>
    <div class="font-sm font-2">2px</div>
    <div class="font-sm font-3">3px</div>
    <div class="font-sm font-4">4px</div>
    <div class="font-sm font-5">5px</div>
    <div class="font-sm font-6">6px</div>
    <div class="font-sm font-7">7px</div>
    <div class="font-sm font-8">8px</div>
    <div class="font-sm font-9">9px</div>
    <div class="font-sm font-10">10px</div>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      .font-sm {
        display: block;
        font-size: 12px;
        transform-origin: 0 0;
        white-space: nowrap;
      }

      .font-1 {
        transform: scale(0.083, 0.083);
      }
      .font-2 {
        transform: scale(0.167, 0.167);
      }
      .font-3 {
        transform: scale(0.25, 0.25);
      }
      .font-4 {
        transform: scale(0.333, 0.333);
      }
      .font-5 {
        transform: scale(0.417, 0.417);
      }
      .font-6 {
        transform: scale(0.5, 0.5);
      }
      .font-7 {
        transform: scale(0.583, 0.583);
      }
      .font-8 {
        transform: scale(0.667, 0.667);
      }
      .font-9 {
        transform: scale(0.75, 0.75);
      }
      .font-10 {
        transform: scale(0.833, 0.833);
      }
      .font-11 {
        transform: scale(0.17, 0.17);
      }
    </style>
    <title>Document</title>
  </head>
  <body>
    <div class="font-sm font-1">1px</div>
    <div class="font-sm font-2">2px</div>
    <div class="font-sm font-3">3px</div>
    <div class="font-sm font-4">4px</div>
    <div class="font-sm font-5">5px</div>
    <div class="font-sm font-6">6px</div>
    <div class="font-sm font-7">7px</div>
    <div class="font-sm font-8">8px</div>
    <div class="font-sm font-9">9px</div>
    <div class="font-sm font-10">10px</div>
  </body>
</html>

```

#### 滚动条样式

<style>
      .box {
        width: 200px;
        height: 200px;
        overflow: auto;
        word-break: keep-all;
      }
      .box1::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      .box1::-webkit-scrollbar-thumb {
        background-color: skyblue;
        border-radius: 10px;
      }
      .box1::-webkit-scrollbar-thumb:hover {
        background-color: blue;
      }
      .box1::-webkit-scrollbar-thumb:active {
        background-color: yellow;
      }
      .box1::-webkit-scrollbar-track {
        background-color: pink;
        border-radius: 10px;
      }
      .box1::-webkit-scrollbar-track-piece {
        width: 5px;
        background-color: saddlebrown;
      }
      .box1::-webkit-scrollbar-button {
        width: 10px;
        height: 10px;
        background-color: red;
      }
      .box1::-webkit-scrollbar-corner {
        background-color: palegoldenrod;
      }

      .box2::-webkit-scrollbar {
        width: 2px;
        height: 2px;
      }
      .box2:hover::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      .box2::-webkit-scrollbar-track {
        background-color: pink;
        border-radius: 5px;
      }
      .box2::-webkit-scrollbar-thumb {
        background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
        box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
        border-radius: 10px;
      }
      .box2::-webkit-scrollbar-thumb:active {
        border: 2px solid rgba(0, 0, 0, 0.2);
      }
    </style>
<div class="content">
      <div class="box box1">
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
      </div>
      <br />
      <div class="box box2">
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
      </div>
    </div>

::: details 点我查看代码

```html
<style>
      .box {
        width: 200px;
        height: 200px;
        overflow: auto;
        word-break: keep-all;
      }
      .box1::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      .box1::-webkit-scrollbar-thumb {
        background-color: skyblue;
        border-radius: 10px;
      }
      .box1::-webkit-scrollbar-thumb:hover {
        background-color: blue;
      }
      .box1::-webkit-scrollbar-thumb:active {
        background-color: yellow;
      }
      .box1::-webkit-scrollbar-track {
        background-color: pink;
        border-radius: 10px;
      }
      .box1::-webkit-scrollbar-track-piece {
        width: 5px;
        background-color: saddlebrown;
      }
      .box1::-webkit-scrollbar-button {
        width: 10px;
        height: 10px;
        background-color: red;
      }
      .box1::-webkit-scrollbar-corner {
        background-color: palegoldenrod;
      }

      .box2::-webkit-scrollbar {
        width: 2px;
        height: 2px;
      }
      .box2:hover::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      .box2::-webkit-scrollbar-track {
        background-color: pink;
        border-radius: 5px;
      }
      .box2::-webkit-scrollbar-thumb {
        background-image: linear-gradient(180deg, #d0368a 0%, #708ad4 99%);
        box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
        border-radius: 10px;
      }
      .box2::-webkit-scrollbar-thumb:active {
        border: 2px solid rgba(0, 0, 0, 0.2);
      }
    </style>
<div class="content">
      <div class="box box1">
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
      </div>
      <br />
      <div class="box box2">
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
        你好你好你好你好你好你好你好你<br />好你好你好你好你好你好你好你好<br />
      </div>
    </div>
```

:::

![](assets/Pasted%20image%2020240919104524.png)

- `::-webkit-scrollbar`——整个滚动条。
- `::-webkit-scrollbar-button`——滚动条上的按钮（上下箭头）。
- `::-webkit-scrollbar-thumb`——滚动条上的滚动滑块。
- `::-webkit-scrollbar-track`——滚动条轨道。
- `::-webkit-scrollbar-track-piece`——滚动条没有滑块的轨道部分。
- `::-webkit-scrollbar-corner`——当同时有垂直滚动条和水平滚动条时交汇的部分。通常是浏览器窗口的右下角。
- `::-webkit-resizer`——出现在某些元素底角的可拖动调整大小的滑块。

#### CSS 3 盒子模型

```css
box-sizing: border-box;
-webkit-box-sizing: border-box;
```

## 移动端特殊样式

#### 去除点击时的高亮显示

```css
-webkit-tap-highlight-color: transparent;
```

#### 在移动端浏览器默认的外观在 iOS 上加上这个属性才能给按钮和输入框自定义样式

```css
 -webkit-appearance: none;
```

#### 禁用长按页面时的弹出菜单

```css
img,a { -webkit-touch-callout: none; }
```
