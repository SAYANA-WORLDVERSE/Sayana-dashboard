import React, { Fragment, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Formik, Field, Form } from "formik";
import { baseUrl } from "../../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateReview = () => {
  const Navigate = useNavigate();

  const initialValues = {
    name: "",
    title: "",
    rating: "",
    description: "",
  };

  const handleSubmiting = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        `${baseUrl}review/createreview`,
        values
      );
      if (response.status == 201) {
        const data = await response.data;
        console.log(data);
      }
      resetForm();

      Navigate("/allreviews");
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
          <p className="home-title m-0">Add Review</p>
        </div>
      </section>
      <div className="d-flex w-100 mt-5">
        <div className="row w-100 d-flex justify-content-center align-item-center">
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-center">Review Form</h4>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmiting}
                >
                  <Form>
                    <div>
                      <label htmlFor="Full name">Full Name</label>
                      <Field
                        name="name"
                        type="text"
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="Title">Title</label>
                      <Field
                        name="title"
                        type="text"
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="Mobile">Rating</label>
                      <Field
                        name="rating"
                        type="text"
                        className="form-control"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="Description">Description</label>
                      <Field
                        name="description"
                        type="text"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn-gradient">
                        Submit
                      </button>
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

export default CreateReview;
