import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Input from "../../components/input/Input";
import { AiFillLock } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { Button, Container } from "react-bootstrap";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import ButtonSubmit from './../../components/ButtonSubmit';
import useDocumentTitle from "../../hooks/useDocumentTitle";
const Login = () => {
  useDocumentTitle('تسجيل الدخول');
  const formik = useFormik({
    validateOnMount : true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('الرجاء ادخال البريد الإلكتروني').email('الرجاء التأكد من صحة البريد الإلكتروني'),
      password: yup.string().required("الرجاء التاكد من ادخال كلمة المرور").min(6 , "كلمة المرور يجب ان تكون اكبر من 6 أحرف"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  console.log(formik);
  return (
    <div className={style.login}>
      <Container className="d-flex vh-100 flex-md-row align-items-center ">
        <div className={`${style.right} m-auto `}>
          <h5 className="text-black mb-3">مرحبا بكم</h5>
          <Form onSubmit={formik.handleSubmit}>
            <Input
              className='text-end'
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
          <div  className="coll mt-2 d-flex flex-row justify-content-between align-items-center">
            <ButtonSubmit type="submit" className="btn-main btn" disabled={!formik.isValid}>
              تسجيل الدخول
            </ButtonSubmit>
            <Link className="m-0" href="#">
              نسيت كلمة المرور
            </Link>
          </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
