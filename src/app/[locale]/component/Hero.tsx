"use client";

import { CarouselItem } from "@/model";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Hero() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heroHeight, setHeroHeight] = useState(NaN);
  useEffect(() => {
    if (window.innerWidth < 768) {
      const height = window.innerWidth / 1.755;
      setHeroHeight(height);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        const height = window.innerWidth / 1.755;
        setHeroHeight(height);
      } else {
        setHeroHeight(NaN);
      }
    });
  }, []);
  useEffect(() => {
    setCarouselItems([
      {
        title: "test",
        description: "testD",
        imageUrl: "/act1.webp",
      },
      {
        title: "test2",
        description: "testD2",
        imageUrl: "/act2.webp",
      },
      {
        title: "test3",
        description: "testD3",
        imageUrl: "/act3.webp",
      },
    ]);
  }, []);
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  }, [carouselItems]);

  // const prevSlide = () => {
  //   setCurrentIndex(
  //     (prevIndex) =>
  //       (prevIndex - 1 + carouselItems.length) % carouselItems.length
  //   );
  // };
  // the function must update when currentIndex updates
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, nextSlide, carouselItems]);

  return (
    <>
      <div className="relative overflow-hidden">
        {carouselItems.length > 0 && (
          <div
            className="flex transition ease-in-out duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {carouselItems.map((item, index) => (
              <div
                key={item.id ? item.id : index}
                className="flex-[0_0_100%] flex justify-center overflow-hidden"
                style={{
                  height: `${heroHeight}px`,
                }}
              >
                <Image
                  className="overflow-hidden min-w-full md:max-w-[1024px] md:min-w-[768px] md:max-h-[437px] pb-4"
                  src={item.imageUrl}
                  alt={item.title}
                  width={0}
                  height={0}
                  sizes="100%"
                  loading="eager"
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center w-full">
          {carouselItems.map((_, index) => (
            <span
              key={index}
              className={`w-[13px] h-[13px] rounded-full mt-4 mx-[5px] cursor-pointer backdrop-blur-[90px]  ${index === currentIndex ? "bg-black" : "bg-slate-400"}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </>
  );
}
