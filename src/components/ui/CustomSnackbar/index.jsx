import { Snackbar, Alert, Slide } from "@mui/material";

const CustomSnackbar = ({ open, handleClose, message }) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        sx={{
          marginTop: "60px",
        }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "left" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "330px" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
export default CustomSnackbar;
