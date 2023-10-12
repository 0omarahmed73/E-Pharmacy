import { createContext, useState } from "react";

export const ShowContext = createContext();

export const ShowProvider = ({ children }) => {
  const [show, setShow] = useState(JSON.parse(localStorage.getItem("sidebar")));
  const [dropDown, setDropDown] = useState(false);
  return (
    <ShowContext.Provider value={{ show, setShow , dropDown , setDropDown}}>
      {children}
    </ShowContext.Provider>
  );
};
