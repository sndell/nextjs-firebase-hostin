type User = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  isAdmin: boolean;
};

type AuthContext = {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
