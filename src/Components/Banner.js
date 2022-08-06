import React from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { BsArrowRight } from "react-icons/bs";

export default function Banner() {
  const animations = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const animationsTwo = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  return (
    <>
      <div
        style={{
          paddingTop: "100px",
          background: "#001430",
          // backgroundImage:
          //   "repeating-linear-gradient(45deg, rgb(0,6,86) 0px, rgb(0,6,86) 1px,transparent 1px, transparent 11px,rgb(0,6,86) 11px, rgb(0,6,86) 12px,transparent 12px, transparent 32px),repeating-linear-gradient(90deg, rgb(0,6,86) 0px, rgb(0,6,86) 1px,transparent 1px, transparent 11px,rgb(0,6,86) 11px, rgb(0,6,86) 12px,transparent 12px, transparent 32px),repeating-linear-gradient(0deg, rgb(0,6,86) 0px, rgb(0,6,86) 1px,transparent 1px, transparent 11px,rgb(0,6,86) 11px, rgb(0,6,86) 12px,transparent 12px, transparent 32px),repeating-linear-gradient(135deg, rgb(0,6,86) 0px, rgb(0,6,86) 1px,transparent 1px, transparent 11px,rgb(0,6,86) 11px, rgb(0,6,86) 12px,transparent 12px, transparent 32px),linear-gradient(90deg, rgb(0,32,120),rgb(10,0,52))",
          width: "100%",
          height: "750px",
          // borderBottomLeftRadius: "120px",
          // borderBottomRightRadius: "120px",
        }}
      >
        <div style={{ display: "flex" }}>
          {/* <img
        style={{ width: "100%", height: "100%" }}
        src="NavBanner.png"
        alt=""
      /> */}
          <motion.div
            variants={animationsTwo}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
          >
            <p
              style={{
                color: "white",
                fontSize: "60px",
                fontWeight: "600",
                marginTop: "110px",
                marginLeft: "110px",
                marginRight: "30px",
                marginBottom: "2px",
                // textAlign: "center",
              }}
            >
              This is the time to{" "}
              <span
                className="animateCharcter"
                //   style={{ color: "#0DF200" }}
              >
                GROW
              </span>{" "}
              your <span> business</span>
            </p>
            <p
              style={{ color: "white", marginLeft: "120px", fontSize: "35px" }}
            >
              {" "}
              We offer optimal IT services <br /> under one roof.🚀
            </p>
            <Button
              variant="contained"
              style={{
                marginLeft: "120px",
                background: "#10D0D6",
                color: "black",
                fontWeight: "550",
              }}
            >
              {" "}
              Learn More <BsArrowRight />
            </Button>
          </motion.div>
          <motion.div
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
          >
            <img
              style={{
                // marginLeft: "10px",
                marginTop: "50px",
                marginRight: "25px",
                width: "650px",
                height: "500px",
              }}
              src="bannerNew.png"
              alt=""
            />
          </motion.div>
        </div>
      </div>
      <img
        style={{
          position: "absolute",
          marginTop: "-100px",
          marginLeft: "420px",
          width: "700px",
          borderRadius: "20px",
          // boxShadow: "2px 2px 10px 2px lightGray",
        }}
        // src="subBanner.png"
        alt=""
      />
      {/* <br />
      <br /> */}
    </>
  );
}
