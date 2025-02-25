import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as loginService, logout as logoutService, getUserProfile } from "../services/authService";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginUser: (username:string,email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("access"));

  useEffect(() => {
    if (token) {
      getUserProfile()
        .then((userData) => setUser(userData))
        .catch(() => logoutUser()); // If token is invalid, log out
    }
  }, [token]);

  const loginUser = async (username:string,email: string, password: string) => {
    const data = await loginService(username,email, password);
    setToken(data.access);
    setUser(data.user);
    localStorage.setItem("access", data.access);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logoutUser = () => {
    logoutService();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
