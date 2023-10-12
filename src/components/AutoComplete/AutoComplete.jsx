import { Form } from "react-bootstrap";
import { AsyncTypeahead, Typeahead } from "react-bootstrap-typeahead";
import style from "./AutoComplete.module.css";
const AutoComplete = ({label , icon , ...props}) => {
  return (
    <Form.Group className={style.all}>
      <Form.Label>{label}</Form.Label>
      <AsyncTypeahead
        {...props}
      />
      <p className={style.icon}>{icon}</p>

      <div className={style.under}></div>
    </Form.Group>
  );
};

export default AutoComplete;
