
import api from "./api"; // Assumes you have an Axios instance configured


export const getUserProfile = async () => {
    const response = await api.get("/users/profile/");
    return response.data;
  };
  
  export const editUserProfile = async () =>{
    const response = await api.put("/users/profile/")
    return response.data
  }
  