import { toastStyles } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { ImSpinner2 } from 'react-icons/im';

interface AnimatedSubscribeButtonProps {
  buttonColor: string;
  buttonTextColor?: string;
  searchValue: string;
  initialText: React.ReactElement | string;
  changeText: React.ReactElement | string;
}

export const AnimatedSubscribeButton: React.FC<
  AnimatedSubscribeButtonProps
> = ({
  buttonColor,
  buttonTextColor,
  changeText,
  initialText,

  searchValue,
}) => {
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState<string>('false');
  const handleSubmit = async (searchValue: string) => {
    try {
      setLoading(true);
      const response = await fetch('api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: searchValue }),
      });

      if (!response.ok) {
        toast.error('Failed to submit email', toastStyles);
      } else {
        setIsSubscribed('true');
      }
      setLoading(false);
    } catch (error) {
      toast.error('Something went wrong', toastStyles);
    }
  };

  return (
    <AnimatePresence mode='wait'>
      {isSubscribed === 'true' ? (
        <motion.button
          className='relative flex w-3/6 items-center justify-center overflow-hidden rounded-md bg-white p-[6px] outline outline-1 outline-black'
          onClick={() => setIsSubscribed('false')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key='action'
            className='relative block h-full w-full font-semibold'
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            style={{ color: buttonColor }}
          >
            {changeText}
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          className='relative flex w-fit  cursor-pointer items-center justify-center rounded-md border-none p-[10px] h-[40px] gap-3'
          style={{
            backgroundColor: buttonColor,
            color: buttonTextColor,
          }}
          onClick={() => {
            if (validateEmail(searchValue)) {
              handleSubmit(searchValue);
            } else {
              setIsSubscribed('error');
            }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <svg
            width='18'
            height='16'
            viewBox='0 0 18 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M1.10557 4.44699C0.428005 4.78577 0 5.4783 0 6.23584V13.9998C0 15.1043 0.89543 15.9998 2 15.9998H16C17.1046 15.9998 18 15.1043 18 13.9998V6.23584C18 5.4783 17.572 4.78577 16.8944 4.44699L9.89443 0.946986C9.33137 0.665458 8.66863 0.665458 8.10557 0.946985L1.10557 4.44699ZM2.58541 8.45395C2.21493 8.26871 1.76442 8.41888 1.57918 8.78936C1.39394 9.15985 1.54411 9.61035 1.91459 9.79559L7.77016 12.7234C8.54436 13.1105 9.45564 13.1105 10.2298 12.7234L16.0823 9.79716C16.4528 9.61191 16.6029 9.16141 16.4177 8.79092C16.2325 8.42044 15.7819 8.27027 15.4115 8.45551L9.55902 11.3817C9.20711 11.5577 8.79289 11.5577 8.44098 11.3817L2.58541 8.45395Z'
              fill='#cccc'
            />
          </svg>
          <motion.span
            key='reaction'
            className='relative  font-semibold flex items-center gap-x-2'
            initial={{ x: 0 }}
            exit={{ x: 50, transition: { duration: 0.1 } }}
          >
            {loading ? 'Subscribing' : initialText}{' '}
            {loading && (
              <ImSpinner2 className='animate-spin' color='#9b91a7' size={20} />
            )}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
