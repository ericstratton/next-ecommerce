'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';
import {
   type ShoppingCartStore,
   createShoppingCartStore,
} from '@/stores/shoppingcartstore';

export type ShoppingCartStoreApi = ReturnType<typeof createShoppingCartStore>;

export const ShoppingCartStoreContext = createContext<
   ShoppingCartStoreApi | undefined
>(undefined);

export const ShoppingCartStoreProvider = ({
   children,
}: {
   children: ReactNode;
}) => {
   const storeRef = useRef<ShoppingCartStoreApi>();
   if (!storeRef.current) {
      storeRef.current = createShoppingCartStore();
   }

   return (
      <ShoppingCartStoreContext.Provider value={storeRef.current}>
         {children}
      </ShoppingCartStoreContext.Provider>
   );
};

export const useShoppingCartStore = <T,>(
   selector: (store: ShoppingCartStore) => T
): T => {
   const shoppingCartStoreContext = useContext(ShoppingCartStoreContext);

   if (!shoppingCartStoreContext) {
      throw new Error(
         `useShoppingCartStore must be used within ShoppingCartStoreProvider`
      );
   }

   return useStore(shoppingCartStoreContext, selector);
};
