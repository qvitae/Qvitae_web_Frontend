/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap"

export default function DataPicker({label, value, onChange}) {
  return (
    <div className="row">
      <div>
          <Form.Group controlId="dob">
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control type="date" name="dob" placeholder="Date of Birth" 
              value={value}
              onChange={onChange}
            />
          </Form.Group>
        </div>
    </div>
  )
}
