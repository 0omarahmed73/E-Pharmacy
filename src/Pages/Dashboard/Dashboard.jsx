import style from "./Dashboard.module.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { ShowContext } from "../../context/ShowContext";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";
import InputAutoComplete2 from "./../../components/InputAutoComplete2/InputAutoComplete2";
import { FaUserAlt } from "react-icons/fa";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import * as Yup from "yup";
import { useCallback } from "react";
import ButtonSubmit from "../../components/ButtonSubmit";
const Dashboard = () => {
  const { spinnerElement, spinner, setSpinner } = useContext(ShowContext);
  const { success, setSuccess, user } = useContext(AuthContext);
  useEffect(() => {
    setSpinner(true);
    const setTime = setTimeout(() => {
      setSpinner(false);
    }, 300);
    return () => {
      clearInterval(setTime);
    };
  }, [setSpinner]);
  const isMount = useRef(false);
  useEffect(() => {
    if (!isMount.current) {
      if (success) {
        toast.success(`تم تسجيل الدخول بنجاح! ,\n
        مرحبا بك د/ ${user.username}`);
        setSuccess(false);
      }
      isMount.current = true;
    }
  }, [success, setSuccess, user.username]);
  useDocumentTitle(" الرئيسية");
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      style={{ margin: "auto" }}
      className={style.dashboard + " d-flex flex-column px-sm-5 px-0 pb-4`"}
    >
      {spinner && spinnerElement}
      <h1 className="mainTitle py-2">الرئيسية</h1>
      <Row>
        
      </Row>
      <ToastContainer position="bottom-center" hideProgressBar  className='mb-2' rtl={true} />
    </motion.div>
  );
};

export default Dashboard;
