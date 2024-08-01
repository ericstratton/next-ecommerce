'use server';

import { Account, Client, Databases, Storage, Users } from 'node-appwrite';
import { cookies } from 'next/headers';

const clientSession = 'appwrite-client-session';

export async function createSessionClient() {
   const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

   const session = cookies().get(clientSession);
   if (!session || !session.value) {
      throw new Error('No session');
   }

   client.setSession(session.value);

   return {
      get account() {
         return new Account(client);
      },
   };
}

export async function createAdminClient() {
   const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
      .setKey(process.env.APPWRITE_SECRET_KEY!);

   return {
      get account() {
         return new Account(client);
      },

      get databases() {
         return new Databases(client);
      },

      get storage() {
         return new Storage(client);
      },

      get users() {
         return new Users(client);
      },
   };
}

export async function createAnonymousSession() {
   const { account } = await createAdminClient();
   const session = await account.createAnonymousSession();
   cookies().set(clientSession, session.secret);
}

export async function logout() {
   const { account } = await createSessionClient();
   cookies().delete(clientSession);
   await account.deleteSession('current');
}