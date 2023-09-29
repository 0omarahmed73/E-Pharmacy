import { FloatingLabel, Form } from "react-bootstrap";
import style from "./Input.module.css";

const Input = ({label , icon , id , width , value , error , touched , ...props}) => {
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
