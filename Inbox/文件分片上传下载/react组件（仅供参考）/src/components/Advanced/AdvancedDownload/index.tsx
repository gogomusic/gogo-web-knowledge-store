import { BIG_FILE_IS_COMPOUNDED } from '@/services/bigFile';
import { memo, useCallback } from 'react';

import { useModel } from 'umi';

interface Props {
  firmware: SERVE.FirmwareInfo;
}

const AdvancedDownload: React.FC<Props> = ({ firmware }) => {
  const { pushDownload } = useModel('download-list');
  const handleClick = useCallback(async () => {
    const { code } = await BIG_FILE_IS_COMPOUNDED(firmware.file_md5);
    if (code === 200) {
      pushDownload(
        Object.assign(
          {
            downloadSpeed: '0 M/s',
            downloadPersentage: 0,
            chunkList: [],
          },
          firmware,
        ),
      );
    }
  }, [firmware, pushDownload]);

  return (
    <img
      src="/firmware-download.png"
      alt=""
      title="下载"
      onClick={handleClick}
      // onClick={async () => {
      //   // BIG_FILE_DOWNLOAD(firmware.file_md5, firmware.file_name);
      //   // BIG_FILE_DOWNLOAD({
      //   //   md5: firmware.file_md5,
      //   //   fileName: firmware.file_name,
      //   //   fileId: firmware.id!,
      //   //   fileSize: firmware.file_size,
      //   // });

      // }}
    />
  );
};

export default memo(AdvancedDownload);
