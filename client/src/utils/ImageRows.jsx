import React, { useState } from 'react';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const ImageRows = () => {
  const images = [
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-4 md:gap-4">
        {images.map((image, index) => (
          <Card 
            key={index}
            isPressable
            onPress={() => {window.location.href = '/catalog';}}
            className="border-none relative" 
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Image
              removeWrapper
              src={image} 
              alt={`Image ${index + 1}`} 
              className={`z-0 w-full h-full object-cover transition-transform duration-300 ease-in-out ${
                hoveredIndex === index ? 'scale-105' : 'scale-100'
              }`}
            />
            <CardFooter 
              className={`
                absolute 
                bottom-0 
                left-0 
                right-0 
                transition-transform 
                duration-300 
                ease-in-out 
                ${hoveredIndex === index 
                  ? 'translate-y-0' 
                  : 'translate-y-full'
                } 
                bg-black/50 
                text-white 
                p-4
              `}
            >
              <div>
                <p className="text-white text-tiny">Available soon.</p>
                <p className="text-white text-tiny">Get notified.</p>
              </div> 
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {/* ... rest of the mobile view remains the same ... */}
      </div>
    </div>
  );
};

export default ImageRows;
