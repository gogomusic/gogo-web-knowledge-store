import { BIG_FILE_CREATE_LOG, BIG_FILE_DOWNLOAD_CHUNK } from '@/services/bigFile';
import { message } from 'antd';
import { useCallback, useRef, useState } from 'react';
import { useImmer } from 'use-immer';

export default () => {
  const [downloadList, updateDownloadList] = useImmer<SERVE.DownloadItem[]>([]);
  const blobList = useRef<{ id: number; blob: Blob[] }[]>([]);
  const [showDownloadList, setShowDownloadList] = useState(true);
  const isStopAllDownloading = useRef(false);

  const downloadChunk = useCallback(
    async (index: number, listIndex: number) => {
      const file = downloadList[listIndex];
      let chunkSize = CHUNK_SIZE * 1024 * 1024;
      const chunkTotal = Math.ceil(file.file_size / chunkSize);
      if (index <= chunkTotal && !isStopAllDownloading.current) {
        const exit = file.chunkList.includes(index);
        if (!exit) {
          if (file.downloadingStatus !== 'pause') {
            const formdata = new FormData();
            formdata.append('md5', file.file_md5);
            formdata.append('fileName', file.file_name);
            formdata.append('chunkSize', chunkSize.toString());
            formdata.append('chunkTotal', Math.ceil(file.file_size / chunkSize).toString());
            formdata.append('index', index.toString());
            if (index * chunkSize >= file.file_size) {
              chunkSize = file.file_size - (index - 1) * chunkSize;
              formdata.set('chunkSize', chunkSize.toString());
            }
            const startTime = new Date().valueOf();
            BIG_FILE_DOWNLOAD_CHUNK(formdata)
              .then((res) => {
                if (res?.code === 403) {
                  throw new Error(res?.msg);
                }
                const endTime = new Date().valueOf();
                const timeDif = (endTime - startTime) / 1000;
                const blob = res.data;
                updateDownloadList((dl) => {
                  dl[listIndex].chunkList.push(index);
                  dl[listIndex].downloadSpeed = (CHUNK_SIZE / timeDif).toFixed(2) + ' MB/s';
                  dl[listIndex].downloadPersentage = parseInt(
                    ((index / chunkTotal) * 100).toString(),
                  );
                });
                let blobIndex = blobList.current.findIndex((bl) => {
                  return bl.id === file.id;
                });
                if (blobIndex > -1) {
                  blobList.current[blobIndex].blob.push(blob);
                } else {
                  blobIndex = blobList.current.length;
                  blobList.current.push({
                    id: file.id as number,
                    blob: [blob],
                  });
                }
                if (index === chunkTotal) {
                  const resBlob = new Blob(blobList.current[blobIndex].blob, {
                    type: 'application/octet-stream',
                  });
                  const url = window.URL.createObjectURL(resBlob); // 将获取的文件转化为blob格式
                  const a = document.createElement('a');
                  a.style.display = 'none';
                  a.href = url;
                  const fileName = file.file_name;
                  a.setAttribute('download', fileName);
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
                  updateDownloadList((dl) => {
                    dl[listIndex].downloadingStatus = 'success';
                  });
                  const logFormData = new FormData();
                  logFormData.append('md5', file.file_md5);
                  logFormData.append('fileName', file.file_name);
                  logFormData.append('fileSize', file.file_size?.toString());
                  logFormData.append('fileId', file.id!.toString());
                  BIG_FILE_CREATE_LOG(logFormData);
                }
                setTimeout(() => {
                  downloadChunk(index + 1, listIndex);
                }, 100);
              })
              .catch(() => {
                updateDownloadList((dl) => {
                  dl[listIndex].downloadingStatus = 'error';
                });
              });
          }
        } else {
          updateDownloadList((dl) => {
            dl[listIndex].downloadPersentage = parseInt(((index / chunkTotal) * 100).toString());
          });
          downloadChunk(index + 1, listIndex);
        }
      }
    },
    [downloadList, updateDownloadList],
  );

  const handleDownload = useCallback(
    (listIndex: number) => {
      updateDownloadList((dl) => {
        dl[listIndex].downloadingStatus = 'downloading';
      });
      downloadChunk(1, listIndex);
    },
    [downloadChunk, updateDownloadList],
  );

  /** 推送到下载队列 */
  const pushDownload = useCallback(
    (file: SERVE.DownloadItem) => {
      setShowDownloadList(true);
      const index = downloadList.findIndex((item) => item.id === file.id);
      if (index > -1) {
        if (downloadList[index].downloadingStatus === 'success') {
          message.success('下载已完成');
        } else if (downloadList[index].downloadingStatus === 'pause') {
          message.success('已恢复下载');
          updateDownloadList((dl) => {
            dl[index].downloadingStatus = 'waiting';
          });
        } else {
          message.success('已在下载队列中');
        }
      } else {
        message.success('已添加到下载队列');
        updateDownloadList((dl) => {
          dl.push(
            Object.assign(
              {
                downloadingStatus: 'waiting',
              },
              file,
            ),
          );
        });
      }
    },
    [downloadList, updateDownloadList],
  );

  const pauseDownload = () => {};
  const deleteDownload = () => {};
  const stopAllDownloading = useCallback(() => {
    isStopAllDownloading.current = true;
  }, []);

  // const deleteDownload = useCallback(
  //   (listIndex: number) => {
  //     const index = blobList.current.findIndex((item) => item.id === downloadList[listIndex].id);
  //     blobList.current.splice(index, 1);
  //     updateDownloadList((dl) => {
  //       dl.splice(listIndex, 1);
  //     });
  //   },
  //   [downloadList, updateDownloadList],
  // );
  return {
    downloadList,
    updateDownloadList,
    pushDownload,
    pauseDownload,
    deleteDownload,
    handleDownload,
    showDownloadList,
    setShowDownloadList,
    stopAllDownloading,
  };
};
