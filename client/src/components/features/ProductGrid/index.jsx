import { useEffect, useState } from 'react';

import ProductCard from '../ProductCard';
import PropTypes from 'prop-types';
import axios from 'axios';

const ProductGrid = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3000/api/products', {
          params: { selectedCategory },
        });
        console.log(response);
        if (response && response.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
          setError(new Error('Invalid response from server'));
        }
      } catch (error) {
        setError(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

ProductGrid.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default ProductGrid;
