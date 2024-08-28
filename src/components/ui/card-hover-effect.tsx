import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

export const HoverEffect = ({
  items,
  className,
  src,
}: {
  items: {
    title: string;
    description: string;
    src: string;


  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div

          key={item?.title}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-pink-300 block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className=" h-[300px] w-[300px] shadow-xl shadow-slate-400">
            <div className="absolute top-0 left-0 flex flex-col  justify-between h-[300px] ">
              <CardTitle className=" px-4 ">{item.title}</CardTitle>
              <CardDescription className="bg-[#b699f9] z-20 h-24 pt-3  text-sm px-4 font-medium w-full text-black ">{item.description}</CardDescription>
            </div>
            <BlurImage
              src={item.src}
              alt={item.title}
              fill

            />
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl    h-full w-full  overflow-hidden bg-gradient-to-b from-violet-500/70  to-violet-800/30 border border-transparent dark:border-violet-400 group-hover:border-violet-500 relative z-20",
        className
      )}
    >

      <div className="relative ">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-black z-20 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8  tracking-wide z-20 leading-relaxed text-sm ",
        className
      )}
    >
      {children}
    </p>
  );
};
export const BlurImage = ({
  src

}) => {

  return (
    <Image
      className={cn(
        "object-cover absolute inset - 0 transition top-0 left-0 z-0 duration-300 ",


      )}

      src={src}

      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt="s"

    />
  );
};