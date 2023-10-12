import { createContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [error , setError] = useState(null)
  const [loading , setLoading] = useState(false)
  const [user, setUser] = useState(Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null);
  const login = async (values) => {
    setError(null)
    setLoading(true)
    const username = values.email;
    console.log(username)
    const password = values.password;
    console.log(password)
      const user = await fetch("http://localhost:3000/users/login" , {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (user.ok) {
      const data = await user.json();
      setUser(data);
      setError(null)
      Cookies.set("user" , JSON.stringify(data) , {
        expires : 1,
        secure : true
      })

    }
    else {
      setUser(null)
      const data = await user.json();
      console.log(data.message)
      setError(data.message)
      Cookies.remove("user");
    }
    setLoading(false)
  }
  console.log(user);
  return (
    <AuthContext.Provider value={{ user, setUser , login , error , loading}}>
      {children}
    </AuthContext.Provider>
  );
};

