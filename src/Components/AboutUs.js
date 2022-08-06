import React from "react";

export default function AboutUs() {
  return (
    <div className="aboutUsPage">
      <img
        style={{
          width: "500px",
          height: "500px",
          marginLeft: "100px",
          marginTop: "110px",
        }}
        src="aboutUsImg.png"
        alt=""
      />

      <div style={{ marginLeft: "70px", marginTop: "100px" }}>
        <h1 style={{ fontSize: "40px", textAlign: "center", color: "#001430" }}>
          We offer optimal IT services <br /> under one roof.
        </h1>
        <div style={{ width: "700px", marginLeft: "50px" }}>
          <p style={{ fontSize: "18px" }}>
            With our mission to empower early stage Startups and Businesses and
            expertise in providing an entire suite of services for establishing
            any form of a business entity Alpha IT is a ONE-STOP SOLUTION FOR
            STARTUPS.
          </p>
          <p style={{ fontSize: "18px" }}>
            Alpha IT is a one-stop provider offering end-to-end IT solutions and
            startup advisory services. Alpha IT was founded with an aim to
            assist the start-ups and small businesses by offering them quality
            IT infrastructure support and services at affordable prices.
          </p>
          <p style={{ fontSize: "18px" }}>
            Our mission is to collaborate with clients as partners and provide
            them professional , tailor-made and holistic solutions. Our approach
            is to work very closely with the startups and small businesses as
            partners in their growth story.
          </p>
        </div>
      </div>
    </div>
  );
}
