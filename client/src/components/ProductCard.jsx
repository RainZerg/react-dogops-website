import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
    if (!product) return null;

    const { id, image, name, price, description } = product;

    if (!id || !image || !name || !price || !description) {
        throw new Error('ProductCard: product is invalid');
    }

    return (
        <div className="bg-white rounded-lg shadow-xl p-4 max-w-xs text-left text-pretty">
            <div className="relative">
                <img alt={name} className="rounded-lg w-full" height="300" src={image} width="400"/>
            </div>
            <div className="p-2">
                <h2 className="text-gray-800 text-xl font-bold mt-2">
                    {name}
                </h2>
                <p className="text-gray-600 text-sm my-3">
                    {description}
                </p>
                <span className="text-black text-lg font-bold">
                            {price}₽
                </span>
                <button className="bg-lime-300 text-black text-sm py-2 px-4 rounded mt-4 w-full">
                    В корзину
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};



