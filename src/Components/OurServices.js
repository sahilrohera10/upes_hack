import React from "react";
import ServiceCard from "./ServiceCard";

export default function OurServices() {
  return (
    <div style={{ background: "#001430" }}>
      {" "}
      <h1
        className="serviceHead"
        style={{ paddingTop: "60px", textAlign: "center", color: "white" }}
      >
        OUR SERVICES !
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          background: "#001430",
          paddingTop: "40px",
          height: "500px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "700px",
            marginRight: "100px",
            flexWrap: "wrap",
          }}
        >
          <ServiceCard
            name="Web Designing"
            descrip="A well-designed website can help you create a good impression on your potential customers"
          />
          <ServiceCard
            name="Web Development"
            descrip="A well-designed and robust website serves as a bridge between your business objectives and your target."
          />
          <ServiceCard
            name="APP Development"
            descrip="Apps have truly transformed the way in which consumers handle their mobile devices, how they handle their business."
          />
          <ServiceCard
            name="Logo Making"
            descrip="A well-designed logo builds trust by communicating to your potential clients about who you are and what you do."
          />
        </div>
        <img
          style={{ width: "550px", height: "400px" }}
          src="serviceImg.png"
          alt=""
        />

        {/* <ServiceCard name="Web Designing" /> */}
      </div>
    </div>
  );
}
