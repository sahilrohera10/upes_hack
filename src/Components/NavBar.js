import React, { useState, useLayoutEffect } from "react";
import Button from "@mui/material/Button";
import { CgProfile } from "react-icons/cg";
import ContactUsModal from "./ContactUsModal";
import LoginModal from "./LoginModal";
import ProfileAvatar from "./ProfileAvatar";
import { deepOrange } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import CartModal from "./CartModal";

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
        <p style={{ cursor: "pointer", fontWeight: "700", marginTop: "20px" }}>
          HOME
        </p>
        <p style={{ cursor: "pointer", fontWeight: "700", marginTop: "20px" }}>
          ABOUT US
        </p>
        <div class="dropdown">
          <button class="dropbtn">OUR SERVICES</button>
          <div class="dropdown-content">
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
            <CartModal />

            <div class="dropdown">
              <button class="dropbtn">
                {" "}
                <Avatar sx={{ bgcolor: deepOrange[500], marginTop: "-20px" }}>
                  {UserName}
                </Avatar>
              </button>
              <div class="dropdown-content">
                <a href="#">Account</a>
                <a href="#">Applications</a>
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
