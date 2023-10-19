import { FloatingLabel, Form } from "react-bootstrap";
import style from "./InputAutoComplete2.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const InputAutoComplete2 = ({
  label,
  icon,
  name,
  id,
  width,
  linkAdded,
  message,
  value = "",
  error,
  touched,
  setValue,
  direction,
  dropFunction,
  items,
  formik = false,
  allValues,
  linkedAttr,
  change,
  falseChange,
  ...props
}) => {
  useEffect(() => {
      sessionStorage.setItem(`${name}-${window.location.pathname}`, value);
  }, [name, value]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (value.trim().length > 0 && !selected && change) {
      setShowDropDown(true);
      dropFunction();
    } else {
      setShowDropDown(false);
    }
  }, [change, dropFunction, selected, value]);
  useEffect(() => {
    if (selected && change) {
      setSelected(false);
      setShowDropDown(true);
    }
  }, [change, selected]);
  return (
    <Form.Group className={style.input} style={{ width: width }}>
      <FloatingLabel controlId={id} label={label}>
        <Form.Control
          value={value}
          name={name}
          {...props}
          isInvalid={error && touched}
        />
        <p className={style.icon}>{icon}</p>
      </FloatingLabel>
      <div className={style.under}></div>
      <Form.Text className="text-danger">
        {error && touched ? error : ""}
      </Form.Text>
      {showDropDown && (
        <div className={style.dropDownMenu} style={{ direction: direction }}>
          {items.length ? (
            items.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  falseChange()
                  formik ? setValue(name, item) : setValue(item);
                  formik && linkedAttr ? (
                    linkedAttr.map((attr) => {
                      setValue(attr, allValues.find((val) => val.name === item)[attr]);
                    }
                  )) : !formik && linkedAttr ? (
                    linkedAttr.map((attr => {
                      attr.setValue(allValues.find((val) => val.name === item)[attr.name]);
                    }
                  ))) : null;
                  console.log('HH');
                  setShowDropDown(false);
                  setSelected(true);
                }}
                className={style.item}
              >
                {item}
              </div>
            ))
          ) : (
            <Link to={linkAdded} className={style.item}>
              {" "}
              {message}{" "}
            </Link>
          )}
        </div>
      )}
    </Form.Group>
  );
};

export default InputAutoComplete2;
