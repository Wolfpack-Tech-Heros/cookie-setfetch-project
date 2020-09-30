import React,{useContext, useState} from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import AuthApi from "./AuthApi";
import Cookies from "js-cookie";
import axios from 'axios';
import Button from "@salesforce/design-system-react/lib/components/button";

function LoginForm() {
  const auth = useContext(AuthApi);
  const [loadedUsers, setLoadedUsers] = useState();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    //event.preventDefault();
    
    axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/getUser`)
    .then(response => {
      //console.log(response.data)
      auth.setAuth(true);
      Cookies.set('user',values.email);
    })
    .catch(error => {
      console.log("catch");
      console.log(error)
    })
  };

  return (
    
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
            />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
            />
            <Button variant="brand" type="submit" label="Login" disabled={!formik.isValid} />
            
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
