import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import creator1 from '../../../public/landingPage/creators-1.webp';
import creator2 from '../../../public/landingPage/creatos-2.webp';
const JoinCommunities = () => {
  return (
    <div className='py-20'>
      <div className='bg-white p-5 rounded-xl text-center text-black text-2xl'>
        <div className='pb-5'> Join the Community and begin Earning</div>
        <Link
          href={'/feed'}
          className='bg-white py-1 px-3 rounded-lg text-black no-underline border border-red-200'
        >
          Open App
        </Link>
        <Image src={creator1} alt='creators' className='pt-10 opacity-70' />
        <Image src={creator2} alt='creators-2' className='pt-5' />
      </div>
    </div>
  );
};

export default JoinCommunities;
