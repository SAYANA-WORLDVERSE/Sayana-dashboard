import React, { Fragment } from "react";
import "../style/Navbar.css";
import { MdSpaceDashboard } from "react-icons/md";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserFriends, FaUsersCog, FaUser } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";

const Navbar = () => {
  return (
    <Fragment>
      <aside className="left-sidebar col-2">
        <div>
          <div className="brand-logo d-flex align-items-center justify-content-center">
            <img src={logo} width="150" alt="" />

            <div
              className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
              id="sidebarCollapse"
            >
              <i className="ti ti-x fs-8"></i>
            </div>
          </div>
          <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
            <ul id="sidebarnav">
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">Home</span>
              </li>
              <li className="sidebar-item">
                <Link to="/" className="sidebar-link">
                  <span>
                    <MdSpaceDashboard />
                  </span>
                  <span className="hide-menu">Dashboard</span>
                </Link>
              </li>
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">User</span>
              </li>
              <li className="sidebar-item">
                <Link to="/Alluser" className="sidebar-link">
                  <span>
                    <FaUserFriends />
                  </span>
                  <span className="hide-menu">All User</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="createuser" className="sidebar-link">
                  <span>
                    <FaUsersCog />
                  </span>
                  <span className="hide-menu">Create User</span>
                </Link>
              </li>

              <li className="nav-small-cap">
                <span className="hide-menu">Leads</span>
              </li>
              <li className="sidebar-item">
                <Link to="/Allleads" className="sidebar-link">
                  <span>
                    <FaUser />
                  </span>
                  <span className="hide-menu">All Leads</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link to="/Careerleads" className="sidebar-link">
                  <span>
                    <FaUser />
                  </span>
                  <span className="hide-menu">Career Leads</span>
                </Link>
              </li>

              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">Blogs</span>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                to="/allblogs"
                >
                  <span>
                    <MdArticle />
                  </span>
                  <span className="hide-menu">All Blogs</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
               to="/createblog"
                >
                  <span>
                    <IoIosCreate />
                  </span>
                  <span className="hide-menu">Create Blogs</span>
                </Link>
              </li>
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">Review</span>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                to="/allreviews"
                >
                  <span>
                    <MdArticle />
                  </span>
                  <span className="hide-menu">All Review</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
               to="/addreview"
                >
                  <span>
                    <IoIosCreate />
                  </span>
                  <span className="hide-menu">Add Review</span>
                </Link>
              </li>
              <li className="nav-small-cap">
                <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                <span className="hide-menu">Projects</span>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                to="/allprojects"
                >
                  <span>
                    <MdArticle />
                  </span>
                  <span className="hide-menu">All Projects</span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
               to="/addproject"
                >
                  <span>
                    <IoIosCreate />
                  </span>
                  <span className="hide-menu">Add Project</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </Fragment>
  );
};

export default Navbar;
