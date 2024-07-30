import useGlobalStore from '@/hooks/store/useGlobalStore';
import React from 'react';

const Success = () => {
  const { userInfo } = useGlobalStore();
  return (
    <div className='pt-5 text-center'>
      {`Thank you ${userInfo.firstName + ' ' + userInfo.lastName}  `}
      <div>Your application was successfully submitted</div>
    </div>
  );
};

export default Success;
