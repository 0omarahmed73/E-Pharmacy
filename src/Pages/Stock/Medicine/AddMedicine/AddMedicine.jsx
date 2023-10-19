import { useEffect } from "react";
import useDocumentTitle from "../../../../hooks/useDocumentTitle";
import style from "./AddMedicine.module.css";
import { useContext } from "react";
import { ShowContext } from "../../../../context/ShowContext";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Input from "../../../../components/input/Input";
import { FaPills, FaPray } from "react-icons/fa";
import ButtonSubmit from "../../../../components/ButtonSubmit";
import { GiMedicinePills } from "react-icons/gi";
import Select from "../../../../components/Select/Select";
import { useFormik } from "formik";
import { PiFactoryFill } from "react-icons/pi";
import { AiFillRightCircle } from "react-icons/ai";
import * as Yup from "yup";
const AddMedicine = () => {
  useDocumentTitle("اضافة دواء جديد");
  const location = useLocation();
  const naviate = useNavigate();
  const { spinnerElement, spinner, setSpinner } = useContext(ShowContext);
  useEffect(() => {
    setSpinner(true);
    const setTime = setTimeout(() => {
      setSpinner(false);
    }, 300);
    return () => {
      clearInterval(setTime);
    };
  }, [setSpinner]);
  const formik = useFormik({
    initialValues: {
      type: sessionStorage.getItem(`type-${location.pathname}`) || "",
      company: sessionStorage.getItem(`company-${location.pathname}`) || "",
      code: sessionStorage.getItem(`code-${location.pathname}`) || "",
      quantity: sessionStorage.getItem(`quantity-${location.pathname}`) || "",
      days: sessionStorage.getItem(`days-${location.pathname}`) || "",
      en: sessionStorage.getItem(`en-${location.pathname}`) || "",
      ar: sessionStorage.getItem(`ar-${location.pathname}`) || "",
    },
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
      sessionStorage.clear();
      formik.setValues({
        type: "",
        company: "",
        code: "",
        quantity: "",
        days: "",
        en: "",
        ar: "",
      });
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      type: Yup.string().required("الرجاء اختيار نوع الدواء"),
      company: Yup.string().required("الرجاء ادخال اسم المورد"),
      code: Yup.string().required("الرجاء ادخال كود الدواء"),
      quantity: Yup.number().required(
        "الرجاء ادخال الكمية المطلوب التنبيه قبلها"
      ),
      en: Yup.string().required("الرجاء ادخال اسم الدواء باللغة الانجليزية"),
      ar: Yup.string().required("الرجاء ادخال اسم الدواء باللغة العربية"),
      days: Yup.number().required(
        "الرجاء ادخال عدد الايام المطلوب التنبيه قبلها"
      ),
    }),
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
      style={{ margin: "auto" }}
      className={style.medicine + " d-flex flex-column px-sm-5 px-0 pb-4`"}
    >
      {spinner && spinnerElement}
      <div className="d-flex flex-row align-items-center mb-2 gap-2">
        <Link to="/stock/medicines">
          <AiFillRightCircle size={24} fill="#28465C" />
        </Link>
        <p className="mainTitle">إضافة دواء</p>
      </div>
      <Form onSubmit={formik.handleSubmit} className="pb-4">
        <Row lg="2" xs="1" md="2">
          <Col>
            <Input
              className="text-end"
              width={"100%"}
              label="اسم العنصر باللغة الانجليزية"
              type="text"
              id="en"
              value={formik.values.en}
              error={formik.errors.en}
              touched={formik.touched.en}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="en"
              icon={<GiMedicinePills />}
            />
            <Select
              value={formik.values.type}
              error={formik.errors.type}
              touched={formik.touched.type}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              width={"100%"}
              className="mt-2"
              label="نوع العنصر"
              type="text"
              id="type"
              name="type"
              icon={<FaPills />}
            >
              <option value="">اختر نوع العنصر</option>
              <option value="اقراص">اقراص</option>
              <option value="امبولات">امبولات</option>
              <option value="منوعات">منوعات</option>
            </Select>
            <Input
              value={formik.values.company}
              error={formik.errors.company}
              touched={formik.touched.company}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              width={"100%"}
              className="mt-2 text-end"
              label="الشركة المصنعة"
              type="text"
              id="company"
              name="company"
              icon={<PiFactoryFill />}
            />
            <Input
              value={formik.values.code}
              error={formik.errors.code}
              touched={formik.touched.code}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              width={"100%"}
              className="mt-2 text-end"
              label="كود العنصر"
              type="text"
              id="code"
              name="code"
              icon={"#"}
            />
            <div className="d-flex flex-column">
              <Input
                value={formik.values.days}
                error={formik.errors.days}
                touched={formik.touched.days}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="text-end mt-2"
                width={"100%"}
                label="التنبيه قبل"
                type="number"
                id="days"
                name="days"
                icon={"يوم"}
              />
              <p className={style.p}>
                *ارسال تنبيه قبل انتهاء الصلاحية بعدد معين من الايام
              </p>
            </div>
          </Col>
          <Col className="d-flex flex-column justify-content-between">
            <div className="d-flex flex-column">
              <Input
                value={formik.values.ar}
                error={formik.errors.ar}
                touched={formik.touched.ar}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="text-end mt-2 mt-md-0"
                width={"100%"}
                label="اسم العنصر باللغة العربية"
                type="text"
                id="ar"
                name="ar"
                icon={<GiMedicinePills />}
              />
              <div className="d-flex flex-column">
                <Input
                  value={formik.values.quantity}
                  error={formik.errors.quantity}
                  touched={formik.touched.quantity}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="text-end mt-2"
                  width={"100%"}
                  label="التنبيه قبل"
                  type="number"
                  id="quantity"
                  name="quantity"
                  icon={"كمية"}
                />
                <p className={style.p}>
                  *ارسال تنبيه عندما تصبح الكمية المتوفرة من الدواء عدد معين
                </p>
              </div>
            </div>
            <div
              className={`${style.buttonandsvg} mt-2`}
              style={{ margin: "auto", width: "100%" }}
            >
              <div className="inner m-auto" style={{ width: "100%" }}>
                <div className="svg text-center">
                  <div className={style.img}>
                    <img src="/newMedi.svg" alt="" />
                  </div>
                </div>

                <div className="btnnn text-center w-100 mt-2 d-flex flex-row gap-2">
                  <ButtonSubmit
                    disabled={!(formik.isValid)}
                    className={`btn-main ${
                      location.search.includes("return")
                        ? "w-100"
                        : "w-50 m-auto my-1"
                    }`}
                  >
                    اضافة الدواء
                  </ButtonSubmit>
                  {location.search.includes("return") && (
                    <Button
                      onClick={() => naviate(-1, { replace: true })}
                      className="btn-main w-100"
                    >
                      الرجوع الى العملية السابقة
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </motion.div>
  );
};

export default AddMedicine;
