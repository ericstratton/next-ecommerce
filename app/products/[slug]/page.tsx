import { Separator } from '@/components/ui/separator';
import ProductImages from '@/components/product/productimages';
import { getDocument } from '@/lib/server/db';
import { getProductDetails } from '@/lib/server/name';
import ProductForm from '@/components/product/productform';
import ProductRating from '@/components/product/productrating';
import { getFilePreview } from '@/lib/server/storage';
import { convertImageBufferToSrc } from '@/lib/utils';

const getProductData = async (slug: string) => {
   'use server';
   const details = getProductDetails(slug);
   if (details === null) {
      return null;
   }
   const data = await getDocument(details.collectionId, details.documentId);
   if (data == null) {
      return null;
   }

   return data;
};

export default async function ProductPage({
   params,
}: {
   params: { slug: string };
}) {
   const product = await getProductData(params.slug);

   if (product === null) {
      return <div>Product not found</div>;
   }

   const imageBuffer = await getFilePreview(product.images[0], 160);
   const imageSrc = imageBuffer ? convertImageBufferToSrc(imageBuffer) : '';

   return (
      <div className="grid md:grid-cols-2 items-start max-w-3xl px-4 mx-auto py-6 gap-6 md:gap-12">
         <div className="grid gap-3 items-start">
            <ProductImages images={product.images} />
         </div>
         <div className="grid gap-3 items-start">
            <div className="grid gap-4 items-start">
               <div className="flex flex-col gap-2 items-start">
                  <div className="grid gap-2">
                     <h1 className="font-bold text-xl sm:text-2xl">
                        {product.name}
                     </h1>
                     <div>
                        <p>{product.short}</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <ProductRating rating={4} />
                     </div>
                  </div>
                  <div className="text-2xl font-bold">${product.price}</div>
               </div>
               <ProductForm
                  name={product.name}
                  price={product.price}
                  id={product.$id}
                  collectionId={product.$collectionId}
                  imagePreviewSrc={imageSrc}
               />
               <Separator className="border-gray-200 dark:border-gray-800" />
               <div className="grid gap-4 text-base leading-loose">
                  <p>{product.description}</p>
               </div>
            </div>
         </div>
      </div>
   );
}
