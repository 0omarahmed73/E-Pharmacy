import style from "./NewOrder.module.css";
import { createPortal } from "react-dom";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import Input from "../../../components/input/Input";
import { useFormik } from "formik";
import { BiSolidFactory } from "react-icons/bi";
import { AiFillLock, AiFillRightCircle, AiOutlineNumber } from "react-icons/ai";
import { GiMedicinePills } from "react-icons/gi";
import * as yup from "yup";
import ButtonSubmit from "../../../components/ButtonSubmit";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MediSelected from "./../../../components/MediSelected/MediSelected";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { ShowContext } from "../../../context/ShowContext";
import axiosApi from "../../../data/axios";
import { motion } from "framer-motion";
import InputAutoComplete2 from "../../../components/InputAutoComplete2/InputAutoComplete2";
const NewOrder = () => {
  const [change , setChange] = useState(false);
  const falseChange = () => {
    setChange(false);
  };
  useDocumentTitle("إضافة طلبية جديدة");
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
  const [items, setItems] = useState([]);
  const { show: show2 } = useContext(ShowContext);
  const [mode, setMode] = useState("");
  const [currentId, setId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expire, setExpire] = useState("");
  const [price, setPrice] = useState("");
  const [supply, setSupply] = useState("");
  const [supplier, setSupplier] = useState("");
  const [show, setShow] = useState(false);
  const [medicines, setMedicines] = useState(sessionStorage.getItem(`medicines-${window.location.pathname}`) ? JSON.parse(sessionStorage.getItem(`medicines-${window.location.pathname}`)) : []);
  const handleClose = () => {
    setShow(false);
    setName("");
    setQuantity("");
    setExpire("");
    setPrice("");
    setSupply("");
    setSupplier("");
  };
  
  const getMedicines = async () => {
    const response = await axiosApi.get("../src/data/medicines.json");
    let names = response.data.map((medi) => medi.brandName);
    names = names.filter((el) => el !== "" && el.includes(name.toUpperCase()));
    setItems(names);
  };

  const handleShow = () => setShow(true);
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      reqnum: sessionStorage.getItem(`reqnum-${window.location.pathname}`) || "",
      delivaryAuth: sessionStorage.getItem(`delivaryAuth-${window.location.pathname}`) || "",
    },
    validationSchema: yup.object().shape({
      reqnum: yup.number().required("الرجاء ادخال طلب الإمداد"),
      delivaryAuth: yup.string().required("الرجاء ادخال إذن التسليم"),
    }),
    onSubmit: (values) => {
      values = {
        id: new Date().getTime(),
        ...values,
        medicine: { ...medicines },
      };
      console.log(values);
      setMedicines([]);
      formik.resetForm();
      sessionStorage.clear();
      formik.setValues({
        reqnum: "",
        delivaryAuth: "",
      });
    },

  });
  const handleMedicines = (e) => {
    e.preventDefault();
    const getMedi = [...medicines ,{
      id: new Date().getTime(),
      name: name,
      quantity,
      expire,
      price,
      supply,
      supplier,
    }]
    setMedicines(getMedi);
    sessionStorage.setItem(`medicines-${window.location.pathname}`, JSON.stringify(getMedi));
    handleClose();
  };
  const handleDelete = (id) => {
    const newMedicine = medicines.filter((medi) => medi.id !== id);
    setMedicines(newMedicine);
    sessionStorage.setItem(`medicines-${window.location.pathname}`, JSON.stringify(newMedicine));

  };
  const handleEdit = (id, name) => {
    const medicine = medicines.find((medi) => medi.id === id);
    setName(medicine.name);
    setQuantity(medicine.quantity);
    setExpire(medicine.expire);
    setPrice(medicine.price);
    setSupply(medicine.supply);
    setSupplier(medicine.supplier);
    handleShow();
  };
  const saveChanges = (id) => {
    const newMedicine = medicines.map((medi) => {
      if (medi.id === id) {
        return {
          ...medi,
          name: name,
          quantity,
          expire,
          price,
          supply,
          supplier,
        };
      }
      sessionStorage.setItem(`medicines-${window.location.pathname}`, JSON.stringify(newMedicine));

      return medi;
    });
    setMedicines(newMedicine);
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
      className={`${style.newOrder} d-flex flex-column px-sm-5 px-0 pb-4 w-md-75 w-sm-100 w-lg-100`}
    >
      {spinner && spinnerElement}
      <div className="d-flex flex-row align-items-center mb-2 gap-2">
        <Link to="/stock">
          <AiFillRightCircle size={24} fill="#28465C" />
        </Link>
        <p className="mainTitle">اضافة طلبية جديدة</p>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="flex-wrap" lg="2" xs="1" md="1">
          <Col>
            <Input
              className="text-end"
              error={formik.errors.reqnum}
              touched={formik.touched.reqnum}
              onBlur={formik.handleBlur}
              value={formik.values.reqnum}
              onChange={formik.handleChange}
              width={"100%"}
              label="طلب الإمداد"
              type="number"
              id="reqnum"
              name="reqnum"
              icon={"#"}
            />
            <Input
              error={formik.errors.delivaryAuth}
              onBlur={formik.handleBlur}
              touched={formik.touched.delivaryAuth}
              value={formik.values.delivaryAuth}
              onChange={formik.handleChange}
              width={"100%"}
              className="mt-2 text-end"
              label="إذن التسليم"
              type="number"
              id="delivaryAuth"
              name="delivaryAuth"
              icon={<AiFillLock />}
            />
            <div className={`${style.mediTable} overflow-y-scroll mt-2 px-1`}>
              <Table striped hover>
                <thead>
                  <tr>
                    <th className={show2 ? "showFonts" : "noshowFonts"}>#</th>
                    <th className={show2 ? "showFonts" : "noshowFonts"}>
                      الدواء
                    </th>
                    <th className={show2 ? "showFonts" : "noshowFonts"}>
                      الكمية
                    </th>
                    <th className={show2 ? "showFonts" : "noshowFonts"}>
                      الصلاحية
                    </th>
                    <th className={show2 ? "showFonts" : "noshowFonts"}>
                      المورد
                    </th>
                    <th className={show2 ? "showFonts" : "noshowFonts"}>
                      السعر
                    </th>
                    <th className={show2 ? "showFonts" : "noshowFonts"}>
                      الأيقونات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.length
                    ? medicines.map((medi, index) => (
                        <MediSelected
                          show={show2}
                          mode="order"
                          setId={setId}
                          setMode={setMode}
                          key={medi.id}
                          name={medi.name}
                          quantity={medi.quantity}
                          price={medi.price}
                          supplier={medi.supplier}
                          expire={medi.expire}
                          supply={medi.supply}
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
          </Col>
          <Col className="">
            <div
              className={`${style.buttonandsvg} overflow-hidden mt-2 mt-lg-0`}
            >
              <div
                className=""
                style={{ width: "fit-content", margin: "auto" }}
              >
                <div
                  className="btnnn text-center mt-4 mt-lg-0 m-auto"
                  style={{ width: "180px" }}
                >
                  <img src="/medicine.svg" alt="" />
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
                  إضافة طلبية
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
            <Form onSubmit={handleMedicines}>
              <Row className="flex-wrap">
                <Col>
                  <InputAutoComplete2
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setChange(true);
                    }}
                    className="text-end mt-2"
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
              <Row className="mt-2 flex-wrap ">
                <Col>
                  <Input
                    value={expire}
                    onChange={(e) => setExpire(e.target.value)}
                    className="text-end mt-2 mt-md-0"
                    width={"100%"}
                    label="تاريخ التوريد"
                    type="date"
                    id="supply"
                    name="supply"
                    icon={<BsFillCalendarDateFill />}
                  />
                </Col>
                <Col>
                  <Input
                    value={supply}
                    onChange={(e) => setSupply(e.target.value)}
                    className="text-end mt-2 mt-md-0"
                    width={"100%"}
                    label="تاريخ الصلاحية"
                    type="date"
                    id="expire"
                    name="expire"
                    icon={<BsFillCalendarDateFill />}
                  />
                </Col>
              </Row>
              <Row className="mt-2 flex-wrap ">
                <Col>
                  <Input
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="text-end mt-2 mt-md-0"
                    width={"100%"}
                    label="المورد"
                    type="text"
                    id="supplier"
                    name="supplier"
                    icon={<BiSolidFactory />}
                  />
                </Col>
                <Col>
                  <Input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="text-end mt-2 mt-md-0"
                    width={"100%"}
                    label="السعر"
                    type="number"
                    id="price"
                    name="price"
                    icon={"جنيه"}
                  />
                </Col>
              </Row>
              <Row></Row>
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
                    disabled={
                      !name ||
                      !quantity.trim() ||
                      !expire.trim() ||
                      !supply.trim() ||
                      !supplier.trim() ||
                      !price.trim()
                    }
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

export default NewOrder;
