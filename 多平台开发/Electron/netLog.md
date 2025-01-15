[netLog | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/api/net-log)

```js
const { netLog } = require('electron')
app.whenReady().then(async() => {
    const path = './netLog.log'
    await netLog.startLogging(path)
        // 每24小时删除日志
    setInterval(() => {
        netLog.stopLogging().then(() => {
            fs.rm(path).then(() => {
                netLog.startLogging(path)
            })
        })
    }, 24 * 60 * 60 * 1000);
    //     // After some network events
    // const path = await netLog.stopLogging()//停止记录日志
})
```

在日志中，找到字段：`timeTickOffset`，再加上日志条目的start_time，就可以得到日志记录的时间戳