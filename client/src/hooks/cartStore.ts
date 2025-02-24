import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  id: number;
    image: string;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  count: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: number) => number;
};

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cart: [],
      count: 0,
      
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id);
          let newCart;

          if (existingItem) {
            newCart = state.cart.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
          } else {
            newCart = [...state.cart, { ...item, quantity: 1 }];
          }

          return {
            cart: newCart,
            count: newCart.reduce((sum, item) => sum + item.quantity, 0),
          };
        });
      },

      removeFromCart: (id) => {
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === id);
          let newCart = [...state.cart];

          if (existingItem) {
            if (existingItem.quantity > 1) {
              newCart = newCart.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity - 1 } : i
              );
            } else {
              newCart = newCart.filter((i) => i.id !== id);
            }
          }

          return {
            cart: newCart,
            count: newCart.reduce((sum, item) => sum + item.quantity, 0),
          };
        });
      },

      clearCart: () => set({ cart: [], count: 0 }),

      getItemQuantity: (id) => {
        return get().cart.find((item) => item.id === id)?.quantity || 0;
      },
    }),
    {
      name: 'cart-storage', // Unique name for localStorage
      partialize: (state) => ({ 
        cart: state.cart,
        count: state.count 
      }), // Only persist these values
    }
  )
);
