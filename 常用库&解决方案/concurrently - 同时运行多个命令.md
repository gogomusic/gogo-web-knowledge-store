### concurrently - 同时运行多个命令

同时运行多个命令

#### Installation

```bash
npm install concurrently -D
```

#### Usage

在命令行中使用：

```javascript
concurrently "command1 arg" "command2 arg"
```

在 `package.json` 中使用：

```json
"start": "concurrently \"command1 arg\" \"command2 arg\""
```
