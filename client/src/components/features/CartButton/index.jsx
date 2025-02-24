import { useState, useRef, useEffect } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { useCartStore } from '@/hooks/cartStore';
import CartPage from '../CartPopover'; // Assuming CartPage is in the same directory

const CartButton = () => {
    const { count } = useCartStore();
    const [isCartVisible, setIsCartVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsCartVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleCart = () => {
        setIsCartVisible(!isCartVisible);
    };

    return (
        <div ref={containerRef} className="fixed bottom-16 right-16">
            <div
                onClick={toggleCart}
                className="flex items-center justify-center bg-lime-500 text-white py-4 px-8 rounded-full drop-shadow-lg transition-transform cursor-pointer"
            >
                <div className="relative">
                    <FaCartShopping className="text-3xl" />
                    {count > 0 && (
                        <span className="absolute -top-2 -right-2 bg-white text-lime-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center drop-shadow-xl">
                            {count}
                        </span>
                    )}
                </div>
                {count > 0 && <span className="ml-4 text-xl">Checkout</span>}
            </div>
            {isCartVisible && (
                <div className={
                    `absolute
                    my-4
                    bottom-full
                    right-0
                    w-96
                    rounded-lg
                    shadow-lg
                    max-h-[80vh]
                    overflow-y-auto
                    transition-opacity
                    duration-300 
                    ${isCartVisible ? 'opacity-100' :
                    'opacity-0 pointer-events-none'}`
                }>
                        <CartPage />
                </div>
            )}
        </div>
    );
}

export default CartButton;
