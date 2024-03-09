'use server';

import { auth } from '@/lib/firebase/server';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const getUser = async (cookieStore: ReadonlyRequestCookies) => {
  try {
    if (auth) {
      const authToken = cookieStore.get('firebaseIdToken')?.value;

      if (authToken) {
        const decodedToken = await auth.verifyIdToken(authToken);
        const serverUser = await auth.getUser(decodedToken.uid);

        return {
          uid: serverUser.uid,
          email: serverUser.email ?? '',
          displayName: serverUser.displayName ?? '',
          photoURL: serverUser.photoURL ?? '',
          emailVerified: serverUser.emailVerified,
          isAdmin: decodedToken.role === 'admin',
        };
      }
    } else return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
