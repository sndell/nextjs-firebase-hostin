'use client';

import Image from 'next/image';

type Props = {
  items: Item[];
};

export const ItemList = ({ items }: Props) => {
  return (
    <div className="w-full space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 border rounded-lg shadow-lg bg-zinc-200 border-zinc-300"
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
};
