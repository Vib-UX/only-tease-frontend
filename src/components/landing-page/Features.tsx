'use client';
import React, { useEffect } from 'react';
import LogoText from '../../../public/landingPage/onlytease-text.png';

import Feature1 from '../../../public/landingPage/feature-1.png';
import Feature2 from '../../../public/landingPage/feature-2.png';
import Feature3 from '../../../public/landingPage/feature-3.png';
import Feature4 from '../../../public/landingPage/feature-4.png';
import Image from 'next/image';

const features = [
  {
    title: 'Seamless Top-Up and Withdrawal',
    desc: 'OnlyTease makes it simple for fans and creators to manage their funds with our Crypto OnRamp and OffRamp features.',
    img: Feature1,
  },
  {
    title: 'Hassle-Free Onboarding',
    desc: 'Join OnlyTease effortlessly by signing in with your existing social accounts. Thanks to Web3Auth, theres no need for deep blockchain knowledge. When you log in with your social accounts, we create a Smart Account thats linked to your socials, making your entry into the exciting world of OnlyTease simple and barrier-free.',
    img: Feature2,
  },
  {
    title: 'Never Miss Content from Your favourite Creators!',
    desc: 'OnlyTease makes it easy to stay connected with your favorite creators through Autopay Creator Subscriptions.',
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveState((prevState) => (prevState + 1) % features.length);
    }, 8000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  return (
    <div className='py-28'>
      <div className='flex items-center justify-center text-4xl text-[#4B4B4B] landing-font pb-16'>
        Features of
        <Image src={LogoText} alt='logo-text' className='mt-3 ml-2' />
      </div>
      <div className='flex items-center gap-x-8'>
        <div className='w-fit'>
          {features.map((item, index) => (
            <div
              className={`py-4 w-fit text-black cursor-pointer ${
                activeState === index ? 'bg-[#B4F0FD]' : ''
              }`}
              key={index}
              onClick={() => setActiveState(index)}
            >
              <div className='p-4 rounded-lg'>{item.title}</div>
            </div>
          ))}
        </div>
        <div className='grid grid-cols-3 items-center h-full w-full gap-x-8'>
          <Image
            src={features[activeState].img}
            alt='feature'
            className='w-full h-[300px] rounded-lg col-span-2'
          />
          <div className='bg-[#B4F0FD] rounded-lg p-4 h-full text-black'>
            <h2 className='text-2xl font-bold mb-4'>
              {features[activeState].title}
            </h2>
            <p>{features[activeState].desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
