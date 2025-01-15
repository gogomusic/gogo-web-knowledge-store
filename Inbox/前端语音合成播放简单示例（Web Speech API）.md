## 效果
![](assets/Pasted%20image%2020220507133122.png)
## *Vue2代码*
```vue
<template>
  <div class="box">
    <input type="text" name="text" id="text" v-model="text" />
    <button @click="playVoice">播放语音</button>
    <button @click="pauseVoice" v-if="status === '开始播放'">暂停播放</button>
    <button @click="resumeVoice" v-if="status === '暂停播放'">继续播放</button>
    <button @click="stopVoice">停止播放</button>
    <div>播放状态：{{ status }}</div>
  </div>
</template>

<script>
const synth = window.speechSynthesis;
const msg = new window.SpeechSynthesisUtterance();

export default {
  data() {
    return {
      text: "",
      status: ""
    };
  },
  mounted() {
    msg.onstart = e => {
      this.status = "开始播放";
    };
    msg.onend = e => {
      this.status = "结束播放";
    };
    msg.onpause = e => {
      this.status = "暂停播放";
    };
  },
  destroyed() {
    this.stopVoice();
  },
  methods: {
    //播放
    playVoice() {
      this.handleSpeak();
    },
    //暂停
    pauseVoice() {
      this.handlePause();
    },
    //继续
    resumeVoice() {
      this.handleResume();
    },
    //停止
    stopVoice() {
      this.handleStop();
    },
    handleSpeak() {
      if (!this.text) return alert("请输入文本!");
      msg.text = this.text;
      msg.lang = "zh-CN"; //语言
      msg.volume = 1; //音量：0~1，默认1
      msg.rate = 1; //语速：0.1~10，默认1
      msg.pitch = 1; //音高：0~2，默认1
      // msg.voiceURI=''//希望使用的声音
      synth.speak(msg);
    },
    handleStop(e) {
      synth.cancel(msg);
    },
    handlePause(e) {
      synth.pause(msg);
    },
    handleResume(e) {
      synth.resume(msg);
    }
  }
};
</script>

```