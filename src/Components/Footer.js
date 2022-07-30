import React from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
// import {  } from "react-icons/bs"

export default function Footer() {
  return (
    <div style={{ width: "100%", height: "150px" }}>
      <div style={{ paddingTop: "50px", marginLeft: "660px" }}>
        <BsFacebook size={30} style={{ color: "#4867AA", margin: "10px" }} />
        <BsInstagram size={30} style={{ color: "red", margin: "10px" }} />
        <AiFillTwitterCircle
          size={30}
          style={{ color: "#1DA1F2", margin: "10px" }}
        />
        <AiFillLinkedin
          size={30}
          style={{ color: "#0077B5", margin: "10px" }}
        />
      </div>
      <div
        style={{ display: "flex", marginLeft: "550px", marginBottom: "10px" }}
      >
        <p
          style={{
            margin: "20px",
            fontWeight: "550",
            color: "#001430",
            marginBottom: "0px",
          }}
        >
          HOME
        </p>
        <p
          style={{
            margin: "20px",
            fontWeight: "550",
            color: "#001430",
            marginBottom: "0px",
          }}
        >
          ABOUT
        </p>
        <p
          style={{
            margin: "20px",
            fontWeight: "550",
            color: "#001430",
            marginBottom: "0px",
          }}
        >
          SERVICES
        </p>
        <p
          style={{
            margin: "20px",
            fontWeight: "550",
            color: "#001430",
            marginBottom: "0px",
          }}
        >
          CONTACT US
        </p>
      </div>

      {/* <div  style={{ width: "100%", height: "50px" }}> */}
      {/* <p
          style={{
            fontSize: "20px",
            fontWeight: "500",
            marginLeft: "600px",
            paddingTop: "20px",
          }}
        >
          Made with ❤️ by team TechnoMaits
        </p> */}
      <p
        style={{
          // marginLeft: "630px",
          paddingTop: "20px",
          fontWeight: "500",
          marginTop: "0px",
          paddingBottom: "20px",
          textAlign: "center",
          background: "#001430",
          color: "white",
          // paddingTop: "10px",
        }}
      >
        copyright 2022 @ Alpha It Services
      </p>
      {/* </div> */}
    </div>
  );
}
