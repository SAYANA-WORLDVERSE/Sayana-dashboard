import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { baseUrl } from "../../api";
import { RiArticleFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

const Allprojects = () => {
  const [data, setData] = useState([]);

  const getAllProjects = async () => {
    try {
      const response = await axios.get(`${baseUrl}subcategory/getallproject`);
      const projectdata = response.data.allprojects;
      setData(projectdata);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    const sure = confirm("Are you sure you want to delete this project");
    if (sure) {
      try {
        const response = await axios.delete(`${baseUrl}subcategory/${id}`);

        if (response.status === 200) {
          toast("Project  Deleted Successfully", {
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

        allBlogs();
      } catch (error) {
        seterrors(error.message);
      }
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <Fragment>
      <section className="home-container p-4">
        <div className="home-header d-flex  align-items-center gap-2">
          <span className="home-icons">
            <RiArticleFill />
          </span>
          <p className="home-title m-0">All Projects</p>
        </div>
        <div className="row mt-3 flex-wrap">
          {data &&
            data.map((item) => {
              return (
                <div
                  className="col-md-3 mt-3 stretch-card grid-margin "
                  key={item._id}
                >
                  <div className="card bg-gradient-primary card-img-holder text-white border-0 p-2">
                    <div className="card-header">
                      <img
                        src={`${baseUrl}${item.file}`}
                        alt=""
                        className="w-100  blog-img"
                      />
                    </div>
                    <div className="card-body">
                      <h4 className="text-center">{item.title}</h4>
                    </div>
                    <div className="card-footer d-flex justify-content-center gap-3">
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteBlog(item._id)}
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

export default Allprojects;
