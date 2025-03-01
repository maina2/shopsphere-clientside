import { createContext, useContext, useState, ReactNode } from "react";
import api from "../services/api";

interface UserProfile {
  id: number;
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  bio?: string;
  profile_picture?: string;
  phone?: string;
}

interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  fetched: boolean; // Track if profile has been fetched
  fetchProfile: () => Promise<void>;
  updateProfile: (updatedData: Partial<UserProfile>, file?: File) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState<boolean>(false); // Track if profile has been fetched

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users/profile/");
      setProfile(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch profile");
      console.error(err);
    } finally {
      setLoading(false);
      setFetched(true); // Mark as fetched
    }
  };

  const updateProfile = async (updatedData: Partial<UserProfile>, file?: File) => {
    setLoading(true);
    try {
      let response;
      if (file) {
        const formData = new FormData();
        formData.append("profile_picture", file); // Append the file
  
        // Append other fields to FormData
        Object.entries(updatedData).forEach(([key, value]) => {
          if (value !== undefined) {
            // Convert non-string values to strings
            formData.append(key, value.toString());
          }
        });
  
        response = await api.put("/users/profile/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // If no file is provided, send a regular JSON payload
        response = await api.put("/users/profile/", updatedData);
      }
      setProfile(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to update profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, loading, error, fetched, fetchProfile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
};