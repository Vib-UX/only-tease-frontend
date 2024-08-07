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
import { FaApple } from 'react-icons/fa6';
import { FaGooglePlay } from 'react-icons/fa';
import { CiGlobe } from 'react-icons/ci';
const AvailableOn = [
  { item: 'Apple Store', icon: <FaApple size={20} /> },
  { item: 'Google Play', icon: <FaGooglePlay size={20} /> },
  { item: 'Browser', icon: <CiGlobe size={20} /> },
];
export default function HomePage() {
  return (
    <main className='text-[#AAAAAA] font-bold bg-white w-full'>
      <Image src={BgImage} alt='bg' className='absolute h-screen w-full' />
      <div className='container mx-auto relative'>
        <div className='h-full md:h-screen xl:h-full px-5 md:px-0'>
          <div className='flex items-center justify-between  pt-8 pb-5'>
            <Image src={Logo} alt='logo' className='ml-0 md:ml-10' />

            <Image src={LogoText} alt='logo-text' />
            <Link
              href={'/feed'}
              className=' py-1 px-2 md:px-6 rounded-xl text-black no-underline border-gradient bg-white'
            >
              Open App
            </Link>
          </div>

          <div className='pt-2 text-3xl md:text-5xl text-black font-extrabold flex flex-col items-center justify-center leading-tight relative'>
            <div className='pb-0 md:pb-2'>
              <span className='gradient-text'>Tease</span> with flair,
            </div>
            Mesmerize with style!
            <Image
              src={Laptop}
              alt='laptop'
              className='py-4 h-[240px] md:h-[350px] w-fit'
            />
            <video
              width='320'
              height='240'
              muted
              loop
              autoPlay
              className='w-[270px] md:w-[430px] absolute rounded-lg top-[105px] md:top-[134px]'
            >
              <source src='/landingPage/laptop_recoding.mp4' type='video/mp4' />
            </video>
            <Image
              src={Mobile}
              alt='mobile'
              className='absolute left-[7%] md:left-[22%] top-[40%] md:top-[38%] w-fit h-[220px] md:h-[300px]'
            />
            <video
              width='320'
              height='240'
              muted
              loop
              autoPlay
              className='absolute left-[9%] md:left-[22.75%] top-[42%] md:top-[40%] w-fit h-[200px] md:h-[280px] rounded-xl'
            >
              <source
                src='/landingPage/mobile_recording.mp4'
                type='video/mp4'
              />
            </video>
            <div className='text-lg flex items-center flex-col pt-44 md:pt-6'>
              <div className='flex items-center w-full justify-between text-[#aaaaaa] gap-x-4 md:gap-x-0'>
                <div className='pl-0 md:pl-32 text-lg'>Coming soon</div>
                <div className='pr-8'>Try with</div>
              </div>
              <div className='pt-3 flex flex-wrap items-center gap-y-4 md:gap-y-0 gap-x-4'>
                {AvailableOn.map((elem, index) => {
                  return (
                    <Link
                      href={elem.item === 'Browser' ? '/feed' : '#'}
                      key={index}
                      className='flex items-center gap-x-2 py-1 px-6 rounded-lg text-black no-underline border border-red-200'
                    >
                      {elem.icon}
                      {elem.item}
                    </Link>
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
