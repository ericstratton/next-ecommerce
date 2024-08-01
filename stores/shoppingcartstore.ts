import { create } from 'zustand';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
   id: string;
   name: string;
   price: number;
   quantity: number;
   packageType?: string;
}

interface ShoppingCartState {
   cart: Record<string, CartItem>;
}

interface ShoppingCartActions {
   addItem: (item: CartItem) => void;
   incrementItem: (id: string) => void;
   decrementItem: (id: string) => void;
   removeItem: (id: string) => void;
   clearCart: () => void;
}

export type ShoppingCartStore = ShoppingCartState & ShoppingCartActions;

export const defaultInitState = {
   cart: {},
};

export const createShoppingCartStore = (
   initState: ShoppingCartState = defaultInitState
) => {
   return createStore<ShoppingCartStore>()(
      persist(
         (set) => ({
            ...initState,
            addItem: (item) =>
               set((state) => ({
                  cart: {
                     ...state.cart,
                     [item.id]: {
                        ...item,
                        quantity: state.cart[item.id]
                           ? state.cart[item.id].quantity + item.quantity
                           : item.quantity,
                     },
                  },
               })),
            incrementItem: (id) =>
               set((state) => {
                  const cart = { ...state.cart };
                  cart[id].quantity += 1;
                  return { cart };
               }),
            decrementItem: (id) =>
               set((state) => {
                  const cart = { ...state.cart };
                  cart[id].quantity -= 1;
                  return { cart };
               }),
            removeItem: (id) =>
               set((state) => {
                  const cart = { ...state.cart };
                  delete cart[id];
                  return { cart };
               }),
            clearCart: () => set({ cart: {} }),
         }),
         {
            name: 'shopping-cart',
         }
      )
   );
};
