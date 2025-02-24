import React from 'react';
import Slider from '@/utils/Slider';
import ProductGrid from '@/components/features/ProductGrid';
import ImageRows from '@/utils/ImageRows';
import About from './components/About';

const Home = () => {
  return (
    <>
      <Slider />
      <div className="mx-auto max-w-7xl">
      <h2 className="text-6xl font-bold mb-8 text-center pt-14">Категории</h2>
      <ImageRows />
      <h2 className="text-6xl font-bold mb-8 text-center pt-9">Новинки</h2> 
      <ProductGrid selectedCategory='collars' />
      </div>
      <About />
    </>
  );
}

export default Home;
