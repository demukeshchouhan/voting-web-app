import Image from "next/image";
import React from "react";

function HeroSection() {
  return (
    <div className="w-full h-fit flex justify-center items-center">
      <Image src="/hero.svg" width={400} height={300} alt="hero image" />
    </div>
  );
}

export default HeroSection;
