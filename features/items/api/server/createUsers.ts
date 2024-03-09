'use server';

import { auth } from '@/lib/firebase/server';

export const createUsers = async () => {
  try {
    console.log('users created');
    await auth.createUser({
      email: 'user@gmail.com',
      emailVerified: true,
      password: '123123',
    });

    const adminRecord = await auth.createUser({
      email: 'admin@gmail.com',
      emailVerified: true,
      password: '123123',
    });

    // Set custom claims for the admin user
    await auth.setCustomUserClaims(adminRecord.uid, { role: 'admin' });
  } catch (error) {
    console.error(error);
  }
};
