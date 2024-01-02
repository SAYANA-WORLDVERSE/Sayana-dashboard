import React, { Fragment,useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { baseUrl } from "../../api";
import axios from "axios";
import Swal from 'sweetalert2';


const CreateUser = () => {
  const [buttonTxt,setbtnTxt]=useState("Submit")
  const initialValues = {
    username: "",
    email: "",
    mobile: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required(true),
    email: Yup.string().email("invalid mail address").required(true),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
      )
      .required(true),
  });

  const handleSubmiting = async (values, { setSubmitting ,resetForm }) => {
    setbtnTxt("Submitting..")
    try {
      const response = await axios.post(`${baseUrl}register`, values);
      if (response.status == 200 ) {
        const data = await response.data;
      } 
      Swal.fire({
        icon: "success",
        title: "Form Submitted Successfully!",
        text: "Thank you for submitting the form.",
      });
      resetForm();
      setbtnTxt("Submit")
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <section className="p-3 user-form">
        <div className="home-header d-flex  align-items-center gap-2">
          <span className="home-icons">
            <IoMdAdd />
          </span>
          <p className="home-title m-0">Create User</p>
        </div>
      </section>
      <div className="d-flex w-100 mt-5">
        <div className="row w-100 d-flex justify-content-center align-item-center">
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-center">USER FORM</h4>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmiting}
                >
                  <Form>
                    <div>
                      <label htmlFor="Full name">Full Name</label>
                      <Field name="username" type="text"  className="form-control"/>
                      <ErrorMessage name="username" className="error-message" component="p" />
                    </div>
                    <div>
                      <label htmlFor="Email">Email</label>
                      <Field name="email" type="email" className="form-control"/>
                      <p><ErrorMessage name="email" className="error-message" component="p" /></p>
                    </div>
                    <div>
                      <label htmlFor="Mobile">Mobile</label>
                      <Field name="mobile" type="text" className="form-control"/>
                      <ErrorMessage name="mobile" className="error-message" component="p"/>
                    </div>
                    <div>
                      <label htmlFor="Password">Password</label>
                      <Field name="password" type="password" className="form-control"/>
                      <ErrorMessage name="password" className="error-message" component="p"/>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn-gradient">{buttonTxt}</button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateUser;
