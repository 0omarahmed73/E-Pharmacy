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
import { Link } from "react-router-dom";
import MediSelected from "./../../../components/MediSelected/MediSelected";
const Dispense = () => {
  const [mode, setMode] = useState("");
  const [currentId , setId] = useState('');
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [show, setShow] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const handleClose = () => {
    setShow(false);
    setName("");
    setQuantity("");
  };
  const handleShow = () => setShow(true);
  useDocumentTitle("صرف الأدوية");
  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    initialValues: {
      stdname: "",
      phone: "",
      national: "",
      collage: "",
      ["university-year"]: "",
      prescriptionNumber: "",
      disease: "",
      prescriptionType: "",
    },
    validationSchema: yup.object().shape({
      stdname: yup.string().required("الرجاء ادخال إسم الطالب"),
      phone: yup
        .string()
        .required("الرجاء ادخال رقم الهاتف")
        .test(
          "maxDigits",
          "الرجاء ادخال رقم هاتف صحيح",
          (value) => value.length === 10
        ),
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
    },
  });
  const handleMedicines = (e, name, quantity) => {
    e.preventDefault();
    setMedicines((d) => {
      return [...d, { id: new Date().getTime(), name, quantity }];
    });
    handleClose();
  };
  const handleDelete = (id) => {
    const newMedicine = medicines.filter((medi) => medi.id !== id);
    setMedicines(newMedicine);
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
    handleClose();
  }
  return (
    <div
      style={{ margin: "auto" }}
      className={`${style.dispense} d-flex flex-column px-sm-5 px-0 pb-4`}
    >
      <div className="d-flex flex-row align-items-center mb-2 gap-2">
        <Link to="/stock">
          <AiFillRightCircle size={24} fill="#28465C" />
        </Link>
        <p className="mainTitle">صرف الأدوية</p>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Row lg="3" xs="1" md="2">
          <Col>
            <Input
              className="text-end"
              error={formik.errors.stdname}
              touched={formik.touched.stdname}
              onBlur={formik.handleBlur}
              value={formik.values.stdname}
              onChange={formik.handleChange}
              width={"100%"}
              label="إسم الطالب"
              type="text"
              id="stdname"
              name="stdname"
              icon={<FaUserAlt />}
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
              type="number"
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
                      : ""}
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
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-end mt-2 mt-md-0"
                    width={"100%"}
                    label="اسم الدواء"
                    type="text"
                    id="mediname"
                    name="mediname"
                    icon={<GiMedicinePills />}
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
                  <Button variant="danger" onClick={() => saveChanges(currentId)}>
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
    </div>
  );
};

export default Dispense;
