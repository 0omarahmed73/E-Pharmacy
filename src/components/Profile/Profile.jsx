import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import style from "./Profile.module.css";
import { AiFillCaretDown } from "react-icons/ai";
import { useState } from "react";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import { ShowContext } from "../../context/ShowContext";
import Cookies from "js-cookie";
import { AnimatePresence, motion } from "framer-motion";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const { dropDown, setDropDown } = useContext(ShowContext);
  return (
    <div className={style.profile}>
      <div className={style.profImg}>
        <img
          src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww&w=1000&q=80"
          alt=""
        />
      </div>
      <div className="profTexts d-flex flex-column ms-2">
        <small>د/{user.username}</small>
        <small>مدير المخزن</small>
      </div>
      <AiFillCaretDown
        size={13}
        style={{ marginRight: "10px", cursor: "pointer" }}
        onMouseMove={() => setDropDown(true)}
      />
      <AnimatePresence>
      {dropDown && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3  }}
          exit={{ opacity: 0 }}
          className={style.dropDown}
        >
          <ul>
            <li>
              <Button style={{ all: "unset" }}>تعديل الحساب</Button>
            </li>
            <li>
              <Button
                onClick={() => {
                  Cookies.remove("user");
                  setUser(null);
                }}
                style={{ all: "unset" }}
              >
                تسجيل الخروج
              </Button>
            </li>
          </ul>
        </motion.div>
      ) }
      </AnimatePresence>
    </div>
  );
};

export default Profile;
