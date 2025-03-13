# ProTable 自适应高度

>  本文来源：[UmiJS PC 项目一：ProTable 高度设置虽然 ProTable 具备强大的配置功能，但在实际使用过程中，表格 - 掘金](https://juejin.cn/post/7462956526710915082)

## useProTableSizeObserver.ts

*useProTableSizeObserver.ts*

```ts
import { type MutableRefObject, useCallback, useEffect, useState } from 'react';

type ParentElement = Pick<HTMLElement, 'querySelector' | 'querySelectorAll'>;

/** 动态计算ProTable表格高度 */
export function useProTableSizeObserver<T>(
  /** ProTable actionRef */
  actionRef: MutableRefObject<T>,
  options?: {
    /** 一个页面存在多个table场景 */
    wrapId?: string;
    /** 屏幕高度：默认 100vh */
    totalHeight?: string;
    /** table 距离底部高度：默认 32px */
    bottom?: number;
  },
) {
  const { totalHeight = '100vh', bottom = 32, wrapId } = options ?? {};
  const [searchH, setSearchH] = useState<number>(80);

  const getWrapSelector = useCallback(
    (selector: string) => (wrapId ? `#${wrapId} .ant-pro-table ${selector}` : selector),
    [wrapId],
  );

  const querySelector = useCallback(
    (selector: string) => {
      let parentElement: ParentElement = document;
      if (wrapId) {
        parentElement = document.getElementById(wrapId) as ParentElement;
      }
      const nodeList = Array.from(
        parentElement.querySelectorAll<HTMLDivElement>(getWrapSelector(selector)),
      );
      if (nodeList.length > 0) {
        return nodeList[nodeList.length - 1];
      }
      return undefined;
    },
    [getWrapSelector, wrapId],
  );

  const calcTableHeight = useCallback(
    (tableHeader: HTMLDivElement, tableCardBody: HTMLDivElement) => {
      let otherH = 0;

      const { bottom: _bottom } = tableHeader.getBoundingClientRect();
      const { paddingBlockEnd } = getComputedStyle(tableCardBody, null);
      otherH = _bottom + parseInt(paddingBlockEnd);

      const tablePagination = querySelector('.ant-table-pagination');
      if (tablePagination) {
        otherH += tablePagination?.offsetHeight ?? 24;
        const { marginTop } = getComputedStyle(tablePagination, null);
        otherH += parseInt(marginTop);
      }
      setSearchH(otherH);
    },
    [querySelector],
  );

  useEffect(() => {
    if (!actionRef.current) return;

    let observer: ResizeObserver | undefined;
    let tableSearch: HTMLDivElement | undefined;
    let tableHeader: HTMLDivElement | undefined;
    let tableCardBody: HTMLDivElement | undefined;
    setTimeout(() => {
      tableSearch = querySelector('.ant-pro-table-search');
      tableHeader = querySelector('.ant-table-header');
      tableCardBody = querySelector('.ant-pro-card-body')!;

      observer = new ResizeObserver(() => {
        if (tableHeader && tableCardBody) calcTableHeight(tableHeader, tableCardBody);
      });
      if (tableSearch) observer.observe(tableSearch);
      if (tableHeader) observer.observe(tableHeader);
      if (tableCardBody) observer.observe(tableCardBody);
    }, 100);

    return () => {
      if (observer) {
        if (tableSearch) observer.unobserve(tableSearch);
        if (tableHeader) observer.unobserve(tableHeader);
        if (tableCardBody) observer.unobserve(tableCardBody);
      }
    };
  }, [actionRef, calcTableHeight, querySelector]);

  return {
    // 冗余高度: 4px
    tableScrollY: `calc(${totalHeight} - ${bottom}px - ${searchH}px - 4px)`,
  };
}

```

## 使用方法

```ts
// ...
const { tableScrollY } = useProTableSizeObserver(actionRef, { bottom: 50 });

return (<ProTable<TableDataType, Api.PageParams & TableSearchParams>
        //...
        scroll={{
          y: tableScrollY,
        }}
		/>)
```
