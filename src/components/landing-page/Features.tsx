'use client';
import React from 'react';
import LogoText from '../../../public/landingPage/onlytease-text.png';
import Hasselfree from '../../../public/landingPage/hasselfree.png';
import Image from 'next/image';
const features = [
  {
    title: 'Seamless Top-Up and Withdrawal',
    img: Hasselfree,
  },
  {
    title: 'Hassle-Free Onboarding',
    img: Hasselfree,
  },
  {
    title: 'Never Miss Content from Your favourite Creators! ',
    img: Hasselfree,
  },
  {
    title: 'Real-Time Insights into Your Payments',
    img: Hasselfree,
  },
];
const Features = () => {
  const [activeState, setActiveState] = React.useState(0);
  return (
    <div className='flex flex-col items-center justify-center text-2xl text-black py-20'>
      <div className='flex items-center pb-10'>
        Features of <Image src={LogoText} alt='logo-text' />
      </div>

      {features.map((item, index) => (
        <div className='grid grid-cols-3 w-full py-3'>
          <div key={index} onClick={() => setActiveState(1)} className='h-fit'>
            {item.title}
          </div>
          {activeState === index && <Image src={item.img} alt='images' />}
        </div>
      ))}
    </div>
  );
};

export default Features;
