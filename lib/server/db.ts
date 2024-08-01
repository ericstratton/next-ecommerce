'use server';

import { db } from './name';
import { createAdminClient } from './service';

export async function getDocumentsList(collectionId: string) {
   try {
      const { databases } = await createAdminClient();
      const documents = await databases.listDocuments(db, collectionId);
      return documents;
   } catch (error) {
      console.error('Error getting documents:', error);
   }
}

export async function getDocument(collectionId: string, documentId: string) {
   try {
      const { databases } = await createAdminClient();
      const document = await databases.getDocument(db, collectionId, documentId);
      return document;
   } catch (error) {
      console.error('Error getting document:', error);
   }
}