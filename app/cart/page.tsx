'use client';

import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
   CardFooter,
} from '@/components/ui/card';
import { MinusIcon, PlusIcon, TrashIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import useStore from '@/hooks/usestore';
import { useShoppingCartStore } from '@/providers/shoppingcartstoreprovider';
import { ShoppingCartStore } from '@/stores/shoppingcartstore';

export default function CartPage() {
   const cart = useStore(
      useShoppingCartStore,
      (state: ShoppingCartStore) => state.cart
   );
   const { incrementItem, decrementItem, removeItem } = useShoppingCartStore(
      (state) => ({
         incrementItem: state.incrementItem,
         decrementItem: state.decrementItem,
         removeItem: state.removeItem,
      })
   );

   const total = Object.values(cart ?? {}).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
   );

   return (
      <Card>
         <CardHeader>
            <CardTitle>Your Cart</CardTitle>
            <CardDescription>
               Review and update your cart before checkout.
            </CardDescription>
         </CardHeader>
         <CardContent>
            <ul className="grid gap-4">
               {Object.entries(cart ?? {}).map(([key, item]) => (
                  <li
                     key={key}
                     className="grid grid-cols-[80px_1fr_80px] items-center gap-4"
                  >
                     <Image
                        src="/placeholder.svg"
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                     />
                     <div className="grid gap-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                           ${item.price.toFixed(2)}
                        </p>
                     </div>
                     <div className="flex items-center gap-2">
                        <Button
                           variant="outline"
                           size="icon"
                           onClick={() => decrementItem(item.id)}
                           disabled={item.quantity === 1}
                        >
                           <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span className="font-medium">{item.quantity}</span>
                        <Button
                           variant="outline"
                           size="icon"
                           onClick={() => incrementItem(item.id)}
                        >
                           <PlusIcon className="h-4 w-4" />
                        </Button>
                        <Button
                           variant="ghost"
                           size="icon"
                           onClick={() => removeItem(item.id)}
                        >
                           <TrashIcon className="h-4 w-4" />
                        </Button>
                     </div>
                  </li>
               ))}
            </ul>
         </CardContent>
         <CardFooter className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="grid gap-1">
               <p className="font-medium">Total: ${total.toFixed(2)}</p>
               <p className="text-sm text-muted-foreground">
                  Shipping and taxes calculated at checkout
               </p>
            </div>
            <div className="flex gap-2">
               <Button variant="outline">Continue Shopping</Button>
               <Button>Proceed to Checkout</Button>
            </div>
         </CardFooter>
      </Card>
   );
}
