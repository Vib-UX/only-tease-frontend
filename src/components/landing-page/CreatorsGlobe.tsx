import React from 'react';
import Map from '../../../public/landingPage/map.webp';
import Image from 'next/image';
const CreatorsGlobe = () => {
  return (
    <div className='flex flex-col items-center justify-center text-2xl text-black'>
      Connect with
      <div className='text-4xl'> Creators all around the world</div>
      <Image src={Map} alt='map' className='mt-20' height={900} width={900} />
    </div>
  );
};

export default CreatorsGlobe;
