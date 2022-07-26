import React, { useLayoutEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function OurServices() {
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

  const data = [
    {
      title: "Web Development",
      image: "Web-Development.jpg",
      description: "Get your website developed",
    },
    {
      title: "App Development",
      image: "app-dev.png",
      description: "Get your mobile app developed",
    },
    {
      title: "Web Designing",
      image: "web-design.jpg",
      description: "Get a designer website",
    },
  ];

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

  const [finalData, setFinalData] = useState();

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

  // const fetcher = () => {
  //
  // };

  // const cId = localStorage.getItem("id")

  return (
    <div style={{ background: "#001430" }}>
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
      <h1
        className="serviceHead"
        style={{
          paddingTop: "60px",
          textAlign: "center",
          color: "white",
          fontSize: "40px",
        }}
      >
        OUR SERVICES !
      </h1>
      <div
        style={{
          // display: "flex",
          // flexWrap: "wrap",
          // justifyContent: "center",
          background: "#001430",
          paddingTop: "40px",
          height: "600px",
        }}
      >
        {/* <ReactCardSlider slides={data} /> */}
        <div
          style={{
            display: "flex",
            // marginLeft: "180px",
            justifyContent: "center",
            // width: "00px",
            // marginRight: "100px",
            flexWrap: "wrap",
          }}
        >
          {finalData &&
            finalData.map((data) => (
              <div className="serviceCard">
                <img
                  style={{
                    borderRadius: "10px 10px 0px 0px",
                    width: "350px",
                    height: "280px",
                  }}
                  src={data.imageId}
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
                  {data.name}
                </p>

                <p style={{ textAlign: "center" }}>{data.description}</p>
                <Tooltip title="Add to cart">
                  <AiOutlineShoppingCart
                    size={25}
                    style={{
                      marginTop: "15px",
                      marginLeft: "300px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleAddToCart(data);
                    }}
                    // onClick={handleAddToCart(data)}
                  />
                </Tooltip>
              </div>
            ))}
        </div>
        <Button
          style={{
            marginLeft: "670px",
            marginTop: "20px",
            background: "#10D0D6",
            color: "black",
          }}
          variant="contained"
        >
          {" "}
          View All Services{" "}
        </Button>
      </div>
    </div>
  );
}
