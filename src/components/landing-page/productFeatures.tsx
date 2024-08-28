

import React from "react";

import { HoverEffect } from "@/components/ui/card-hover-effect";

import feature5 from "../../../public/landingPage/creator5.jpg"
import feature4 from "../../../public/landingPage/exchangeRevenu.jpg"
import feature2 from "../../../public/landingPage/liveRoom1.jpg"
import feature1 from "../../../public/landingPage/subscribe-1.jpg"
import feature6 from "../../../public/landingPage/vipcrown.jpg"
import feature3 from "../../../public/landingPage/vipSubscription.jpg"


export function ProductFeatures() {
  return (

    <div className="flex flex-col mt-10 items-center justify-center space-y-6"
    >
      <h1 className=" flex items-center justify-center text-3xl md:text-4xl text-[#4B4B4B] landing-font ">Our Products</h1>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={items} />
      </div>
    </div>

  );
}

const items = [
  {
    title: "VIP Crown & Subscriptions",
    description: "💘 OnlyTease 💌 offers creators two distinct monetization options: VIP Crowns and Subscriptions. ",
    src: feature6


  },
  {
    title: "Live Rooms",
    description: "Live Rooms on 💘 OnlyTease 💌 provide an interactive space where fans can engage with their favorite creators in real-time. ",
    src: feature2
  },
  {
    title: "Marketplace",
    description: "Fans holding any creator's VIP Crowns can list them on the creator's marketplace at a chosen price for other fans to purchase. ",
    src: feature3
  },
  {
    title: "Enhanced Revenue Streams ",
    description:
      "Fans can stake Tease Tokens to earn rewards, which may include exclusive content or privileges within the creator's DAO. ",
    src: feature4
  },
  {
    title: "Discover",
    description: "The Discover page serves as a hub for finding interesting photos, clips, and accounts. ",
    src: feature5
  },
  {
    title: " Smothest UI/UX",
    description: "💘 OnlyTease 💌 makes managing your transactions effortless and seamless with bundled and gasless transactions.",
    src: feature1
  },

];
