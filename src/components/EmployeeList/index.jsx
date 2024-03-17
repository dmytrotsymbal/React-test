import React, { useEffect, useState } from "react";
import {
  getEmployees,
  getEmployeesCount,
  deleteEmployee,
  searchEmployees,
} from "../../services/ApiService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Pagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomLoader from "../ui/CustomLoader";
import ConfirmModal from "../ui/modals/ConfirmModal";
import { Link } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import EmptyListBlock from "../ui/EmptyListBlock";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const [showPagination, setShowPagination] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees(currentPage, pageSize);
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [currentPage]);

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const totalCount = await getEmployeesCount();
        setTotalPages(Math.ceil(totalCount / pageSize));
      } catch (error) {
        console.error("Error fetching total events count:", error);
      }
    };

    fetchTotalCount();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null); // Для отслеживания выбранного для удаления сотрудника

  const handleDelete = async () => {
    if (selectedEmployee) {
      try {
        await deleteEmployee(selectedEmployee.employeeId);
        setEmployees(
          employees.filter(
            (emp) => emp.employeeId !== selectedEmployee.employeeId
          )
        );
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to delete the employee:", error);
      }
    }
  };

  const handleOpenModal = (employee) => {
    setSelectedEmployee(employee); // Устанавливаем выбранного сотрудника
    setIsModalOpen(true); // Открываем модальное окно
  };

  //===========================================================================

  const handleSearch = async (name) => {
    try {
      const data = await searchEmployees(name);
      setEmployees(data);
      setLoading(false);
      setShowPagination(false);
    } catch (error) {
      console.error("Error searching for employees:", error);
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      const data = await getEmployees(currentPage, pageSize);
      setEmployees(data);
      setLoading(false);
      setCurrentPage(1);
      setShowPagination(true);
    } catch (error) {
      console.error("Error fetching all employees:", error);
      setLoading(false);
    }
  };

  //===========================================================================

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true);
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CustomLoader />
        </div>
      ) : (
        <>
          <SearchComponent onSearch={handleSearch} onReset={handleReset} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Employee ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Position</TableCell>
                  <TableCell align="center">Department</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(employees) && employees.length > 0 ? (
                  employees.map((employee) => (
                    <TableRow key={employee.employeeId}>
                      <TableCell align="center" component="th" scope="row">
                        {employee.employeeId}
                      </TableCell>
                      <TableCell align="center">{employee.name}</TableCell>
                      <TableCell align="center">{employee.position}</TableCell>
                      <TableCell align="center">
                        {employee.departmentId === 1
                          ? "1 (IT)"
                          : employee.departmentId === 2
                          ? "2 (Маркетинг)"
                          : employee.departmentId === 3
                          ? "3 (Фінанси)"
                          : "4 (Охорона)"}
                      </TableCell>
                      <TableCell align="center">
                        <Link to={`/edit/${employee.employeeId}`}>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </Link>
                        <IconButton onClick={() => handleOpenModal(employee)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <EmptyListBlock />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {showPagination && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "center",
              }}
            />
          )}
        </>
      )}

      <ConfirmModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleDelete={handleDelete}
        employeeName={selectedEmployee ? selectedEmployee.name : ""}
      />
    </>
  );
};

export default EmployeeList;
