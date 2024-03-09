import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '@/lib/firebase/client';

export const uploadImage = async (image: File): Promise<string> => {
  const imgId = uuidv4();
  const imgRef = ref(storage, `item_images/${imgId}`);
  await uploadBytes(imgRef, image);
  return await getDownloadURL(imgRef);
};
