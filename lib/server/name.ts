export const db = '669fd3970033d6b8e662';
export const pastriesCollection = '669fd3cb002fbccc6c1b';
export const loavesCollection = '669fd3c1001aaa3cf073';
export const imagesBucket = '669fd8e6003d61ae82c6';

export const heroImage = '66aba38b00386263c059';

export function getProductType(collectionId: string) {
   if (collectionId === pastriesCollection) {
      return 'pastries';
   }
   if (collectionId === loavesCollection) {
      return 'loaves';
   }
   return null;
}

/**
 * This map associates product slugs with their collection and document IDs,
 * allowing the use of slugs in URLs instead of 16-character strings.
 * A downside is that the map must be updated whenever a product is added or removed.
 */
const productMap: {
   [key: string]: {
      collectionId: string;
      products: { [key: string]: { documentId: string } };
   };
} = {
   loavesCollection: {
      collectionId: loavesCollection,
      products: {
         'wheat-loaf': {
            documentId: '669fdb8e0020240f4d18',
         },
         'levian-loaf': {
            documentId: '669fdb5f0013a79e4e6c',
         },
      },
   },
   pastriesCollection: {
      collectionId: pastriesCollection,
      products: {
         'pound-cake-muffin': {
            documentId: '669fdbfa00222f23d93b',
         },
      },
   },
};

export function getProductDetails(productSlug: string) {
   for (const collectionKey in productMap) {
      const collection = productMap[collectionKey];
      const products = collection.products;
      if (products[productSlug]) {
         return {
            collectionId: collection.collectionId,
            documentId: products[productSlug].documentId,
         };
      }
   }
   return null;
}
