import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Upload, message, type UploadProps } from 'antd';
import { computeMd5 } from '../utils';
import { useSafeState } from 'ahooks';
import type { UploadChunkFormData } from '@/services/bigFile';
import { BIG_FILE_CHECKFILE, BIG_FILE_UPLOAD } from '@/services/bigFile';
import { useImmer } from 'use-immer';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import styles from './index.less';
import { useEffect, useRef } from 'react';

type UploadFileProps = {
  name: string;
  size: number;
  /** 文件解析进度（计算MD5） */
  parsePercentage: number;
  /** 文件上传进度 */
  uploadPercentage: number;
  /** 上传速度 */
  uploadSpeed: string;
  /** 已上传的块列表 */
  chunkList: number[];
  file: File | undefined;
  /** 是否暂停上传 */
  uploadingStop: boolean;
  /** 是否需要上传 */
  needUpload: boolean;
  md5: string;
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

/** 分片上传组件
 *
 * 注意：该组件目前只支持单个文件分片上传
 */
const AdvancedUpload: React.FC<Props> = ({ value, onChange }) => {
  const [reUpload, setReUpload] = useSafeState(false);
  const isfirstGetValue = useRef(true);
  const [uploadFile, updateUploadFile] = useImmer<UploadFileProps>({
    name: '',
    size: 0,
    parsePercentage: 0,
    uploadPercentage: 0,
    uploadSpeed: '0 M/s',
    chunkList: [],
    needUpload: true,
    file: undefined,
    uploadingStop: false,
    md5: '',
  });

  useEffect(() => {
    if (value && isfirstGetValue.current) {
      console.log(value);
      isfirstGetValue.current = false;
      updateUploadFile((uf) => {
        uf.name = value.file_name;
        uf.size = value.file_size;
        uf.md5 = value.file_md5;
        uf.needUpload = value.needUpload;
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

  const onParse = ({ percent }: { percent: number }) => {
    updateUploadFile((uf) => {
      uf.parsePercentage = percent;
    });
  };

  const computePercentage = (index: number, total: number) => {
    return parseFloat(Math.round((index / total) * 100).toFixed(2));
  };

  const beforeUpload = async (file: File) => {
    const md5 = await computeMd5(file as File, 10, onParse);
    updateUploadFile((uf) => {
      uf.name = file.name;
      uf.size = file.size;
      uf.parsePercentage = 0;
      uf.uploadPercentage = 0;
      uf.uploadSpeed = '0 M/s';
      uf.chunkList = [];
      uf.needUpload = false;
      uf.file = file;
      uf.uploadingStop = false;
      uf.md5 = md5;
    });
    const {
      code,
      data: { chunkList, isUploaded },
    } = await BIG_FILE_CHECKFILE(md5);
    if (code === 200) {
      if (isUploaded) {
        message.success('文件已秒传！');
        return false;
      } else {
        updateUploadFile((uf) => {
          uf!.chunkList = chunkList;
          uf!.needUpload = true;
        });
        return true;
      }
    } else {
      return Upload.LIST_IGNORE;
    }
  };

  /** 上传分片 */
  const uploadChunk = async (
    index: number,
    chunkSize: number,
    chunkTotal: number,
    onSuccess: UploadRequestOption<any>['onSuccess'],
    onProgress: UploadRequestOption<any>['onProgress'],
  ) => {
    /** 实际的分片序号 */
    const actualIndex = index + 1;
    if (uploadFile.chunkList.includes(actualIndex)) {
      console.log('分片${actualIndex}已上传过，跳过上传');
      const percent = computePercentage(actualIndex, chunkTotal);
      onProgress?.({
        percent,
      });
      updateUploadFile((uf) => {
        uf.uploadPercentage = percent;
      });
      await uploadChunk(index + 1, chunkSize, chunkTotal, onSuccess, onProgress);
    } else {
      const start = index * chunkSize;
      const end = Math.min(uploadFile.size, start + chunkSize);
      const chunk = uploadFile.file!.slice(start, end);
      const formData = new FormData() as UploadChunkFormData;
      formData.append('chunk', chunk);
      formData.append('index', actualIndex.toString());
      formData.append('chunkTotal', chunkTotal.toString());
      formData.append('chunkSize', chunkSize.toString());
      formData.append('md5', uploadFile.md5);
      formData.append('fileSize', uploadFile.file!.size.toString());
      formData.append('fileName', uploadFile.file!.name.toString());
      const { code, msg } = await BIG_FILE_UPLOAD(formData);
      if (code === 200) {
        const percent = computePercentage(actualIndex, chunkTotal);
        onProgress?.({
          percent,
        });
        updateUploadFile((uf) => {
          uf.uploadPercentage = percent;
        });
        if (actualIndex === chunkTotal) {
          onSuccess?.({});
          message.success(msg);
          updateUploadFile((uf) => {
            uf!.needUpload = false;
          });
          return;
        }
        await uploadChunk(index + 1, chunkSize, chunkTotal, onSuccess, onProgress);
      } else {
        message.error('上传失败');
        onChange?.({
          file_name: '',
          file_md5: '',
          needUpload: true,
          file_size: 0,
        });
        return;
      }
    }
  };

  /** 上传文件 */
  const handleUpload = (options: UploadRequestOption<any>) => {
    const { onSuccess, onProgress } = options;
    if (uploadFile.needUpload) {
      const chunkSize = CHUNK_SIZE * 1024 * 1024; //10MB
      const chunkTotal = Math.ceil(uploadFile.size / chunkSize);
      uploadChunk(0, chunkSize, chunkTotal, onSuccess, onProgress);
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
  return (
    <Upload {...uploadProps}>
      <div className={styles.upload}>
        {[0, 100].includes(uploadFile.parsePercentage) ? (
          [0, 100].includes(uploadFile.uploadPercentage) ? (
            uploadFile.needUpload ? (
              <Button icon={<CloudUploadOutlined />} size="middle" type="primary">
                点击上传固件
              </Button>
            ) : (
              <div
                onMouseOver={() => void setReUpload(true)}
                onMouseLeave={() => void setReUpload(false)}
                title={reUpload ? '点击重新上传固件' : uploadFile.name}
                className={styles.success}
              >
                {uploadFile.name}
                {/* {reUpload ? '重新上传固件' : uploadFile.name} */}
              </div>
            )
          ) : (
            <div className={styles.uploading}>正在上传 {uploadFile.uploadPercentage}%</div>
          )
        ) : (
          <div className={styles.parsing}>正在解析文件 {uploadFile.parsePercentage}%</div>
        )}
      </div>
    </Upload>
  );
};

export default AdvancedUpload;
