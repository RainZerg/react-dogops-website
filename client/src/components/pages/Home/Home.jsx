import React from 'react';
import Slider from '../utils/Slider.jsx';
import ProductGrid from '../ProductGrid.jsx';
import ImageRows from '../utils/ImageRows.jsx'

function Home() {
  return (
    <div className="mx-auto">
      <Slider />
      <h2 className="text-6xl font-bold mb-8 text-left pt-9">Категории</h2>
      <ImageRows />
      <h2 className="text-6xl font-bold mb-8 text-left pt-9">Новинки</h2> 
      <ProductGrid selectedCategory='collars' />
    </div>
  );
}

export default Home;
