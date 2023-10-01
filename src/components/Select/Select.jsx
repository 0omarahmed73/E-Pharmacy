import { FloatingLabel } from "react-bootstrap"
import style from "./Select.module.css"
import { Form } from "react-bootstrap"

const Select = ({label , children , width , error , touched , id , ...props}) => {
  return (
    <Form.Group className={style.select}>
      <FloatingLabel
          controlId={id}
          label={label}
          className="selectlabel"
        >
          <Form.Select isInvalid={error && touched} {...props} aria-label="Floating label select example">
            {children}
          </Form.Select>
          <div className={style.under}>
      </div>
      <Form.Text className="text-danger"></Form.Text>
        </FloatingLabel>
    </Form.Group>
  )
}

export default Select