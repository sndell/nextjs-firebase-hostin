import { LoginForm, LogoutButton } from '@/features/auth';
import { getUser } from '@/features/auth/api/server/getUser';
import { ItemForm, ItemList } from '@/features/items';
import { createUsers } from '@/features/items/api/server/createUsers';
import { getItems } from '@/features/items/api/server/getItems';
import { cookies } from 'next/headers';

export default async function Page() {
  const user = await getUser(cookies());
  await createUsers();

  if (!user) return <LoginForm />;
  else if (!user?.isAdmin)
    return (
      <main className="flex flex-col gap-2">
        You&apos;re not an admin buddy
        <LogoutButton className="px-2 py-1 border rounded-md shadow-lg bg-zinc-200 border-zinc-300" />
      </main>
    );
  else {
    const items = await getItems();
    return (
      <main className="flex flex-col items-center gap-2 p-2 h-dvh">
        <div>Admin page</div>
        <LogoutButton className="px-2 py-1 border rounded-md shadow-lg bg-zinc-200 border-zinc-300" />
        <ItemForm />
        <ItemList items={items} />
      </main>
    );
  }
}
