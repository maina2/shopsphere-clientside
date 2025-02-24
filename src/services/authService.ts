import api from "./api";
import { AxiosError } from "axios";  // Import AxiosError from axios


export const login = async (username:string,email: string, password: string) => {
  const response = await api.post("/users/login/", { username,email, password });
  return response.data;
};

export const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  bio?: string;
  profile_picture?: string;
  website?: string;
}) => {
  try {
    const response = await api.post("/users/register/", userData);
    return response.data;
  } catch (error) {
    // Assert that error is an AxiosError
    if (error instanceof AxiosError) {
      console.error("Error registering user:", error.response?.data);
      throw error.response?.data;
    }
    throw error;  // If it's not an AxiosError, rethrow it
  }
};

export const getUserProfile = async () => {
  const response = await api.get("/users/profile/");
  return response.data;
};

export const updateUserProfile = async (userData: object) => {
  const response = await api.put("/users/profile/", userData);
  return response.data;
};
