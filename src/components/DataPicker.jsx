/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap"

export default function DataPicker({label, value, onChange, max}) {
  return (
    <div className="row">
      <div>
          <Form.Group controlId="dob">
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control type="date" name="dob" 
              max={max}
              placeholder="Date of Birth" 
              value={value}
              onChange={onChange}
            />
          </Form.Group>
        </div>
    </div>
  )
}
