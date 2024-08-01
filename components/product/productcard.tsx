import Image from 'next/image';
import { Card } from '../ui/card';
import ProductButton from './productbutton';
import ProductRating from './productrating';
import { cn } from '@/lib/utils';

interface BaseProductCardProps {
   id: string;
   collectionId: string;
   name: string;
   price: number;
   quantity: number;
   slug: string;
   imageSrc: string;
}

interface BaseVariantProps extends BaseProductCardProps {
   variant?: 'base';
   short: string;
}

interface CompactVariantProps extends BaseProductCardProps {
   variant: 'compact';
   short?: never;
}

type ProductCardProps = BaseVariantProps | CompactVariantProps;

function ProductCard({
   id,
   collectionId,
   name,
   price,
   quantity,
   slug,
   imageSrc,
   short,
   variant = 'base',
}: ProductCardProps) {
   if (quantity === 0) {
      return null;
   }

   return (
      <Card
         className={cn(
            'flex flex-col items-start justify-between gap-6 max-w-md',
            variant === 'base' ? 'p-8' : 'p-6'
         )}
      >
         <Image
            src={imageSrc}
            alt={name}
            width={0}
            height={0}
            className="w-full h-auto"
         />
         <div className="w-full grid gap-4">
            <div className="grid gap-2">
               <h2 className="font-bold text-2xl">{name}</h2>
               {variant === 'base' && (
                  <p className="text-muted-foreground">{short}</p>
               )}
            </div>
            <div className="grid gap-2 text-sm text-muted-foreground">
               <div className="flex items-center gap-2">
                  <ProductRating rating={5} />
               </div>
            </div>
            <div className="flex items-center justify-between">
               <span className="text-2xl font-bold">${price}</span>
               <ProductButton id={id} collectionId={collectionId} slug={slug}>
                  View Product
               </ProductButton>
            </div>
         </div>
      </Card>
   );
}

export default ProductCard;
