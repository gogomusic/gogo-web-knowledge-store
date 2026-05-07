# Video.js

Video.js 官网：[Video.js - Make your player yours | Video.js (videojs.com)](https://videojs.com/)

Video. js 配置项：[Video.js Options Reference | Video.js (videojs.com)](https://videojs.com/guides/options/)

Video. js 插件：[Video.js Plugins | Video.js (videojs.com)](https://videojs.com/plugins/)

自动播放最佳实践：[Video.js Blog | Video.js (videojs.com)](https://videojs.com/blog/autoplay-best-practices-with-video-js/)

## React 组件示例

### 1、安装

安装 `video.js`

```bash
npm i video.js
```

安装 `videojs-hotkeys` (可选，以提供键盘操作支持)

```bash
npm i videojs-hotkeys
```

### 2、在 React 函数组件中使用

***VideoPlayer.tsx***
```tsx
import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import type Player from "video.js/dist/types/player";
import "videojs-hotkeys";

interface VideoPlayerProps {
  /**
   * see https://videojs.com/guides/options/#standard-video-element-options
   *
   **/
  options: any;
  onReady?: (player: Player) => void;
}

/** 视频播放器
 * @param options 视频播放器配置
 *
 * @param onReady 播放器准备就绪回调
 *
 * 文件夹里有demo可以参考使用方法
 */
const VideoPlayer: React.FC<VideoPlayerProps> = ({ options, onReady }) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current!.appendChild(videoElement);
      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          plugins: {
            hotkeys: {
              volumeStep: 0.1,
              seekStep: 5,
              enableModifiersForNumbers: false,
            },
          },
        },
        () => {
          videojs.log("player is ready");
          onReady && onReady(player);
        }
      ));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [onReady, options]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;

```

***demo. tsx***
```tsx
import React from "react";
import VideoPlayer from "@/components/VideoPlayer";

const Page: React.FC = () => {
  const videoOptions = {
    autoplay: "auto",
    preload: "auto",
    controls: true,
    responsive: true,
    playbackRates: [0.5, 1, 1.5, 2],
    controlBar: {
      skipButtons: {
        forward: 5,
        backward: 5,
      },
    },
    fluid: true,
    disablePictureInPicture: false,
    sources: [
      {
        src: "/video/video.mp4",
        type: "video/mp4",
      },
    ],
  };

  return (
    <div className="mt-16">
      <VideoPlayer options={videoOptions} />
    </div>
  );
};

export default Page;

```
