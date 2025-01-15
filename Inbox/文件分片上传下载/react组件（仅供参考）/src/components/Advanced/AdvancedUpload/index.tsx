import { CloseCircleOutlined, CloudUploadOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Upload, message, type UploadProps, Progress, Popconfirm } from 'antd';
import { computeMd5 } from '../utils';
import { useSafeState } from 'ahooks';
import type { UploadChunkFormData } from '@/services/bigFile';
import { BIG_FILE_CHECKFILE, BIG_FILE_UPLOAD_ASYNC } from '@/services/bigFile';
import { useImmer } from 'use-immer';
import styles from './index.less';
import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { flushSync } from 'react-dom';

type UploadFileProps = {
  name: string;
  size: number;
  /** 文件解析进度（计算MD5） */
  parsePercentage: number;
  /** 文件上传进度 */
  uploadPercentage: number;
  /** 已上传的块列表 */
  chunkList: number[];
  file: File | undefined;
  /** 是否需要上传 */
  needUpload: boolean;
  md5: string;
  /** 上传状态 */
  status: 'waiting' | 'parsing' | 'uploading' | 'success' | 'error';
};

type ValueType = {
  file_name: string;
  file_md5: string;
  file_size: number;
  /** 判断是否已上传 */
  needUpload: boolean;
};

type Props = {
  value?: ValueType;
  onChange?: (value: ValueType) => void;
};

const initValue: UploadFileProps = {
  name: '',
  size: 0,
  parsePercentage: 0,
  uploadPercentage: 0,
  chunkList: [],
  needUpload: true,
  file: undefined,
  md5: '',
  status: 'waiting',
};

/** 分片上传组件
 *
 * 注意：该组件目前只支持单个文件分片上传
 */
