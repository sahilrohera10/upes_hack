import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import { ImCross } from "react-icons/im";

const data = [
  {
    name: "Web Development",
    imageUrl: "Web-Development.jpg",
  },
  {
    name: "App Development",
    imageUrl: "app dev.jpg",
  },
  {
    name: "Logo Making",
    imageUrl: "logo making.jpg",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CartModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <Tooltip title="Cart">
          <img
            style={{
              width: "60px",
              height: "60px",
              marginTop: "-15px",
              cursor: "pointer",
            }}
            src="cartImage.png"
            alt=""
          />
        </Tooltip>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cart
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {data.map((data) => (
              <div
                style={{
                  display: "flex",
                  border: "1px solid black",
                  width: "350px",
                  height: "130px",
                  boxShadow: "0px 5px 12px 4px lightGray",
                  marginBottom: "20px",
                }}
              >
                <img style={{ width: "142px" }} src={data.imageUrl} alt="" />
                <div
                  style={{
                    width: "150px",
                    marginTop: "8px",
                    marginLeft: "25px",
                  }}
                >
                  <h2 style={{ textAlign: "center" }}> {data.name} </h2>
                </div>
                <Tooltip title="Remove From Cart">
                  <ImCross
                    style={{
                      marginLeft: "18px",
                      marginTop: "5px",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </div>
            ))}
            {console.log("data lenght=>", data.length)}
            {data.length} Services in Cart
          </Typography>

          <Button style={{ marginLeft: "250px" }} variant="contained">
            Continue
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
