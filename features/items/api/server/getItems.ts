'use server';

import { db } from '@/lib/firebase/server';

export const getItems = async () => {
  const itemsCollection = await db.collection('items').get();
  return itemsCollection.docs.map((doc) => doc.data() as Item);
};