const AdvancedUpload: React.FC<Props> = ({ value, onChange }) => {
  const [reUpload, setReUpload] = useSafeState(false);
  const isfirstGetValue = useRef(true);
  const [uploadFile, updateUploadFile] = useImmer<UploadFileProps>({ ...initValue });
  const isStopUpload = useRef(false);

  useEffect(() => {
    if (value && isfirstGetValue.current) {
      isfirstGetValue.current = false;
      updateUploadFile((uf) => {
        uf.name = value.file_name;
        uf.size = value.file_size;
        uf.md5 = value.file_md5;
        uf.needUpload = value.needUpload;
        uf.status = value.needUpload ? 'waiting' : 'success';
      });
    }
  }, [updateUploadFile, value]);

  useEffect(() => {
    onChange?.({
      file_name: uploadFile.name,
      file_md5: uploadFile.md5,
      file_size: uploadFile.size,
      needUpload: uploadFile.needUpload,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadFile.md5, uploadFile.name, uploadFile.needUpload, uploadFile.size]);

  useEffect(() => {
    return () => {
      isStopUpload.current = true;
    };
  }, []);

  const onParse = ({ percent }: { percent: number }) => {
    updateUploadFile((uf) => {
      uf.parsePercentage = percent;
      uf.status = 'parsing';
    });
  };

  /** 从服务器获取上传状态 false|已上传 true|未上传*/
  const updateUploadStatus = async (md5: string) => {
    const {
      code,
      data: { chunkList, isUploaded },
    } = await BIG_FILE_CHECKFILE(md5);
    if (code === 200) {
      if (isUploaded) {
        updateUploadFile((uf) => {
          uf!.status = 'success';
          uf!.needUpload = false;
        });
        return false; //文件已上传，在beforeUpload中返回表示文件无需上传，但是仍会在上传列表中
      } else {
        updateUploadFile((uf) => {
          uf!.chunkList = chunkList;
          uf!.needUpload = true;
        });
        return true; //文件未上传
      }
    } else {
      return Upload.LIST_IGNORE; //在beforeUpload中返回表示文件无需上传，会在上传列表中移除
    }
  };
  const computePercentage = (count: number, total: number) => {
    return parseFloat(Math.round((count / total) * 100).toFixed(2));
  };
  const beforeUpload = async (file: File) => {
    const md5 = await computeMd5({ file, _chunkSize: 10, onParse });
    updateUploadFile((uf) => {
      uf.name = file.name;
      uf.size = file.size;
      uf.parsePercentage = 0;
      uf.uploadPercentage = 0;
      uf.chunkList = [];
      uf.needUpload = false;
      uf.file = file;
      uf.md5 = md5;
    });
    const status = await updateUploadStatus(md5);
    if (status === false) {
      message.success('文件已秒传！');
    }
    return status;
  };

  // 上传文件（异步）
  const uploadChunkAsync = async ({
    chunkSize,
    chunkTotal,
    reqNumber,
  }: {
    chunkSize: number;
    chunkTotal: number;
    /** 最大并发数 */
    reqNumber: number;
  }) => {
    updateUploadFile((uf) => {
      uf.status = 'uploading';
      uf.uploadPercentage = computePercentage(uploadFile.chunkList.length, chunkTotal);
    });
    for (
      let index = 0,
        chunks: { actualIndex: number; formData: UploadChunkFormData }[] = [],
        hasError = false;
      index < chunkTotal;
      index++
    ) {
      if (isStopUpload.current) {
        isStopUpload.current = false;
        break;
      }
      const actualIndex = index + 1;
      if (!uploadFile.chunkList.includes(actualIndex)) {
        const start = index * chunkSize;
        const end = Math.min(uploadFile.size, start + chunkSize);
        const chunk = uploadFile.file!.slice(start, end);
        const formData = new FormData() as UploadChunkFormData;
        formData.append('chunk', chunk);
        formData.append('index', actualIndex.toString());
        formData.append('chunkTotal', chunkTotal.toString());
        formData.append(
          'chunkSize',
          (actualIndex === chunkTotal ? uploadFile.size - start : chunkSize).toString(),
        );
        formData.append('md5', uploadFile.md5);
        formData.append('fileSize', uploadFile.file!.size.toString());
        formData.append('fileName', uploadFile.file!.name.toString());
        chunks.push({ actualIndex: actualIndex, formData });
      } else {
        console.log('分片${actualIndex}已上传过，跳过上传');
      }
      if (chunks.length === reqNumber || actualIndex === chunkTotal) {
        let res: SERVE.Response<any>[] = [];
        try {
          res = await Promise.all(
            chunks.map((item) => {
              return BIG_FILE_UPLOAD_ASYNC(item.formData);
            }),
          );
          if (res.every((item) => item.code !== 200)) {
            hasError = true;
          } else {
            updateUploadFile((uf) => {
              uf.chunkList.splice(uf.chunkList.length - 1, 0, ...chunks.map((c) => c.actualIndex));
              uf.uploadPercentage = computePercentage(uf.chunkList.length, chunkTotal);
            });
            if (actualIndex === chunkTotal) {
              if (!(await updateUploadStatus(uploadFile.md5))) {
              } else {
                hasError = true;
              }
            }
          }
        } catch (err) {
          hasError = true;
        } finally {
          chunks = [];
        }
      }
      if (hasError) {
        updateUploadFile((uf) => {
          uf.status = 'error';
        });
        break;
      }
    }
  };

  /** 上传文件 */
  const handleUpload = async () => {
    if (uploadFile.needUpload) {
      const chunkSize = CHUNK_SIZE * 1024 * 1024; //10MB
      const chunkTotal = Math.ceil(uploadFile.size / chunkSize);
      await uploadChunkAsync({
        chunkSize: chunkSize,
        chunkTotal: chunkTotal,
        reqNumber: 3,
      });
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    maxCount: 1,
    listType: 'text',
    showUploadList: false,
    beforeUpload: beforeUpload,
    customRequest: handleUpload,
    multiple: false,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${percent}%`,
    },
  };

  const deleteFile = () => {
    isStopUpload.current = true;
    updateUploadFile((uf) => {
      for (const k in initValue) {
        uf[k] = initValue[k];
      }
    });
  };

  return (
    <div className={styles.container}>
      <Upload
        {...uploadProps}
        disabled={['parsing', 'uploading', 'padding', 'error'].includes(uploadFile.status)}
      >
        <div className={styles.upload}>
          {uploadFile.status === 'waiting' && (
            <Button icon={<CloudUploadOutlined />} size="middle" type="primary">
              点击上传固件
            </Button>
          )}
          {uploadFile.status === 'parsing' && (
            // <Progress
            //   strokeColor={{
            //     from: '#108ee9',
            //     to: '#87d068',
            //   }}
            //   percent={uploadFile.parsePercentage}
            //   status="active"
            //   format={(percent) => `正在解析 ${percent}%`}
            // />
            <div className={styles.parsing}>正在解析文件 {uploadFile.parsePercentage}%</div>
          )}
          {uploadFile.status === 'uploading' && (
            <div className={styles.uploading}>
              {/* <Progress
                strokeColor={{
                  from: '#108ee9',
                  to: '#87d068',
                }}
                percent={uploadFile.uploadPercentage}
                status="active"
                format={(percent) => `正在上传 ${percent}%`}
              /> */}
              正在上传 {uploadFile.uploadPercentage}%
            </div>
          )}
          {(uploadFile.status === 'success' || uploadFile.status === 'error') && (
            <div
              onMouseOver={() => void setReUpload(true)}
              onMouseLeave={() => void setReUpload(false)}
              title={
                reUpload
                  ? uploadFile.status === 'error'
                    ? '上传失败，请重试'
                    : '点击重新上传固件'
                  : uploadFile.name
              }
              className={classNames(styles.success, {
                [styles.error]: uploadFile.status === 'error',
              })}
            >
              {uploadFile.status === 'error' ? '上传失败，请重试' : uploadFile.name}
            </div>
          )}
        </div>
      </Upload>
      {uploadFile.status === 'error' && (
        <Button
          type="link"
          onClick={async () => {
            flushSync(async () => {
              await updateUploadStatus(uploadFile.md5);
            });
            await handleUpload();
          }}
          size="small"
          title="重试"
          icon={<RedoOutlined />}
        />
      )}
      {uploadFile.status !== 'waiting' && (
        <>
          {uploadFile.status !== 'parsing' && (
            <Popconfirm
              title={
                uploadFile.status === 'uploading' ? '文件还未上传完成，确认删除？' : '确认删除？'
              }
              onConfirm={() => deleteFile()}
              okText={'确定'}
              cancelText={'取消'}
            >
              <Button type="link" size="small" title="删除" icon={<CloseCircleOutlined />} />
            </Popconfirm>
          )}
        </>
      )}
    </div>
  );
};

export default AdvancedUpload;
