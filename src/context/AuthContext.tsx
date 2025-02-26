import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as loginService, logout as logoutService, getUserProfile, register } from '../services/authService';

interface User {
  id: number;
  first_name:string;
  last_name:string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginUser: (username:string,email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  registerUser:(first_name:string,last_name:string,username:string,email: string, password: string)=>Promise<void>;
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

  const registerUser = async (first_name:string,last_name:string,username:string,email: string, password: string)=>{
        try {
            const data= await register(first_name,last_name,username,email, password);
            localStorage.setItem("access",data.access)
            setToken(data.access)
            setUser(data.user)


        } catch (error) {
            console.error("Registration failed", error);

        }

  }

  const logoutUser = () => {
    logoutService();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser ,registerUser}}>
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
