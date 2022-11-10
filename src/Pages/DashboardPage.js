import { Button } from "@material-ui/core";
import React from "react";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";
import { TbNotes } from "react-icons/tb";

import Footer from "../Components/Footer";
import Graphs from "../Components/Graphs";
// import NavBar from "../Components/NavBar";

const listData = [
  {
    name: "Ravi Vohra",
    email: "ravivihra90@gmail.com",
    img: "https://static.toiimg.com/thumb/resizemode-4,msid-76729750,imgsize-249247,width-720/76729750.jpg",
    // img: "rohera.jpeg",
  },
  {
    name: "Pankaj Rawat",
    email: "astonish@gmail.com",
    img: "https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png",
    // img: "singhal.jpeg",
  },
  {
    name: "Jayant",
    email: "jayant2002@gmail.com",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHCZuslFbn42wwA9qw6ywBERhtpr_yOFy3Cw&usqp=CAU",
    // img: "arora.jpeg",
  },
  {
    name: "Ansh",
    email: "ansh2002@gmail.com",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJoBkWxNNHvLpW4knNYlRPtXfn9pRdijE0ow&usqp=CAU",
    // img: "bhawna.jpeg",
  },
  {
    name: "Priyanka Bhatt",
    email: "payal479@gmail.com",
    img: "https://images.news18.com/ibnkhabar/uploads/2020/07/facebook-avatar-1.jpg?im=Resize,width=904,aspect=fit,type=normal",
    // img: "yrh.jpeg",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <p
        style={{
          fontSize: "30px",
          fontWeight: "600",
          color: "#25233B",
          marginLeft: "20px",
        }}
      >
        Welcome To Dashboard
      </p>

      <div style={{ display: "flex" }}>
        <div>
          <div
            style={{
              width: "800px",
              height: "160px",
              background: "#6159C9",
              color: "white",
              marginLeft: "20px",
              borderRadius: "20px",
              display: "flex",
            }}
          >
            <img
              style={{
                width: "150px",
                height: "150px",
                marginLeft: "40px",
                marginTop: "5px",
              }}
              src="adminImage.png"
              alt=""
            />{" "}
            <div style={{ marginLeft: "30px" }}>
              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "550",
                  // marginLeft: "30px",
                  marginTop: "45px",
                  marginBottom: "5px",
                }}
              >
                Hello Admin
              </p>
              <p style={{ marginTop: "0px" }}>
                Now you can perform all operations from this panel 🚀
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "15px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                width: "250px",
                height: "150px",
                background: "white",
                borderRadius: "20px",
                margin: "10px",
                position: "relative",
              }}
            >
              {" "}
              <MdOutlineMiscellaneousServices
                size={25}
                style={{
                  position: "absolute",
                  top: "75%",
                  left: "80%",
                  color: "#6159C9",
                }}
              />{" "}
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Total Services
              </p>{" "}
              <p
                style={{
                  fontSize: "30px",
                  fontWeight: "500",
                  textAlign: "center",
                  marginTop: "0px",
                }}
              >
                6 +
              </p>
            </div>
            <div
              style={{
                width: "250px",
                height: "150px",
                background: "white",
                borderRadius: "20px",
                margin: "10px",
                position: "relative",
              }}
            >
              <RiDashboardFill
                size={25}
                style={{
                  position: "absolute",
                  top: "75%",
                  left: "80%",
                  color: "#6159C9",
                }}
              />
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Total Projects Done
              </p>
              <p
                style={{
                  fontSize: "30px",
                  fontWeight: "500",
                  textAlign: "center",
                  marginTop: "0px",
                }}
              >
                45 +
              </p>
            </div>
            <div
              style={{
                width: "250px",
                height: "150px",
                background: "white",
                borderRadius: "20px",
                margin: "10px",
                position: "relative",
              }}
            >
              <TbNotes
                size={25}
                style={{
                  position: "absolute",
                  top: "75%",
                  left: "80%",
                  color: "#6159C9",
                }}
              />{" "}
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Total Requests
              </p>{" "}
              <p
                style={{
                  fontSize: "30px",
                  fontWeight: "500",
                  textAlign: "center",
                  marginTop: "0px",
                }}
              >
                10 +
              </p>
            </div>
          </div>
          {/* <Graphs /> */}
        </div>
        <div
          style={{
            width: "300px",
            height: "auto",
            background: "white",
            marginLeft: "30px",
            borderRadius: "20px",
          }}
        >
          <p
            style={{ fontSize: "20px", fontWeight: "500", textAlign: "center" }}
          >
            Recent Requests
          </p>
          {listData.map((data) => (
            <div
              style={{
                marginLeft: "20px",
                borderBottom: "1px solid black",
                marginRight: "20px",
                marginBottom: "10px",
                display: "flex",
                paddingBottom: "10px",
              }}
            >
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50px",
                  marginRight: "10px",
                }}
                src={data.img}
                alt=""
              />
              <div>
                <p
                  style={{
                    marginBottom: "1px",
                    marginTop: "0px",
                    fontWeight: "500",
                    fontSize: "17px",
                  }}
                >
                  {data.name}
                </p>
                <p
                  style={{
                    marginBottom: "2px",
                    marginTop: "0px",
                    fontWeight: "300",
                    fontSize: "15px",
                  }}
                >
                  {data.email}
                </p>
              </div>
            </div>
          ))}
          <Button
            variant="contained"
            style={{
              marginLeft: "100px",
              marginBottom: "20px",
              background: "#6159C9",
              color: "white",
            }}
          >
            View All
          </Button>
        </div>
      </div>
    </div>
  );
}
