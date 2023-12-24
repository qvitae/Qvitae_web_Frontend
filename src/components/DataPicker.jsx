/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap"

export default function DataPicker({label, value, onChange}) {
  return (
    <div className="row">
      {label && (
        <div>
          <Form.Group controlId="dob">
            <Form.Label>{label}</Form.Label>
            <Form.Control type="date" name="dob" placeholder="Date of Birth" 
              value={value}
              onChange={onChange}
            />
          </Form.Group>
        </div>
      )}
      {!label && (
        <div>
          <Form.Group controlId="dob">
            <Form.Control type="date" name="dob" placeholder="Date of Birth" 
               value={value}
               onChange={onChange}
            />
          </Form.Group>
        </div>
      )}
    </div>
  )
}
