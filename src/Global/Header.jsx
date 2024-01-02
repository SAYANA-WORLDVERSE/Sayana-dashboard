import React, { Fragment, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import "../style/Header.css";
import profile from "../assets/profile-pic.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import { IoSettings } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const Navigate=useNavigate()
  const Logout = () => {
    alert("logout");
    sessionStorage.removeItem("Token");
    window.location.href = "/";
  };

  useEffect(() => {}, []);
  return (
    <Fragment>
      <header className="app-header p-3  w-100 ">
        <nav className="d-flex justify-content-between ">
          <div className="bar d-flex align-items-center gap-5">
            <FaBars />
            <input
              type="search"
              className="form-control search"
              name="search"
              placeholder="Search..."
            />
          </div>
          <div className="account">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <img src={profile} alt="" className="profile" />
                <span className="m-2">Bandan</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <li className="acc-list" onClick={()=>Navigate('/setting')}>
                  <IoSettings />
                  <span>Setting</span>
                </li>
                <li className="acc-list" onClick={Logout}>
                  <LuLogOut />
                  <span>Logout</span>
                </li>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
