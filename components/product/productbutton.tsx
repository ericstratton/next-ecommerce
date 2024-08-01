import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';

function ProductButton({
   slug,
   id,
   collectionId,
   children,
   className,
}: {
   slug: string;
   id: string;
   collectionId: string;
   children: React.ReactNode;
   className?: string;
}) {
   return (
      <Link href={`products/${slug}`}>
         <Button className={cn(className)}>{children}</Button>
      </Link>
   );
}

export default ProductButton;
