import Image from 'next/image';

function ProductPreviewImage({ src, srText }: { src: string; srText: string }) {
   return (
      <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
         <Image
            src="/placeholder.svg"
            alt="Preview thumbnail"
            width={0}
            height={0}
            className="w-full h-auto aspect-square object-cover"
         />
         <span className="sr-only">View Image 1</span>
      </button>
   );
}

function ProductImages({
   images = ['one', 'two', 'three', 'four'],
}: {
   images: any[];
}) {
   return (
      <>
         <div className="hidden md:flex gap-4 items-start">
            {images.map((image, index) => (
               <ProductPreviewImage
                  src={image}
                  srText={`View Image ${index + 1}`}
                  key={index}
               />
            ))}
         </div>
         <div className="grid gap-4 md:gap-10">
            <Image
               src="/placeholder.svg"
               alt="Product Image"
               width={0}
               height={0}
               className="aspect-square object-cover border border-gray-200 w-full h-auto rounded-lg overflow-hidden dark:border-gray-800"
            />
            <div className="flex md:hidden gap-2 items-start">
               {images.map((image, index) => (
                  <ProductPreviewImage
                     src={image}
                     srText={`View Image ${index + 1}`}
                     key={index}
                  />
               ))}
            </div>
         </div>
      </>
   );
}

export default ProductImages;
