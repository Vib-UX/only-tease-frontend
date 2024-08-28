'use client';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import React, { useEffect } from 'react';

import Feature1 from '../../../public/landingPage/feature-1.png';
import Feature2 from '../../../public/landingPage/feature-2.png';
import Feature3 from '../../../public/landingPage/feature-3.png';
import Feature4 from '../../../public/landingPage/feature-4.png';

const features = [
  {
    title: 'Seamless Top-Up and Withdrawal',
    desc: '💘 OnlyTease 💌 makes it simple for fans and creators to manage their funds with our Crypto OnRamp and OffRamp features.',
    img: Feature1,
  },
  {
    title: 'Hassle-Free Onboarding',
    desc: 'Join 💘 OnlyTease 💌 effortlessly by signing in with your existing social accounts. When you log in with your social accounts, we create a Smart Account thats linked to your socials, making your entry into the exciting world of 💘 OnlyTease 💌 simple and barrier-free.',
    img: Feature2,
  },
  {
    title: 'Never Miss Content from Your favourite Creators!',
    desc: '💘 OnlyTease 💌 makes it easy to stay connected with your favorite creators through Autopay Creator Subscriptions.',
    img: Feature3,
  },
  {
    title: 'Real-Time Insights into Your Payments',
    desc: 'Our Live Payment Tracking dashboard offers real-time transaction insights. Track payments, tips, and subscriptions instantly for full transparency and control.',
    img: Feature4,
  },
];

const Features = () => {
  const [activeState, setActiveState] = React.useState(0);
  const [progressBar, setProgressBar] = React.useState(0);

  useEffect(() => {
    const progressBarInterval = setInterval(() => {
      setProgressBar((prevProgressBar) => {
        if (prevProgressBar <= 100) {
          return prevProgressBar + 1;
        } else {
          return 0;
        }
      });
    }, 80);

    // Progresser timeout
    const timer = setTimeout(() => {
      setActiveState((prevProgresser) =>
        prevProgresser === 3 ? 0 : prevProgresser + 1
      );
      setProgressBar(0);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressBarInterval);
    };
  }, [activeState]);
  return (
    <div className='py-28 px-5 md:px-0'>
      <div className='flex items-center justify-center text-3xl md:text-4xl text-[#4B4B4B] landing-font pb-16'>
        Features of  OnlyTease
      </div>
      <div className='flex justify-center gap-2 items-center mx-20 '>
        <div className='w-fit'>
          {features.map((item, index) => (
            <div
              className={`py-2 w-full text-black cursor-pointer ${activeState === index ? 'radial-gradient-bg rounded-lg' : ''
                }`}
              key={index}
              onClick={() => setActiveState(index)}
            >
              <div className='p-4 rounded-lg  items-center flex justify-between'>
                {item.title}{' '}
                {index === activeState && (
                  <CircularProgress
                    variant='determinate'
                    value={progressBar}
                    sx={{
                      color: '#ffffffde',
                    }}
                    size={22}
                    className=''
                    thickness={6}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className='w-[30%] flex items-center justify-center p-5'>
          <Image
            src={features[activeState].img}
            alt='feature'
            className='w-full h-[300px] rounded-lg hidden md:block'
          />
        </div>
        <div className='radial-gradient-bg-card rounded-lg p-4 h-full text-black w-[300px]'>
          <h2 className='text-2xl font-bold mb-4'>
            {features[activeState].title}
          </h2>
          <p>{features[activeState].desc}</p>
        </div>

      </div>
    </div>
  );
};

export default Features;
