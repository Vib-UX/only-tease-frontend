import '@/lib/env';
import { Link } from '@mui/material';
import Image from 'next/image';
import Logo from '../../public/landingPage/onlytease-logo.png';
import LogoText from '../../public/landingPage/onlytease-text.png';
import Laptop from '../../public/landingPage/laptop.webp';
import Mobile from '../../public/landingPage/mobile.png';
import JoinCommunities from '@/components/landing-page/JoinCommunities';
import CreatorsGlobe from '@/components/landing-page/CreatorsGlobe';
import Features from '@/components/landing-page/Features';
import BgImage from '../../public/landingPage/bg-image.webp';
const AvailableOn = [
  { item: 'Apple Store' },
  { item: 'Google Play' },
  { item: 'Browser' },
];
export default function HomePage() {
  return (
    <main className='text-[#AAAAAA] font-bold bg-white w-full'>
      <Image src={BgImage} alt='bg' className='absolute h-screen w-full' />
      <div className='container mx-auto relative'>
        <div className='h-screen xl:h-full'>
          <div className='flex items-center justify-between  pt-8 pb-5'>
            <Image src={Logo} alt='logo' className='ml-10' />

            <Image src={LogoText} alt='logo-text' />
            <Link
              href={'/feed'}
              className=' py-1 px-6 rounded-lg text-black no-underline border-gradient'
            >
              Open App
            </Link>
          </div>

          <div className='pt-2 text-5xl text-black font-extrabold flex flex-col items-center justify-center leading-tight relative'>
            <div> Tease with flair,</div>
            Memerise with style!
            <Image src={Laptop} alt='laptop' className='py-4 h-[350px] w-fit' />
            <Image
              src={Mobile}
              alt='mobile'
              className='absolute left-[22%] top-[38%] w-fit h-[300px]'
            />
            <div className='text-lg flex items-center flex-col pt-3'>
              <div className=''>Available on</div>
              <div className='pt-3 flex items-center gap-x-4'>
                {AvailableOn.map((elem, index) => {
                  return (
                    <div
                      key={index}
                      className=' py-1 px-6 rounded-lg text-black no-underline border border-red-200'
                    >
                      {elem.item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Features />
      </div>
      <JoinCommunities />
      <CreatorsGlobe />
    </main>
  );
}
