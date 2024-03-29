import { getItems } from '@/features/items/api/server/getItems';
import Image from 'next/image';

export default async function Page() {
  const items = await getItems();

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between w-full gap-2 p-2 border rounded-lg shadow-lg bg-zinc-200 border-zinc-300"
        >
          <Image
            src={item.photo}
            alt="photo"
            height={40}
            width={40}
            className="rounded-md drop-shadow-lg"
          />
          <div>{item.title}</div>
          <div>{item.description}</div>
        </div>
      ))}
    </div>
  );
}
