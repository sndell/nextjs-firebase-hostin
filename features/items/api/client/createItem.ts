import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';
import { uploadImage } from './uploadImage';

export const createItem = async (data: ItemFormValues) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User is not authenticated');

    if (data.photo instanceof File) {
      const imageFile = data.photo;
      const imageUrl = await uploadImage(imageFile);
      data.photo = imageUrl;
    }

    const itemCollectionRef = collection(db, 'items');
    await addDoc(itemCollectionRef, data);
  } catch (e) {
    console.log(e);
  }
};
