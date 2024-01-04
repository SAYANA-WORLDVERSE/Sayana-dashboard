import React, { Fragment, useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { baseUrl } from "../../api";
import { useNavigate } from "react-router-dom";

const Addproject = () => {
  const Navigate=useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    file: "",
    social_links: [],
    category_name: "",
  });
  const [cetagory, setCategory] = useState([]);

  const allCategory = async () => {
    try {
      const res = await axios.get(`${baseUrl}category/allcategory`);
      const alldata = res.data.category;
      setCategory(alldata);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSocialLinkChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSocialLinks = [...formData.social_links];
    updatedSocialLinks[index] = { ...updatedSocialLinks[index], [name]: value };
    setFormData({ ...formData, social_links: updatedSocialLinks });
  };

  const handleAddSocialLink = () => {
    setFormData({
      ...formData,
      social_links: [...formData.social_links, { platform: "", link: "" }],
    });
  };
  const handleSubmiting = async (e) => {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    e.preventDefault();
    const projectData = new FormData();
    projectData.append("title", formData.title);
    projectData.append("file", formData.file);
    projectData.append("category_name", formData.category_name);
    formData.social_links.forEach((link, index) => {
      projectData.append(`social_links[${index}][platform]`, link.platform);
      projectData.append(`social_links[${index}][link]`, link.link);
    });

    try {
      const response = await axios.post(
        `${baseUrl}subcategory/createproject`,
        projectData,
        headers
      );
      console.log(response);
      window.location.reload();
       Navigate("/allprojects");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlefileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };
  useEffect(() => {
    allCategory();
  }, []);
  return (
    <Fragment>
      <section className="p-3 user-form">
        <div className="home-header d-flex  align-items-center gap-2">
          <span className="home-icons">
            <IoMdAdd />
          </span>
          <p className="home-title m-0">Add Projects</p>
        </div>

        <div className="d-flex w-100 mt-5">
          <div className="row w-100 d-flex justify-content-center align-item-center">
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-center">Create Projects</h4>

                  <form onSubmit={handleSubmiting}>
                    <div>
                      <label htmlFor="Full name">Category name</label>

                      <select
                        name="category_name"
                        id=""
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value="">Select Category</option>
                        {cetagory &&
                          cetagory.map((item) => {
                            return (
                              <option value={item._id} key={item._id}>
                                {item.project_name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="Full name">Project name</label>
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
                      <label htmlFor="Email">Image</label>
                      <input
                        name="image"
                        type="file"
                        className="form-control"
                        onChange={handlefileChange}
                        required
                      />
                    </div>
                    <div className="mt-3">
                      <div className="d-flex justify-content-between">
                        <h3>Social Links</h3>
                        <button
                          type="button"
                          onClick={handleAddSocialLink}
                          className="btn-gradient m-0"
                        >
                          Add Social Link
                        </button>
                      </div>

                      {formData.social_links.map((link, index) => (
                        <div key={index}>
                          <label className="col-md-5 m-1">
                            Platform:
                            <input
                              type="text"
                              name="platform"
                              onChange={(e) => handleSocialLinkChange(e, index)}
                              className="form-control"
                            />
                          </label>
                          <label className="col-md-5 m-1">
                            Link:
                            <input
                              type="text"
                              name="link"
                              onChange={(e) => handleSocialLinkChange(e, index)}
                              className="form-control"
                            />
                          </label>
                        </div>
                      ))}
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
      </section>
    </Fragment>
  );
};

export default Addproject;
