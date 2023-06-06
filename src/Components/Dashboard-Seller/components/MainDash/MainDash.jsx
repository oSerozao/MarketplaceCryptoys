import React from "react";
import Cards from "../Card/Card";
import Table from "../Table/Tabledata";
import "./MainDash.css";
import NavbarDB from "../../../NavbarDB";

const MainDash = () => {
  return (

    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <Table />
    </div>
    
  );
};

export default MainDash;
