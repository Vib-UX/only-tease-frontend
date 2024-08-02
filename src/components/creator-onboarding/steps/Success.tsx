import useGlobalStore from '@/hooks/store/useGlobalStore';
import React from 'react';

const Success = () => {
  const { userInfo } = useGlobalStore();
  return (
    <div className='pt-5 text-center'>
      {`Thank you ${userInfo.firstName + ' ' + userInfo.lastName}  `}
      <div>
        Your application has been successfully submitted. Our team will get in
        touch with you soon.
      </div>
    </div>
  );
};

export default Success;
