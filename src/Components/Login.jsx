import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Login.css";
import logo from "../assets/white-logo.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import * as Yup from "yup";
import { baseUrl } from "../api";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .max(20, "user name should be above 5 letter")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
      )
      .required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}login`, values);
      if (response.status == 201) {
        const data = await response.data;
        sessionStorage.setItem("Token", data.token);
      }

      window.location.href = "/dashboard";

      resetForm();
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("invalid credential", {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    } finally {
      setLoading(false);
      setSubmitting(false);
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
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label text-white"
                        >
                          Username
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="username"
                          required
                        />
                        <ErrorMessage
                          name="username"
                          className="error-message"
                          component="p"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label text-white"
                        >
                          Password
                        </label>
                        <Field
                          type="password"
                          className="form-control"
                          name="password"
                          required
                        />
                        <ErrorMessage
                          name="password"
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
                          <>Sign In</>
                        )}
                      </button>
                      <div className="d-flex align-items-center justify-content-center">
                        <p className="fs-5 mb-0 fw-bold text-white">
                          New to Sayana
                        </p>
                        <Link
                          className="text-primary fw-bold ms-2"
                          to="/register"
                        >
                          Create an account
                        </Link>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
