import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  { imgUrl: "/assets/images/hero-1.svg", alt: "smartwatch" },
  { imgUrl: "/assets/images/hero-2.svg", alt: "bag" },
  { imgUrl: "/assets/images/hero-3.svg", alt: "lamp" },
  { imgUrl: "/assets/images/hero-4.svg", alt: "air fryer" },
  { imgUrl: "/assets/images/hero-5.svg", alt: "chair" },
];
const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image
            src={image.imgUrl}
            alt="image.alt"
            width={154}
            height={154}
            className="object-contain"
            key={image.alt}
          />
        ))}
      </Carousel>

      <Image
        src="/assets/icons/hand-drawn-arrow-1.svg"
        alt=""
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[20%] -bottom-9 z-0"
      />
    </div>
  );
};

export default HeroCarousel;
