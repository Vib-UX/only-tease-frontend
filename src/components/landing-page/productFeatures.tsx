import {
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import React from "react";

import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import Creator from "../../../public/landingPage/creators.jpg"
import exchangeCrown from "../../../public/landingPage/exchangeCrown.jpg"
import tradeVipCrown from "../../../public/landingPage/exchangeCrown1.jpg"
import liveRoom from "../../../public/landingPage/liveRoom.jpg"
import vipSubscription from "../../../public/landingPage/vipSubscription.jpg"

export function ProductFeatures() {
  return (

    <div className="flex flex-col my-28 items-center justify-center space-y-10"
    >
      <h1 className=" text-black font-bold text-5xl capitalize">Our Products</h1>
      <BentoGrid className="max-w-4xl mx-auto">

        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>

  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-violet-400 dark:to-pink-500 to-neutral-100"></div>
);
const items = [
  {
    title: "VIP Crown & Subscriptions",
    description: "💘 OnlyTease 💌 offers creators two distinct monetization options: VIP Crowns and Subscriptions. ",
    header: vipSubscription,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Live Rooms",
    description: "Live Rooms on 💘 OnlyTease 💌 provide an interactive space where fans can engage with their favorite creators in real-time. ",
    header: liveRoom,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Trade VIP Crowns with Other Users",
    description: "Fans holding any creator's VIP Crowns can list them on the creator's marketplace at a chosen price for other fans to purchase. ",
    header: tradeVipCrown,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Enhanced Revenue Streams ",
    description:
      "Fans can stake Tease Tokens to earn rewards, which may include exclusive content or privileges within the creator's DAO. ",
    header: exchangeCrown,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Discover Content and Creators",
    description: "The Discover page serves as a hub for finding interesting photos, clips, and accounts. ",
    header: Creator,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },

];
