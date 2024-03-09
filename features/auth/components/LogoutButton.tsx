'use client';

import { useAuth } from '..';

type Props = {
  className?: string;
};

export const LogoutButton = ({ className }: Props) => {
  const { logout } = useAuth();

  return (
    <button onClick={logout} className={className}>
      Logout
    </button>
  );
};
