import React, { useState, useEffect } from 'react';
import {Button} from "@nextui-org/react";

const images = [
  'https://fakeimg.pl/1600x900/5c5c5c/909090?text=+',
  'https://fakeimg.pl/1600x900/570000/909090?text=+',
  'https://fakeimg.pl/1600x900/000d57/909090?text=+'
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="aspect-video relative w-full overflow-hidden rounded-lg">
      <img
        src={images[currentIndex]}
        alt={`Carousel image ${currentIndex + 1}`}
        className="relative inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
        <h1 className="text-4xl md:text-6xl font-bold">Fixed Overlay Text</h1>
        <p className="text-lg md:text-2xl mt-4 pb-9">This text is fixed over the images.</p>
        <Button className="text-white hover:text-black" size="lg" color="default" variant="ghost">Press me</Button>
      </div>
    </div>
  );
};

export default Slider;
