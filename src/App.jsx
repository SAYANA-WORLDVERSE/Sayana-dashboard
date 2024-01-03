import React, { Fragment, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Global/Sidebar";
import Header from "./Global/Header";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ErrorPage from "./Components/ErrorPage";
import Home from "./Pages/Dashboard/index";
import Alluser from "./Pages/AllUser/index";
import CreateUser from "./Pages/AllUser/CreateUser";
import AllLeads from "./Pages/Leads/AllLeads";
import Career from "./Pages/Leads/CareerLeads";
import AllBlogs from "./Pages/Blogs/AllBlogs";
import CreateBlog from "./Pages/Blogs/CreateBlog";
import EditBlog from "./Pages/Blogs/EditBlog";
import AllReview from "./Pages/Reviews/AllReview";
import CreateReview from "./Pages/Reviews/CreateReview";
import EditReview from "./Pages/Reviews/EditReview";
import Allprojects from "./Pages/Projects/Allprojects";
import Addproject from "./Pages/Projects/Addproject";
import Setting from "./Pages/Settings/setting";

const App = () => {
  const Token = sessionStorage.getItem("token");

  return (
    <Fragment>
      <div className="container-fluid">
        {Token ? (
          <>
            <div className="row">
              <div className="col-2">
                <Navbar />
              </div>
              <div className="col-10 p-0">
                <Header />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Alluser" element={<Alluser />} />
                  <Route path="/createuser" element={<CreateUser />} />
                  <Route path="/Allleads" element={<AllLeads />} />
                  <Route path="/Careerleads" element={<Career />} />
                  <Route path="/logout" element={<Register />} />
                  <Route path="/allblogs" element={<AllBlogs />} />
                  <Route path="/createblog" element={<CreateBlog />} />
                  <Route path="/editblog/:id" element={<EditBlog />} />
                  <Route path="/allreviews" element={<AllReview />} />
                  <Route path="/addreview" element={<CreateReview />} />
                  <Route path="/editreview/:id" element={<EditReview />} />
                  <Route path="/allprojects" element={<Allprojects />} />
                  <Route path="/addproject" element={<Addproject />} />
                  <Route path="/setting" element={<Setting />} />

                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default App;
