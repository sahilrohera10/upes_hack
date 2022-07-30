import { Button } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ApplicationPage() {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(
    "in application page services are => ",
    location.state.data.services
  );

  const [open, setOpen] = React.useState(false);

  const [submitShow, setSubmitShow] = useState("block");
  const [submittedShow, setSubmittedShow] = useState("none");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [services, setServices] = useState(location.state.data.services);

  //   const [servicesArray, setServicesArray] = useState([]);
  const servicesArray = [];

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("contactNo");
  const cId = localStorage.getItem("id");

  const handleSubmitForm = async () => {
    services.map(
      (data) =>
        //   console.log("data=>", data.name)
        servicesArray.push(data.name)
      //   setServicesArray(data.name)
    );
    console.log("in form");
    const body = {
      name: name,
      customerId: cId,
      Email: email,
      contactNo: parseInt(phone),
      services: servicesArray,
      status: "pending",
    };
    console.log("after body");
    console.log(body);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const resp1 = await fetch(
        "http://localhost:3322/FillApplicationForm",
        requestOptions
      );

      if (resp1.json("status")) {
        // handleClick();
        setSubmitShow("none");
        setSubmittedShow("block");
        // window.location.reload();
        // navigate("/home");
      }
    } catch (error) {
      console.log("Err ", error);
      alert("error");
    }

    console.log("servicesArray=>", servicesArray);
  };

  return (
    <div
      style={{
        paddingTop: "125px",
        background: "#001430",
        height: "650px",
        display: "flex",
      }}
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Application Submitted Successfully
        </Alert>
      </Snackbar>
      <img
        style={{
          width: "700px",
          height: "500px",
          marginRight: "10px",
          marginTop: "30px",
        }}
        src="applicationImage.png"
        alt=""
      />
      <div
        style={{
          width: "550px",
          height: "605px",
          border: "1px solid black",
          marginLeft: "100px",
          background: "white",
          borderRadius: "10px",
          position: "relative",
          //   paddingTop: "100px",
        }}
      >
        <div
          style={{
            width: "570px",
            height: "100px",
            display: "flex",
            // justifyContent: "",
          }}
        >
          <img
            style={{
              marginLeft: "10px",
              paddingTop: "10px",
              marginRight: "180px",
            }}
            src="CompanyLogo.png"
            alt=""
          />
          <p style={{ textAlign: "right" }}>
            ALPHA IT SERVICES <br /> 203, Valley View, IT Park, Dehradun, <br />{" "}
            Uttarakhand info@alphaitservices.in
          </p>
        </div>
        <p style={{ marginLeft: "10px", fontSize: "20px", fontWeight: "500" }}>
          YOUR APPLICATION
        </p>
        <div style={{ marginLeft: "10px" }}>
          <p> Name : {name} </p>
          <p> Email : {email} </p>
          <p> Phone : {phone} </p>
          {/* <div style={{ display: "flex" }}>
            <p style={{ marginBottom: "0px" }}>Name : </p>
            <p style={{ marginBottom: "0px" }}>{name}</p>
          </div> */}
          {/* <div style={{ display: "flex" }}>
            <p style={{ marginBottom: "0px" }}>Email : </p>
            <p style={{ marginBottom: "0px" }}>{email}</p>
          </div> */}
          {/* <div style={{ display: "flex" }}>
            <p>Phone : </p>
            <p>{phone}</p>
          </div> */}
        </div>
        <p style={{ marginLeft: "10px", fontSize: "20px", fontWeight: "500" }}>
          Services Selected
        </p>
        {services &&
          services.map((data) => (
            <p style={{ marginLeft: "10px" }}> - {data.name}</p>
          ))}
        <Button
          style={{
            marginLeft: "250px",
            // marginTop: "120px",
            top: "90%",
            background: "#10D0D6",
            color: "black",
            position: "absolute",
            display: `${submitShow}`,
          }}
          variant="contained"
          onClick={() => handleSubmitForm()}
        >
          Submit
        </Button>
        <Button
          disabled="true"
          style={{
            marginLeft: "160px",
            // marginTop: "120px",
            top: "90%",
            background: "#10D0D6",
            color: "black",
            position: "absolute",

            display: `${submittedShow}`,
          }}
          variant="contained"
          // onClick={() => handleSubmitForm()}
        >
          Application Submitted ☑️
        </Button>
        {console.log("show status=>", submitShow)}
      </div>
    </div>
  );
}
