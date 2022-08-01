import React from "react";
import { RiDashboardFill } from "react-icons/ri";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { MdContentPaste } from "react-icons/md";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div
      style={{
        width: "290px",
        height: "745px",
        background: "#25233B",
        color: "#a6a6a6",
        position: "fixed",
      }}
    >
      <img
        style={{ width: "130px", marginLeft: "65px", marginTop: "15px" }}
        src="CompanyLogo.png"
        alt=""
      />
      <Link
        to="/dashboard"
        style={{ textDecoration: "none", color: "#a6a6a6" }}
      >
        <div className="sidebarDiv">
          {" "}
          <RiDashboardFill size={25} />{" "}
          <p className="sidebarContent">Dashboard</p>
        </div>
      </Link>
      <Link to="/services" style={{ textDecoration: "none", color: "#a6a6a6" }}>
        <div className="sidebarDiv">
          <MdOutlineMiscellaneousServices size={25} />
          <p className="sidebarContent">Services</p>
        </div>
      </Link>
      <Link
        to="/pending-requests"
        style={{ textDecoration: "none", color: "#a6a6a6" }}
      >
        <div className="sidebarDiv">
          <MdContentPaste size={25} />
          <p className="sidebarContent"> Pending Request</p>
        </div>
      </Link>

      <Link
        to="/reviewed-requests"
        style={{ textDecoration: "none", color: "#a6a6a6" }}
      >
        <div className="sidebarDiv">
          <MdContentPaste size={25} />{" "}
          <p className="sidebarContent">Reviewed Request</p>
        </div>
      </Link>
    </div>
  );
}
