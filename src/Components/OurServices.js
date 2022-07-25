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
          <div style={{ display: "flex" }} className="serviceCard">
            <img
              style={{ borderRadius: "10px 0px 0px 10px" }}
              src="Web-Development.jpg"
              alt=""
            />

            <p
              style={{
                fontSize: "22px",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "0px",
              }}
            >
              Web Develpment
            </p>
          </div>

          <div style={{ display: "flex" }} className="serviceCard">
            <img
              style={{ borderRadius: "10px 0px 0px 10px", width: "155px" }}
              src="web design.jpg"
              alt=""
            />

            <p
              style={{
                fontSize: "22px",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "0px",
              }}
            >
              Web Designing
            </p>
          </div>

          <div style={{ display: "flex" }} className="serviceCard">
            <img
              style={{ borderRadius: "10px 0px 0px 10px", width: "155px" }}
              src="app dev.jpg"
              alt=""
            />

            <p
              style={{
                fontSize: "22px",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "0px",
              }}
            >
              App Development
            </p>
          </div>

          <div style={{ display: "flex" }} className="serviceCard">
            <img
              style={{ borderRadius: "10px 0px 0px 10px", width: "155px" }}
              src="logo making.jpg"
              alt=""
            />

            <p
              style={{
                fontSize: "22px",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "0px",
              }}
            >
              Logo Making
            </p>
          </div>
        </div>

        <img
          style={{ width: "550px", height: "400px" }}
          src="serviceImg.png"
          alt=""
        />
      </div>
    </div>
  );
}
