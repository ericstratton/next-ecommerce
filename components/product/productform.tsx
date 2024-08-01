'use client';

import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { useState } from 'react';
import { useShoppingCartStore } from '@/providers/shoppingcartstoreprovider';
import { getProductType } from '@/lib/server/name';

function CountInput({
   count,
   onCountChange,
}: {
   count: number;
   onCountChange: (count: number) => void;
}) {
   return (
      <div className="grid gap-2">
         <Label htmlFor="quantity" className="text-base">
            Count
         </Label>
         <Input
            id="quantity"
            type="number"
            value={count}
            min="1"
            max="11"
            onChange={(event) => onCountChange(Number(event.target.value))}
            className="w-20 p-2 border rounded-md"
         />
      </div>
   );
}

function ProductForm({
   name,
   price,
   id,
   collectionId,
}: {
   name: string;
   price: number;
   id: string;
   collectionId: string;
}) {
   const addToCart = useShoppingCartStore((state) => state.addItem);
   const [selectedPackage, setSelectedPackage] = useState('');
   const [count, setCount] = useState(1);

   const type = getProductType(collectionId);

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let quantity = count;

      if (type === 'pastries') {
         if (selectedPackage === 'dozen') {
            quantity = 12;
         } else if (selectedPackage === 'half-dozen') {
            quantity = 6;
         }
      }

      addToCart({
         id,
         name,
         price,
         quantity,
         packageType: selectedPackage,
      });
   };

   const handlePackageChange = (value: string) => {
      setSelectedPackage(value);
   };

   return (
      <form onSubmit={handleSubmit} className="grid gap-2">
         {type === 'loaves' && (
            <div className="grid gap-2">
               <Label htmlFor="color" className="text-base">
                  Preparation
               </Label>
               <RadioGroup
                  id="color"
                  defaultValue="black"
                  className="flex items-center gap-2"
               >
                  <Label
                     htmlFor="color-black"
                     className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  >
                     <RadioGroupItem id="color-black" value="black" />
                     Baked
                  </Label>
                  <Label
                     htmlFor="color-white"
                     className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  >
                     <RadioGroupItem id="color-white" value="white" />
                     Frozen
                  </Label>
               </RadioGroup>
            </div>
         )}

         {type === 'pastries' && (
            <div className="grid gap-2">
               <Label htmlFor="packages" className="text-base">
                  Packages
               </Label>
               <RadioGroup
                  id="packages"
                  defaultValue="m"
                  className="flex items-center gap-2"
                  onValueChange={handlePackageChange}
               >
                  <Label
                     htmlFor="packages-half-dozen"
                     className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  >
                     <RadioGroupItem
                        id="packages-half-dozen"
                        value="half-dozen"
                     />
                     Half dozen
                  </Label>
                  <Label
                     htmlFor="packages-dozen"
                     className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  >
                     <RadioGroupItem id="packages-dozen" value="dozen" />
                     Dozen
                  </Label>
                  <Label
                     htmlFor="packages-individuals"
                     className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                  >
                     <RadioGroupItem
                        id="packages-individuals"
                        value="individuals"
                     />
                     Individuals
                  </Label>
               </RadioGroup>
            </div>
         )}

         {type === 'pastries' && selectedPackage === 'individuals' && (
            <CountInput count={count} onCountChange={setCount} />
         )}
         {type === 'loaves' && <CountInput count={count} onCountChange={setCount} />}

         <Button type="submit" size="lg">Add to cart</Button>
      </form>
   );
}

export default ProductForm;
