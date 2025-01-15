import { Button, Collapse, Progress } from 'antd';
import styles from './index.less';
import { useModel } from 'umi';
import { formatSize } from '../utils';
import { useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';

/** 下载队列 */
const DownloadList: React.FC = () => {
  const {
    downloadList,
    handleDownload,
    showDownloadList,
    setShowDownloadList,
    stopAllDownloading,
    // deleteDownload,
  } = useModel('download-list');

  // 每秒遍历一次下载队列，如果有未暂停、未下载完成的项目，就开始下载
  useEffect(() => {
    let timer: number | null = window.setInterval(() => {
      let index = -1;
      if (
        downloadList.some((item) => {
          if (item.downloadingStatus === 'downloading') {
            return true;
          }
          return false;
        })
      ) {
      } else {
        index = downloadList.findIndex((item) => item.downloadingStatus === 'waiting');
      }
      if (index !== -1) {
        handleDownload(index);
      }
    }, 1000);
    return () => {
      clearInterval(timer as number);
      timer = null;
    };
  }, [downloadList, handleDownload]);

  useEffect(() => {
    return () => {
      stopAllDownloading();
    };
  }, [stopAllDownloading]);
  return (
    <>
      {downloadList.length > 0 && showDownloadList && (
        <div className={styles.download_list}>
          <Collapse defaultActiveKey={['1']} collapsible="header">
            <Collapse.Panel
              header={`下载队列 (${downloadList.length})`}
              key="1"
              extra={
                <>
                  <Button
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={() => setShowDownloadList(false)}
                  />
                </>
              }
            >
              {downloadList.map((file) => (
                <div key={file.id} className={styles.download_list_item}>
                  <div className={styles.file_name_size}>
                    <span className={styles.file_name}>{file.file_name}</span>
                    <span className={styles.file_size}>{formatSize(file.file_size)}</span>
                  </div>
                  <div className={styles.progress}>
                    <Progress
                      style={{ width: '83%' }}
                      strokeColor={{
                        from: '#108ee9',
                        to: '#87d068',
                      }}
                      percent={file.downloadPersentage}
                      status={
                        file.downloadingStatus === 'success'
                          ? 'success'
                          : file.downloadingStatus === 'error'
                          ? 'exception'
                          : 'active'
                      }
                      format={(percent) =>
                        `${
                          percent === 100
                            ? '已下载'
                            : file.downloadingStatus === 'error'
                            ? '下载失败'
                            : percent + '% ' + file.downloadSpeed
                        }`
                      }
                    />
                    {file.downloadingStatus === 'error' && (
                      <a
                        className={styles.retry}
                        onClick={() =>
                          handleDownload(downloadList.findIndex((dl) => dl.id === file.id))
                        }
                      >
                        重试
                      </a>
                    )}
                    {/* <Button
                      size="small"
                      type="link"
                      title="从下载队列中移除"
                      className={styles.close_item}
                      onClick={() => {
                        deleteDownload(downloadList.findIndex((dl) => dl.id === file.id));
                      }}
                      icon={<CloseOutlined />}
                    /> */}
                  </div>
                </div>
              ))}
            </Collapse.Panel>
          </Collapse>
        </div>
      )}
    </>
  );
};

export default DownloadList;
