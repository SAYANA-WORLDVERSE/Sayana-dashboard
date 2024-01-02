import React, { Fragment, useState ,useEffect} from "react";
import { IoMdAdd } from "react-icons/io";
import { baseUrl } from "../../api";
import axios from "axios";
import Swal from "sweetalert2";
import blog from "../../assets/blogs.webp";

import { useParams } from "react-router-dom";

const EditBlog = () => {
  const [buttonTxt, setbtnTxt] = useState("Submit");
  const params=useParams();
  const {id}=params;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: "",
  });
  

    // get all blogs
    const allBlogs = async () => {
      console.log(id)
      const response = await axios.get(`${baseUrl}blog/${id}`);
      setFormData(response.data);
    };



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmiting = async (e) => {
    e.preventDefault();
   
    const FormDataSend = new FormData();
    FormDataSend.append("title", formData.title);
    FormDataSend.append("description", formData.description);
    FormDataSend.append("file", formData.file);

    try {
      const response = await axios.put(
        `${baseUrl}blog/updateblog/${id}`,
        FormDataSend
      );

      if (response.status == 200) {
        const data = await response.data;
        console.log(data);
      }
      Swal.fire({
        icon: "success",
        title: "Form Submitted Successfully!",
        text: "Thank you for submitting the form.",
      });
      window.location.href='/Allblogs'
     
      setbtnTxt("Submit");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    allBlogs();
  }, []);

  return (
    <Fragment>
      <section className="p-3 user-form">
        <div className="home-header d-flex  align-items-center gap-2">
          <span className="home-icons">
            <IoMdAdd />
          </span>
          <p className="home-title m-0">Edit Blog</p>
        </div>
      </section>
      <div className="d-flex w-100 mt-5">
        <div className="row w-100 d-flex justify-content-center align-item-center">
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title text-center">Edit Blog</h4>

                <form onSubmit={handleSubmiting}>
                  <div>
                    <label htmlFor="Full name">Blog Title</label>
                    <input
                      name="title"
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="Email">Description</label>
                    <input
                      name="description"
                      type="text"
                      className="form-control"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="Image">Image</label>
                    <div className="d-flex gap-5">
                    <input
                      name="file"
                      type="file"
                      className="form-control col-md-6 w-75 "
                      onChange={handleFileChange}
                      required
                      
                    />
                    <img src={`${baseUrl}${formData.file}`} alt="" className="edit-blog-img "/>

                    </div>
                
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn-gradient">
                      {buttonTxt}
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

export default EditBlog;
