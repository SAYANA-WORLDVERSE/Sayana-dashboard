import React, { useState } from "react";
import "../style/Login.css";
import logo from "../assets/white-logo.png";
import { Link, useNavigate } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import CircularProgress from "@mui/material/CircularProgress";

import * as Yup from "yup";
import { baseUrl } from "../api";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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

  const handleSubmiting = async (values, { setSubmitting, resetForm }) => {
    alert("hy");
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}register`, values);
      if (response.status == 201) {
        const data = await response.data;
        Swal.fire({
          icon: "success",
          title: "User Register Successfully!",
          text: "Thank you for Register,Now You can login.",
        });
      }

      resetForm();
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };
  return (
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3 login">
              <div className="card mb-0">
                <div className="card-body">
                  <a
                    href="./index.html"
                    className="text-nowrap logo-img text-center d-block  w-100"
                  >
                    <img src={logo} width="180" alt="" />
                  </a>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmiting}
                  >
                    <Form>
                      <div className="mb-3">
                        <label className="form-label text-white">
                          Username
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="username"
                        />
                        <ErrorMessage
                          name="username"
                          className="error-message"
                          component="p"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label text-white">Email</label>
                        <Field
                          type="email"
                          className="form-control"
                          name="email"
                        />
                        <ErrorMessage
                          name="username"
                          className="error-message"
                          component="p"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label text-white">Mobile</label>
                        <Field
                          type="number"
                          className="form-control"
                          name="mobile"
                        />
                        <ErrorMessage
                          name="username"
                          className="error-message"
                          component="p"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label text-white">
                          Password
                        </label>
                        <Field
                          type="password"
                          className="form-control"
                          name="password"
                        />
                        <ErrorMessage
                          name="username"
                          className="error-message"
                          component="p"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                      >
                        {loading ? (
                          <>
                            <CircularProgress color="success" />
                          </>
                        ) : (
                          <>Sign Up</>
                        )}
                      </button>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
