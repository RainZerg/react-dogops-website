import ProductGrid from '../../features/ProductGrid';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Catalog = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const categories = [
        { id: 'all', name: 'Все' },
        { id: 'address-tags', name: 'Адресники' },
        { id: 'collars', name: 'Ошейники' },
        { id: 'leashes', name: 'Поводки' }
    ];
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        // Get the current URL's query parameters using react-router-dom
        const categoryFromQuery = searchParams.get('category');

        // If a category is found in the query, set it as the selected category
        if (categoryFromQuery && categories.some(cat => cat.id === categoryFromQuery)) {
            setSelectedCategory(categoryFromQuery);
        }
    }, [searchParams, categories]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);

        // Update the URL with the new category using react-router-dom
        setSearchParams({ category: categoryId });
    };

    return (
        <div className="mx-auto max-w-7xl pt-28">
            <h2 className="text-6xl font-bold mb-8 text-left">
                Каталог
            </h2>
            <div className="flex space-x-4 mb-8">
                {categories.map((category) => (
                    <button 
                        key={category.id} 
                        className={`border border-black text-black px-4 py-2 rounded-full ${selectedCategory === category.id ? 'bg-lime-300 focus:border-none' : ''}`}
                        onClick={() => handleCategoryChange(category.id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <ProductGrid selectedCategory={selectedCategory} />
        </div>
    );
}

export default Catalog;
