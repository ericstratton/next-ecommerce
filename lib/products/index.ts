'use server';

import { Models } from 'node-appwrite';
import { getDocumentsList } from '@/lib/server/db';
import { getFilePreview } from '@/lib/server/storage';
import { loavesCollection, pastriesCollection } from '@/lib/server/name';
import { convertImageBufferToSrc } from '@/lib/utils';

const collections = [loavesCollection, pastriesCollection];

export interface ProductDocument extends Models.Document {
   name: string;
   quantity: number;
   price: number;
   slug: string;
   featured: boolean;
   category: string;
   images: string[];
}

export interface ProductWithPreviewImage
   extends Omit<ProductDocument, 'images'> {
   imageSrc: string;
}

export const getProductsWithPreviewImage = async (): Promise<
   ProductWithPreviewImage[]
> => {
   const products = await Promise.all(collections.map(getDocumentsList));
   const documents = products.flatMap(
      (product) => product?.documents ?? []
   ) as ProductDocument[];

   const documentsWithImagePreview = await Promise.all(
      documents.map(async (product) => {
         const { images, ...rest } = product;
         if (!images || images.length === 0) {
            return { ...rest, imageSrc: '' };
         }
         const imageBuffer = await getFilePreview(images[0]);
         if (!imageBuffer) {
            return { ...rest, imageSrc: '' };
         }
         const imageSrc = convertImageBufferToSrc(imageBuffer);
         return { ...rest, imageSrc };
      })
   );

   return documentsWithImagePreview;
};
