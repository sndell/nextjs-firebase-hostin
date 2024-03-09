'use client';

import { getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD6Y3FE1HtDLkdt9Xy4zI-7D6z58VRpW58',
  authDomain: 'nextjs-firebase-hosting-1.firebaseapp.com',
  projectId: 'nextjs-firebase-hosting-1',
  storageBucket: 'nextjs-firebase-hosting-1.appspot.com',
  messagingSenderId: '642757219209',
  appId: '1:642757219209:web:e1ed57eb9b860552640758',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

if (process.env.NEXT_PUBLIC_APP_ENV === 'development') {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectStorageEmulator(storage, '127.0.0.1', 9199);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
    disableWarnings: true,
  });
}
