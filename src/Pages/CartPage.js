import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

export default function CartPage() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [finalData, setFinalData] = useState();

  const cId = localStorage.getItem("id");

  useLayoutEffect(() => {
    try {
      fetch(`http://localhost:3322/GetServicefromCart/${cId}`)
        .then((resp) => resp.json())
        .then((resp) => {
          console.log("data=>", resp);
          setFinalData(resp.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRemove = async (data) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(body),
    };

    try {
      const resp1 = await fetch(
        `http://localhost:3322/DeleteServicefromCart/${cId}/${data.serviceId}`,
        requestOptions
      );

      if (resp1.json("status")) {
        fetch(`http://localhost:3322/GetServicefromCart/${cId}`)
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
  if (finalData && finalData.length) {
    return (
      <div
        style={{
          paddingTop: "120px",
          //   background: "#001430",
          height: "650px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "750px",
            height: "600px",
            borderRadius: "10px",
            border: "5px solid white",
            marginLeft: "20px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Service Cart</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            {finalData &&
              finalData.map((data) => (
                <div
                  style={{
                    display: "flex",
                    border: "1px solid black",
                    width: "350px",
                    height: "130px",
                    boxShadow: "0px 2px 10px 2px lightGray",
                    marginBottom: "20px",
                    margin: "10px",
                    background: "white",
                  }}
                >
                  <img
                    style={{ width: "142px" }}
                    src={`http://localhost:3322/uploads/${data.imageId}`}
                    alt=""
                  />
                  <div
                    style={{
                      width: "150px",
                      marginTop: "8px",
                      marginLeft: "5px",
                    }}
                  >
                    <h2 style={{ textAlign: "center" }}> {data.name} </h2>
                  </div>
                  <Tooltip title="Remove From Cart">
                    <ImCross
                      style={{
                        marginLeft: "20px",
                        marginTop: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemove(data)}
                    />
                  </Tooltip>
                </div>
              ))}
          </div>
          <Button
            // onClick={handleClose}
            onClick={
              () =>
                navigate("/application", {
                  state: {
                    data: {
                      // id: data.curriculumId,
                      // class: data.class,
                      // classId: data.classId,
                      services: finalData,
                    },
                  },
                })
              // handleClose()
            }
            style={{ marginLeft: "290px", marginTop: "250px", width: "200px" }}
            variant="contained"
          >
            Continue
          </Button>
        </div>

        {/* <div style={{ color: "white", marginLeft: "50px", width: "650px" }}>
          <p
            style={{
              textAlign: "center",
              fontSize: "30px",
              marginTop: "0px",
              fontWeight: "550",
            }}
          >
            Services Cart
          </p>
        </div> */}
      </div>
    );
  } else {
    return (
      <div style={{ paddingTop: "300px", textAlign: "center" }}>
        <h1 style={{ marginTop: "0px" }}>Your Cart is Empty</h1>
      </div>
    );
  }
}
