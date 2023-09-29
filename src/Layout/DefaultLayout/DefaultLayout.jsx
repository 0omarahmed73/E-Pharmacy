import { Outlet } from "react-router-dom";
import style from "./DefaultLayout.module.css";
import { Col, Container , Row } from "react-bootstrap";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiFillBell } from "react-icons/ai";
import logo from "../../assets/Group 45.png";
import SideLink from "../../components/SideLink/SideLink";
import { useEffect, useRef, useState } from "react";
import Icon from "../../components/Icon/Icon";
import Profile from "../../components/Profile/Profile";
import Sidebar from './../../components/Sidebar';
import Navbar from './../../components/Navbar';

const DefaultLayout = () => {
  if (!localStorage.getItem("sidebar")) {
    localStorage.setItem("sidebar", false);
  }
  const [show, setShow] = useState(JSON.parse(localStorage.getItem("sidebar")));
  return (
    <div className={style.default}>
      <Row xs={'12'} className="m-auto">
          <Sidebar show={show} />
        <Col>
          <Navbar setShow={setShow} show={show}/>
          <Container className="pt-4">
          <Outlet />
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default DefaultLayout;
