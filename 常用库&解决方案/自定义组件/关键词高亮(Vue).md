### *Main.js*
```javascript
import { pinyin } from 'pinyin-pro'
Vue.prototype.pinyin = pinyin
```
### *Search.vue*
```vue
<template>
  <div class="search-box">
    <div class="keyboard-box">
      <div class="input-box">
        <input v-model="inputValue" type="text" placeholder="请输入..." />
        <div class="btn c-btn" @click="search">搜索</div>
      </div>

      <div class="keyboard">
        <div class="item c-btn" :class="{ active: activeKey === item }" v-for="item in uppercase" :key="item" @click="selectKey(item)">{{ item }}</div>
        <div class="keyboard-btn">
          <div class="del c-btn" @click="del">删除</div>
          <div class="clear c-btn" @click="clear">清空</div>
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="list-box c-scrollbar">
        <div class="li c-ellipsis c-btn" v-for="(item, index) in list" :key="index" @click="clickItem(item)" v-html="keyWordsHighLight(item.itemName)"></div>
        <empty ref="emptyRef"></empty>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Empty from '@/components/Empty'
const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export default {
  components: {
    Empty,
  },

  data() {
    return {
      inputValue: '',
      activeKey: '',
      uppercase,
      list: [],
    }
  },

  created() {
    this.fetchData()
    this.debounceFetchData = _.debounce(this.fetchData.bind(this), 300)
  },

  methods: {
    async fetchData() {
      const data = await this.apis.queryItemList({
        current: 1,
        size: 1000,
        itemName: this.inputValue,
      })

      if (data.records.length === 0) {
        this.$refs.emptyRef.show('暂无数据')
      } else {
        this.list = data.records
        this.$refs.emptyRef.hide()
      }
    },
    selectKey(activeKey) {
      this.activeKey = activeKey
      this.inputValue += activeKey
      this.debounceFetchData()
    },

    del() {
      this.inputValue = this.inputValue.substring(0, this.inputValue.length - 1)
      this.activeKey = ''
      this.debounceFetchData()
    },

    clear() {
      this.activeKey = ''
      this.inputValue = ''
      this.fetchData()
    },

    search() {
      this.fetchData()
    },
    // 关键词高亮
    keyWordsHighLight(paragraph) {
      let result = paragraph
      if (this.inputValue) {
        let indexArr = []
        let keyWordsArr = []

        const _pinyin = this.pinyin(paragraph, {
          pattern: 'first',
          type: 'array',
        })
          ?.join('')
          ?.toUpperCase()
        let index = 0,
          flag
        do {
          flag = _pinyin.substring(index).indexOf(this.inputValue)
          flag >= 0 ? (index += flag) : (index = -1)
          if (index !== -1) {
            indexArr.push(index)
            index += 1
          }
        } while (index >= 0 && index < _pinyin.length)

        if (indexArr.length > 0) {
          for (let j = 0; j < indexArr.length; j++) {
            keyWordsArr.push(paragraph.substr(indexArr[j], this.inputValue.length))
          }
          keyWordsArr = [...new Set(keyWordsArr)]
          for (let k = 0; k < keyWordsArr.length; k++) {
            let reg = new RegExp(`${keyWordsArr[k]}`, 'g')
            paragraph = paragraph.replace(reg, `<span style="background:yellow">${keyWordsArr[k]}</span>`)
          }
          result = paragraph
        }
      }
      return result
    },
  },
}
</script>

<style lang="scss" scoped>
.search-box {
  display: flex;
  padding: 192px 89px 122px 86px;
  .keyboard-box {
    width: 702px;
    .title {
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #1c497a;
      line-height: 40px;
      margin-bottom: 40px;
    }

    .input-box {
      width: 530px;
      height: 60px;
      background: #ffffff;
      border-radius: 30px;
      display: flex;
      align-items: center;
      position: relative;
      padding: 5px 5px 5px 17px;
      input {
        height: 80%;
        flex: 1;
        margin-right: 20px;
        background: none;
        outline: none;
        border: none;

        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #008bff;
      }

      .btn {
        width: 150px;
        height: 50px;
        background: #008bff;
        border-radius: 25px;
        font-size: 28px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;

        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .input-box::before {
      content: '';
      width: 28px;
      height: 28px;
      background-image: url('../assets/images/bszn-img04.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
      margin-right: 22px;
    }

    .keyboard {
      width: 530px;
      height: 600px;
      background-color: rgba(10, 73, 144, 0.5);
      border-radius: 20px;
      margin-top: 23px;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      padding: 38px 20px;
      position: relative;
      .item {
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;

        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: 15px;
        position: relative;
      }

      .active::after {
        background-image: url('../assets/images/sx-img014.png');
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        width: 84px;
        height: 84px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        content: '';
      }

      .keyboard-btn {
        position: absolute;
        left: 34px;
        right: 34px;
        bottom: 30px;
        display: flex;
        justify-content: space-between;
        .c-btn {
          width: 210px;
          height: 60px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 20px;

          font-size: 30px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(28, 73, 122, 0.8);
          line-height: 64px;
          text-align: center;
        }
      }
    }
  }
  .content-box {
    width: 1218px;
    position: relative;
    .list-box {
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 700px;
      overflow: auto;
      .li {
        width: 1010px;
        height: 90px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 20px;
        padding: 0 28px;
        font-size: 30px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #1c497a;
        line-height: 90px;
        margin-left: 53px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
```
### *Empty.vue*
```vue
<template>
  <div class="empty-box" v-show="isShow">
    <div class="empty-icon"></div>
    <div class="empty-msg">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      isShow: false,
    }
  },
  methods: {
    show(msg) {
      this.msg = msg
      this.isShow = true
    },
    hide() {
      this.msg = ''
      this.isShow = false
    },
  },
}
</script>

<style scoped>
.empty-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.empty-icon {
  background-image: url('../assets/images/icon-empty.png');
  width: 220px;
  height: 184px;
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
  margin: 0 auto;
}

.empty-msg {
  font-size: 30px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #1c497a;
  line-height: 62px;
  text-align: center;
}
</style>

```