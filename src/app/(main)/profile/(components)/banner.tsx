'use client';
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";
import Image from 'next/image';
import { useState } from 'react';



type props = {

  slug: string;
  name: string;
  icon: any;
  image: any;
  value: number;
  views: number;
  likes: number;
  location: string;
  posts: number,
  AboutMe: string



}

const ModelBanner = ({ name, icon, AboutMe, image, views, posts }: props) => {

  const [redeMore, setReadMore] = useState(false)
  const [hover, setHover] = useState(false);
  return (
    <div className='w-full  '>
      <div className=' flex flex-col justify-end items-end'>
        <div className='relative w-full'>
          <Image
            src={image}
            alt='banner image'
            className='object-cover h-[200px] rounded-xl  '
          />

          <Image
            className='absolute object-cover rounded-lg border-white border w-20 h-24 shrink-0 sm:w-28 sm:h-32 top-[70%]    '
            src={icon}
            alt='banner image'
          />
        </div>

        <div className='flex w-[75%]  xl:w-[80%] justify-between items-center  '>
          <div className='flex font-bold text-[10px] xl:text-lg flex-col items-start justify-center '>
            <span className=' flex items-center text-[#1D1B20] ml-10 mt-3'>{name}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>

            </span>
            <span className='ml-10 text-[#79747E]'>@{name.split(" ")[0]}.Tease</span>
          </div>
          <div className='flex gap-5 text-[10px] xl:text-lg text-[#A39FA5] items-center justify-center'>
            <div>
              <span className="text-[#49454F] font-semibold">Posts</span>
              <span className='flex items-center justify-center text-[#49454F]  gap-1'>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.295 20.4063H2.26182C1.70436 20.4063 1.22726 20.2075 0.830509 19.8099C0.43376 19.4123 0.234968 18.9356 0.234131 18.3798V2.34543C0.234131 1.78798 0.432923 1.31088 0.830509 0.914127C1.22809 0.517379 1.7052 0.318586 2.26182 0.317749H18.295C18.8524 0.317749 19.3295 0.516542 19.7263 0.914127C20.123 1.31171 20.3218 1.78881 20.3226 2.34543V18.3786C20.3226 18.936 20.1239 19.4131 19.7263 19.8099C19.3287 20.2066 18.8516 20.4054 18.295 20.4063ZM18.1016 16.2053H2.45517V18.474H18.1016V16.2053ZM2.45517 15.0941H18.1016V12.8241H2.45517V15.0941ZM2.45517 11.4242H18.1016V2.54004H2.45517V11.4242Z" fill="#49454F" />
                </svg>
                {posts}
              </span>
            </div>
            <div className=' border-l border-r  px-2 '>
              <span className="text-[#49454F] font-semibold">Views</span>
              <span className='flex items-center text-[#49454F]  justify-center gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                {views}K
              </span>
            </div>
            <div>
              <span className="text-[#49454F] font-semibold">Tease</span>
              <span className='flex items-center text-[#49454F]  justify-center gap-1'>
                <svg className='w-4 h-4' viewBox="0 0 29 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.59901 17.6116C2.25123 18.2415 2.95961 18.8155 3.71604 19.327C3.91455 19.4635 4.17672 19.4797 4.39181 19.3687C4.60689 19.2577 4.73736 19.0388 4.72808 18.8046C4.55306 14.947 4.90017 3.02643 15.5352 0.0234903C15.743 -0.0349206 15.9674 0.0173659 16.1242 0.160692C16.281 0.304018 16.3463 0.51666 16.2956 0.718671C13.5438 11.8994 20.4363 15.3139 23.5687 10.0369C23.6699 9.86162 23.8595 9.75006 24.0682 9.7429C24.2769 9.73575 24.4742 9.83404 24.5883 10.0019C27.3254 14.0605 26.6031 17.6919 25.8687 19.5874C25.7473 19.9107 25.8467 20.2724 26.1183 20.4963C26.3899 20.7203 26.7775 20.7599 27.0922 20.596C27.5548 20.352 27.9806 20.0486 28.358 19.6943C28.4524 19.6078 28.5914 19.5834 28.7116 19.6322C28.8319 19.6809 28.9104 19.7936 28.9115 19.9189V19.927C28.9145 27.4061 22.7392 33.5412 14.9505 33.7972C7.16182 34.0532 0.563646 28.3379 0.0334209 20.8761C-0.0320938 19.9482 -0.00123588 19.0163 0.125539 18.0942C0.167262 17.779 0.39238 17.5142 0.705695 17.4117C1.01901 17.3092 1.3658 17.3869 1.59942 17.612L1.59901 17.6116Z" fill="#49454F" />
                </svg>

                10K
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between mt-1'>
        <p className='text-[#1D1B20] font-semibold my-6'>Last seen 15 mins ago</p>
        <IconButton className="flex gap-2 text-lg rounded-md pt-1">
          <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.8333 15.5C10.2315 15.5 9.71991 15.2812 9.29861 14.8438C8.87731 14.4062 8.66667 13.875 8.66667 13.25C8.66667 13.1625 8.67268 13.0717 8.68472 12.9777C8.69676 12.8837 8.71482 12.7995 8.73889 12.725L3.64722 9.65C3.44259 9.8375 3.21389 9.9845 2.96111 10.091C2.70833 10.1975 2.44352 10.2505 2.16667 10.25C1.56481 10.25 1.05324 10.0312 0.631944 9.59375C0.210648 9.15625 0 8.625 0 8C0 7.375 0.210648 6.84375 0.631944 6.40625C1.05324 5.96875 1.56481 5.75 2.16667 5.75C2.44352 5.75 2.70833 5.80325 2.96111 5.90975C3.21389 6.01625 3.44259 6.163 3.64722 6.35L8.73889 3.275C8.71482 3.2 8.69676 3.11575 8.68472 3.02225C8.67268 2.92875 8.66667 2.838 8.66667 2.75C8.66667 2.125 8.87731 1.59375 9.29861 1.15625C9.71991 0.71875 10.2315 0.5 10.8333 0.5C11.4352 0.5 11.9468 0.71875 12.3681 1.15625C12.7894 1.59375 13 2.125 13 2.75C13 3.375 12.7894 3.90625 12.3681 4.34375C11.9468 4.78125 11.4352 5 10.8333 5C10.5565 5 10.2917 4.947 10.0389 4.841C9.78611 4.735 9.55741 4.588 9.35278 4.4L4.26111 7.475C4.28518 7.55 4.30324 7.6345 4.31528 7.7285C4.32731 7.8225 4.33333 7.913 4.33333 8C4.33333 8.087 4.32731 8.17775 4.31528 8.27225C4.30324 8.36675 4.28518 8.451 4.26111 8.525L9.35278 11.6C9.55741 11.4125 9.78611 11.2657 10.0389 11.1597C10.2917 11.0537 10.5565 11.0005 10.8333 11C11.4352 11 11.9468 11.2188 12.3681 11.6562C12.7894 12.0938 13 12.625 13 13.25C13 13.875 12.7894 14.4062 12.3681 14.8438C11.9468 15.2812 11.4352 15.5 10.8333 15.5Z" fill="#49454F" />
          </svg>
          Share
        </IconButton>
        {/* <ShareButton /> */}
        <div className=' flex items-center text-slate-400  justify-center  gap-4 '>
          <div
            className='group relative'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <svg width="41" height="23" viewBox="0 0 51 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.988 1.00434C19.2956 0.823166 16.8479 6.36398 16.4606 9.15703C14.8339 7.11888 10.2329 4.17491 4.84177 8.70419C-0.549353 13.2335 1.35613 19.197 2.98276 21.6126C6.39094 25.3115 15.9958 32.5735 27.1499 32.0299C38.3039 31.4864 46.2047 24.8586 48.7608 21.6126C50.2325 19.6499 52.0606 14.5922 47.5989 10.063C43.1373 5.5337 37.5293 7.26992 35.283 8.70419C34.9732 6.21306 32.6804 1.18551 25.988 1.00434Z" fill="#49454F" stroke="#49454F" stroke-width="0.941176" />
              <path d="M19.2491 20.2539C19.2491 21.5046 18.2087 22.5185 16.9253 22.5185C15.6419 22.5185 14.6016 21.5046 14.6016 20.2539C14.6016 19.0032 15.6419 17.9892 16.9253 17.9892C18.2087 17.9892 19.2491 19.0032 19.2491 20.2539Z" fill="white" />
              <ellipse cx="31.3327" cy="20.2539" rx="2.32376" ry="2.26464" fill="white" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.0169 18.3557C15.8836 18.3557 14.5427 20.7548 14.2662 21.9677C14.1933 22.2874 13.8683 22.4889 13.5403 22.4179C13.2123 22.3469 13.0054 22.0301 13.0783 21.7105C13.4214 20.2058 15.0859 17.1698 19.0169 17.1698C20.965 17.1698 22.3115 17.928 23.1821 18.9019C24.0345 19.8555 24.4125 20.9932 24.5015 21.7736L23.2921 21.9046C23.2262 21.3262 22.9303 20.4257 22.2645 19.6808C21.6169 18.9563 20.6009 18.3557 19.0169 18.3557Z" fill="white" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M32.959 18.1291C29.8258 18.1291 28.4849 20.5282 28.2083 21.7411C28.1354 22.0608 27.8104 22.2624 27.4824 22.1913C27.1544 22.1203 26.9476 21.8035 27.0205 21.4839C27.3636 19.9792 29.0281 16.9432 32.959 16.9432C34.9072 16.9432 36.2537 17.7014 37.1242 18.6753C37.9766 19.629 38.3546 20.7666 38.4436 21.547L37.2343 21.678C37.1683 21.0996 36.8725 20.1991 36.2067 19.4543C35.559 18.7297 34.543 18.1291 32.959 18.1291Z" fill="white" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.0936 26.0018C27.614 26.0018 28.2765 24.8201 28.4145 24.2037C28.4861 23.8838 28.8103 23.681 29.1386 23.7508C29.4669 23.8206 29.6749 24.1366 29.6033 24.4565C29.4033 25.3499 28.4265 27.1877 26.0936 27.1877C24.9441 27.1877 24.1337 26.7281 23.6096 26.1309C23.1037 25.5545 22.8804 24.8707 22.8271 24.3944L24.0367 24.2658C24.0679 24.5445 24.2121 24.993 24.5343 25.3601C24.8384 25.7066 25.3166 26.0018 26.0936 26.0018Z" fill="white" />
            </svg>
            {hover && (
              <motion.div
                className=' absolute  px-2 bg-gradient-to-br rounded-md from-[#020202] form-[100%] via-[#1f0b29] via-[50%] to-[#110418] to-[100%]  top-0 -translate-y-1/2 left-0 -translate-x-1/2  text-[8px]  text-center group-hover:block hidden '
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 40, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'linear' }}
              >
                {name.split(' ')[0]}.xyz
              </motion.div>
            )}
          </div>
          <div
            className='group relative'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <svg width="25" height="22" viewBox="0 0 35 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33.1093 28.4312V29.5901C33.2584 29.5731 33.4092 29.5889 33.5522 29.6364C33.6951 29.6839 33.827 29.7621 33.9393 29.866C34.0517 29.9699 34.1421 30.0972 34.2047 30.2398C34.2673 30.3824 34.3008 30.537 34.303 30.6939V32H22.9971V30.6916C22.9996 30.5347 23.0333 30.3801 23.0962 30.2376C23.1591 30.0952 23.2497 29.968 23.3623 29.8643C23.4749 29.7606 23.6069 29.6827 23.75 29.6355C23.893 29.5882 24.0439 29.5728 24.193 29.5901V28.4312C24.193 27.9253 24.5293 27.5068 24.98 27.378L24.958 17.3429C24.6107 13.3487 21.3528 10.219 17.3893 10.219C13.4257 10.219 10.1679 13.3487 9.82053 17.3429L9.79855 27.3642C10.2998 27.4608 10.968 27.8425 10.9856 28.4312V29.5901C11.1347 29.5731 11.2856 29.5889 11.4285 29.6364C11.5714 29.6839 11.7033 29.7621 11.8157 29.866C11.928 29.9699 12.0184 30.0972 12.081 30.2398C12.1437 30.3824 12.1771 30.537 12.1793 30.6939V32H0.873459V30.6916C0.87594 30.5349 0.909632 30.3805 0.972383 30.2382C1.03513 30.0959 1.12557 29.9689 1.2379 29.8653C1.35023 29.7616 1.482 29.6836 1.62478 29.6362C1.76756 29.5888 1.91822 29.5731 2.06713 29.5901V28.4312C2.06713 27.8494 2.50899 27.3872 3.06516 27.3458V9.19115H1.988L0.647034 4.52084H6.45274V0H28.3258V4.52084H34.5294L33.1884 9.18885H32.1113V27.3458C32.6652 27.3849 33.1093 27.8517 33.1093 28.4312Z" fill="#49454F" />
            </svg>
            {hover && (
              <motion.div
                className=' absolute  px-2 bg-gradient-to-br rounded-md from-[#020202] form-[100%] via-[#1f0b29] via-[50%] to-[#110418] to-[100%]  top-0 -translate-y-1/2 -left-2 -translate-x-1/2  text-[8px]  text-center group-hover:block hidden  '
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 40, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'linear' }}
              >
                {name.split(' ')[0]}.far
              </motion.div>
            )}
          </div>
          <div
            className='group relative'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <svg width="23" height="22" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.4095 0C20.2094 0.00479989 21.1229 0.0143997 21.9117 0.0367991L22.2221 0.0479988C22.5805 0.0607985 22.934 0.0767981 23.3612 0.0959977C25.0635 0.175996 26.2251 0.44479 27.2442 0.839981C28.3002 1.24637 29.1897 1.79676 30.0793 2.68474C30.8928 3.48455 31.5223 4.45204 31.924 5.51987C32.3192 6.53905 32.5879 7.70062 32.6679 9.40458C32.6871 9.83017 32.7031 10.1838 32.7159 10.5438L32.7255 10.8541C32.7495 11.6413 32.7591 12.5549 32.7623 14.3549L32.7639 15.5484V17.6444C32.7679 18.8114 32.7556 19.9784 32.7271 21.1451L32.7175 21.4555C32.7047 21.8155 32.6887 22.1691 32.6695 22.5947C32.5895 24.2986 32.3176 25.4586 31.924 26.4794C31.5235 27.5478 30.8938 28.5155 30.0793 29.3145C29.2793 30.1278 28.3119 30.7573 27.2442 31.1593C26.2251 31.5545 25.0635 31.8233 23.3612 31.9033C22.9816 31.9211 22.6019 31.9371 22.2221 31.9513L21.9117 31.9609C21.1229 31.9833 20.2094 31.9945 18.4095 31.9977L17.2159 31.9993H15.1216C13.9541 32.0033 12.7866 31.991 11.6194 31.9625L11.309 31.9529C10.9292 31.9385 10.5495 31.9219 10.1699 31.9033C8.46758 31.8233 7.30604 31.5545 6.28529 31.1593C5.21761 30.7583 4.25054 30.1287 3.45183 29.3145C2.63755 28.515 2.00747 27.5475 1.60553 26.4794C1.21035 25.4602 0.941562 24.2986 0.861567 22.5947C0.843742 22.215 0.827742 21.8353 0.813569 21.4555L0.80557 21.1451C0.776086 19.9784 0.762752 18.8114 0.765572 17.6444V14.3549C0.761106 13.1879 0.77284 12.0208 0.80077 10.8541L0.811969 10.5438C0.824769 10.1838 0.840768 9.83017 0.859967 9.40458C0.939963 7.70062 1.20875 6.54065 1.60393 5.51987C2.00569 4.45094 2.63703 3.48316 3.45343 2.68474C4.25194 1.87111 5.21837 1.24155 6.28529 0.839981C7.30604 0.44479 8.46598 0.175996 10.1699 0.0959977C10.5955 0.0767981 10.9507 0.0607985 11.309 0.0479988L11.6194 0.038399C12.7861 0.0099721 13.953 -0.00229546 15.12 0.00159985L18.4095 0ZM16.7648 7.99981C14.6431 7.99981 12.6084 8.84265 11.1082 10.3429C9.60797 11.8432 8.76516 13.8779 8.76516 15.9996C8.76516 18.1213 9.60797 20.1561 11.1082 21.6563C12.6084 23.1566 14.6431 23.9994 16.7648 23.9994C18.8864 23.9994 20.9211 23.1566 22.4213 21.6563C23.9215 20.1561 24.7643 18.1213 24.7643 15.9996C24.7643 13.8779 23.9215 11.8432 22.4213 10.3429C20.9211 8.84265 18.8864 7.99981 16.7648 7.99981ZM16.7648 11.1997C17.3951 11.1996 18.0192 11.3237 18.6016 11.5648C19.184 11.8059 19.7132 12.1594 20.1589 12.605C20.6047 13.0507 20.9583 13.5797 21.1996 14.1621C21.4409 14.7444 21.5652 15.3685 21.5653 15.9988C21.5654 16.6292 21.4414 17.2533 21.2003 17.8357C20.9591 18.4181 20.6057 18.9473 20.1601 19.3931C19.7144 19.8389 19.1854 20.1925 18.6031 20.4338C18.0208 20.6752 17.3967 20.7994 16.7664 20.7995C15.4934 20.7995 14.2725 20.2938 13.3724 19.3937C12.4723 18.4935 11.9666 17.2726 11.9666 15.9996C11.9666 14.7266 12.4723 13.5057 13.3724 12.6056C14.2725 11.7054 15.4934 11.1997 16.7664 11.1997M25.1659 5.59987C24.6355 5.59987 24.1268 5.81058 23.7518 6.18564C23.3767 6.56071 23.166 7.0694 23.166 7.59982C23.166 8.13024 23.3767 8.63894 23.7518 9.014C24.1268 9.38907 24.6355 9.59978 25.1659 9.59978C25.6963 9.59978 26.205 9.38907 26.5801 9.014C26.9551 8.63894 27.1658 8.13024 27.1658 7.59982C27.1658 7.0694 26.9551 6.56071 26.5801 6.18564C26.205 5.81058 25.6963 5.59987 25.1659 5.59987Z" fill="#49454F" />
            </svg>
            {hover && (
              <motion.div
                className=' absolute  px-2 bg-gradient-to-br rounded-md from-[#020202] form-[100%] via-[#1f0b29] via-[50%] to-[#110418] to-[100%]  top-0 -translate-y-1/2  -left-2 -translate-x-1/2  text-[9px]  text-center group-hover:block hidden  '
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 40, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'linear' }}
              >
                {name.split(' ')[0]}.in
              </motion.div>
            )}
          </div>
          <div
            className='group relative'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M32.0001 32L19.4861 13.3498L19.5074 13.3673L30.7907 0H27.0201L17.8285 10.88L10.5292 0H0.640396L12.3234 17.4124L12.322 17.4109L0.00012207 32H3.77068L13.9896 19.8953L22.1113 32H32.0001ZM9.03523 2.90908L26.5933 29.0909H23.6053L6.03306 2.90908H9.03523Z" fill="#49454F" />
            </svg>
            {hover && (
              <motion.div
                className=' absolute  px-2 bg-gradient-to-br rounded-md from-[#020202] form-[100%] via-[#1f0b29] via-[50%] to-[#110418] to-[100%]  top-0 -translate-y-1/2 -left-2 -translate-x-1/2  text-[9px]  text-center group-hover:block hidden '
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 40, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'linear' }}
              >
                {name.split(' ')[0]}.X
              </motion.div>
            )}
          </div>
        </div>

      </div>
      <div className='bg-white border border-[#9A3CFFB2] to-[100%] rounded-md p-[0.8px] h-fit w-full  '>
        <div className='text-[#49454F] flex flex-col rounded-md items-start gap-1 py-1 px-2'>
          <p className='font-semibold text-lg  text-[#5D8AFE]'>About me</p>
          <motion.div
            className='text-base'>
            {redeMore ? <pre
              className="font-sans transition-all   leading-2 text-wrap duration-500 ease-in-out"
            >{AboutMe}   <button className="text-fuchsia-700" onClick={() => setReadMore(!redeMore)}>ReadLess</button></pre> : <div
              className=" transition-all duration-500 ease-in-out"
            >{AboutMe.substring(0, 128)}  <button className="text-fuchsia-700" onClick={() => setReadMore(!redeMore)}>ReadMore...</button></div>}
          </motion.div>
        </div>
      </div>
    </div >
  );
};

export default ModelBanner;
