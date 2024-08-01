'use client';

import Link from 'next/link';
import useStore from '@/hooks/usestore';
import { useShoppingCartStore } from '@/providers/shoppingcartstoreprovider';
import { ShoppingCartStore } from '@/stores/shoppingcartstore';
import { Badge } from './ui/badge';
import { ShoppingCartIcon } from './icons';

function ShoppingCartLink() {
   const cart = useStore(
      useShoppingCartStore,
      (state: ShoppingCartStore) => state.cart
   );
   const itemsCount = Object.keys(cart ?? {}).length;

   return (
      <Link href="/cart" className="relative">
         {itemsCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 min-w-[1rem] rounded-full bg-primary text-primary-foreground text-xs leading-none flex items-center justify-center">
               {itemsCount}
            </Badge>
         )}
         <ShoppingCartIcon className="text-2xl" />
      </Link>
   );
}

export default ShoppingCartLink;
