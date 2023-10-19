import React, { useContext, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import style from "./AddAccount.module.css";
import Input from "../../components/input/Input";
import { useFormik } from "formik";
import { FaUserAlt } from "react-icons/fa";
import { AiFillLock, AiFillPhone } from "react-icons/ai";
import { GiEgyptianSphinx } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import * as yup from "yup";
import ButtonSubmit from "../../components/ButtonSubmit";
import SVGNewAccount from "../../components/SVGNewAccount";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { ShowContext } from "../../context/ShowContext";
import { motion } from 'framer-motion';
const AddAccount = () => {
  const { spinnerElement , spinner , setSpinner } = useContext(ShowContext);
  useEffect(() => {
    setSpinner(true);
    const setTime = setTimeout(() => {
      setSpinner(false);
    }, 300);
    return () => {
      clearInterval(setTime)
    }
  } , [setSpinner]);
  useDocumentTitle('إضافة حساب جديد')
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      name: sessionStorage.getItem(`name-${window.location.pathname}`) || "",
      email: sessionStorage.getItem(`email-${window.location.pathname}`) || "",
      password:
        sessionStorage.getItem(`password-${window.location.pathname}`) || "",
      phone: sessionStorage.getItem(`phone-${window.location.pathname}`) || "",
      national:
        sessionStorage.getItem(`national-${window.location.pathname}`) || "",
      type: sessionStorage.getItem(`type-${window.location.pathname}`) || "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("الرجاء ادخال البريد الإلكتروني")
        .email("الرجاء التأكد من صحة البريد الإلكتروني"),
      password: yup
        .string()
        .required("الرجاء التاكد من ادخال كلمة المرور")
        .min(6, "كلمة المرور يجب ان تكون اكبر من 6 أحرف"),
        name : yup.string().required('الرجاء ادخال الاسم'),
        phone : yup.string().required('الرجاء ادخال رقم الهاتف').test("maxDigits", 'الرجاء ادخال رقم هاتف صحيح', (value) => value.length === 10 ),
        national : yup.string().required('الرجاء ادخال رقم القومي').test("maxDigits", 'الرجاء ادخال رقم قومي صحيح', (value) => value.length === 14 ),
        type : yup.string().required('الرجاء ادخال الدرجة في النظام'),
    }),
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
      formik.setValues({
        name: "",
        email: "",
        password: "",
        phone: "",
        national: "",
        type: "",
      });
    },
  });
  return (
    <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
     style={{margin : 'auto'} } className={`${style.addAccount} d-flex flex-column px-sm-5 px-0`}>
      {spinner && spinnerElement}
      <p className="mainTitle mb-2">إضافة حساب جديد</p>
      <Form onSubmit={formik.handleSubmit} className="pb-4">
        <Row lg="2" xs="1" md='2'>
          <Col>
            <Input
              className="text-end"
              error={formik.errors.name}
              touched={formik.touched.name}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              onChange={formik.handleChange}
              width={"100%"}
              label="الإسم"
              type="text"
              id="name"
              name="name"
              icon={<FaUserAlt />}
            />
            <Input
              error={formik.errors.password}
              onBlur={formik.handleBlur}
              touched={formik.touched.password}
              value={formik.values.password}
              onChange={formik.handleChange}
              width={"100%"}
              className="mt-2"
              label="كلمة المرور"
              type="password"
              id="password"
              name="password"
              icon={<AiFillLock />}
            />
            <Input
              error={formik.errors.phone}
              onBlur={formik.handleBlur}
              touched={formik.touched.phone}
              value={formik.values.phone}
              onChange={formik.handleChange}
              width={"100%"}
              className="mt-2 text-end"
              label="رقم الهاتف"
              type="number"
              id="phone"
              name="phone"
              icon={<AiFillPhone />}
            />
            <Input
              error={formik.errors.national}
              onBlur={formik.handleBlur}
              touched={formik.touched.national}
              value={formik.values.national}
              onChange={formik.handleChange}
              width={"100%"}
              className="mt-2 text-end"
              label="رقم القومي"
              type="number"
              id="national"
              name="national"
              icon={<GiEgyptianSphinx />}
            />
            <Input
              className="text-end mt-2"
              error={formik.errors.type}
              touched={formik.touched.type}
              onBlur={formik.handleBlur}
              value={formik.values.type}
              onChange={formik.handleChange}
              width={"100%"}
              label="الدرجة في النظام"
              type="number"
              id="type"
              name="type"
              icon={<FaUserAlt />}
            />
          </Col>
          <Col className="d-flex flex-column justify-content-between">
            <div className="d-flex flex-column">
              <Input
                className="text-end mt-2 mt-md-0"
                error={formik.errors.email}
                touched={formik.touched.email}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={formik.handleChange}
                width={"100%"}
                label="البريد الإلكتروني"
                type="email"
                id="email"
                name="email"
                icon={<MdEmail />}
              />
            </div>
            <div className={style.buttonandsvg} style={{margin : 'auto'}}>
<div className="inner m-auto" style={{width : 'fit-content'}}>
                <div className="svg text-center">
                  <SVGNewAccount />
                </div>
    
                <div className="btnnn text-center w-100 mt-2">
                  <ButtonSubmit disabled={!formik.isValid} className="btn-main w-100">إضافة حساب</ButtonSubmit>
                </div>
</div>
</div>
          </Col>
        </Row>
      </Form>
    </motion.div>
  );
};

export default AddAccount;
