import { createContext, useState } from "react";
import axiosApi from "../data/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = async (email , password) => {
    console.log(email , password);
    const user = await axiosApi.get('/users');
    const userFound = user.data.find((user) => user.email === email && user.password === password);
    if(userFound){
      setUser(userFound);
      return true;
    } else {
      return false;
      setUser(null);
    }
  }
  console.log(user);
  return (
    <AuthContext.Provider value={{ user, setUser , login}}>
      {children}
    </AuthContext.Provider>
  );
}