import React, { useState, useLayoutEffect } from "react";
import Button from "@mui/material/Button";
import { CgProfile } from "react-icons/cg";
import ContactUsModal from "./ContactUsModal";
import LoginModal from "./LoginModal";
import ProfileAvatar from "./ProfileAvatar";
import { deepOrange } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

export default function NavBar() {
  const auth = localStorage.getItem("isAuthorised");
  let UserName;
  if (auth) {
    const Name = localStorage.getItem("name");
    UserName = Name[0];
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const [finalData, setFinalData] = useState();

  useLayoutEffect(() => {
    try {
      fetch("http://localhost:3322/GetService")
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("data=>", resp);
          setFinalData(resp.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        background: "#001430",
        position: "fixed",
        display: "flex",
        color: "white",
        paddingTop: "15px",
        zIndex: "200",
      }}
    >
      <img
        style={{ widht: "100px", height: "100px", marginLeft: "50px" }}
        src="CompanyLogo.png"
        alt=""
      />
      <div
        style={{
          display: "flex",
          width: "700px",
          justifyContent: "space-evenly",
          marginLeft: "250px",
          paddingTop: "10px",
        }}
      >
        <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
          <p
            style={{ cursor: "pointer", fontWeight: "700", marginTop: "16px" }}
          >
            HOME
          </p>
        </Link>
        <p style={{ cursor: "pointer", fontWeight: "700", marginTop: "16px" }}>
          ABOUT US
        </p>
        <div className="dropdown">
          <button className="dropbtn">OUR SERVICES</button>
          <div className="dropdown-content">
            {finalData &&
              finalData.map((data) => <a href="#"> {data.name} </a>)}
            {/* <a href="#">Web Development</a>
            <a href="#">Logo Making And Creative Designs</a>
            <a href="#">Mobile App Development</a>
            <a href="#">Digital Marketing</a>
            <a href="#">Business Incorporation</a>
            <a href="#">StartUp Consulting And Nurturing</a> */}
          </div>
        </div>
        <ContactUsModal />
      </div>

      <div style={{ marginLeft: "170px", marginTop: "20px" }}>
        {auth ? (
          <div style={{ display: "flex" }}>
            {/* <CartModal /> */}
            <Link to="/cartPage">
              <Tooltip title="Cart">
                <img
                  style={{
                    width: "60px",
                    height: "60px",
                    marginTop: "-10px",
                    cursor: "pointer",
                  }}
                  src="cartImage.png"
                  alt=""
                />
              </Tooltip>
            </Link>

            <div className="dropdown">
              <button className="dropbtn">
                {" "}
                <Avatar sx={{ bgcolor: deepOrange[500], marginTop: "-20px" }}>
                  {UserName}
                </Avatar>
              </button>
              <div className="dropdown-content">
                <a href="#">Account</a>
                <Link to="myApplications">Applications</Link>
                <p
                  onClick={handleLogout}
                  style={{
                    color: "black",
                    marginLeft: "17px",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <LoginModal />
        )}
      </div>
    </div>
  );
}
