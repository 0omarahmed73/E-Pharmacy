import { FloatingLabel, Form } from "react-bootstrap";
import style from "./Input.module.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { ShowContext } from "../../context/ShowContext";

const Input = ({label , icon , id , name , width , value , error , touched , ...props}) => {
    useEffect(() => {
        sessionStorage.setItem(`${name}-${window.location.pathname}`, value);
    }, [name, value]);
  return (
<Form.Group className={style.input} style={{width : width}}>
      <FloatingLabel controlId={id} label={label}>
        <Form.Control value={value} {...props} isInvalid={error && touched} />
        <p className={style.icon}>{icon}</p>
      </FloatingLabel>
      <div className={style.under}>
      </div>
      <Form.Text className="text-danger">{error && touched ? error : ''}</Form.Text>
    </Form.Group>
  );
};

export default Input;
