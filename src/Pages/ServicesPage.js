import { Button } from "@mui/material";
import React from "react";
import AddServiceModal from "../Components/AddServiceModal";

const services = [
  {
    title: "Web Development",
    discription: "All about web dev",
    img: "Web-Development.jpg",
  },
  {
    title: "App Development",
    discription: "All about app dev",
    img: "app-dev.png",
  },
  {
    title: "Web Designing",
    discription: "All about web design",
    img: "web-design.jpg",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <p style={{ fontSize: "30px", fontWeight: "500", marginLeft: "30px" }}>
        All Services
      </p>
      <AddServiceModal />

      <div style={{ display: "flex", justifyContent: "center" }}>
        {services.map((data) => (
          <div
            style={{
              width: "220px",
              height: "auto",
              boxShadow: "2px 2px 10px 2px lightGray",
              //   border: "1px solid black",
              margin: "20px",
              background: "white",
              borderRadius: "10px",
            }}
          >
            <img
              style={{ width: "220px", height: "150px", borderRadius: "10px" }}
              src={data.img}
              alt=""
            />

            <p
              style={{
                marginBottom: "0px",
                marginTop: "0px",
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              {data.title}
            </p>
            <p
              style={{
                marginBottom: "0px",
                marginTop: "5px",
                textAlign: "center",
              }}
            >
              {data.discription}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              <Button style={{ color: "#6159C9" }}>Edit</Button>
              <Button style={{ color: "#ed3838" }}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
