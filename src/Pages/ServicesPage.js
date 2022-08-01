import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AddServiceModal from "../Components/AddServiceModal";
import EditServiceModal from "../Components/EditServiceModal";
import DialogCompo from "../Components/DialogCompo";

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
  const [servicesData, setServicesData] = useState();

  useEffect(() => {
    fetch("http://localhost:3322/GetService")
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("data=>", resp.data);
        setServicesData(resp.data);
      });
  }, []);

  return (
    <div>
      <p style={{ fontSize: "30px", fontWeight: "500", marginLeft: "30px" }}>
        All Services
      </p>
      <AddServiceModal />

      <div style={{ display: "flex", justifyContent: "center" }}>
        {servicesData &&
          servicesData.map((data) => (
            <div
              style={{
                width: "250px",
                minHeight: "300px",
                height: "auto",
                boxShadow: "2px 2px 10px 2px lightGray",
                //   border: "1px solid black",
                margin: "20px",
                background: "white",
                borderRadius: "10px",
              }}
            >
              <img
                style={{
                  width: "250px",
                  height: "200px",
                  borderRadius: "10px",
                }}
                src={`http://localhost:3322/uploads/${data.imageId}`}
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
                {data.name}
              </p>
              <p
                style={{
                  marginBottom: "0px",
                  marginTop: "5px",
                  textAlign: "center",
                }}
              >
                {data.description}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              >
                <EditServiceModal data={data} />
                <DialogCompo data={data} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
