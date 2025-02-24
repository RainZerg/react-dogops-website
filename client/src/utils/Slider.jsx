import React, { useState, useEffect } from 'react';
import {Button} from "@nextui-org/react";
import {useResponsiveImages} from '@/hooks/useResponsiveImages';

const images_lg = [
  'https://fakeimg.pl/1600x900/5c5c5c/909090?text=+',
  'https://fakeimg.pl/1600x900/570000/909090?text=+',
  'https://fakeimg.pl/1600x900/000d57/909090?text=+'
];

const images_md = [
  'https://fakeimg.pl/1024x576/5c5c5c/909090?text=+',
  'https://fakeimg.pl/1024x576/570000/909090?text=+',
  'https://fakeimg.pl/1024x576/000d57/909090?text=+'
];

const images_sm = [
  'https://fakeimg.pl/640x1200/5c5c5c/909090?text=+',
  'https://fakeimg.pl/640x1200/570000/909090?text=+',
  'https://fakeimg.pl/640x1200/000d57/909090?text=+'
];

const imageSets = { lg: images_lg, md: images_md, sm: images_sm };



const Slider = () => {
  const images = useResponsiveImages(imageSets);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative min-w-screen max-h-lvh md:max-h-[576px] lg:max-h-[900px] overflow-hidden">
      <img
        src={images[currentIndex]}
        alt={`Carousel image ${currentIndex + 1}`}
        className="relative inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 pt-9">
        <h1 className="text-4xl md:text-6xl font-bold">Fixed Overlay Text</h1>
        <p className="text-lg md:text-2xl mt-4 pb-9">This text is fixed over the images.</p>
        <Button size="lg" color="primary" variant="ghost">Press me</Button>
      </div>
    </div>
  );
};

export default Slider;
