import React, { Fragment, useEffect, useState } from "react";
import "../../style/Home.css";
import { IoMdHome } from "react-icons/io";
import circle from "../../assets/circle.1541da91.svg";
import Loader from "../../Components/Loader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import Table from "../../Components/Table";
import axios from "axios";
import { baseUrl } from "../../api";

const index = () => {
  const [Leads, setLeads] = useState([]);
  const [isLoading, setLoading] = useState(true);
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
      setLoading(false);

    } catch (error) {
      seterror(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AllLeads();
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
   const dataLine = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
 

  return (
    <Fragment>
      <section className="home-container p-4">
        <div className="home-header d-flex  align-items-center gap-2">
          <span className="home-icons">
            <IoMdHome />
          </span>
          <p className="home-title m-0">Dashboard</p>
        </div>
        <div className="row mt-3">
          <div className="col-md-4 stretch-card grid-margin ">
            <div className="card bg-gradient-danger card-img-holder text-white border-0">
              <div className="card-body">
                <img src={circle} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">
                  Total Leads
                  <i className="mdi mdi-chart-line mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{Leads.length}</h2>
                <h6 className="card-text">Increased by 60%</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin ">
            <div className="card bg-gradient-info card-img-holder text-white border-0">
              <div className="card-body">
                <img src={circle} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">
                  Weekly Orders{" "}
                  <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">45,6334</h2>
                <h6 className="card-text">Decreased by 10%</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white border-0">
              <div className="card-body">
                <img src={circle} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">
                  Visitors Online{" "}
                  <i className="mdi mdi-diamond mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">95,5741</h2>
                <h6 className="card-text">Increased by 5%</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="clearfix mb-4">
                  <h4 className="card-title float-left">
                    Visit And Sales Statistics
                  </h4>
                  <Bar options={options} data={data} />

                  <div
                    id="visit-sale-chart-legend"
                    className="rounded-legend legend-horizontal legend-top-right float-right"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 grid-margin stretch-card ">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Traffic Sources</h4>
                <div
                  id="traffic-chart-legend"
                  className="rounded-legend legend-vertical legend-bottom-left pt-4"
                >
                  <Line data={dataLine} options={options} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">All Leads</h4>
                <div className="table-responsive d-flex justify-content-center">
                  {isLoading ?<><Loader/></>:   <Table data={Leads} header={tableHeader} />}
               
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
