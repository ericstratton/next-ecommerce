'use server';

import { ImageGravity } from 'appwrite';
import { createAdminClient } from './service';
import { imagesBucket } from './name';

export async function getFilePreview(fileId: string, width = 400) {
   try {
      const { storage } = await createAdminClient();
      const file = await storage.getFilePreview(
         imagesBucket,
         fileId,
         width,
         0,
         ImageGravity.Center,
         90
      );
      return file;
   } catch (error) {
      console.error('Error getting file preview:', error);
   }
}
