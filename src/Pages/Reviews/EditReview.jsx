import React, { Fragment, useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { baseUrl } from "../../api";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditReview = () => {
  const params = useParams();
  const { id } = params;
  const [data, setFormData] = useState({
    name: "",
    title: "",
    rating: "",
    description: "",
  });

  const singleReview = async () => {
    const response = await axios.get(`${baseUrl}review/${id}`);
    setFormData(response.data);
  };
  const handleChange = (e) => {
    setFormData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmiting = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const response = await axios.put(
        `${baseUrl}review/editreview/${id}`,
        data
      );
      if (response.status == 201) {
        const data = await response.data;
        console.log(data);
      }
      window.location.href = "/allreviews";
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    singleReview();
  }, []);

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

                <form onSubmit={handleSubmiting}>
                  <div>
                    <label htmlFor="Full name">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      required
                      value={data.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="Title">Title</label>
                    <input
                      name="title"
                      type="text"
                      className="form-control"
                      required
                      value={data.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="Mobile">Rating</label>
                    <input
                      name="rating"
                      type="text"
                      className="form-control"
                      required
                      value={data.rating}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="Description">Description</label>
                    <input
                      name="description"
                      type="text"
                      className="form-control"
                      required
                      value={data.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn-gradient">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditReview;
