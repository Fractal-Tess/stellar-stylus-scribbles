import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { getGravatarUrl } from '@/lib/api';
import { SERVER_URL } from '@/lib/api';

interface User {
  username: string;
  email: string;
  gravatarUrl: string;
}

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('jwtToken')
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('jwtToken', token);
    } else {
      localStorage.removeItem('jwtToken');
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken as User);
    }
  }, [token]);

  useEffect(() => {
    getGravatarUrl(token).then((res) => {
      setUser((prevUser) => ({ ...prevUser, gravatarUrl: res.url }));
    });
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${SERVER_URL}/api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
      // Optionally decode JWT to get user info, or fetch profile later
      setUser(null); // Set to null for now, fetch on profile page
      return true;
    }
    return false;
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const res = await fetch(`${SERVER_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });
    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
      setUser(null); // Set to null for now, fetch on profile page
      return true;
    }
    return false;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
