import ProductGrid from '../ProductGrid.jsx';
import { useState } from 'react';

export default function Catalog() {

    const categories = [
        { id: 'all', name: 'Все' },
        { id: 'address-tags', name: 'Адресники' },
        { id: 'collars', name: 'Ошейники' },
        { id: 'leashes', name: 'Поводки' }
    ];
    const [selectedCategory, setSelectedCategory] = useState('all');


    return (
      <div>
        <h2 className="text-6xl font-bold mb-8 text-left">
                Каталог
            </h2>
            <div className="flex space-x-4 mb-8">
            {categories.map((category) => (
                <button 
                    key={category.id} 
                        className={`border border-black text-black px-4 py-2 rounded-full ${selectedCategory === category.id ? 'bg-lime-300 focus:border-none' : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        {category.name}
                </button>
            ))}
            </div>
                <ProductGrid selectedCategory={selectedCategory} />
      </div>
    );
}
