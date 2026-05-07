## drawImage()

### 定义和用法

drawImage() 方法在画布上绘制图像、画布或视频。

drawImage() 方法也能够绘制图像的某些部分，以及/或者增加或减少图像的尺寸。

### 使用方法

```js
var myCanvas = document.getElementById("myCanvas");	// 获取画布
var context = myCanvas.getContext("2d");	// 获取 canvas2d 上下文
var img = document.getElementById("img");		// 获取图片元素
context.drawImage(img,0,0); 			// 向画布上面绘制图片
```

### 语法

```js
context.drawImage(img,x,y);	//在画布上定位图像
context.drawImage(img,x,y,width,height);//在画布上定位图像，并规定图像的宽度和高度
context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);//剪切图像，并在画布上定位被剪切的部分
```

### 参数

| 参数      | 描述                                         |
| :-------- | :------------------------------------------- |
| *img*     | 规定要使用的图像、画布或视频。               |
| *sx*      | 可选。开始剪切的 x 坐标位置。                |
| *sy*      | 可选。开始剪切的 y 坐标位置。                |
| *swidth*  | 可选。被剪切图像的宽度。                     |
| *sheight* | 可选。被剪切图像的高度。                     |
| *x*       | 在画布上放置图像的 x 坐标位置。              |
| *y*       | 在画布上放置图像的 y 坐标位置。              |
| *width*   | 可选。要使用的图像的宽度。（伸展或缩小图像） |
| *height*  | 可选。要使用的图像的高度。（伸展或缩小图像） |

### 示例

##### 每 20 毫秒，代码就会绘制视频的当前帧

```js
var v=document.getElementById("video1");
var c=document.getElementById("myCanvas");
ctx=c.getContext('2d');
v.addEventListener('play',function() {var i=window.setInterval(function() 
{ctx.drawImage(v,0,0,270,135)},20);},false);
v.addEventListener('pause',function() {window.clearInterval(i);},false);
v.addEventListener('ended',function() {clearInterval(i);},false);
```



