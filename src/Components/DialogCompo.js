import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogCompo({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(body),
    };

    try {
      const resp = await fetch(
        `http://localhost:3322/DeleteService/${data._id}`,
        requestOptions
      );
      if (resp.ok) {
        alert("Service Deleted successfully");
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
      <Button style={{ color: "#ed3838" }} onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Alert ..."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you really want to delete the the service {data.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Discard</Button>
          <Button onClick={(e) => handleDelete(e)} style={{ color: "red" }}>
            Yes Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
