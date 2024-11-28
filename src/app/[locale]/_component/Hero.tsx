"use client";

import { CarouselItem } from "@/model";
import { useCallback, useEffect, useState } from "react";

export default function Hero() {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setCarouselItems([
      {
        title: "test",
        description: "testD",
        imageUrl: "1.jpg",
      },
      {
        title: "test2",
        description: "testD2",
        imageUrl: "2.jpg",
      },
      {
        title: "test3",
        description: "testD3",
        imageUrl: "3.jpg",
      },
    ]);
  }, []);
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  }, [currentIndex, carouselItems]);

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
            className="carousel-wrapper flex transition ease-in-out duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {carouselItems.map((item, index) => (
              <div
                key={item.id ? item.id : index}
                className="flex-[0_0_100%] flex justify-center"
              >
                <img
                  className="overflow-hidden"
                  src={item.imageUrl}
                  alt={item.title}
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center absolute w-full bottom-1">
          {carouselItems.map((_, index) => (
            <span
              key={index}
              className={`w-[15px] h-[15px] rounded-full mx-[5px] cursor-pointer z-[100] backdrop-blur-[90px] bg-white/50 ${index === currentIndex && "bg-white/90"}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </>
  );
}
