import React, { useEffect, useState } from "react";
// import ApplicationsAccordion from "../Components/ApplicationsAccordion";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";

import { Button } from "@mui/material";

export default function PendingApplicationPage() {
  const [finalData, setFinalData] = useState(null);

  useEffect(() => {
    try {
      fetch("http://localhost:3322/GetPendingApplicationForm")
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("data=>", resp);
          setFinalData(resp.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSendResponse = async (data, msg) => {
    // e.preventDefault();

    const body = {
      Email: data.email,
      id: data._id,
      message: msg,
    };
    console.log("body=>", body);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const data = await fetch(
        "http://localhost:3322/SendMailtoCustomer",
        requestOptions
      );
      if (data.status) {
        alert("Response added successfully");
        fetch("http://localhost:3322/GetPendingApplicationForm")
          .then((resp) => resp.json())
          .then((resp) => {
            console.log("data=>", resp);
            setFinalData(resp.data);
          });
      }
    } catch (error) {
      alert("error", error);
    }
  };

  return (
    <div>
      <p style={{ fontSize: "30px", fontWeight: "500", marginLeft: "20px" }}>
        Pending Requests
      </p>

      {/* <ApplicationsAccordion data={finalData} /> */}
      <div style={{ marginTop: "70px" }}>
        {finalData &&
          finalData.map((data) => (
            <Accordion
              style={{
                margin: "30px",
                minHeight: "70px",
                maxHeight: "auto",
                borderRadius: "20px",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ marginTop: "10px", display: "flex" }}>
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50px",
                    }}
                    src="rohera.jpeg"
                    alt=""
                  />
                  <p
                    style={{
                      marginLeft: "20px",
                      fontSize: "20px",
                      marginBottom: "0px",
                      marginTop: "10px",
                    }}
                  >
                    {data.name}{" "}
                    <span style={{ fontSize: "15px" }}>({data.email})</span>
                  </p>
                  <p style={{ marginLeft: "500px", marginTop: "10px" }}>
                    Date : {data.date.split("T")[0]}{" "}
                  </p>
                  <Chip
                    label={data.status}
                    style={{ marginLeft: "50px", marginTop: "6px" }}
                  />
                </Typography>
              </AccordionSummary>
              <AccordionDetails style={{ display: "flex" }}>
                <div>
                  <Typography>Requested Services 👇 </Typography>
                  {data.services &&
                    data.services.map((service) => (
                      <p style={{ marginLeft: "20px" }}>{service}</p>
                    ))}

                  <Button
                    variant="contained"
                    style={{ margin: "10px" }}
                    onClick={() => {
                      handleSendResponse(data, "ok lets go ahead");
                    }}
                  >
                    {" "}
                    ok lets go ahead{" "}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleSendResponse(data, "ready for negotiation");
                    }}
                    style={{ margin: "10px", background: "#6159C9" }}
                  >
                    {" "}
                    ready for negotiation{" "}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleSendResponse(data, "lets connect some other time");
                    }}
                    style={{ margin: "10px", background: "#695eff" }}
                  >
                    {" "}
                    lets connect some other time
                  </Button>
                </div>
                <p
                  style={{
                    background: "#6159C9",
                    width: "160px",
                    height: "30px",
                    padding: "15px",
                    borderRadius: "20px",
                    color: "white",
                    marginLeft: "100px",
                  }}
                >
                  {" "}
                  Contact : {data.contactNo}{" "}
                </p>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
    </div>
  );
}
