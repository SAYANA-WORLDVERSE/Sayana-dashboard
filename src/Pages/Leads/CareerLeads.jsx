import React, { Fragment, useState, useEffect, useCallback } from "react";
import Table from "../../Components/Table";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "../../api";

const Career = () => {
  const [Leads, setLeads] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, seterror] = useState(null);


  const AllLeads = async () => {
    try {
      const res = await axios.get(`${baseUrl}candidate/allcandidates`);
      setLeads(res.data.allCandidates);
    } catch (error) {
      seterror(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AllLeads();
  }, []);

  
  return (
    <Fragment>
      <section className="p-4">
        <div className="home-header d-flex  align-items-center  justify-content-between">
          <div className=" d-flex  align-items-center gap-2">
            <span className="home-icons">
              <FaUser />
            </span>
            <p className="home-title m-0">All Candidates</p>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Candidates details</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <td>Sl No</td>
                        <td>Full Name</td>
                        <td>Mobile Number</td>
                        <td>Email</td>
                        <td>Position</td>
                        <td>Resume</td>
                        <td>message</td>
                      </tr>
                    </thead>
                    <tbody>
                    {Leads && Leads.map((item,index) =>{
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.full_name}</td>
                <td>{item.mobile}</td>
                <td>{item.email}</td>
                <td>{item.position}</td>
                <td><a href={`${baseUrl}${item.file}`}  target="_blank">Download CV</a></td>
                <td>{item.message}</td>
              </tr>
            )
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

export default Career;
