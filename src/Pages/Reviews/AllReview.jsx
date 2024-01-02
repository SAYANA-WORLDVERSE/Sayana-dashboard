import React, { Fragment, useState, useEffect } from "react";
import { RiArticleFill } from "react-icons/ri";
import axios from "axios";
import { baseUrl } from "../../api";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

import "../../style/Blog.css";
import { ToastContainer, toast } from "react-toastify";
const AllReview = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [err, seterrors] = useState();
  const navigate = useNavigate();

  // get all blogs
  const allReviews = async () => {
    const response = await axios.get(`${baseUrl}review/Allreviews`);
    setData(response.data.data);
  };
  // delete particular Review

  const deleteReview = async (id) => {
    try {
      const response = await axios.delete(
        `${baseUrl}review/deletereview/${id}`
      );

      if (response.status === 200) {
        toast("Review Deleted Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      allReviews();
    } catch (error) {
      seterrors(error.message);
    }
  };

  useEffect(() => {
    allReviews();
  }, []);

  return (
    <Fragment>
      <section className="home-container p-4">
        <div className="home-header d-flex  align-items-center gap-2">
          <span className="home-icons">
            <RiArticleFill />
          </span>
          <p className="home-title m-0">All Review</p>
        </div>
        <div className="row mt-3 flex-wrap">
          {data &&
            data.map((item) => {
              return (
                <div className="col-md-3 mt-3 stretch-card grid-margin " key={item._id}>
                  <div className="card bg-gradient-review card-img-holder text-white border-0 p-2">
                    <div className="card-body">
                      <h4 className="text-center">{item.name}</h4>
                      <p className="text-center">
                        <Rating value={item.rating} readOnly />
                      </p>
                      <h5 className="text-center">{item.title}</h5>
                      <p className="text-center">
                        {item.description.slice(0, 35)}
                        {item.description.length > 35 && "..."}
                      </p>
                    </div>
                    <div className="card-footer d-flex justify-content-center gap-3">
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/editreview/${item._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteReview(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </section>
    </Fragment>
  );
};

export default AllReview;
