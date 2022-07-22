// import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     color: "white",
//   },
//   title: {
//     flexGrow: 1,
//     color: "white",
//   },
//   appBarTransparent: {
//     background: "transparent",
//   },
//   appBarSolid: {
//     backgroundColor: "rgba(67, 129, 168)",
//   },
// }));

// export default function NavBar() {
//   const classes = useStyles();

//   const [navBackground, setNavBackground] = useState("appBarTransparent");
//   const navRef = React.useRef();
//   navRef.current = navBackground;
//   useEffect(() => {
//     const handleScroll = () => {
//       const show = window.scrollY > 10;
//       if (show) {
//         setNavBackground("appBarSolid");
//       } else {
//         setNavBackground("appBarTransparent");
//       }
//     };
//     document.addEventListener("scroll", handleScroll);
//     return () => {
//       document.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div className={classes.root}>
//       <AppBar position="fixed" className={classes[navRef.current]}>
//         <Toolbar style={{ boxShadow: "0px 0px 0px 0px" }}>
//           {/* <img
//             style={{ width: "200px", height: "70px" }}
//             src="CompanyLogo.jpg"
//             alt=""
//           /> */}
//           {/* <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="menu"
//           >
//             <MenuIcon />
//           </IconButton> */}
//           <Typography variant="h6" className={classes.title}>
//             News
//           </Typography>
//           <Button style={{ color: "white" }}>Login</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

import React from "react";
import Button from "@mui/material/Button";
import { CgProfile } from "react-icons/cg";
import ContactUsModal from "./ContactUsModal";
import LoginModal from "./LoginModal";
export default function NavBar() {
  const auth = localStorage.getItem("isAuthorised");

  return (
    <div
      style={{
        width: "100%",
        height: "100px",
        background: "#001430",
        position: "fixed",
        display: "flex",
        color: "white",
        paddingTop: "15px",
      }}
    >
      <img
        style={{ widht: "100px", height: "100px", marginLeft: "50px" }}
        src="CompanyLogo.png"
        alt=""
      />
      <div
        style={{
          display: "flex",
          width: "700px",
          justifyContent: "space-evenly",
          marginLeft: "250px",
          paddingTop: "10px",
        }}
      >
        <p style={{ cursor: "pointer" }}>HOME</p>
        <p style={{ cursor: "pointer" }}>ABOUT US</p>
        {/* <p>OUR SERVICES</p> */}
        <div class="dropdown">
          <button class="dropbtn">OUR SERVICES</button>
          <div class="dropdown-content">
            <a href="#">Web Designing</a>
            <a href="#">Web Development</a>
            <a href="#">Logo Making And Creative Designs</a>
            <a href="#">Mobile App Development</a>
            <a href="#">Digital Marketing</a>
            <a href="#">Business Incorporation</a>
            <a href="#">StartUp Consulting And Nurturing</a>
          </div>
        </div>
        <ContactUsModal />
        {/* <p>CONTACT US</p> */}
      </div>

      <div style={{ marginLeft: "250px", marginTop: "20px" }}>
        {auth ? (
          <CgProfile size={25} style={{ marginTop: "5px" }} />
        ) : (
          // <Button
          //   style={{ background: "#10D0D6", color: "black", fontWeight: "700" }}
          //   variant="contained"
          // >
          //   Login
          // </Button>
          <LoginModal />
        )}
      </div>
    </div>
  );
}
