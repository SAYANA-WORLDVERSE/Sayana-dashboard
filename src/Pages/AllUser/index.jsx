import React, { Fragment, useState, useEffect, useCallback } from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "../../api";
import {useNavigate} from "react-router-dom"

const index = () => {
  const navigate=useNavigate();
  const [data, setData] = useState([]);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);

  const userdata = useCallback(async () => {
    try {
      const res = await axios.get(`${baseUrl}userdetails`);
      setData(res.data.user);
    } catch (error) {
      seterror(error);
    } finally {
      setloading(false);
    }
  }, []);
  useEffect(() => {
    userdata();
  }, [userdata]);
  return (
    <Fragment>
      <section className="p-4">
        <div className="home-header d-flex  align-items-center  justify-content-between">
          <div className=" d-flex  align-items-center gap-2">
            <span className="home-icons">
              <FaUser />
            </span>
            <p className="home-title m-0">All User</p>
          </div>
          <div className=" d-flex  align-items-center gap-2">
            <button className="home-icons p-1" onClick={()=>navigate('/createuser')}>Create User</button>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">All User</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead className="table-header">
                      <tr>
                        <td>Sl No</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Mobile</td>
                        <td>Created date</td>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.map((item, index) => {
                          return (
                            <tr key={item._id}>
                              <td>{index + 1}</td>
                              <td>{item.username}</td>
                              <td>{item.email}</td>
                              <td>{item.mobile}</td>
                              <td>
                                {item.date instanceof Date
                                  ? item.date.toLocaleDateString()
                                  : typeof item.date === "string" &&
                                    item.date.trim() !== ""
                                  ? new Date(item.date).toLocaleDateString()
                                  : "Invalid Date"}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default index;
