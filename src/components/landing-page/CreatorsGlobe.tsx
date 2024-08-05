import React from 'react';
import Map from '../../../public/landingPage/map.webp';
import Image from 'next/image';
const CreatorsGlobe = () => {
  return (
    <div className='my-32 leading-relaxed font-extrabold flex flex-col items-center justify-center text-2xl text-[#4B4B4B]'>
      Connect with
      <div className='text-5xl'> Creators all around the world</div>
      <Image src={Map} alt='map' className='mt-20' height={900} width={900} />
    </div>
  );
};

export default CreatorsGlobe;
