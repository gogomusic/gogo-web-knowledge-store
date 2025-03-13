```ts
import { DICT_GET_SELECT } from '@/services/admin/dict';
import { useModel } from 'umi';
import { useCallback, useEffect, useState } from 'react';

/** 是否缓存字典
 *
 * true: 仅在首次使用字典时发起请求，已请求过的字典将被缓存，如果有其他用户更改了字典，会导致当前用户看到的字典不是最新的
 *
 * false: 每次使用字典时都会重新请求，更新及时，但是会频繁请求接口
 */
const isCache = true;

// 全局缓存对象，用于存储正在进行的请求
const requestCache: Record<string, Promise<Option[]> | undefined> = {};

/** 使用动态字典 */
const useDict = (dictCode: string) => {
  const { dicts, setDicts } = useModel('common');
  const [dict, setDict] = useState<Option[]>([]);

  const fetchDict = useCallback(async () => {
    if (isCache && dicts[dictCode]) {
      setDict(dicts[dictCode]);
    } else if (requestCache[dictCode]) {
      // 如果已经有请求在进行中，等待请求完成并使用其结果
      const options = await requestCache[dictCode];
      setDict(options);
    } else {
      const request = DICT_GET_SELECT(dictCode).then(({ code, data }) => {
        if (code === 200) {
          const options = data.map((item) => ({
            label: item.dict_data_name,
            value: item.dict_data_code,
          }));
          if (isCache) setDicts((prev) => ({ ...prev, [dictCode]: options }));
          return options;
        } else return [];
      });
      requestCache[dictCode] = request;

      const options = await request;
      setDict(options);

      delete requestCache[dictCode];
    }
  }, [dictCode, dicts, setDicts]);

  useEffect(() => {
    fetchDict();
  }, [fetchDict]);

  return [
    /** 动态字典, `value`和`label`组成的对象数组形式 */
    dict,
  ];
};

export default useDict;

```
