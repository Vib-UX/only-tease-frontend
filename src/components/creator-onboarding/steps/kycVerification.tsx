import Button from '@/components/buttons/Button';
import useGlobalStore from '@/hooks/store/useGlobalStore';
import React, { useState } from 'react';
import Webcam from 'react-webcam';
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};
const KycVerification = () => {
  const webcamRef = React.useRef<Webcam>(null);
  const { setUserInfo } = useGlobalStore();
  const [imageSrc, setImageSrc] = useState<any>(null);
  const capture = React.useCallback(() => {
    setImageSrc(webcamRef?.current?.getScreenshot());
  }, [webcamRef]);
  return (
    <>
      <label
        htmlFor='cover-photo'
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        Upload a selfie while holding government photo ID*
        <div className='text-[12px] text-gray-500'>
          Your head, sholders and ID must be clearly visible{' '}
        </div>
      </label>
      {imageSrc ? (
        <img src={imageSrc} alt='webcam' />
      ) : (
        <Webcam
          audio={false}
          height={700}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          width={700}
          videoConstraints={videoConstraints}
        />
      )}
      <div className='pt-5 flex items-center justify-between'>
        <Button
          onClick={() => {
            capture();
            setUserInfo({ kycDoc: imageSrc });
          }}
        >
          Capture photo
        </Button>
        <button onClick={() => setImageSrc(null)} className='underline'>
          Retake
        </button>
      </div>
    </>
  );
};

export default KycVerification;
