import React,{useContext} from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
import AuthApi from "./AuthApi";
import Cookies from "js-cookie";
import axios from 'axios';

function LoginForm() {
  const Auth = useContext(AuthApi);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    Auth.setAuth(true);
    Cookies.set('user',values.email);

    axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/testAPI`)
    .then(response => {
      console.log(response.data)
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
            <button type="submit" disabled={!formik.isValid}>
              Login
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
