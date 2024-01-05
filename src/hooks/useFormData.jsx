import { useContext } from "react";
import { FormContext } from "../context/CvFormProvider";



export const useFormData = () => useContext(FormContext);