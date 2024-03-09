'use client';

import { useEffect, useState } from 'react';
import { createItem } from '../../api/client/createItem';

export const ItemForm = () => {
  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.files && e.target.files.length > 0 && setFile(e.target.files[0]);

  const handleSubmit = async () => {
    if (!file || !title || !description) return;
    await createItem({ photo: file, title, description });
    setFile(undefined);
    setDescription(undefined);
    setTitle(undefined);
  };

  return (
    <>
      <div className="p-2 space-y-2 border rounded-lg shadow-lg bg-zinc-200 border-zinc-300">
        <label className="flex flex-col">
          Photo
          <input type="file" onChange={handleFileChange} />
        </label>
        <label className="flex flex-col">
          Title
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="px-2 py-1 border rounded-md outline-none border-zinc-300"
          />
        </label>
        <label className="flex flex-col">
          Description
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            className="px-2 py-1 border rounded-md outline-none border-zinc-300"
          />
        </label>
      </div>
      <button
        onClick={handleSubmit}
        className="px-2 py-1 border rounded-md shadow-lg bg-zinc-200 border-zinc-300"
      >
        Add
      </button>
    </>
  );
};
