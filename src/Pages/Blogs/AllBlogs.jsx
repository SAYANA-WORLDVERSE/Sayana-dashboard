import React, { Fragment, useState, useEffect } from "react";
import { RiArticleFill } from "react-icons/ri";
import axios from "axios";
import { baseUrl } from "../../api";
import blog from "../../assets/blogs.webp";
import "../../style/Blog.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AllBlogs = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [err, seterrors] = useState();
  const navigate=useNavigate()
  // get all blogs
  const allBlogs = async () => {
    const response = await axios.get(`${baseUrl}blog/getallblogs`);
    setData(response.data.blogs);
  };
  // delete particular blog

  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}blog/${id}`);

      if (response.status === 200) {
        toast("Blog Deleted Successfully", {
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
  };

  useEffect(() => {
    allBlogs();
  }, []);

  return (
    <Fragment>
      <section className="home-container p-4">
        <div className="home-header d-flex  align-items-center gap-2">
          <span className="home-icons">
            <RiArticleFill />
          </span>
          <p className="home-title m-0">All Blogs</p>
        </div>
        <div className="row mt-3 flex-wrap">
          {data &&
            data.map((item) => {
              return (
                <div className="col-md-3 mt-3 stretch-card grid-margin " key={item._id}>
                  <div className="card bg-gradient-primary card-img-holder text-white border-0 p-2">
                    <div className="card-header">
                      <img src={`${baseUrl}${item.file}`} alt="" className="w-100  blog-img" />
                    </div>
                    <div className="card-body">
                      <h4 className="text-center">{item.title}</h4>
                      <p>{item.description.slice(0,120)}{item.description.length > 120 && '...'}</p>
                    </div>
                    <div className="card-footer d-flex justify-content-center gap-3">
                      <button className="btn btn-primary" onClick={()=>navigate(`/editblog/${item._id}`)}>Edit</button>
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

export default AllBlogs;
