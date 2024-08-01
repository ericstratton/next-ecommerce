import ProductCard from '@/components/product/productcard';
import { getProductsWithPreviewImage } from '@/lib/products';

async function ProductListFeatured() {
   const documentsWithImagePreview = await getProductsWithPreviewImage();

   return (
      <>
         {documentsWithImagePreview.map((product) => {
            const { name, quantity, price, slug, imageSrc, short, featured } =
               product;
            return (
               featured && (
                  <ProductCard
                     key={product.$id}
                     id={product.$id}
                     collectionId={product.$collectionId}
                     name={name}
                     price={price}
                     quantity={quantity}
                     slug={slug}
                     imageSrc={imageSrc}
                     short={short}
                  />
               )
            );
         })}
      </>
   );
}

export default ProductListFeatured;
