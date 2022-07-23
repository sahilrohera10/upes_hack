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
  width: 240,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export default function ContactUsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        style={{ marginTop: "10px", color: "white", fontWeight: "700" }}
        onClick={handleOpen}
      >
        CONTACT US
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            style={{ textAlign: "center" }}
            component="h2"
          >
            Contact{" "}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              style={{ marginBottom: "10px" }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <TextField
              style={{ marginBottom: "10px" }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
            <TextField
              style={{ marginBottom: "10px" }}
              id="outlined-basic"
              label="Message "
              variant="outlined"
            />
          </Typography>
          <Button style={{ marginLeft: "70px" }} variant="contained">
            Send
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
