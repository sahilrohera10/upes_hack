import React, { useState, useLayoutEffect } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

export default function AllMyApplications() {
  const cId = localStorage.getItem("id");

  const initiatePayment = async (amt) => {
    // let mod = cookieCutter.get("modules");
    // mod = JSON.parse(mod);
    // let subjectId = cookieCutter.get("subjectId");
    // let TxnToken;
    // let customerId = cId ;
    let amount = amt;
    let oid = Math.floor(Math.random() * Date.now());
    // get transaction token
    const data = { amount, orderId: oid, cId };
    // let [err, response] = await request("POST", "/pretransaction", { data });
    // let [err, response] = await request(
    //   "POST",
    //   "/user-curriculum/purchase-initiate",
    //   data
    // );
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    let response = await fetch(
      "http://localhost:3322/initiatePayment",
      requestOptions
    );
    response = await response.json();
    console.log("response ==> ", response);
    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid /* update order id */,
        token: response.txnToken,
        tokenType: "TXN_TOKEN",
        amount: amount,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    // initialze configuration using init method
    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
  };

  const [finalData, setFinalData] = useState();

  useLayoutEffect(() => {
    try {
      fetch(`http://localhost:3322/GetAllApplicationFormbyId/${cId}`)
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("data=>", resp);
          setFinalData(resp.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDownloadApplication = async (data) => {
    const body = {
      Name: data.name,
      customerId: cId,
      Email: data.email,
      contactNo: parseInt(data.contactNo),
      services: data.services,
      status: data.status,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const resp1 = await fetch(
        "http://localhost:3322/DownloadApplication",
        requestOptions
      );

      if (resp1.ok) {
        window.open("http://localhost:3322/DownloadingApplication");
      } else throw { msg: "download failed" };
    } catch (error) {
      console.log("Err ", error);
      alert("error");
    }
  };

  const handleRemove = async (data) => {
    const body = {
      id: data._id,
    };
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const resp1 = await fetch(
        "http://localhost:3322/DeleteApplicationForm",
        requestOptions
      );

      if (resp1.json("status")) {
        fetch(`http://localhost:3322/GetAllApplicationFormbyId/${cId}`)
          .then((resp) => resp.json())
          .then((resp) => {
            console.log("data=>", resp);
            setFinalData(resp.data);
          });
      } else {
        alert("error");
      }
      // if (resp1.status === 300) {
      //   alert("Service Already Added");
      // }
    } catch (error) {
      console.log("Err ", error);

      // handleClicked();
    }
  };

  return (
    <div style={{ paddingTop: "150px" }}>
      <h1 style={{ textAlign: "center" }}>Your Applications</h1>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {finalData &&
          finalData.map((data) => (
            <div
              style={{
                width: "950px",
                minHeight: "200px",
                maxHeight: "auto",
                border: "2px solid black",
                borderRadius: "10px",
                margin: "20px",
                position: "relative",
              }}
            >
              <Chip
                label="Submitted"
                style={{ position: "absolute", left: "88%", top: "5%" }}
              />
              <p
                style={{
                  marginLeft: "10px",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                Selected Services 👇
              </p>
              {data.services.map((services) => (
                <p
                  style={{
                    fontWeight: "500",
                    marginTop: "20px",
                    marginLeft: "30px",
                  }}
                >
                  {services}
                </p>
              ))}
              <div style={{ display: "flex" }}>
                <p style={{ marginLeft: "20px" }}>
                  Submitted on{" "}
                  <span style={{ fontWeight: "600" }}>
                    {data.date.split("T")[0]}
                  </span>
                </p>
                <p style={{ marginLeft: "20px" }}>
                  Application Status :{" "}
                  <span style={{ fontWeight: "600" }}> {data.status}</span>
                </p>
                {data.Payment && (
                  <Button
                    // variant="contained"
                    style={{
                      marginTop: "8px",
                      marginLeft: "20px",
                      padding: "5px",
                    }}
                    onClick={() => initiatePayment(data.Payment)}
                  >
                    {" "}
                    Make Payment{" "}
                  </Button>
                )}

                {data.status === "pending" ? (
                  ""
                ) : data.status === "lets connect some other time" ? (
                  ""
                ) : data.DoneStatus === "pending" ? (
                  <img
                    style={{
                      position: "absolute",
                      width: "130px",
                      height: "110px",
                      top: "20%",
                      left: "70%",
                    }}
                    src="pending.jpg"
                    alt=""
                  />
                ) : (
                  <img
                    style={{
                      position: "absolute",
                      width: "130px",
                      height: "110px",
                      top: "20%",
                      left: "70%",
                    }}
                    src="complete.jpg"
                    alt=""
                  />
                )}

                {/* { if (data.status === "pending") {""} else if (
                data.status === "lets connect some other time") {""}
                else
                data.DoneStatus === "pending" ? (
                  <img
                    style={{
                      position: "absolute",
                      width: "130px",
                      height: "110px",
                      top: "20%",
                      left: "70%",
                    }}
                    src="pending.jpg"
                    alt=""
                  />
                ) : (
                  <img
                    style={{
                      position: "absolute",
                      width: "130px",
                      height: "110px",
                      top: "20%",
                      left: "70%",
                    }}
                    src="complete.jpg"
                    alt=""
                  />
                ) } */}
                {/* {data.status === "pending" ||
                data.status === "lets connect some other time" ? (
                  ""
                ) : data.DoneStatus === "pending" ? (
                  <img
                    style={{
                      position: "absolute",
                      width: "130px",
                      height: "110px",
                      top: "20%",
                      left: "70%",
                    }}
                    src="pending.jpg"
                    alt=""
                  />
                ) : (
                  <img
                    style={{
                      position: "absolute",
                      width: "130px",
                      height: "110px",
                      top: "20%",
                      left: "70%",
                    }}
                    src="complete.jpg"
                    alt=""
                  />
                )} */}
              </div>
              <Tooltip title="Download Your Application">
                <AiOutlineCloudDownload
                  size={30}
                  style={{
                    // marginLeft: "210px",
                    left: "95%",
                    position: "absolute",
                    top: "85%",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDownloadApplication(data)}
                />
              </Tooltip>
              <Tooltip title="Delete your application">
                <MdOutlineDelete
                  size={25}
                  style={{
                    position: "absolute",
                    top: "86%",
                    left: "91%",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemove(data)}
                />
              </Tooltip>
            </div>
          ))}
      </div>
      {/* <div
        style={{
          width: "350px",
          height: "190px",
          border: "2px solid black",
          borderRadius: "20px",
          marginLeft: "100px",
          marginTop: "100px",
          background: "purple",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "5px" }}>
          hello world
        </h1>
        <div style={{ display: "flex" }}>
          <img
            style={{ width: "100px", height: "100px", marginLeft: "10px" }}
            src="Web-Development.jpg"
            alt=""
          />
          <p style={{ marginLeft: "50px" }}>This is an image</p>
        </div> */}
      {/* </div> */}
    </div>
  );
}
