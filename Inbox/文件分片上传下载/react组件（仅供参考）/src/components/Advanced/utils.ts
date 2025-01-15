import SparkMD5 from 'spark-md5';

/**
 * 计算文件的MD5
 * @param file 文件
 * @param chunkSize 分片大小，单位：MB。默认为10MB
 * @returns {Promise} 文件的md5值
 */
export const computeMd5 = ({
  file,
  _chunkSize = CHUNK_SIZE,
  onParse,
}: {
  file: File;
  _chunkSize: number;
  onParse?: ({ percent }: { percent: number }) => void;
}): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const chunkSize = _chunkSize * 1024 * 1024;
    const blobSlice = File.prototype.slice;
    const chunkTotal = Math.ceil(file.size / chunkSize);
    const fileReader = new FileReader();
    const spark = new SparkMD5.ArrayBuffer();
    let currentChunk = 0;
    const loadNext = () => {
      const start = currentChunk * chunkSize,
        end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    };
    fileReader.onload = (e) => {
      spark.append(e.target?.result as ArrayBuffer);
      currentChunk++;
      onParse?.({ percent: Math.round((currentChunk / chunkTotal) * 100) });
      if (currentChunk < chunkTotal) {
        loadNext();
      } else {
        resolve(spark.end());
      }
    };
    fileReader.onerror = (e) => void reject(e);
    loadNext();
  });
};

// 单位换算
export const formatSize = (sz: number) => {
  let unit: any = 'B';
  let size = sz;
  const units = ['B', 'K', 'M', 'G'];
  while ((unit = units.shift()) && size > 1024) {
    size = size / 1024;
  }
  return (unit === 'B' ? size : size.toFixed(2)) + unit;
};
