import Marquee from '@/components/ui/marqueProp';
import { cn } from '@/lib/utils';
import creator1 from '../../../public/landingPage/creators-1.webp';
import creator2 from '../../../public/landingPage/creatos-2.webp';
import Image, { StaticImageData } from 'next/image';
const reviews = [
  {
    icon: creator1,
  },
  {
    icon: creator2,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ icon }: { icon: StaticImageData }) => {
  return (
    <figure
      className={cn(
        'relative  cursor-pointer overflow-hidden rounded-xl border p-4',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className='flex flex-row items-center'>
        <Image className='rounded-xl' alt='creators' src={icon} />
      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className='relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg'>
      <Marquee pauseOnHover className='[--duration:20s]'>
        {firstRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className='[--duration:20s]'>
        {secondRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <div className='pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-background'></div>
      <div className='pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-background'></div>
    </div>
  );
}
