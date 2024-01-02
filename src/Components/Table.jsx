import React, { Fragment } from "react";

const Table = ({ data, header }) => {
  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            {header &&
              header.map((item,index) => {
                return <th key={index}>{item}</th>;
              })}
          </tr>
        </thead>
        <tbody>

          {data && data.map((item,index) =>{
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.full_name}</td>
                <td>{item.mobile}</td>
                <td>{item.email}</td>
                <td>{item.services}</td>
                <td>{item.subject}</td>
                <td>{item.message}</td>
              </tr>
            )
          })}
          
        </tbody>
      </table>
    </Fragment>
  );
};

export default Table;
