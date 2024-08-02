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
const AvailableOn = [
  { item: 'Apple Store' },
  { item: 'Google Play' },
  { item: 'Browser' },
];
export default function HomePage() {
  return (
    <main className='text-[#AAAAAA] font-bold bg-[#F7F2FA] w-full'>
      <div className='container mx-auto'>
        <div className='h-screen xl:h-full'>
          <div className='flex items-center justify-between  pt-10 pb-5'>
            <Image src={Logo} alt='logo' />

            <Image src={LogoText} alt='logo-text' />
            <Link
              href={'/feed'}
              className='bg-white py-2 px-6 rounded-lg text-black no-underline border border-red-200'
            >
              Open App
            </Link>
          </div>

          <div className='text-4xl flex flex-col items-center justify-center leading-snug relative'>
            Tease with flair,
            <div> Memerise with style!</div>
            <Image
              src={Laptop}
              alt='laptop'
              height={600}
              width={600}
              className='py-2'
            />
            <Image
              src={Mobile}
              alt='mobile'
              className='absolute left-[22%] top-[38%]'
              height={150}
              width={150}
            />
            <div className='text-lg flex items-center flex-col pt-3'>
              <div className=''>Available on</div>
              <div className='pt-3 flex items-center gap-x-4'>
                {AvailableOn.map((elem, index) => {
                  return (
                    <div
                      key={index}
                      className='bg-white py-1 px-6 rounded-lg text-black no-underline border border-red-200'
                    >
                      {elem.item}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <JoinCommunities />
        <CreatorsGlobe />
        <Features />
      </div>
    </main>
  );
}
