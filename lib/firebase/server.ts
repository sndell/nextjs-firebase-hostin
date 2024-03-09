import 'server-only';

import {
  ServiceAccount,
  cert,
  getApps,
  initializeApp,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
  process.env['FIRESTORE_EMULATOR_HOST'] = '127.0.0.1:8080';
  process.env['FIREBASE_AUTH_EMULATOR_HOST'] = '127.0.0.1:9099';
  process.env['FIREBASE_STORAGE_EMULATOR_HOST'] = '127.0.0.1:9199';
  process.env['FIREBASE_HOSTING_EMULATOR_HOST'] = '127.0.0.1:5000';
}

const app = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(
        JSON.parse(process.env.SERVICE_ACCOUNT as string) as ServiceAccount
      ),
    });

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
