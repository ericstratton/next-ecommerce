'use client';

import { useState } from 'react';
import Image from 'next/image';

function ProductImagesClient({ images }: { images: string[] }) {
   const [selectedImage, setSelectedImage] = useState<string>(images[0]);

   const handleImageClick = (src: string) => {
      setSelectedImage(src);
   };

   return (
      <>
         <div className="hidden md:flex gap-4 items-start">
            {images.map((src, index) => (
               <button
                  className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50"
                  onClick={() => handleImageClick(src)}
                  key={index}
               >
                  <Image
                     src={src}
                     alt={`Preview thumbnail ${index + 1}`}
                     width={0}
                     height={0}
                     className="w-full h-auto aspect-square object-cover"
                  />
                  <span className="sr-only">{`View product image ${index + 1}`}</span>
               </button>
            ))}
         </div>
         <div className="grid gap-4 md:gap-10">
            <Image
               src={selectedImage}
               alt="Product Image"
               width={0}
               height={0}
               className="aspect-square object-cover border border-gray-200 w-full h-auto rounded-lg overflow-hidden dark:border-gray-800"
            />
            <div className="flex md:hidden gap-2 items-start">
               {images.map((src, index) => (
                  <button
                     className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50"
                     onClick={() => handleImageClick(src)}
                     key={index}
                  >
                     <Image
                        src={src}
                        alt={`Preview thumbnail ${index + 1}`}
                        width={0}
                        height={0}
                        className="w-full h-auto aspect-square object-cover"
                     />
                     <span className="sr-only">{`View product image ${index + 1}`}</span>
                  </button>
               ))}
            </div>
         </div>
      </>
   );
}

export default ProductImagesClient;