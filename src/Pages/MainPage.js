import React from "react";
import AboutUs from "../Components/AboutUs";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import OurServices from "../Components/OurServices";

export default function MainPage() {
  return (
    <div>
      {/* <NavBar /> */}
      <Banner />
      <AboutUs />
      <OurServices />
      <br />
      <br />
      <h1 style={{ textAlign: "center", fontSize: "50px" }}>Rewards Section</h1>
      <div style={{ marginLeft: "230px", marginTop: "50px" }}>
        <img
          style={{ width: "85%", height: "450px", borderRadius: "50px" }}
          src="rewards.jpeg"
          alt=""
        />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
