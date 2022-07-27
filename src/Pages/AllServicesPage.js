import React, { useState, useLayoutEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AllServicesPage() {
  const [finalData, setFinalData] = useState();

  const [open, setOpen] = React.useState(false);

  const [errorOpen, setErrorOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClicked = () => {
    setErrorOpen(true);
  };

  const handleClosed = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAddToCart = async (data) => {
    const cId = localStorage.getItem("id");
    const login = localStorage.getItem("isAuthorised");
    // event.preventDefault();
    const body = {
      name: data.name,
      customerId: cId,
      serviceId: data._id,
    };

    console.log(body);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    if (login) {
      try {
        const resp1 = await fetch(
          "http://localhost:3322/AddServicetoCart",
          requestOptions
        );

        if (resp1.json("status")) {
          window.location.reload();
          handleClick();
        }
        if (resp1.status === 300) {
          alert("Service Already Added");
        }
      } catch (error) {
        console.log("Err ", error);
      }
    } else {
      handleClicked();
    }
  };

  useLayoutEffect(() => {
    try {
      fetch("http://localhost:3322/GetService")
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("data=>", resp);
          setFinalData(resp.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      style={{
        paddingTop: "160px",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Added To Cart
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClosed}>
        <Alert onClose={handleClosed} severity="error" sx={{ width: "100%" }}>
          Login First
        </Alert>
      </Snackbar>{" "}
      {finalData &&
        finalData.map((data) => (
          <div
            style={{
              width: "400px",
              height: "200px",
              border: "1px solid black",
              display: "flex",
              position: "relative",
              zIndex: "0",
            }}
          >
            <img
              style={{ width: "230px", zIndex: "-10" }}
              src={data.imageId}
              alt=""
            />
            <div style={{ marginRight: "10px" }}>
              {" "}
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "650",
                  textAlign: "center",
                  marginBottom: "1px",
                }}
              >
                {data.name}
              </p>{" "}
              <p style={{ textAlign: "center" }}>{data.description}</p>
              <Tooltip title="Add to cart">
                <AiOutlineShoppingCart
                  size={25}
                  style={{
                    position: "absolute",
                    top: "80%",
                    marginLeft: "130px",
                    // zIndex: "-5",
                    // left: "25%",
                    // marginTop: "15px",
                    // marginLeft: "120px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleAddToCart(data);
                  }}
                  // onClick={handleAddToCart(data)}
                />
              </Tooltip>
            </div>
          </div>
        ))}
    </div>
  );
}
