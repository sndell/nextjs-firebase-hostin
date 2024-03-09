'use client';

import { auth } from '@/lib/firebase/client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const getAuthToken = () => Cookies.get('firebaseIdToken');

export const setAuthToken = (token: string) =>
  Cookies.set('firebaseIdToken', token);

export const removeAuthToken = () => Cookies.remove('firebaseIdToken');

type Props = {
  children: React.ReactNode;
  user?: User;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children, user }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    user ? user : null
  );
  const router = useRouter();

  useEffect(() => {
    if (!auth) return;
    return auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
        removeAuthToken();
      } else {
        const tokenValues = await user.getIdTokenResult();
        const isAdmin = tokenValues.claims.role === 'admin';
        const token = await user.getIdToken();
        setAuthToken(token);
        setCurrentUser({
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          emailVerified: user.emailVerified,
          isAdmin,
        });
      }
      router.refresh();
    });
  }, []);

  const login = async (username: string, password: string) => {
    if (!auth) return;
    await signInWithEmailAndPassword(auth, username, password);
  };

  const logout = async (): Promise<void> => {
    if (!auth) return;
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
