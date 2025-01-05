import React, { useState, useEffect } from 'react';

const images = [
  'https://via.placeholder.com/1600x900/FF0000/FFFFFF?text=Image+1',
  'https://via.placeholder.com/1600x900/00FF00/FFFFFF?text=Image+2',
  'https://via.placeholder.com/1600x900/0000FF/FFFFFF?text=Image+3'
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
        <p className="text-lg md:text-2xl mt-4">This text is fixed over the images.</p>
      </div>
    </div>
  );
};

export default Slider;
