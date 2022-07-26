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
      {/* <Footer /> */}
    </div>
  );
}
