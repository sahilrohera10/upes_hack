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
    <div
      style={{
        paddingTop: "100px",
        background: "#001430",
        // backgroundImage: "linear-gradient(#001430, #78fff6)",
        width: "100%",
        height: "645px",
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
          <p style={{ color: "white", marginLeft: "120px", fontSize: "35px" }}>
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
              marginLeft: "20px",
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
  );
}
