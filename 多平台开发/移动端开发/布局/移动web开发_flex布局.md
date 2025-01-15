# 移动web开发——flex布局

## 1.0传统布局和flex布局对比

### 1.1传统布局

+ 兼容性好
+ 布局繁琐
+ 局限性，不能再移动端很好的布局

### 1.2 flex布局

+ 操作方便，布局极其简单，移动端使用比较广泛
+ pc端浏览器支持情况比较差
+ IE11或更低版本不支持flex或仅支持部分

### 1.3 建议

+  如果是pc端页面布局，还是采用传统方式
+ 如果是移动端或者是不考虑兼容的pc则采用flex

## 2.0 flex布局原理

+ flex 是 flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性，任何一个容器都可以指定为 flex 布局。
+ 当我们为父盒子设为 flex 布局以后，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效。
+ flex布局又叫伸缩布局 、弹性布局 、伸缩盒布局 、弹性盒布局 
+ 采用 Flex 布局的元素，称为 `Flex 容器（flex container）`，简称"容器"。它的所有子元素自动成为容器成员，称为 `Flex 项目（flex item）`，简称"项目"。

**flex布局原理总结**：<u>通过给父盒子添加flex属性，来控制子盒子的位置和排列方式</u>

## 3.0 父项常见属性

+ flex-direction：设置主轴的方向
+ justify-content：设置主轴上的子元素排列方式
+ flex-wrap：设置子元素是否换行  
+ align-content：设置侧轴上的子元素的排列方式（多行）
+ align-items：设置侧轴上的子元素排列方式（单行）
+ flex-flow：复合属性，相当于同时设置了 flex-direction 和 flex-wrap

### 3.1 flex-direction设置主轴的方向

+ 在 flex 布局中，是分为主轴和侧轴两个方向，同样的叫法有 ： 行和列、x 轴和y 轴
+ 默认主轴方向就是 x 轴方向，水平向右
+ 默认侧轴方向就是 y 轴方向，水平向下

![](assets/1.JPG)

+ 注意： 主轴和侧轴是会变化的，就看 flex-direction 设置谁为主轴，剩下的就是侧轴。而我们的子元素是跟着主轴来排列的

![](assets/2.JPG)
  

### 3.2 justify-content 设置主轴上的子元素排列方式

| 属性值        | 说明                                              | 示例                                                         |
| ------------- | ------------------------------------------------- | ------------------------------------------------------------ |
| flex-start    | **默认值**。从头部开始，如果主轴是x轴，则从左到右 | ![image-20210803094319286](assets/image-20210803094319286.png) |
| flex-end      | 从尾部开始排列                                    |![image-20210803094356761](assets/image-20210803094356761.png) |
| center        | 在主轴居中对齐（如果主轴是x轴则水平居中）         | ![image-20210803094510919](assets/image-20210803094510919.png) |
| space-around  | 平分剩余空间                                      | ![image-20210803094616327](assets/image-20210803094616327.png) |
| space-between | 先两边贴边再平分剩余空间**（重要）**              | ![image-20210803094652669](assets/image-20210803094652669.png) |
| space-evenly  | 每一个元素之间完全平分剩余空间                    | ![image-20210803094710909](assets/image-20210803094710909.png) |



### 3.3 flex-wrap设置是否换行

+ 默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，**flex布局中默认是不换行的。**
+ nowrap 不换行
+ wrap 换行

### 3.4 align-items 设置侧轴上的子元素排列方式（单行 ）

+ 该属性是控制子项在侧轴（默认是y轴）上的排列方式  在子项为单项（单行）的时候使用

  | 属性值     | 说明                                                         | 示例                                                         |
  | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | flex-start | **默认值**。从头开始                                         | ![image-20210803102616103](assets/image-20210803102616103.png) |
  | flex-end   | 从尾部开始排列                                               | ![image-20210803102636344](assets/image-20210803102636344.png) |
  | center     | 居中对齐                                                     | ![image-20210803102701242](assets/image-20210803102701242.png) |
  | stretch    | 拉伸，将子元素高度拉满**（只能在没有设置高度的的情况下使用）** | ![image-20210803102754498](assets/image-20210803102754498.png) |

### 3.5 align-content  设置侧轴上的子元素的排列方式（多行）

设置子项在侧轴上的排列方式 并且只能用于子项出现 换行（`flex-wrap: wrap;`） 的情况（多行），在单行下是没有效果的。
![](assets/4.JPG)
### 3.6 align-content 和align-items区别

> 单行：没有换行:`flex-wrap:wrap;`的情况下，才称为单行

+ align-items  适用于单行情况下， 只有上对齐、下对齐、居中和 拉伸
+ align-content适应于换行（多行）的情况下（单行情况下无效）， 可以设置 上对齐、下对齐、居中、拉伸以及平均分配剩余空间等属性值。 
+ 总结就是单行用align-items  多行用 align-content

### 3.7 flex-flow 属性是 flex-direction 和 flex-wrap 属性的复合属性

```
flex-flow:row wrap;
```

## 4.0 flex布局子项常见属性

+ flex子项目占的份数
+ align-self控制子项自己在侧轴的排列方式
+ order属性定义子项的排列顺序（前后顺序）

### 4.1  flex 属性

flex 属性定义子项目分配剩余空间，用flex来表示占多少份数。

```css
.item {
    flex: <number>; /* 默认值 0 */
}

```

### 4.2 align-self控制子项自己在侧轴上的排列方式

align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。

默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

```css
span:nth-child(2) {
      /* 设置自己在侧轴上的排列方式 */
      align-self: flex-end;
}

```

### 4.3 order 属性定义项目的排列顺序

数值越小，排列越靠前，默认为0。

注意：和 z-index 不一样。

```
.item {
    order: <number>;
}
```

## 5.0 携程网首页案例制作

携程网链接：http://m.ctrip.com

1.技术选型

方案：我们采取单独制作移动页面方案

技术：布局采取flex布局

2.搭建相关文件夹

![](assets/5.JPG)

3.设置视口标签以及引入初始化样式

```html
<meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/index.css">
```

4.常用初始化样式

```css
body {
  max-width: 540px;
  min-width: 320px;
  margin: 0 auto;
  font: normal 14px/1.5 Tahoma,"Lucida Grande",Verdana,"Microsoft Yahei",STXihei,hei;
  color: #000;
  background: #f2f2f2;
  overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
}

```

5.模块名字划分

![](assets/6(1).jpg)

![image-20210805102138123](assets/image-20210805102138123.png)

语法2：![image-20210805102724298](assets/image-20210805102724298.png)



径向渐变：![image-20210805103039500](assets/image-20210805103039500.png)

 



**补充：flex可以用百分比，相对于父级来说的**
