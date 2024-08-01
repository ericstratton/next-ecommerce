import Link from 'next/link';
import ProductListFeatured from '@/components/product/productlistfeatured';
import HeroImage from '@/components/heroimage';

export default function HomePage() {
   return (
      <main className="flex flex-col min-h-screen items-center justify-between">
         <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
               <HeroImage />
               <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                     Freshly Baked Joy in Every Bite
                  </h1>
                  <p className="text-muted-foreground md:text-xl">
                     Discover our handcrafted bakery delights, made with love
                     and the finest ingredients to bring you irresistible flavor
                     and warmth.
                  </p>
                  <Link
                     href="/products"
                     className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                     Shop Now
                  </Link>
               </div>
            </div>
         </section>
         <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container grid gap-6 px-4 md:px-6">
               <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                     Featured Products
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                     Check out our latest and greatest products.
                  </p>
               </div>
               <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:items-baseline">
                  <ProductListFeatured />
               </div>
            </div>
         </section>
         <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container flex flex-col items-center space-y-4">
               <h2 className="text-3xl md:text-4xl font-bold">
                  Explore Our Full Bakery Catalog
               </h2>
               <p className="text-muted-foreground max-w-md text-center">
                  Browse our selection of freshly baked treats and find the
                  perfect goodies to delight your taste buds.
               </p>
               <Link
                  href="/products"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
               >
                  Shop All Products
               </Link>
            </div>
         </section>
      </main>
   );
}
