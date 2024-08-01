import Image from 'next/image';
import { heroImage } from '@/lib/server/name';
import { getFilePreview } from '@/lib/server/storage';
import { convertImageBufferToSrc } from '@/lib/utils';

async function HeroImage() {
   const filePreview = await getFilePreview(heroImage, 768);
   const src = filePreview ? convertImageBufferToSrc(filePreview) : '';

   return (
      <Image
         src={src}
         alt="Fresh baked bread on a white background"
         width={0}
         height={0}
         className="w-full h-auto"
      />
   );
}

export default HeroImage;
