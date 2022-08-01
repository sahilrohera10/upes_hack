import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";

import { Button } from "@mui/material";

export default function ApplicationsAccordion({ data }) {
  return (
    <div style={{ marginTop: "70px" }}>
      {data &&
        data.map((data) => (
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
                  label="pending"
                  style={{ marginLeft: "50px", marginTop: "6px" }}
                />
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Requested Services 👇 </Typography>
              {data.services &&
                data.services.map((service) => (
                  <p style={{ marginLeft: "20px" }}>{service}</p>
                ))}

              <Button variant="contained" style={{ margin: "10px" }}>
                {" "}
                ok lets go ahead{" "}
              </Button>
              <Button
                variant="contained"
                style={{ margin: "10px", background: "#6159C9" }}
              >
                {" "}
                ready for negotiation{" "}
              </Button>
              <Button
                variant="contained"
                style={{ margin: "10px", background: "#695eff" }}
              >
                {" "}
                lets connect some other time
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}
