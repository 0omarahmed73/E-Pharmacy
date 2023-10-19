import style from "./Dispense.module.css";
import { createPortal } from "react-dom";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import Input from "../../../components/input/Input";
import { useFormik } from "formik";
import { FaUserAlt } from "react-icons/fa";
import { IoMdSchool } from "react-icons/io";
import { LiaSchoolSolid } from "react-icons/lia";
import {
  AiFillPhone,
  AiFillRightCircle,
  AiOutlineNumber,
} from "react-icons/ai";
import { FaVirusCovid } from "react-icons/fa6";
import { GiEgyptianSphinx, GiMedicinePills } from "react-icons/gi";
import * as yup from "yup";
import ButtonSubmit from "../../../components/ButtonSubmit";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import Select from "../../../components/Select/Select";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MediSelected from "./../../../components/MediSelected/MediSelected";
import { useContext } from "react";
import { ShowContext } from "../../../context/ShowContext";
import { useEffect } from "react";
import { motion } from "framer-motion";
import InputAutoComplete2 from "../../../components/InputAutoComplete2/InputAutoComplete2";
import axiosApi from "../../../data/axios";
const Dispense = () => {
  const location = useLocation();
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
  const [change, setChange] = useState(false);
  const [change2, setChange2] = useState(false);
  const falseChange = () => {
    setChange(false);
  };
  const falseChange2 = () => {
    setChange2(false);
  };
  const [items, setItems] = useState([]);
  const getMedicines = async () => {
    const response = await axiosApi.get("../src/data/medicines.json");
    let names = response.data.map((medi) => medi.brandName);
    names = names.filter((el) => el !== "" && el.includes(name.toUpperCase()));
    setItems(names);
  };
  const [mode, setMode] = useState("");
  const [currentId, setId] = useState("");
  const [name, setName] = useState("");
  const [stds, setStds] = useState([]);
  const [allValues , setAllValues] = useState({})
  const [quantity, setQuantity] = useState("");
  const [show, setShow] = useState(false);
  const [medicines, setMedicines] = useState(
    JSON.parse(
      sessionStorage.getItem(`medicines-${window.location.pathname}`)
    ) || []
  );
  const handleClose = () => {
    setShow(false);
    setName("");
    setQuantity("");
  };
  const handleShow = () => setShow(true);
  useDocumentTitle("صرف الأدوية");
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      stdname: sessionStorage.getItem(`stdname-${location.pathname}`) || "",
      phone: sessionStorage.getItem(`phone-${location.pathname}`) || "",
      national: sessionStorage.getItem(`national-${location.pathname}`) || "",
      collage: sessionStorage.getItem(`collage-${location.pathname}`) || "",
      ["university-year"]:
        sessionStorage.getItem(`university-year-${location.pathname}`) || "",
      prescriptionNumber:
        sessionStorage.getItem(`prescriptionNumber-${location.pathname}`) || "",
      prescriptionType:
        sessionStorage.getItem(`prescriptionType-${location.pathname}`) || "",
      disease: sessionStorage.getItem(`disease-${location.pathname}`) || "",
    },
    validationSchema: yup.object().shape({
      stdname: yup.string().required("الرجاء ادخال إسم الطالب"),
      phone: yup
        .string()
        .required("الرجاء ادخال رقم الهاتف")
        ,
      national: yup
        .string()
        .required("الرجاء ادخال رقم القومي")
        .test(
          "maxDigits",
          "الرجاء ادخال رقم قومي صحيح",
          (value) => value.length === 14
        ),
      collage: yup.string().required("الرجاء ادخال اسم الكلية"),
      ["university-year"]: yup
        .string()
        .required("الرجاء ادخال الفرقة الدراسية"),
      prescriptionNumber: yup.string().required("الرجاء ادخال رقم الروشتة"),
      prescriptionType: yup.string().required("الرجاء اختيار نوع الروشتة"),
      disease: yup.string().required("الرجاء ادخال التشخيص"),
    }),
    onSubmit: (values) => {
      values = {
        id: new Date().getTime(),
        ...values,
        medicine: { ...medicines },
      };
      console.log(values);
      formik.resetForm();
      setMedicines([]);
      sessionStorage.clear();
      formik.setValues({
        stdname: "",
        phone: "",
        national: "",
        collage: "",
        ["university-year"]: "",
        prescriptionNumber: "",
        prescriptionType: "",
        disease: "",
      });
    },
  });
  const handleMedicines = (e, name, quantity) => {
    e.preventDefault();
    const getMedi = [
      ...medicines,
      { id: new Date().getTime(), name, quantity },
    ];
    setMedicines(getMedi);
    sessionStorage.setItem(
      `medicines-${window.location.pathname}`,
      JSON.stringify(getMedi)
    );
    handleClose();
  };
  const addStds = () => {
    const stdd = [
      {
        name: "محمد عبد الرحمن محمد",
        phone: "01111111111",
        national: 12345678912345,
        collage: "طب بشري",
        ["university-year"]: "الفرقة الرابعة",
      },
      {
        name : 'عمر احمد سعيد السيد',
        phone : '01516111111',
        national : 12356777712345,
        collage : 'هندسة',
        ["university-year"] : 'الفرقة الرابعة'
      },
      {
        name : 'احمد محمد احمد',
        phone : '01024197972',
        national : 12353282124532,
        collage : 'هندسة',
        ["university-year"] : 'الفرقة الرابعة'
      },
    ].filter((el) => el.name.includes(formik.values.stdname));
    setAllValues(stdd)
    setStds(stdd.map((el) => el.name));
  };
  const handleDelete = (id) => {
    const newMedicine = medicines.filter((medi) => medi.id !== id);
    setMedicines(newMedicine);
    sessionStorage.setItem(
      `medicines-${window.location.pathname}`,
      JSON.stringify(newMedicine)
    );
  };
  const handleEdit = (id) => {
    const medicine = medicines.find((medi) => medi.id === id);
    setName(medicine.name);
    setQuantity(medicine.quantity);
    handleShow();
  };
  const saveChanges = (id) => {
    const newMedicine = medicines.map((medi) => {
      if (medi.id === id) {
        return { ...medi, name, quantity };
      }
      return medi;
    });
    setMedicines(newMedicine);
    sessionStorage.setItem(
      `medicines-${window.location.pathname}`,
      JSON.stringify(newMedicine)
    );

    handleClose();
  };
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
      className={`${style.dispense} d-flex flex-column px-sm-5 px-0 pb-4`}
    >
      {spinner && spinnerElement}
      <div className="d-flex flex-row align-items-center mb-2 gap-2">
        <Link to="/stock">
          <AiFillRightCircle size={24} fill="#28465C" />
        </Link>
        <p className="mainTitle">صرف الأدوية</p>
      </div>
      <Form autoSave={"on"} onSubmit={formik.handleSubmit}>
        <Row lg="3" xs="1" md="2">
          <Col>
            <InputAutoComplete2
              error={formik.errors.stdname}
              touched={formik.touched.stdname}
              onBlur={formik.handleBlur}
              value={formik.values.stdname}
              onChange={(e) => {
                formik.handleChange(e);
                setChange2(true);
              }}
              className="text-end"
              width={"100%"}
              label="إسم الطالب"
              type="text"
              id="stdname"
              name="stdname"
              items={stds}
              allValues={allValues}
              linkedAttr={["phone" , "national" , "collage" , "university-year"] }
              dropFunction={addStds}
              direction={"ltr"}
              icon={<FaUserAlt />}
              linkAdded={"/stock/new-order"}
              message={"الطالب غير مضاف , هل تريد اضافته؟"}
              setValue={formik.setFieldValue}
              formik={true}
              change={change2}
              falseChange={falseChange2}
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
              error={formik.errors.collage}
              touched={formik.touched.collage}
              onBlur={formik.handleBlur}
              value={formik.values.collage}
              onChange={formik.handleChange}
              width={"100%"}
              label="الكلية"
              type="text"
              id="collage"
              name="collage"
              icon={<IoMdSchool />}
            />
            <Input
              className="text-end mt-2"
              error={formik.errors["university-year"]}
              touched={formik.touched["university-year"]}
              onBlur={formik.handleBlur}
              value={formik.values["university-year"]}
              onChange={formik.handleChange}
              width={"100%"}
              label="الفرقة الدراسية"
              type="text"
              id="university-year"
              name="university-year"
              icon={<LiaSchoolSolid />}
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
              type="text"
              id="phone"
              name="phone"
              icon={<AiFillPhone />}
            />
          </Col>
          <Col className="d-flex flex-column justify-content-between">
            <div className="d-flex flex-column">
              <Input
                className="text-end mt-2 mt-md-0"
                error={formik.errors.prescriptionNumber}
                touched={formik.touched.prescriptionNumber}
                onBlur={formik.handleBlur}
                value={formik.values.prescriptionNumber}
                onChange={formik.handleChange}
                width={"100%"}
                label="رقم الروشتة"
                type="number"
                id="prescriptionNumber"
                name="prescriptionNumber"
                icon={<GiMedicinePills />}
              />
              <Input
                className="text-end mt-2"
                error={formik.errors.disease}
                touched={formik.touched.disease}
                onBlur={formik.handleBlur}
                value={formik.values.disease}
                onChange={formik.handleChange}
                width={"100%"}
                label="التشخيص"
                type="text"
                id="disease"
                name="disease"
                icon={<FaVirusCovid />}
              />
              <div className={`${style.mediTable} overflow-y-scroll mt-2`}>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>الدواء</th>
                      <th>الكمية</th>
                      <th>الأيقونات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.length
                      ? medicines.map((medi, index) => (
                          <MediSelected
                            setId={setId}
                            setMode={setMode}
                            key={medi.id}
                            name={medi.name}
                            quantity={medi.quantity}
                            id={medi.id}
                            idx={index + 1}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                          />
                        ))
                      : null}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
          <Col className="">
            <Select
              className="mt-2"
              label="نوع الروشتة"
              id="prescriptionType"
              width={"100%"}
              name="prescriptionType"
              value={formik.values.prescriptionType}
              error={formik.errors.prescriptionType}
              touched={formik.touched.prescriptionType}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <option value="">اختر نوع الروشتة</option>
              <option value="chronic">مزمن</option>
              <option value="accurate">طوارئ</option>
            </Select>
            <div
              className={`${style.buttonandsvg} overflow-hidden mt-2 mt-lg-2`}
            >
              <div
                className=""
                style={{ width: "fit-content", margin: "auto" }}
              >
                <div
                  className="btnnn text-center mt-4 mt-lg-0 m-auto"
                  style={{ width: "140px" }}
                >
                  <img src="/patient2.svg" alt="" />
                </div>
              </div>
              <div className="btnnn d-flex gap-2 justify-content-lg-end justify-content-center w-100 mt-4 my-lg-0 mt-lg-2">
                <Button
                  className="btn-main w-50"
                  onClick={() => {
                    handleShow();
                    setMode("add");
                  }}
                >
                  إضافة دواء
                </Button>
                <ButtonSubmit
                  disabled={!formik.isValid || !medicines.length}
                  className="btn-main w-50"
                >
                  إضافة صرف
                </ButtonSubmit>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
      {createPortal(
        <Modal show={show} centered={true} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              {mode === "add"
                ? "اختر اسم الدواء المراد اضافته"
                : "تعديل معلومات الدواء"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => handleMedicines(e, name, quantity)}>
              <Row>
                <Col>
                  <InputAutoComplete2
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setChange(true);
                    }}
                    className="text-end"
                    width={"100%"}
                    label={"اسم الدواء"}
                    type="text"
                    id="medicine"
                    name="medicine"
                    items={items.sort()}
                    dropFunction={getMedicines}
                    direction={"ltr"}
                    icon={<GiMedicinePills />}
                    linkAdded={"/stock/medicines/add-medicine?return=true"}
                    message={"الدواء غير موجود , هل تريد اضافته؟"}
                    setValue={setName}
                    formik={false}
                    change={change}
                    falseChange={falseChange}
                  />
                </Col>
                <Col>
                  <Input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="text-end mt-2 mt-md-0"
                    width={"100%"}
                    label="الكمية"
                    type="number"
                    id="quantity"
                    name="quantity"
                    icon={<AiOutlineNumber />}
                  />
                </Col>
              </Row>
              <div className="btns mt-4 d-flex gap-2 me-auto justify-content-end ">
                {mode === "edit" ? (
                  <Button
                    variant="danger"
                    onClick={() => saveChanges(currentId)}
                  >
                    حفظ التعديلات
                  </Button>
                ) : (
                  <ButtonSubmit
                    disabled={!name.trim() || !quantity.trim()}
                    className="btn-main"
                    variant="primary"
                  >
                    حفظ التغييرات
                  </ButtonSubmit>
                )}
                <Button variant="secondary" onClick={handleClose}>
                  إغلاق
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>,
        document.getElementById("modal")
      )}
    </motion.div>
  );
};

export default Dispense;
