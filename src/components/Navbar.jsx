import React from "react";
import { Col, Row } from "react-bootstrap";
import Icon from "./Icon/Icon";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiFillBell } from "react-icons/ai";
import Profile from "./Profile/Profile";
import style from "../Layout/DefaultLayout/DefaultLayout.module.css";
import { useState } from "react";
import { ShowContext } from "../context/ShowContext";
import { useContext } from "react";

const Navbar = ({ ...props}) => {
  const {show , setShow} = useContext(ShowContext);
  return (
    <Row {...props}>
      <Col className={`${style.navAll} px-md-5 `}>
        <Icon
          onClick={() => {
            setShow((d) => !d);
            localStorage.setItem("sidebar", !show);
          }}
          icon={<HiMenuAlt3 />}
        />

        <div
          className={`${style.part2} d-flex gap-2 justify-content-center align-items-center`}
        >
          <Icon icon={<AiFillBell />} />
          <Profile />
        </div>
      </Col>
    </Row>
  );
};

export default Navbar;
