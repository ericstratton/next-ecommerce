'use client';

import { useState, useMemo, useEffect, SetStateAction } from 'react';
import {
   DropdownMenu,
   DropdownMenuTrigger,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuCheckboxItem,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { getProductsWithPreviewImage, ProductWithPreviewImage } from '@/lib/products';
import ProductCard from '@/components/product/productcard';
import { FilterIcon, ListOrderedIcon } from '@/components/icons';

export default function Component() {
   const [products, setProducts] = useState<ProductWithPreviewImage[] | []>([]);
   const [sortBy, setSortBy] = useState('featured');
   const [selectedFilters, setSelectedFilters] = useState<{
      category: string[];
      featured: boolean;
   }>({
      category: [],
      featured: false,
   });

   useEffect(() => {
      let skip = false;
      async function fetchProducts() {
         const products = await getProductsWithPreviewImage();
         setProducts(products);
      }
      if (!skip) {
         fetchProducts();
      }
      return () => {
         skip = true;
      };
   }, []);

   const handleFilterChange = (type: string, value: string = '') => {
      if (type === 'category') {
         setSelectedFilters({
            ...selectedFilters,
            category: selectedFilters.category.includes(value)
               ? selectedFilters.category.filter((item) => item !== value)
               : [...selectedFilters.category, value],
         });
      } else if (type === 'featured') {
         setSelectedFilters({
            ...selectedFilters,
            featured: !selectedFilters.featured,
         });
      }
   };

   const handleSortChange = (value: SetStateAction<string>) => {
      setSortBy(value);
   };

   const filteredProducts = useMemo(() => {
      return products
         .filter((product) => {
            if (
               selectedFilters.category.length > 0 &&
               !selectedFilters.category.includes(product.category)
            ) {
               return false;
            }
            if (selectedFilters.featured && !product.featured) {
               return false;
            }
            return true;
         })
         .sort((a, b) => {
            switch (sortBy) {
               case 'featured':
                  return b.featured - a.featured;
               case 'low':
                  return a.price - b.price;
               case 'high':
                  return b.price - a.price;
               default:
                  return 0;
            }
         });
   }, [products, selectedFilters, sortBy]);

   return (
      <section className="w-full py-12">
         <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
               <div className="grid gap-1">
                  <h1 className="text-2xl font-bold tracking-tight">
                     All Products
                  </h1>
                  <p className="text-muted-foreground">
                     Browse our collection of high-quality products.
                  </p>
               </div>
               <div className="flex items-center gap-4 ml-auto">
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant="outline"
                           size="sm"
                           className="h-8 gap-1"
                        >
                           <FilterIcon className="h-4 w-4" />
                           <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              Filter
                           </span>
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                           checked={selectedFilters.category.includes(
                              'pastries'
                           )}
                           onCheckedChange={() =>
                              handleFilterChange('category', 'pastries')
                           }
                        >
                           Pastries
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                           checked={selectedFilters.category.includes('loaves')}
                           onCheckedChange={() =>
                              handleFilterChange('category', 'loaves')
                           }
                        >
                           Loaves
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                           checked={selectedFilters.featured}
                           onCheckedChange={() =>
                              handleFilterChange('featured')
                           }
                        >
                           Featured
                        </DropdownMenuCheckboxItem>
                     </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           variant="outline"
                           size="sm"
                           className="h-8 gap-1"
                        >
                           <ListOrderedIcon className="h-4 w-4" />
                           <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              Sort
                           </span>
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                           value={sortBy}
                           onValueChange={handleSortChange}
                        >
                           <DropdownMenuRadioItem value="featured">
                              Featured
                           </DropdownMenuRadioItem>
                           <DropdownMenuRadioItem value="low">
                              Price: Low to High
                           </DropdownMenuRadioItem>
                           <DropdownMenuRadioItem value="high">
                              Price: High to Low
                           </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
               {filteredProducts.map((product) => (
                  <ProductCard
                     key={product.$id}
                     id={product.$id}
                     collectionId={product.$collectionId}
                     name={product.name}
                     price={product.price}
                     quantity={product.quantity}
                     slug={product.slug}
                     imageSrc={product.imageSrc}
                     variant='compact'
                  />
               ))}
            </div>
         </div>
      </section>
   );
}


