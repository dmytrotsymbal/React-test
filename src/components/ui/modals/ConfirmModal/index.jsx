import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const ConfirmModal = ({ open, handleClose, handleDelete, employeeName }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Видалити співробітника</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Ви впевнені, що хочете видалити співробітника {employeeName}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Ні
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
          autoFocus
        >
          Так
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
