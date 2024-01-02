import React, { Fragment, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { baseUrl } from "../../api";

const Setting = () => {
  const [formData, setFormData] = useState({
    location: "",
    number: "",
    social_links: [],
    email: "",
    file: "",
  });
 

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
    projectData.append("location", formData.location);
    projectData.append("file", formData.file);
    projectData.append("number", formData.number);
    projectData.append("email", formData.email);
    formData.social_links.forEach((link, index) => {
      projectData.append(`social_links[${index}][platform]`, link.platform);
      projectData.append(`social_links[${index}][link]`, link.link);
    });

    try {
      const response = await axios.post(
        `${baseUrl}contact/createdetails`,
        projectData,
        headers
      );
      setFormData({
        location: "",
        number: "",
        social_links: [],
        email: "",
        file: "",
      })
      console.log(response);
      // window.location.href='/dashboard'
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
 
  return (
    <Fragment>
      <section className="p-3 user-form">
        <div className="home-header d-flex  align-items-center gap-2">
          <span className="home-icons">
            <IoMdAdd />
          </span>
          <p className="home-title m-0">All Details</p>
        </div>

        <div className="d-flex w-100 mt-5">
          <div className="row w-100 d-flex justify-content-center align-item-center">
            <div className="col-md-8 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title text-center">Create Blog</h4>

                  <form onSubmit={handleSubmiting}>
                   
                    <div>
                      <label htmlFor="Mobile Number">Mobile Number</label>
                      <input
                        name="number"
                        type="text"
                        className="form-control"
                        value={formData.number}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="Email">Email</label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="Location">Location</label>
                      <input
                        name="location"
                        type="text"
                        className="form-control"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="Image">Image</label>
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

export default Setting;
