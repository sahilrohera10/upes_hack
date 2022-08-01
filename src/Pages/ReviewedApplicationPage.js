import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function ReviewedApplicationPage() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const [finalData, setFinalData] = useState(null);

  useEffect(() => {
    try {
      fetch("http://localhost:3322/GetInProcessApplicationForm")
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("data=>", resp);
          setFinalData(resp.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [amount, setAmount] = useState();

  const handleProjectDone = async (data) => {
    const body = {
      id: data._id,
      ProjectStatus: "Done",
      payment: parseInt(amount),
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const data = await fetch(
        "http://localhost:3322/ApplicationStatusUpdate",
        requestOptions
      );
      if (data.ok) {
        alert("Succes");
      } else {
        alert("error");
      }
    } catch (error) {
      alert("error", error);
    }
  };

  return (
    <div>
      <p style={{ marginLeft: "20px", fontSize: "30px", fontWeight: "500" }}>
        Reviewed Requests
      </p>

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
                  <p style={{ marginLeft: "400px", marginTop: "10px" }}>
                    Date : {data.date.split("T")[0]}{" "}
                  </p>
                  <Chip
                    label={data.status}
                    style={{ marginLeft: "20px", marginTop: "6px" }}
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

                  <p
                    style={{
                      background: "#6159C9",
                      width: "170px",
                      padding: "15px",
                      borderRadius: "20px",
                      color: "white",
                    }}
                  >
                    Contact : {data.contactNo}{" "}
                  </p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "70%",
                    top: "35%",
                    // display: "flex",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <p> Project Done</p>
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </div>
                  {checked && (
                    <>
                      <TextField
                        id="outlined-basic"
                        label="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        variant="outlined"
                      />{" "}
                      <br />
                      <Button
                        variant="contained"
                        onClick={() => handleProjectDone(data)}
                        style={{ marginLeft: "70px", marginTop: "10px" }}
                      >
                        Submit
                      </Button>
                    </>
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
          ))}
      </div>
    </div>
  );
}
