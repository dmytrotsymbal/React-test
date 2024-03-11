import EmployeeList from "../components/EmployeeList";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const EmployeePage = () => {
  return (
    <>
      <br />
      <Button component={Link} to="/create" variant="contained" color="primary">
        Add Employee
      </Button>
      <br />
      <br />
      <EmployeeList />
      <br />
    </>
  );
};
export default EmployeePage;
