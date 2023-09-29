import React, { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import SideLink from "./SideLink/SideLink";
import style from "../Layout/DefaultLayout/DefaultLayout.module.css";
import logo from "../assets/Group 45.png";
import useWindowDimensions from "../hooks/useWindowDimensions";
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
  const ref = useRef();
  const diminsions = useRefDimensions(ref);

  return (
    <>
      {show ? (
        <Col
          xs="4"
          sm="4"
          md="3"
          lg="2"
          style={{ transition: "0.5s"}}
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
              <SideLink to="/">الصفحة الرئيسية</SideLink>
              <SideLink to="/stock">المخازن</SideLink>
              <SideLink to="/patients">المرضى</SideLink>
              <SideLink to="/reports">التقارير</SideLink>
              <SideLink to="/add-new-account">إضافة حساب جديد</SideLink>
            </div>
          </div>
        </Col>
      ) : (
        <Col
          style={{
            marginRight: `-${diminsions.width}px`,
            overflow: "hidden",
            transition: "0.5s",
            opacity: 0,
            visibility: "hidden",
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
