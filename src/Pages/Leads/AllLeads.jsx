import React, { Fragment,useEffect, useState } from "react";
import Table from "../../Components/Table";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "../../api";

const AllLeads = () => {
  const [Leads, setLeads] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, seterror] = useState(null);
  const tableHeader = [
    "sl",
    "Full Name",
    "Mobile Number",
    "Email",
    "Services",
    "Subject",
    "Message",
  ];


  
  const AllLeads = async () => {
    try {
      const res = await axios.get(`${baseUrl}contact/allLeads`);
      setLeads(res.data.allLeads);
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
            <p className="home-title m-0">All Leads</p>
          </div>
        
        </div>

        <div className="row mt-3">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">All Leads</h4>
                <div className="table-responsive">
                <Table data={Leads} header={tableHeader} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default AllLeads;
