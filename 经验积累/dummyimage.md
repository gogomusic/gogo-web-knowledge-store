# 动态虚拟图像生成器

## 生成正方形

https://dummyimage.com/300

<img src="https://dummyimage.com/300">

## 生成长方形

https://dummyimage.com/400x300

<img src="https://dummyimage.com/400x300">

## 指定维度和比率

https://dummyimage.com/640x4:3

<img src="https://dummyimage.com/640x4:3">

https://dummyimage.com/16:9x1080

<img src="https://dummyimage.com/16:9x1080">

## 背景颜色/文本颜色

[https://dummyimage.com/250/ffffff/000000](https://dummyimage.com/250/ffffff/000000)

[https://dummyimage.com/250/f00/000](https://dummyimage.com/250/ffffff/000000)

<img src="https://dummyimage.com/250/f00/000">

## 图像格式

(.gif、.jpg、.png)

- 默认为 gif
- 图像扩展可以在 URL 中任何选项的末尾

[https://dummyimage.com/300.png/09f/fff](https://dummyimage.com/300.png/09f/fff)

[https://dummyimage.com/300/09f.png/fff](https://dummyimage.com/300/09f.png/fff)

[https://dummyimage.com/300/09f/fff.png](https://dummyimage.com/300/09f/fff.png)

<img src="https://dummyimage.com/300/09f/fff.png">

## 自定义文本

- 可以使用 url 最末尾的查询字符串输入自定义文本。
- 这是可选的，默认为图像尺寸（300×250)
- a-z（大写和小写）、数字和大多数符号都可以正常工作。
- 空格需要使用加号 [https://dummyimage.com/200x300&text=dummyimage.com+rocks！](https://dummyimage.com/200x300&text=dummyimage.com+rocks!)
  <img src="https://dummyimage.com/200x300&text=dummyimage.com+rocks！">

- 以下字符需要使用 UTF-8 十六进制版本进行编码才能正确呈现。

| 字符 | UTF-8 十六进制等效值                                         |
| :--- | :----------------------------------------------------------- |
| +    | [0x2B](https://dummyimage.com/480&text=Plus+Sign=0x2B)       |
| #    | [0x23](https://dummyimage.com/480&text=Number+sign+(Octothorp)=0x23) |
| %    | [0x25](https://dummyimage.com/480&text=Percent+symbol=0x25)  |
| &    | [0x26](https://dummyimage.com/480&text=Ampersand=0x26)       |
