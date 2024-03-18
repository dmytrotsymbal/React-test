import { Typography, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const EmployeeNotFound = ({ errorMessage }) => {
  return (
    <Paper
      elevation={3}
      sx={{ padding: "36px", textAlign: "center", backgroundColor: "#ffcccb" }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: "72px" }} />
      <Typography
        variant="h5"
        gutterBottom
        sx={{ marginTop: "16px", color: "red" }}
      >
        {errorMessage}
      </Typography>
      <Typography sx={{ color: "grey.700", mt: 3 }}>
        Можливо ви ввели невірні дані
      </Typography>
    </Paper>
  );
};
export default EmployeeNotFound;
