import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { FileUploader } from "react-drag-drop-files";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const fileTypes = ["JPG", "PNG"];

export default function AddServiceModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <div style={{ marginLeft: "1080px" }}>
      <Button onClick={handleOpen}>Add Service</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Service
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              label="Upload or drag a image right here"
            />
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              style={{ margin: "10px" }}
            />
            <TextField
              style={{ margin: "10px" }}
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
            <Button
              variant="contained"
              style={{ height: "50px", marginLeft: "200px" }}
            >
              Upload
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
