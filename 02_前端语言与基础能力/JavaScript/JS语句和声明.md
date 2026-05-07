## import 
```js
import defaultExport from "module-name";	// 默认导入
import * as name from "module-name";	// 导入整个模块的内容，通过 name.接口名() 调用
import { export } from "module-name";	// 导入单个接口
import { export as alias } from "module-name"; // 导入时重命名接口
import { export1 , export2 } from "module-name";// 导入多个接口
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import { export1 , export2 as alias2 , [...] } from "module-name";//导入时重命名多个接口
import defaultExport, { export [ , [...] ] } from "module-name";// 导入的同时导出
import defaultExport, * as name from "module-name";// 默认导入和命名空间导入一起使用
import "module-name"; //仅为副作用而导入一个模块,这将运行模块中的全局代码, 但实际上不导入任何值```