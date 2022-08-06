import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

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

export default function CheckCodeModal({ data }) {
  const [couponCode, setCouponCode] = React.useState();

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    const body = {
      amount: data.Payment,
      id: data._id,
      CouponCode: parseInt(couponCode),
    };

    console.log(body);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const resp1 = await fetch(
        "http://localhost:3322/checkCode",
        requestOptions
      );

      if (resp1.ok) {
        alert("coupon Added Successfully");
        handleClose();
      } else {
        alert("error");
      }
    } catch (error) {
      console.log("Err ", error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} style={{ height: "60px" }}>
        Apply Coupon .. ?
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Apply Coupon to get amazing discounts 😁
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="outlined-basic"
              label="Code"
              variant="outlined"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              style={{ width: "400px" }}
            />{" "}
            <br />
            <Button
              onClick={(e) => handleAddCoupon(e)}
              variant="contained"
              style={{ marginLeft: "170px", marginTop: "10px" }}
            >
              Enter
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
