import React, { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import SideLink from "./SideLink/SideLink";
import style from "../Layout/DefaultLayout/DefaultLayout.module.css";
import logo from "../assets/Group 45.png";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { ShowContext } from "../context/ShowContext";
import { useContext } from "react";
const useRefDimensions = (ref) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 2 });
  useEffect(() => {
    if (ref.current) {
      const { current } = ref;
      const boundingRect = current.getBoundingClientRect();
      const { width, height } = boundingRect;
      setDimensions({ width: Math.round(width), height: Math.round(height) });
    }
  }, [ref]);
  return dimensions;
};
const Sidebar = ({ show }) => {
  const {setShow} = useContext(ShowContext)
  const ref = useRef();
  const diminsions = useRefDimensions(ref);

  return (
    <>
      {show ? (
        <Col
          xs="12"
          sm="4"
          md="3"
          lg="2"
          style={{ 
            transition: "0.5s",
            position: "fixed",
            top: "50px",
            left: "0",
            right : '0',
            zIndex: "1000",
          }}
          className={`${style.sidebar}`}
          ref={ref}
        >
          <div
            style={{ transition: "0.3s" }}
            className={`d-flex flex-column justify-content-center align-items-center text-center ${style.children}`}
          >
            <div className={style.logo}>
              <img src={logo} alt="" />
            </div>
            <h4 className="mb-3">صيدلية الطلبة</h4>

            <div className="d-flex flex-column gap-2">
              <SideLink onClick={() => setShow(false)} to="/">الصفحة الرئيسية</SideLink>
              <SideLink onClick={() => setShow(false)} to="/stock">المخازن</SideLink>
              <SideLink onClick={() => setShow(false)} to="/patients">المرضى</SideLink>
              <SideLink onClick={() => setShow(false)} to="/reports">التقارير</SideLink>
              <SideLink onClick={() => setShow(false)} to="/add-new-account">إضافة حساب جديد</SideLink>
            </div>
          </div>
        </Col>
      ) : (
        <Col
          style={{
            transition: "0.5s",
            position: "fixed",
            top: "50px",
            left: "0",
            right : '-400px',
            zIndex: "1000",
          }}
          xs="4"
          sm="4"
          md="3"
          lg="3"
          className={`${style.sidebar}`}
          ref={ref}
        >
          <div
            className={`d-flex flex-column justify-content-center align-items-center text-center ${style.children}`}
            style={{ visibility: "hidden", transition: "0.3s" }}
          >
            <div className={style.logo}>
              <img src={logo} alt="" />
            </div>
            <h4 className="mb-3">صيدلية الطلبة</h4>

            <SideLink to="/">الصفحة الرئيسية</SideLink>
          </div>
        </Col>
      )}
    </>
  );
};

export default Sidebar;
