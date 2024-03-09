'use client';

import { useState } from 'react';
import { useAuth } from '..';

export const LoginForm = () => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('123123');

  const { login } = useAuth();

  const handleLogin = async () => await login(email, password);

  return (
    <main className="flex flex-col gap-2 p-2 border rounded-lg shadow-lg bg-zinc-200 border-zinc-300">
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-2 py-1 border rounded-md outline-none border-zinc-300"
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-2 py-1 border rounded-md outline-none border-zinc-300"
      />
      <button
        onClick={handleLogin}
        className="px-2 py-1 bg-white border rounded-md outline-none border-zinc-300"
      >
        Login
      </button>
    </main>
  );
};
