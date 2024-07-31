import Button from '@/components/buttons/Button';
import KycVerification from '@/components/creator-onboarding/steps/kycVerification';

import Success from '@/components/creator-onboarding/steps/Success';
import UploadDocuments from '@/components/creator-onboarding/steps/uploadDocuments';
import { AnimatePresence, motion } from 'framer-motion';
import UploadProfile from '@/components/creator-onboarding/steps/uploadProfile';
import UserInfo from '@/components/creator-onboarding/steps/userInfo';

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useState } from 'react';
import useGlobalStore from '@/hooks/store/useGlobalStore';
import toast from 'react-hot-toast';
import { toastStyles } from '@/lib/utils';
import { onBoadingValidtion } from '@/lib/helper';

const CreatorOnboarding = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [currentState, setCurrentState] = useState(0);
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  const { userInfo } = useGlobalStore();

  const handleRegisterUser = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        setCurrentState(4);
      } else {
        return toast.error('Something went wrong', toastStyles);
      }
    } catch (error) {
      return toast.error('Something went wrong', toastStyles);
    }
  };

  return (
    <div className='flex items-start   justify-start gap-2 text-[#625B71] pl-7  flex-wrap max-w-[100%]'>
      <Button
        onClick={open}
        className={
          'rounded-lg bg-[#FA78FF] bg-opacity-30 hover:bg-opacity-60 transition-all px-3 py-2'
        }
      >
        Become a creator
      </Button>
      <Transition appear show={isOpen}>
        <Dialog
          open={isOpen}
          as='div'
          className='relative z-10 focus:outline-none'
          onClose={close}
        >
          <div className='fixed inset-0 z-100 bg-black bg-opacity-80 w-screen overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4'>
              <TransitionChild
                enter='ease-out duration-300'
                enterFrom='opacity-0 transform-[scale(95%)]'
                enterTo='opacity-100 transform-[scale(100%)]'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 transform-[scale(100%)]'
                leaveTo='opacity-0 transform-[scale(95%)]'
              >
                <DialogPanel className='w-full max-w-md rounded-xl bg-card_bg bg-white p-6 border border-[#CAC4D0]'>
                  <DialogTitle
                    as='h3'
                    className='text-base/7 font-medium text-[#272C8A]'
                  >
                    Become a creator 🎉
                  </DialogTitle>
                  {currentState === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <UserInfo />
                    </motion.div>
                  ) : currentState === 1 ? (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <UploadProfile />
                      </motion.div>
                    </AnimatePresence>
                  ) : currentState === 2 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <UploadDocuments />
                    </motion.div>
                  ) : currentState === 3 ? (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <KycVerification />
                      </motion.div>
                    </AnimatePresence>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Success />
                    </motion.div>
                  )}

                  <div className='mt-8 flex items-center justify-center'>
                    <Button
                      onClick={() => {
                        if (currentState === 3) {
                          handleRegisterUser();
                        }
                        if (currentState === 4) {
                          setIsOpen(false);
                        }
                        if (currentState < 3) {
                          setCurrentState(currentState + 1);
                        }
                      }}
                      className='disabled:opacity-50 disabled:cursor-not-allowed'
                      disabled={!onBoadingValidtion({ userInfo, currentState })}
                    >
                      {currentState === 4 ? 'Ok' : 'Continue'}
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CreatorOnboarding;
