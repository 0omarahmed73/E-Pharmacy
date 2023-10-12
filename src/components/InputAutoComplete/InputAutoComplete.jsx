import { FloatingLabel, Form } from "react-bootstrap";
import style from "./InputAutoComplete.module.css";
import { Typeahead } from "react-bootstrap-typeahead";
import { BS5FloatingAutocompleteList } from "react-bootstrap-autocomplete-list";
import { forwardRef } from "react";

const InputAutoComplete = forwardRef(function InputAutoComplete({
  list,
  selectedValue,
  label,
  error,
  touched,
  icon,
  value,
  ...props
}) {
  return (
    <Form.Group>
      <div className={style.all}>
        <BS5FloatingAutocompleteList
          list={list}
          selectedValue={selectedValue}
          label={label}
          value={value}
          {...props}
        ></BS5FloatingAutocompleteList>
        <p className={style.icon}>{icon}</p>
        <div className={style.under}></div>
      </div>
      <Form.Text className="text-danger">
        {error && touched ? error : ""}
      </Form.Text>
    </Form.Group>
  );
});

export default InputAutoComplete;
