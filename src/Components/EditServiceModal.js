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
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditServiceModal({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = React.useState(data.name);
  const [descrip, setDescrip] = React.useState(data.description);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const body = {
      ServiceId: data._id,
      name: name,
      description: descrip,
    };
    console.log("body=>", body);

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const data = await fetch(
        "http://localhost:3322/UpdateService",
        requestOptions
      );
      if (data.ok) {
        alert("Service updated successfully");
        handleClose();
      } else {
        alert("error");
        handleClose();
      }
    } catch (error) {
      alert("error", error);
    }
  };

  return (
    <div>
      <Button style={{ color: "#6159C9" }} onClick={handleOpen}>
        Edit
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
            component="h2"
            style={{ textAlign: "center" }}
          >
            Edit Service
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={name}
              defaultValue={data.name}
              onChange={(e) => setName(e.target.value)}
              style={{
                marginBottom: "10px",
                marginLeft: "20px",
                width: "250px",
              }}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={descrip}
              onChange={(e) => setDescrip(e.target.value)}
              defaultValue={data.description}
              style={{
                marginBottom: "10px",
                marginLeft: "20px",
                width: "250px",
              }}
            />
            <Button
              style={{ marginLeft: "100px" }}
              variant="contained"
              onClick={(e) => handleUpdate(e)}
            >
              Update
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
