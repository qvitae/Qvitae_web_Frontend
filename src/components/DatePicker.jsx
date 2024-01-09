/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';


export default function DatePicker({label, value, onChange, max}) {
  return (
    <div className="row">
      <div>
          <Form.Group controlId="dob">
            {label && <Form.Label>{label}</Form.Label>}
            {/* <Calendar maxDate={max} value={value} onChange={onChange}/> */}
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
