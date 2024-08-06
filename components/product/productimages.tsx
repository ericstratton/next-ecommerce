import { getFilePreview } from '@/lib/server/storage';
import { convertImageBufferToSrc } from '@/lib/utils';
import ProductImagesClient from './productimagesclient';

async function ProductImages({ images }: { images: any[] }) {
   const imagePreviews = await Promise.all(
      images.map(async (imageId) => {
         const filePreview = await getFilePreview(imageId, 720);
         return filePreview ? convertImageBufferToSrc(filePreview) : '';
      })
   );

   return <ProductImagesClient images={imagePreviews} />;
}

export default ProductImages;